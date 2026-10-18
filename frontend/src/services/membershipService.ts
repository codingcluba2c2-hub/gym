import { db } from './enterpriseStorage';
import type {
  MembershipRecord,
  PaymentRecord,
  MembershipStatus,
} from '../types/gymEnterprise';

export interface CheckoutResult {
  success: boolean;
  message: string;
  membership?: MembershipRecord;
  payment?: PaymentRecord;
}

export const membershipService = {
  // Step 1: Initiate checkout and create PENDING_PAYMENT membership
  createPendingMembership: (memberId: string, planId: string): CheckoutResult => {
    const plans = db.getPlans();
    const plan = plans.find((p) => p.id === planId && p.isAvailable);
    if (!plan) {
      return { success: false, message: 'The selected membership plan is not available.' };
    }

    const memberships = db.getMemberships();
    
    // Check if member already has an active plan
    const activePlan = memberships.find((m) => m.memberId === memberId && m.status === 'ACTIVE');
    
    const now = new Date();
    // If active plan exists, stack new membership after current expiry
    let startDate = now;
    if (activePlan) {
      const currentExpiry = new Date(activePlan.expiryDate);
      if (currentExpiry > now) {
        startDate = currentExpiry;
      }
    }

    const expiryDate = new Date(startDate);
    expiryDate.setMonth(expiryDate.getMonth() + plan.durationMonths);

    const newMembershipId = `mem-${Date.now()}`;
    const newMembership: MembershipRecord = {
      id: newMembershipId,
      memberId,
      planId: plan.id,
      // Historical snapshots preserving exact terms at checkout
      planNameSnapshot: plan.name,
      priceSnapshot: plan.price,
      currencySnapshot: plan.currency,
      durationMonthsSnapshot: plan.durationMonths,
      startDate: startDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'PENDING_PAYMENT',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    memberships.push(newMembership);
    db.saveMemberships(memberships);

    return {
      success: true,
      message: 'Pending membership record generated. Proceed to payment verification.',
      membership: newMembership,
    };
  },

  // Step 2: Complete verified payment & activate membership atomically
  processVerifiedPayment: (
    membershipId: string,
    memberId: string,
    provider: PaymentRecord['provider'],
    simulateSuccess: boolean = true
  ): CheckoutResult => {
    const memberships = db.getMemberships();
    const memIdx = memberships.findIndex((m) => m.id === membershipId && m.memberId === memberId);
    
    if (memIdx === -1) {
      return { success: false, message: 'Target membership was not found.' };
    }

    const membership = memberships[memIdx];

    if (membership.status === 'ACTIVE') {
      return { success: false, message: 'This membership is already active and paid.' };
    }

    const orderId = `order_${provider.toLowerCase()}_${Date.now()}`;
    const paymentId = `pay_${Date.now()}_sig`;
    const receiptNum = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    if (!simulateSuccess) {
      // Record failed transaction without activating membership
      const failedPayment: PaymentRecord = {
        id: `pay-${Date.now()}`,
        membershipId: membership.id,
        memberId,
        amount: membership.priceSnapshot,
        currency: membership.currencySnapshot,
        provider,
        providerOrderId: orderId,
        providerPaymentId: `failed_${Date.now()}`,
        status: 'FAILED',
        description: `${membership.planNameSnapshot} Membership (Payment Rejected)`,
        receiptNumber: receiptNum,
        paidAt: now,
        createdAt: now,
      };

      const payments = db.getPayments();
      payments.push(failedPayment);
      db.savePayments(payments);

      return {
        success: false,
        message: 'Payment verification failed. Your membership remains pending.',
        membership,
        payment: failedPayment,
      };
    }

    // ATOMIC ACTIVATION: Verified Payment
    const verifiedPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      membershipId: membership.id,
      memberId,
      amount: membership.priceSnapshot,
      currency: membership.currencySnapshot,
      provider,
      providerOrderId: orderId,
      providerPaymentId: paymentId,
      status: 'SUCCESS',
      description: `${membership.planNameSnapshot} Plan (${membership.durationMonthsSnapshot} Mo)`,
      receiptNumber: receiptNum,
      paidAt: now,
      createdAt: now,
    };

    // Update membership status to ACTIVE
    memberships[memIdx] = {
      ...membership,
      status: 'ACTIVE',
      updatedAt: now,
    };

    db.saveMemberships(memberships);

    const payments = db.getPayments();
    payments.push(verifiedPayment);
    db.savePayments(payments);

    // Audit Log
    db.logAction(
      'MEMBERSHIP_ACTIVATED',
      { id: memberId, email: `member-${memberId}` },
      'MEMBERSHIP',
      membership.id,
      `Activated ${membership.planNameSnapshot} via verified payment ${verifiedPayment.receiptNumber} (${verifiedPayment.currency} ${verifiedPayment.amount})`
    );

    return {
      success: true,
      message: 'Payment verified successfully! Membership is now active.',
      membership: memberships[memIdx],
      payment: verifiedPayment,
    };
  },

  // Member helper: Get active membership & days remaining
  getActiveMembership: (memberId: string) => {
    const memberships = db.getMemberships();
    const active = memberships.find((m) => m.memberId === memberId && m.status === 'ACTIVE');
    if (!active) return null;

    const expiry = new Date(active.expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Auto-expire check
    if (daysRemaining <= 0 && active.status === 'ACTIVE') {
      active.status = 'EXPIRED';
      db.saveMemberships(memberships);
    }

    return {
      ...active,
      daysRemaining,
      isExpiringSoon: daysRemaining <= 7 && daysRemaining > 0,
    };
  },

  // Admin: Update membership status with audit
  updateMembershipStatus: (
    adminUser: { id: string; email: string },
    membershipId: string,
    newStatus: MembershipStatus,
    reason: string
  ) => {
    const memberships = db.getMemberships();
    const idx = memberships.findIndex((m) => m.id === membershipId);
    if (idx === -1) return { success: false, message: 'Membership not found.' };

    const oldStatus = memberships[idx].status;
    memberships[idx].status = newStatus;
    memberships[idx].updatedAt = new Date().toISOString();
    if (reason) {
      memberships[idx].notes = `${memberships[idx].notes || ''} [Status change: ${reason}]`;
    }

    db.saveMemberships(memberships);

    db.logAction(
      'MEMBERSHIP_STATUS_CHANGED',
      adminUser,
      'MEMBERSHIP',
      membershipId,
      `Changed status from ${oldStatus} to ${newStatus}. Reason: ${reason || 'N/A'}`
    );

    return { success: true, message: `Membership status updated to ${newStatus}.` };
  },

  // Admin: Extend membership duration
  extendMembershipDays: (
    adminUser: { id: string; email: string },
    membershipId: string,
    extraDays: number,
    reason: string
  ) => {
    const memberships = db.getMemberships();
    const idx = memberships.findIndex((m) => m.id === membershipId);
    if (idx === -1) return { success: false, message: 'Membership not found.' };

    const currentExpiry = new Date(memberships[idx].expiryDate);
    currentExpiry.setDate(currentExpiry.getDate() + extraDays);
    memberships[idx].expiryDate = currentExpiry.toISOString();
    memberships[idx].updatedAt = new Date().toISOString();
    memberships[idx].notes = `${memberships[idx].notes || ''} [Extended ${extraDays} days: ${reason}]`;

    db.saveMemberships(memberships);

    db.logAction(
      'MEMBERSHIP_EXTENDED',
      adminUser,
      'MEMBERSHIP',
      membershipId,
      `Extended by ${extraDays} days. New expiry: ${currentExpiry.toISOString().slice(0, 10)}. Reason: ${reason}`
    );

    return { success: true, message: `Membership successfully extended by ${extraDays} days.` };
  },
};
