// Enterprise Gym Management Data Models & State Contracts

export type UserRole = 'ADMIN' | 'STAFF' | 'MEMBER';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
export type MembershipStatus = 'ACTIVE' | 'PENDING_PAYMENT' | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED';
export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
export type BookingStatus = 'CONFIRMED' | 'ATTENDED' | 'CANCELLED';
export type EnquiryStatus = 'NEW' | 'IN_REVIEW' | 'CONTACTED' | 'RESOLVED';

export interface User {
  id: string;
  email: string;
  passwordHash: string; // Simulated hashed storage
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MemberProfile {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  address?: string;
  emergencyContact?: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Competitor';
  avatar?: string;
  inbodyScanDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredMembershipPlan {
  id: string;
  name: string;
  price: number; // Stored in decimal / cents or plain integer
  currency: string;
  durationMonths: number;
  highlighted: boolean;
  badge?: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipRecord {
  id: string;
  memberId: string;
  planId: string;
  // Historical snapshots so plan changes don't rewrite historical receipts
  planNameSnapshot: string;
  priceSnapshot: number;
  currencySnapshot: string;
  durationMonthsSnapshot: number;
  startDate: string;
  expiryDate: string;
  status: MembershipStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  membershipId?: string;
  memberId: string;
  amount: number;
  currency: string;
  provider: 'RAZORPAY_TEST_SIMULATOR' | 'MANUAL_CASH_ADMIN' | 'RAZORPAY_LIVE';
  providerOrderId: string;
  providerPaymentId: string;
  status: PaymentStatus;
  description: string;
  receiptNumber: string;
  paidAt: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  checkInTime: string;
  checkInDate: string; // YYYY-MM-DD for fast date filtering & duplicate check
  zone: string;
  recordedByRole: 'SELF' | 'STAFF' | 'ADMIN';
}

export interface ClassBookingRecord {
  id: string;
  classId: string;
  className: string;
  memberId: string;
  scheduledTime: string;
  scheduledDay: string;
  trainerName: string;
  room: string;
  status: BookingStatus;
  bookedAt: string;
}

export interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  performedByUserId: string;
  performedByEmail: string;
  targetEntity: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export interface GymSettings {
  gymName: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  timezone: string;
  allowSelfCheckIn: boolean;
  maxDailyCheckIns: number;
  gracePeriodDays: number;
}
