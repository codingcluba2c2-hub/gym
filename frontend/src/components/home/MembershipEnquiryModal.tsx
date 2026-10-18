import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, MessageSquare, ShieldCheck } from 'lucide-react';
import { FITMAKER_CONFIG } from '../../data/fitmakerOfflineData';

const TODAY_ISO = '2026-10-19';

interface MembershipEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
}

export const MembershipEnquiryModal: React.FC<MembershipEnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(() => selectedPlanId || 'plan-half-yearly');
  const [prevPlanId, setPrevPlanId] = useState<string | undefined>(selectedPlanId);
  if (selectedPlanId !== prevPlanId) {
    setPrevPlanId(selectedPlanId);
    if (selectedPlanId) setSelectedPlan(selectedPlanId);
  }
  const [enquiryType, setEnquiryType] = useState<'membership' | 'personal-training' | 'online-coaching'>('membership');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    preferredStartDate: '',
    fitnessGoal: 'General Strength & Conditioning',
    experienceLevel: 'Intermediate Lifter',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);


  if (!isOpen) return null;

  const currentPlanObj = FITMAKER_CONFIG.membershipPlans.find((p) => p.id === selectedPlan) || FITMAKER_CONFIG.membershipPlans[2];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.contact.trim()) {
      errs.contact = 'Valid phone or email is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      contact: '',
      preferredStartDate: '',
      fitnessGoal: 'General Strength & Conditioning',
      experienceLevel: 'Intermediate Lifter',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello FITMAKER Gym! I would like to inquire about membership.\nPlan: ${currentPlanObj.name} (₹${currentPlanObj.price.toLocaleString('en-IN')})\nName: ${formData.name}\nContact: ${formData.contact}\nGoal: ${formData.fitnessGoal}`
    );
    window.open(`https://wa.me/${FITMAKER_CONFIG.branch.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Membership and Training Enquiry"
    >
      <div className="relative w-full max-w-xl bg-[#140606] border border-[#3b1212] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#1d0808] border-b border-[#310f0f]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
            <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
              MEMBERSHIP &amp; COACHING ENQUIRY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-[#2b0e0e] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-5">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="font-heading text-2xl font-black text-white uppercase">
                  Enquiry Prepared
                </h4>
                <p className="text-xs text-[#E50914] font-semibold uppercase tracking-wider">
                  Frontend Demo Confirmation
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1a0707] border border-[#331111] text-xs text-zinc-300 text-left space-y-2">
                <div className="flex justify-between border-b border-[#2d0e0e] pb-1.5">
                  <span className="text-zinc-500">Plan Inquired:</span>
                  <span className="font-bold text-[#E50914]">{currentPlanObj.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d0e0e] pb-1.5">
                  <span className="text-zinc-500">Illustrative Price:</span>
                  <span className="font-bold text-white">₹{currentPlanObj.price.toLocaleString('en-IN')} {currentPlanObj.periodLabel}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d0e0e] pb-1.5">
                  <span className="text-zinc-500">Member Name:</span>
                  <span className="font-medium text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Contact:</span>
                  <span className="font-medium text-white">{formData.contact}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-600/30 text-[11px] text-amber-200/90 text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Frontend Demo Project:</strong> No backend payment gateway or database is hooked up. You can send this configured inquiry directly to the club desk over WhatsApp.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleWhatsAppSend}
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 px-6 bg-[#210909] hover:bg-[#310e0e] text-zinc-300 font-heading font-bold text-xs uppercase tracking-wider rounded-full border border-[#3d1212] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#1a0707] border border-[#2f0d0d] text-center">
                <button
                  type="button"
                  onClick={() => setEnquiryType('membership')}
                  className={`py-2 px-1 rounded-lg text-[11px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    enquiryType === 'membership' ? 'bg-[#E50914] text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Gym Membership
                </button>
                <button
                  type="button"
                  onClick={() => setEnquiryType('personal-training')}
                  className={`py-2 px-1 rounded-lg text-[11px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    enquiryType === 'personal-training' ? 'bg-[#E50914] text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Personal Training
                </button>
                <button
                  type="button"
                  onClick={() => setEnquiryType('online-coaching')}
                  className={`py-2 px-1 rounded-lg text-[11px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    enquiryType === 'online-coaching' ? 'bg-[#E50914] text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Online Coaching
                </button>
              </div>

              {/* Selected Plan Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Selected Tier / Membership Option
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white cursor-pointer"
                >
                  {FITMAKER_CONFIG.membershipPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — ₹{plan.price.toLocaleString('en-IN')} {plan.periodLabel} ({plan.durationLabel})
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Includes {currentPlanObj.accessIncluded}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                  />
                  {errors.name && <p className="text-[#ff4d4d] text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Phone or Email *
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                  />
                  {errors.contact && <p className="text-[#ff4d4d] text-[11px] mt-1">{errors.contact}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Primary Goal
                  </label>
                  <select
                    value={formData.fitnessGoal}
                    onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white"
                  >
                    <option value="General Strength & Muscle">General Strength &amp; Muscle</option>
                    <option value="Body Recomposition & Fat Loss">Body Recomposition &amp; Fat Loss</option>
                    <option value="Athletic Conditioning & Stamina">Athletic Conditioning &amp; Stamina</option>
                    <option value="Injury Rehab & Mobility">Injury Rehab &amp; Mobility</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Target Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredStartDate}
                    onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
                    min={TODAY_ISO}
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any training history, injuries or questions..."
                  className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 resize-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#190707] border border-[#2f0f0f] text-[11px] text-zinc-400 space-y-1">
                <span className="text-zinc-300 font-semibold block">Configurable Demo Pricing:</span>
                <p>
                  Prices are illustrative demo figures stored in <code className="text-[#E50914]">fitmakerOfflineData.ts</code>. No credit card or automated charge will occur.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer"
              >
                Submit Membership Enquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
