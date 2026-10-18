import React from 'react';
import { BRAND } from '../../data/gymData';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenEnquiry: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {

  return (
    <footer className="bg-[#0c0c0c] border-t border-[#222222] text-[#9CA3AF] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#222222]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-white">
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 border-2 border-white rotate-45 absolute -top-0.5"></div>
                  <div className="w-3.5 h-3.5 border-2 border-blue-400 rotate-45 absolute -bottom-0.5 opacity-80"></div>
                </div>
              </div>
              <div>
                <span className="font-heading text-xl font-bold tracking-tight text-white block">
                  FITNESS CENTER
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-blue-400">
                  PREMIUM ATHLETIC &amp; STRENGTH CLUB
                </span>
              </div>
            </div>
            <p className="text-sm text-[#888888] leading-relaxed max-w-sm">
              Engineered for athletes, powerlifters, and everyday individuals committed to measurable physical progress. No gimmicks, pure discipline.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={BRAND.social.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded bg-[#171717] border border-[#262626] flex items-center justify-center text-[#9CA3AF] hover:text-[#FF5A1F] hover:border-[#FF5A1F] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href={BRAND.social.youtube} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded bg-[#171717] border border-[#262626] flex items-center justify-center text-[#9CA3AF] hover:text-[#FF5A1F] hover:border-[#FF5A1F] transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a 
                href={BRAND.social.twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded bg-[#171717] border border-[#262626] flex items-center justify-center text-[#9CA3AF] hover:text-[#FF5A1F] hover:border-[#FF5A1F] transition-all"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Course
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Training Disciplines */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-white transition-colors cursor-pointer">
                  Barbell Strength
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-white transition-colors cursor-pointer">
                  HIIT & Engine Conditioning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-white transition-colors cursor-pointer">
                  Functional Hyrox
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-white transition-colors cursor-pointer">
                  1-on-1 Personal Coaching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('classes')} className="hover:text-white transition-colors cursor-pointer">
                  Mobility & CNS Recovery
                </button>
              </li>
            </ul>
          </div>

          {/* Facility Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Demo Facility
            </h4>
            <ul className="space-y-3 text-xs text-[#888888]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                <span>{BRAND.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                <span>{BRAND.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                <span>{BRAND.contact.email}</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Mon - Fri: 5AM - 11PM</p>
                  <p>Sat: 6AM - 10PM | Sun: 7AM - 8PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] gap-4">
          <p>
            &copy; {CURRENT_YEAR} {BRAND.name}. All rights reserved. Demo showcase website for portfolio & freelance presentation.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenEnquiry} className="text-[#FF5A1F] hover:underline flex items-center gap-1 cursor-pointer">
              <span>Request Consultation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
