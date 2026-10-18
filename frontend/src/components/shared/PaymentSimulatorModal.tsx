import React, { useState } from 'react';
import { membershipService } from '../../services/membershipService';
import { X, CreditCard, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { StoredMembershipPlan } from '../../types/gymEnterprise';

interface PaymentSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: StoredMembershipPlan;
  memberId: string;
  onSuccess: () => void;
}

export const PaymentSimulatorModal: React.FC<PaymentSimulatorModalProps> = ({
  isOpen,
  onClose,
  plan,
  memberId,
  onSuccess,
}) => {
  const [processing, setProcessing] = useState(false);
  const [statusResult, setStatusResult] = useState<{ success: boolean; message: string; receipt?: string } | null>(null);

  if (!isOpen) return null;

  const handleSimulatePayment = (willSucceed: boolean) => {
    setProcessing(true);
    setStatusResult(null);

    // Step 1: Create pending membership record
    const pendingRes = membershipService.createPendingMembership(memberId, plan.id);
    if (!pendingRes.success || !pendingRes.membership) {
      setProcessing(false);
      setStatusResult({ success: false, message: pendingRes.message });
      return;
    }

    // Step 2: Simulate Razorpay Gateway Verification Delay
    setTimeout(() => {
      const verifyRes = membershipService.processVerifiedPayment(
        pendingRes.membership!.id,
        memberId,
        'RAZORPAY_TEST_SIMULATOR',
        willSucceed
      );

      setProcessing(false);
      if (verifyRes.success && verifyRes.payment) {
        setStatusResult({
          success: true,
          message: 'Razorpay Sandbox Signature Verified! Membership is now active.',
          receipt: verifyRes.payment.receiptNumber,
        });
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setStatusResult({
          success: false,
          message: verifyRes.message || 'Payment authentication failed on gateway.',
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#141414] border border-[#2b2b2b] rounded-lg shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border-b border-[#2b2b2b]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#FF5A1F]" />
            <h3 className="font-heading text-lg font-bold text-white tracking-wide uppercase">
              Razorpay Checkout Simulator
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#9CA3AF] hover:text-white hover:bg-[#252525]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Plan Summary Card */}
          <div className="p-4 rounded bg-[#1c1c1c] border border-[#333] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-heading font-bold text-[#FF5A1F] uppercase tracking-wider block">
                Selected Plan
              </span>
              <h4 className="text-xl font-heading font-bold text-white uppercase">
                {plan.name}
              </h4>
              <p className="text-xs text-[#8E8E93]">
                Duration: {plan.durationMonths} Month(s) &bull; Full Gym Floor Access
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-heading font-extrabold text-white">
                ₹{plan.price}
              </span>
              <span className="text-xs text-[#8E8E93] block font-medium">
                INR
              </span>
            </div>
          </div>

          {/* Development Notice */}
          <div className="p-3 bg-[#1c1917] border border-[#FF5A1F]/30 rounded text-xs text-[#D1D5DB] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#FF5A1F]">
              <ShieldCheck className="w-4 h-4" />
              <span>TEST SIMULATOR &bull; NO REAL CHARGES</span>
            </div>
            <p className="text-[11px] text-[#A1A1AA]">
              Simulates server-side signature verification and atomic membership lifecycle activation without transmitting live credit card data.
            </p>
          </div>

          {/* Result Banner */}
          {statusResult && (
            <div className={`p-4 rounded border text-xs flex items-start gap-2.5 animate-in zoom-in-95 ${
              statusResult.success
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : 'bg-red-950/40 border-red-800 text-red-300'
            }`}>
              {statusResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">{statusResult.message}</p>
                {statusResult.receipt && (
                  <p className="text-[11px] mt-1 text-emerald-400">Generated Receipt: <strong>{statusResult.receipt}</strong></p>
                )}
              </div>
            </div>
          )}

          {/* Action Simulator Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleSimulatePayment(true)}
              disabled={processing}
              className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#ff723f] text-black font-heading font-bold uppercase tracking-wider text-xs rounded transition-all shadow-[0_0_20px_rgba(255,90,31,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {processing ? 'Verifying Gateway Signature...' : (
                <>
                  <span>Simulate Verified Payment (₹{plan.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={() => handleSimulatePayment(false)}
              disabled={processing}
              className="w-full py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-[#888] hover:text-red-400 font-heading font-bold uppercase tracking-wider text-[11px] rounded transition-all cursor-pointer disabled:opacity-50"
            >
              Simulate Rejected Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
