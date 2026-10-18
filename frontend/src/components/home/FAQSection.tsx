import React, { useState } from 'react';
import { FAQS, type FAQItem } from '../../data/gymData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  onContactClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0b0f19] py-20 border-b border-blue-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-[10px] font-semibold uppercase tracking-widest text-blue-400">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm text-slate-400">
            Essential information regarding memberships, equipment, training levels, and onboarding.
          </p>
        </div>

        {/* Accessible Accordion */}
        <div className="space-y-3">
          {FAQS.map((item: FAQItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#12121e]/80 border border-blue-900/30 rounded-xl transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-heading text-base sm:text-lg font-bold uppercase tracking-wide transition-colors ${
                    isOpen ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
                  }`}>
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-blue-400 border-blue-400' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-blue-950/60 pt-4 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Enquiry Prompt */}
        <div className="mt-12 p-6 rounded-xl bg-[#12121e]/80 border border-blue-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-white uppercase">
                Have a unique question?
              </h4>
              <p className="text-xs text-slate-400">
                Our trainers and facility managers are available to assist you.
              </p>
            </div>
          </div>

          <button
            onClick={onContactClick}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-heading font-bold uppercase tracking-wider rounded-lg border border-blue-400 transition-all shrink-0 cursor-pointer shadow-md"
          >
            Ask a Coach
          </button>
        </div>

      </div>
    </section>
  );
};
