import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { FITMAKER_CONFIG } from '../../data/fitmakerOfflineData';

interface FitMakerFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenEnquiry: (subject?: string) => void;
  onOpenTour?: () => void;
}

export const FitMakerFooter: React.FC<FitMakerFooterProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenTour,
}) => {
  return (
    <footer className="bg-[#080202] border-t border-[#260a0a] text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#210808]">
          
          {/* Brand Info & Positioning */}
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
                  FITNESS CENTRE &bull; ONLINE
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {FITMAKER_CONFIG.brand.positioning}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Featuring 15,000 sq ft of dedicated strength equipment, free weights, high-traction sprint turf, and remote coaching.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => onOpenTour ? onOpenTour() : onNavigate('visit')}
                className="px-4 py-2 rounded-full bg-[#1c0707] hover:bg-[#E50914] text-white text-xs font-heading font-bold uppercase tracking-wider border border-[#3b1212] transition-colors cursor-pointer"
              >
                Schedule Tour
              </button>
              <button
                onClick={() => onOpenEnquiry('Online Coaching')}
                className="px-4 py-2 rounded-full bg-[#140606] hover:bg-[#200a0a] text-zinc-300 text-xs font-heading font-bold uppercase tracking-wider border border-[#2b0c0c] transition-colors cursor-pointer"
              >
                Online Coaching
              </button>
            </div>
          </div>

          {/* Offline Gym Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Explore Gym
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('facilities')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Gym Facilities &amp; Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Visit Us &amp; Directions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('memberships')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Membership Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Training Programs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trainers')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Coaches &amp; Trainers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('online-coaching')} className="hover:text-[#E50914] transition-colors cursor-pointer">
                  Online Coaching App
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Facility Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-zinc-500 block">Mon – Fri</span>
                <span className="text-white font-semibold">{FITMAKER_CONFIG.branch.hours.weekdays}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Saturday</span>
                <span className="text-white font-semibold">{FITMAKER_CONFIG.branch.hours.saturday}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Sunday</span>
                <span className="text-white font-semibold">{FITMAKER_CONFIG.branch.hours.sunday}</span>
              </div>
              <div className="pt-2 text-zinc-500 text-[11px]">
                {FITMAKER_CONFIG.branch.parkingInfo}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Location &amp; Desk
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <span className="text-zinc-300">{FITMAKER_CONFIG.branch.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <span className="text-zinc-300">{FITMAKER_CONFIG.branch.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <span className="text-zinc-300">{FITMAKER_CONFIG.branch.email}</span>
              </div>

              <div className="pt-2">
                <a
                  href={FITMAKER_CONFIG.branch.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E50914] hover:text-white transition-colors"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Honest Demo Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E50914]" />
            <span>FITMAKER Physical Fitness Club &bull; Frontend Demonstration Architecture</span>
          </div>

          <div className="text-center sm:text-right">
            <span>Designed for local gyms with customizable data module &bull; All rights reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
