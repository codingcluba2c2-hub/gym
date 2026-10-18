import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, defaultPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: defaultPlan || 'Custom Plan',
    experience: 'Intermediate',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      plan: 'Custom Plan',
      experience: 'Intermediate',
      message: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#140606] border border-[#3b1212] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#1c0808] border-b border-[#3b1212]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse"></span>
            <h3 className="font-heading text-lg font-black text-white tracking-wider uppercase">
              FITMAKER &bull; MEMBERSHIP ENQUIRY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-[#2b0e0e] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-2xl font-black text-white uppercase">
                Enquiry Received!
              </h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your consultation submission for <strong className="text-[#E50914]">{formData.plan}</strong> has been received. A master coach will contact you within 24 hours.
              </p>

              <button
                onClick={handleReset}
                className="mt-4 px-8 py-3 bg-[#E50914] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full hover:bg-[#c90812] transition-all cursor-pointer shadow-[0_0_20px_rgba(229,9,20,0.5)]"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#1f0909] p-3.5 rounded-xl border border-[#3d1212] text-xs text-zinc-300 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#E50914] shrink-0" />
                <span>
                  Reserve your complimentary movement screening &amp; personal fitness plan with a master coach.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jordan Miller"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jordan@example.com"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 234-5678"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                {/* Plan Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Plan Interested In
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3.5 py-2.5 text-sm text-white transition-colors"
                  >
                    <option value="Pro Plan">Pro Athlete Plan (₹2,499/mo)</option>
                    <option value="Custom Plan">Champion Custom Plan (₹4,999/mo)</option>
                    <option value="Beginner Plan">Starter Fitness Plan (₹1,499/mo)</option>
                    <option value="General Consultation">1-on-1 Consultation</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                  Training Experience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Beginner', 'Intermediate', 'Advanced Athlete'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: lvl })}
                      className={`py-2 px-2 text-xs rounded-lg border font-semibold transition-all cursor-pointer ${
                        formData.experience === lvl
                          ? 'bg-[#E50914] text-white border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.4)]'
                          : 'bg-[#1b0808] border-[#3b1212] text-zinc-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Fitness Goals &amp; Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you want to achieve (e.g. increase deadlift PR, fat loss, athletic conditioning)..."
                  className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-wider text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Demo Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
