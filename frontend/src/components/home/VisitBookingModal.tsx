import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { FITMAKER_CONFIG } from '../../data/fitmakerOfflineData';

const TODAY_ISO = '2026-10-19';

interface VisitBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferredFacility?: string;
}

export const VisitBookingModal: React.FC<VisitBookingModalProps> = ({
  isOpen,
  onClose,
  preferredFacility,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    preferredDate: '',
    preferredTime: '10:00 AM - 11:00 AM',
    facilityInterest: preferredFacility || 'Complete Facility Walkthrough',
    goals: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.contact.trim()) {
      errs.contact = 'Phone number or email is required.';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please pick a preferred tour date.';
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
      preferredDate: '',
      preferredTime: '10:00 AM - 11:00 AM',
      facilityInterest: 'Complete Facility Walkthrough',
      goals: '',
    });
    setErrors({});
    onClose();
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello FITMAKER Gym, I would like to schedule a Free Gym Tour!\nName: ${formData.name || 'Prospective Member'}\nDate: ${formData.preferredDate || 'Tomorrow'}\nTime: ${formData.preferredTime}\nInterest: ${formData.facilityInterest}`
    );
    window.open(`https://wa.me/${FITMAKER_CONFIG.branch.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Book a Free Gym Tour"
    >
      <div className="relative w-full max-w-lg bg-[#140606] border border-[#3b1212] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#1d0808] border-b border-[#310f0f]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-ping" />
            <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
              BOOK A FREE GYM TOUR
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

        {/* Content */}
        <div className="p-6 sm:p-7">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-heading text-2xl font-black text-white uppercase">
                  Tour Request Prepared
                </h4>
                <p className="text-xs text-[#E50914] font-semibold uppercase tracking-wider">
                  Frontend Demonstration Notification
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1b0808] border border-[#331111] text-xs text-zinc-300 text-left space-y-2">
                <div className="flex justify-between border-b border-[#2d0e0e] pb-1.5">
                  <span className="text-zinc-500">Name:</span>
                  <span className="font-medium text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d0e0e] pb-1.5">
                  <span className="text-zinc-500">Preferred Date:</span>
                  <span className="font-medium text-white">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d0e0e] pb-1.5">
                  <span className="text-zinc-500">Slot:</span>
                  <span className="font-medium text-white">{formData.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Focus:</span>
                  <span className="font-medium text-white">{formData.facilityInterest}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-600/30 text-[11px] text-amber-200/90 text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Mode:</strong> No real booking was saved to a database. You can instantly send this booking inquiry to the club desk using WhatsApp below.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 px-6 bg-[#210909] hover:bg-[#310e0e] text-zinc-300 font-heading font-bold text-xs uppercase tracking-wider rounded-full border border-[#3d1212] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-zinc-300 leading-relaxed">
                Step inside <span className="text-white font-bold">{FITMAKER_CONFIG.branch.name}</span>. Experience our equipment, meet our coaches, and see the training floor in person.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500"
                  />
                </div>
                {errors.name && <p className="text-[#ff4d4d] text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Phone Number or Email *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+91 98765 00000 / email"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500"
                  />
                </div>
                {errors.contact && <p className="text-[#ff4d4d] text-[11px] mt-1">{errors.contact}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Preferred Visit Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={TODAY_ISO}
                      className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                    />
                  </div>
                  {errors.preferredDate && <p className="text-[#ff4d4d] text-[11px] mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-xs text-white cursor-pointer"
                    >
                      <option value="07:00 AM - 08:00 AM">Morning (07:00 AM – 08:00 AM)</option>
                      <option value="10:00 AM - 11:00 AM">Midday (10:00 AM – 11:00 AM)</option>
                      <option value="01:00 PM - 02:00 PM">Afternoon (01:00 PM – 02:00 PM)</option>
                      <option value="05:30 PM - 06:30 PM">Evening (05:30 PM – 06:30 PM)</option>
                      <option value="07:30 PM - 08:30 PM">Night (07:30 PM – 08:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Primary Area of Interest
                </label>
                <select
                  value={formData.facilityInterest}
                  onChange={(e) => setFormData({ ...formData, facilityInterest: e.target.value })}
                  className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white cursor-pointer"
                >
                  <option value="Complete Facility Walkthrough">Complete Facility Walkthrough (All Zones)</option>
                  <option value="Free Weights & Barbell Platforms">Free Weights &amp; Barbell Platforms</option>
                  <option value="Personal Training & Biometrics">Personal Training &amp; Biometrics</option>
                  <option value="Functional Turf & Conditioning">Functional Turf &amp; Conditioning</option>
                  <option value="Sauna, Recovery & Locker Suites">Sauna, Recovery &amp; Locker Suites</option>
                </select>
              </div>

              <div className="p-2.5 rounded-lg bg-[#180707] border border-[#2d0e0e] text-[11px] text-zinc-400">
                <span className="text-[#E50914] font-semibold">Club Policy:</span> Free gym tours include 1 complimentary movement screening and zero high-pressure sales tactics.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer"
              >
                Confirm Free Tour Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
