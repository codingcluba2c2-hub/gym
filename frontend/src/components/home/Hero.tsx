import React from 'react';
import { ArrowRight, Compass, Flame, Users, Trophy } from 'lucide-react';

interface HeroProps {
  onExploreMemberships: () => void;
  onExploreTraining: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMemberships, onExploreTraining }) => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center overflow-hidden bg-gradient-to-br from-[#020617] via-[#051139] to-[#010b27]">
      {/* Dynamic Background Organic Curves & Glows (matching the curved liquid blue backdrop in mockup) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep blue organic ambient waves */}
        <div className="absolute -top-[20%] -left-[10%] w-[650px] h-[650px] rounded-full bg-[#1d4ed8]/20 blur-[130px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2563eb]/25 blur-[150px]" />
        <div className="absolute top-0 right-0 w-[700px] h-full bg-gradient-to-l from-[#1e40af]/30 to-transparent blur-[120px]" />

        {/* Fluid SVG waves matching reference curved background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
        >
          <path
            fill="#1e3a8a"
            fillOpacity="0.4"
            d="M0,288L48,272C96,256,192,224,288,240C384,256,480,320,576,325.3C672,331,768,277,864,250.7C960,224,1056,224,1152,245.3C1248,267,1344,309,1392,330.7L1440,352L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
          <path
            fill="#2563eb"
            fillOpacity="0.25"
            d="M0,512L60,490.7C120,469,240,427,360,432C480,437,600,491,720,496C840,501,960,459,1080,437.3C1200,416,1320,416,1380,416L1440,416L1440,800L1380,800C1320,800,1200,800,1080,800C960,800,840,800,720,800C600,800,480,800,360,800C240,800,120,800,60,800L0,800Z"
          ></path>
        </svg>

        {/* Ambient vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 lg:via-transparent to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090909] to-transparent"></div>
      </div>

      {/* Athlete Image on Right Side */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] xl:w-[54%] z-0 flex items-center justify-end pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-end">
          <img
            src="/hero-fitness-blue.jpg"
            alt="Muscular bodybuilder athlete curling barbell at Premium Fitness Center"
            className="w-full h-full object-cover object-[center_25%] lg:object-[center_20%] select-none filter contrast-105 brightness-95"
          />
          {/* Edge blend gradient to match seamless background */}
          <div className="absolute inset-y-0 left-0 w-36 sm:w-60 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent"></div>
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090909] via-[#020617]/80 to-transparent"></div>
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020617]/80 to-transparent"></div>
        </div>
      </div>

      {/* Content Container (Left Side Layout matching Reference) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
        <div className="max-w-xl lg:max-w-2xl space-y-7">

          {/* Headline strictly styled to match reference */}
          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] font-sans">
              Premium
            </span>
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] font-heading">
              FITNESS
            </h1>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-blue-400 leading-[0.95] drop-shadow-[0_0_35px_rgba(37,99,235,0.6)] font-heading">
              Center
            </h2>
          </div>

          {/* Description Copy */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Train with elite purpose. Build strength, sculpt muscle, and unlock peak physical performance with Olympic-calibrated equipment, certified masters coaches, and tailored nutrition.
          </p>

          {/* Pill Action Button matching 'MORE INFO' in mockup */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreMemberships}
              className="px-9 py-4 bg-white hover:bg-slate-100 text-blue-950 font-heading text-sm font-extrabold uppercase tracking-widest rounded-full shadow-[0_4px_25px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
            >
              <span>MORE INFO</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={onExploreTraining}
              className="px-8 py-4 bg-blue-950/80 hover:bg-blue-900/90 text-white font-heading text-sm font-bold uppercase tracking-wider rounded-full border border-blue-500/50 hover:border-blue-400 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Explore Courses</span>
            </button>
          </div>

          {/* Modern Proof Metric Badges */}
          <div className="pt-8 grid grid-cols-3 gap-4 sm:gap-6 border-t border-blue-900/50 backdrop-blur-sm max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white leading-none">15K+</p>
                <p className="text-[11px] text-slate-400 uppercase font-semibold mt-1">Sq Ft Gym</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white leading-none">100%</p>
                <p className="text-[11px] text-slate-400 uppercase font-semibold mt-1">Certified</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white leading-none">3,200+</p>
                <p className="text-[11px] text-slate-400 uppercase font-semibold mt-1">Athletes</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
