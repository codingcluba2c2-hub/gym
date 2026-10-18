import React from 'react';
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FitMakerFooterProps {
  onNavigate: (page: string) => void;
  onOpenEnquiry: (subject?: string) => void;
}

export const FitMakerFooter: React.FC<FitMakerFooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <footer className="bg-[#0a0202] border-t border-[#260a0a] text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#210808]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#E50914] flex items-center justify-center text-white font-heading font-black text-xl shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                FM
              </div>
              <div>
                <span className="font-heading text-xl font-black text-white tracking-wider block leading-none">
                  FIT<span className="text-[#E50914]">MAKER</span>
                </span>
                <span className="text-[9px] tracking-widest uppercase text-[#E50914] font-semibold">
                  TRANSFORM YOUR BODY
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Dedicated to helping individuals achieve lasting body transformations through expert coaching, calibrated nutrition, and progressive overload training.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Programs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('coaching')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Coaching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Losing Weight
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Building Muscle
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Training In Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Gym Plan
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              HQ Details
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <span>420 Ironworks Avenue, District 4</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E50914] shrink-0" />
                <span>+1 (555) 019-4820</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E50914] shrink-0" />
                <span>contact@fitmaker-club.com</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Mon - Fri: 5AM - 11PM</p>
                  <p>Sat: 6AM - 10PM | Sun: 7AM - 8PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} FitMaker Athletic Club. All rights reserved.
          </p>
          <button
            onClick={() => onOpenEnquiry('Consultation')}
            className="text-[#E50914] hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>Request Coaching Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
