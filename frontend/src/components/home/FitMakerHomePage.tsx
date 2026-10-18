import React, { useState } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Activity, Flame, Scale, PieChart, Check, Target, Award, Users, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { FITMAKER_DATA } from '../../data/fitmakerData';

interface FitMakerHomePageProps {
  onStartJourney: () => void;
  onExplorePrograms: () => void;
  onSelectPlan: (planName: string) => void;
  onBookCoach: (coachName: string) => void;
  onReadBlog: (postTitle: string) => void;
}

export const FitMakerHomePage: React.FC<FitMakerHomePageProps> = ({
  onStartJourney,
  onExplorePrograms,
  onSelectPlan,
  onBookCoach,
  onReadBlog,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Building Muscle',
    goals: '',
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const currentTestimonial = FITMAKER_DATA.testimonials[activeTestimonialIdx];

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % FITMAKER_DATA.testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + FITMAKER_DATA.testimonials.length) % FITMAKER_DATA.testimonials.length);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!contactForm.name.trim()) errs.name = 'Full name is required.';
    if (!contactForm.email.trim()) {
      errs.email = 'Valid email is required.';
    }
    if (!contactForm.phone.trim()) {
      errs.phone = 'Phone number is required.';
    }
    if (!contactForm.goals.trim()) {
      errs.goals = 'Please describe your fitness goals.';
    }
    setContactErrors(errs);
    if (Object.keys(errs).length === 0) {
      setContactSubmitted(true);
    }
  };

  return (
    <div className="bg-[#0b0303] text-zinc-300 selection:bg-[#E50914] selection:text-white overflow-hidden">
      
      {/* =========================================
          1. SECTION: HOME (HERO) - HIGH-END CINEMATIC RED DESIGN
         ========================================= */}
      <section id="home" className="relative min-h-[95vh] flex items-center overflow-hidden border-b border-[#220707] bg-gradient-to-b from-[#0d0303] via-[#090202] to-[#0d0303]">
        
        {/* Dynamic Multi-layered Ambient Glows & Vignette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Main Giant Circular Red Ambient Orb behind athlete */}
          <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#990000]/40 via-[#E50914]/30 to-transparent blur-[140px]" />
          {/* Subtle top left ambient glow */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#E50914]/15 blur-[160px]" />
          {/* Cinematic dark vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0303]/40 to-[#0b0303]/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Headline & Content */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0707] border border-[#3b1212] text-xs font-semibold uppercase tracking-widest text-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                <span>Transform Your Body &bull; Elevate Strength</span>
              </div>

              {/* High-Impact Typography matching Reference */}
              <div className="space-y-1">
                <span className="block text-4xl sm:text-6xl font-heading font-black uppercase text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                  Achieve Your
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight text-[#E50914] drop-shadow-[0_0_40px_rgba(229,9,20,0.6)] leading-[0.92]">
                  FITNESS GOALS
                </h1>
                <span className="block text-4xl sm:text-6xl font-heading font-black uppercase text-white tracking-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                  With FitMaker
                </span>
              </div>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-zinc-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                Join the FitMaker community and transform your fitness journey. Our expert coaches and personalized programs are designed to help you achieve your goals and exceed your expectations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={onStartJourney}
                  className="px-9 py-4 rounded-full bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs shadow-[0_0_30px_rgba(229,9,20,0.6)] hover:shadow-[0_0_40px_rgba(229,9,20,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2.5"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={onExplorePrograms}
                  className="px-8 py-4 rounded-full bg-[#180606] hover:bg-[#280a0a] text-white font-heading font-bold uppercase tracking-wider text-xs border border-[#3d1212] hover:border-[#E50914] transition-all cursor-pointer backdrop-blur-md"
                >
                  Explore Programs
                </button>
              </div>

            </div>

            {/* Right Athlete Portrait with Cinematic Circular Spotlight */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Outer Glowing Red Halo */}
              <div className="absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#800000] via-[#E50914] to-[#ff3b3b] opacity-80 blur-2xl animate-pulse" />
              
              {/* Crisp Inner Circular Red Spotlight Plate */}
              <div className="absolute w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-b from-[#E50914] to-[#800000] shadow-[0_0_60px_rgba(229,9,20,0.8)] border border-[#ff6666]/30" />

              {/* Athlete Portrait Picture with Soft Circular Base Mask */}
              <div className="relative z-10 w-[330px] h-[400px] sm:w-[430px] sm:h-[500px] overflow-hidden rounded-b-[40px] flex items-end justify-center">
                <img
                  src="/fitmaker-hero.jpg"
                  alt="FitMaker Professional Fitness Coach with Dumbbell"
                  className="w-full h-full object-cover object-top select-none filter contrast-105 brightness-95"
                />
                {/* Smooth bottom dark fade into page */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0303] via-[#0b0303]/80 to-transparent" />
              </div>

              {/* Floating Stat Badges with Enhanced Glassmorphism */}
              {/* 1. Top Left: Coaches */}
              <div className="absolute top-12 left-0 sm:left-4 z-20 px-4 py-2.5 rounded-2xl bg-[#140505]/90 border border-[#401212] backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.8)] text-center transform hover:scale-105 transition-transform">
                <span className="block text-base sm:text-lg font-black text-white">+ 80</span>
                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Coaches</span>
              </div>

              {/* 2. Top Right: Positive Reviews */}
              <div className="absolute top-8 right-0 sm:right-4 z-20 px-4 py-2.5 rounded-2xl bg-[#140505]/90 border border-[#401212] backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.8)] text-center transform hover:scale-105 transition-transform">
                <span className="block text-base sm:text-lg font-black text-white">+ 1300</span>
                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Positive Reviews</span>
              </div>

              {/* 3. Bottom Left: Workout Videos */}
              <div className="absolute bottom-6 left-2 sm:left-6 z-20 px-4 py-2.5 rounded-2xl bg-[#140505]/90 border border-[#401212] backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.8)] text-center transform hover:scale-105 transition-transform">
                <span className="block text-base sm:text-lg font-black text-white">+ 1000</span>
                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Workout Videos</span>
              </div>

              {/* 4. Bottom Right: Trainers */}
              <div className="absolute bottom-10 right-0 sm:right-6 z-20 px-4 py-2.5 rounded-2xl bg-[#140505]/90 border border-[#401212] backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.8)] text-center transform hover:scale-105 transition-transform">
                <span className="block text-base sm:text-lg font-black text-white">+ 1500</span>
                <span className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Trainers</span>
              </div>

            </div>

          </div>

          {/* 4 Key Stat Badges Row */}
          <div className="mt-20 pt-10 border-t border-[#220707] grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
            {FITMAKER_DATA.stats.map((stat, i) => (
              <div key={i} className="space-y-1.5 p-4 rounded-xl bg-[#120404]/50 border border-[#2b0c0c]/40 hover:border-[#E50914]/40 transition-all">
                <span className="text-3xl sm:text-4xl font-heading font-black text-[#E50914] block">
                  {stat.value}
                </span>
                <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                  {stat.label}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          2. SECTION: PROGRAMS (SERVICES)
         ========================================= */}
      <section id="programs" className="py-24 border-b border-[#220707] relative scroll-mt-20 bg-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Our <span className="text-[#E50914]">Services &amp; Programs</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              At This Part You Can Easily Access All Of Our Services. Take A Look At Them And Chose Wish Ever You Want.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FITMAKER_DATA.services.map((service) => (
              <div
                key={service.id}
                className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140606] via-[#140606]/40 to-transparent" />
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="font-heading text-lg font-bold uppercase text-[#E50914] tracking-wider">
                      {service.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 uppercase tracking-wide font-medium">
                      {service.subtitle}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectPlan(service.title)}
                    className="text-xs font-heading font-bold uppercase tracking-wider text-[#E50914] group-hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          3. SECTION: COACHING (TRAINERS & TOOLS)
         ========================================= */}
      <section id="coaching" className="py-24 border-b border-[#220707] scroll-mt-20 bg-gradient-to-b from-[#0d0303] via-[#100404] to-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Coaching / Trainers */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
                Our <span className="text-[#E50914]">Coaches &amp; Trainers</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Meet Our Certified Coaches Dedicated To Elevating Your Strength And Conditioning.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FITMAKER_DATA.coaches.map((coach) => (
                <div
                  key={coach.id}
                  className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140606] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 border border-[#401212] text-xs font-bold text-[#E50914] flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{coach.rating}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2 text-center">
                    <h3 className="font-heading text-lg font-bold uppercase text-white group-hover:text-[#E50914] transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-xs text-[#E50914] font-semibold uppercase">
                      {coach.role}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {coach.experience}
                    </p>
                    <button
                      onClick={() => onBookCoach(coach.name)}
                      className="w-full mt-2 py-2.5 rounded-full bg-[#1e0707] hover:bg-[#E50914] text-white text-xs font-heading font-bold uppercase transition-all cursor-pointer shadow-md"
                    >
                      Book 1-on-1 Coaching
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Tools Grid */}
          <div className="pt-10 border-t border-[#220707]">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h3 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white">
                Fitness <span className="text-[#E50914]">Tools</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Calculate All Elements Of Your Health To Keep Clear Track Of Your Goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#260808] border border-[#401212] flex items-center justify-center text-[#E50914] mb-4 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                  <Scale className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-bold uppercase text-white tracking-wide mb-2">
                  BMI CALCULATOR
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Calculate Body Mass Index quickly to evaluate healthy weight zones.
                </p>
                <button onClick={onStartJourney} className="text-xs font-bold uppercase text-[#E50914] flex items-center gap-1 hover:underline">
                  Use Tool &rarr;
                </button>
              </div>

              <div className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#260808] border border-[#401212] flex items-center justify-center text-[#E50914] mb-4 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-bold uppercase text-white tracking-wide mb-2">
                  BMR CALCULATOR
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Calculate baseline daily calories burned during complete rest.
                </p>
                <button onClick={onStartJourney} className="text-xs font-bold uppercase text-[#E50914] flex items-center gap-1 hover:underline">
                  Use Tool &rarr;
                </button>
              </div>

              <div className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#260808] border border-[#401212] flex items-center justify-center text-[#E50914] mb-4 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                  <PieChart className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-bold uppercase text-white tracking-wide mb-2">
                  MACRO NUTRIENTS
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Pinpoint your precise daily Protein, Carbohydrate, and Fat requirements.
                </p>
                <button onClick={onStartJourney} className="text-xs font-bold uppercase text-[#E50914] flex items-center gap-1 hover:underline">
                  Use Tool &rarr;
                </button>
              </div>

              <div className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#260808] border border-[#401212] flex items-center justify-center text-[#E50914] mb-4 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-bold uppercase text-white tracking-wide mb-2">
                  BODY FAT ESTIMATOR
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Estimate subcutaneous body fat percentages and measure progress.
                </p>
                <button onClick={onStartJourney} className="text-xs font-bold uppercase text-[#E50914] flex items-center gap-1 hover:underline">
                  Use Tool &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          4. SECTION: MEMBERSHIP (OUR PLANS)
         ========================================= */}
      <section id="membership" className="py-24 border-b border-[#220707] bg-gradient-to-b from-[#0d0303] via-[#120404] to-[#0d0303] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Our <span className="text-[#E50914]">Membership Plans</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select The Plan That Suits Your Fitness Goals And Let Our Expert Coaches Guide You Every Step Of The Way.
            </p>

            {/* Monthly / Annually Switch */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#1e0707] border border-[#3d1212] mt-4 shadow-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.6)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  billingCycle === 'annually'
                    ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.6)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Annually (Save 25%)
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {FITMAKER_DATA.plans.map((plan) => {
              const isHighlight = plan.popular;
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const period = billingCycle === 'monthly' ? 'month' : 'year';

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                    isHighlight
                      ? 'bg-[#180606] border-2 border-[#E50914] shadow-[0_0_40px_rgba(229,9,20,0.35)] lg:-translate-y-3'
                      : 'bg-[#130505] border border-[#2b0e0e] hover:border-[#421414]'
                  }`}
                >
                  <div className="p-8 space-y-6">
                    <div className="space-y-3 pb-6 border-b border-[#2b0e0e]">
                      <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
                        Package
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white tracking-wide">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>
                      <div className="pt-2 flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-heading font-black text-white">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-zinc-400 uppercase tracking-wider">
                          / {period}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400">
                        Features
                      </span>
                      <ul className="space-y-2.5">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <Check className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-8 pt-0">
                    <button
                      onClick={() => onSelectPlan(plan.name)}
                      className={`w-full py-3.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isHighlight
                          ? 'bg-[#E50914] hover:bg-[#c90812] text-white shadow-[0_0_20px_rgba(229,9,20,0.5)]'
                          : 'bg-[#1e0707] hover:bg-[#2b0c0c] text-white border border-[#3b1212]'
                      }`}
                    >
                      Choose This Plan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testimonial slider embedded right after pricing */}
          <div className="mt-20 pt-16 border-t border-[#220707]">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
              <div>
                <h3 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white text-center sm:text-left">
                  What Our <span className="text-[#E50914]">Customers Say</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Hear The Real Stories Of Our Active Members.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevTestimonial}
                  className="w-10 h-10 rounded-full bg-[#1e0707] border border-[#3b1212] text-white flex items-center justify-center hover:bg-[#E50914] transition-colors cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextTestimonial}
                  className="w-10 h-10 rounded-full bg-[#1e0707] border border-[#3b1212] text-white flex items-center justify-center hover:bg-[#E50914] transition-colors cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#150606] border border-[#2b0e0e] rounded-3xl p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.9)] relative overflow-hidden">
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-[#E50914]/40 shadow-[0_0_30px_rgba(229,9,20,0.3)]">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-1 text-[#E50914]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-base sm:text-xl text-zinc-200 font-medium italic leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>
                <div>
                  <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-xs text-[#E50914] uppercase tracking-wide font-semibold mt-0.5">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          5. SECTION: ABOUT US
         ========================================= */}
      <section id="about" className="py-24 border-b border-[#220707] scroll-mt-20 bg-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              About <span className="text-[#E50914]">FitMaker</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Science-Driven Body Transformations, Experienced Mentorship, And Proven Results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#E50914]">
                THE CORE VALUES
              </span>
              <h3 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
                AN UNAPOLOGETIC FOCUS ON REAL RESULTS
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                FitMaker cuts through superficial workout trends. We measure success strictly by personal record progression, consistent habit adoption, and permanent body transformation.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#200808] border border-[#3d1212] flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-heading font-bold text-white uppercase">Progressive Overload</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Calculated weekly weight volume tracking over arbitrary exhaustion workouts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#200808] border border-[#3d1212] flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-heading font-bold text-white uppercase">Certified CSCS Masters</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Every coach has over 5+ years of verified training and competitive coaching experience.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#200808] border border-[#3d1212] flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-heading font-bold text-white uppercase">Active Global Community</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Over 800+ active members sharing daily logs, recipes, and transformation wins.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#3b1212] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                alt="FitMaker Gym Floor"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] font-heading font-bold text-[#E50914] uppercase tracking-wider block">FACILITY STANDARDS</span>
                  <p className="text-sm font-heading font-bold text-white uppercase">15,000 SQ FT OF DEDICATED ATHLETIC TRAINING FLOOR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blog posts embedded in About section */}
          <div className="pt-10 border-t border-[#220707]">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h3 className="text-2xl sm:text-4xl font-heading font-black uppercase tracking-tight text-white">
                Our <span className="text-[#E50914]">Blog Posts</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Essential Fitness Tips, Nutritional Science, And Proven Routines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FITMAKER_DATA.blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] rounded-2xl overflow-hidden group transition-all duration-300 shadow-lg cursor-pointer"
                  onClick={() => onReadBlog(post.title)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-[#E50914] text-white">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[11px] text-zinc-500 font-semibold block">
                      {post.readTime}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white uppercase group-hover:text-[#E50914] transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <span className="text-xs font-bold text-[#E50914] flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1 block">
                      Read Article &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          6. SECTION: CONTACT
         ========================================= */}
      <section id="contact" className="py-24 border-b border-[#220707] bg-gradient-to-b from-[#0d0303] to-[#120404] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Contact <span className="text-[#E50914]">FitMaker</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Schedule Your Facility Walk-Through, Book A Free Movement Screening, Or Speak Directly With Head Coaches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#140606] border border-[#2b0e0e]">
                  <MapPin className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white uppercase">Location Address</h4>
                    <p className="text-xs text-zinc-300 mt-0.5">420 Ironworks Avenue, District 4</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Convenient parking &amp; transit adjacent</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#140606] border border-[#2b0e0e]">
                  <Phone className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white uppercase">Telephone</h4>
                    <p className="text-xs text-zinc-300 mt-0.5">+1 (555) 019-4820</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Direct reception desk assistance</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#140606] border border-[#2b0e0e]">
                  <Mail className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white uppercase">Electronic Mail</h4>
                    <p className="text-xs text-zinc-300 mt-0.5">contact@fitmaker-club.com</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Inquiries answered within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#140606] border border-[#2b0e0e]">
                  <Clock className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white uppercase">Facility Hours</h4>
                    <div className="text-xs text-zinc-300 mt-1 space-y-0.5">
                      <div className="flex justify-between gap-6">
                        <span>Mon - Fri:</span>
                        <span className="font-medium text-white">05:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span>Saturday:</span>
                        <span className="font-medium text-white">06:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span>Sunday:</span>
                        <span className="font-medium text-white">07:00 AM - 08:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-[#140606] border border-[#2b0e0e] rounded-2xl p-6 sm:p-8">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white uppercase">
                    Message Received!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{contactForm.name}</strong>. Your consultation submission has been captured. A coach will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({ name: '', email: '', phone: '', program: 'Building Muscle', goals: '' });
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#E50914] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full hover:bg-[#c90812] transition-all cursor-pointer shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#E50914] block mb-1">
                      GET IN TOUCH
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-white uppercase">
                      Send Us An Inquiry
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Jordan Miller"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                      />
                      {contactErrors.name && (
                        <p className="text-red-400 text-[11px] mt-1">{contactErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="jordan@example.com"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                      />
                      {contactErrors.email && (
                        <p className="text-red-400 text-[11px] mt-1">{contactErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                      />
                      {contactErrors.phone && (
                        <p className="text-red-400 text-[11px] mt-1">{contactErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Interested Program
                      </label>
                      <select
                        value={contactForm.program}
                        onChange={(e) => setContactForm({ ...contactForm, program: e.target.value })}
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white transition-colors"
                      >
                        <option value="Losing Weight">Losing Weight</option>
                        <option value="Building Muscle">Building Muscle</option>
                        <option value="Training In Home">Training In Home</option>
                        <option value="Gym Plan">Gym Plan</option>
                        <option value="1-on-1 Elite Mentorship">1-on-1 Elite Mentorship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                      Fitness Goals / Inquiries *
                    </label>
                    <textarea
                      rows={3}
                      value={contactForm.goals}
                      onChange={(e) => setContactForm({ ...contactForm, goals: e.target.value })}
                      placeholder="Tell us what you'd like to achieve with FitMaker..."
                      className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors resize-none"
                    ></textarea>
                    {contactErrors.goals && (
                      <p className="text-red-400 text-[11px] mt-1">{contactErrors.goals}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Community Banner */}
      <section className="py-20 bg-gradient-to-r from-[#180505] via-[#240808] to-[#180505] text-center border-b border-[#3b1212]">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            Join The <span className="text-[#E50914]">FitMaker</span> Community
          </h2>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto">
            Ready to change your lifestyle? Sign up now and get your customized workout and nutrition plan directly from master coaches.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartJourney}
              className="px-9 py-4 rounded-full bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(229,9,20,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
