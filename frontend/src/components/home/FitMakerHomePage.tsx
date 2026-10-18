import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Check,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Video,
  Utensils,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  Navigation,
  Car,
  Layers,
  Flame,
  Award,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { FITMAKER_CONFIG, type PhysicalMembershipPlan } from '../../data/fitmakerOfflineData';
import { FacilityLightbox } from './FacilityLightbox';
import { VisitBookingModal } from './VisitBookingModal';
import { MembershipEnquiryModal } from './MembershipEnquiryModal';

const TODAY_ISO = '2026-10-19';

interface FitMakerHomePageProps {
  onStartJourney?: () => void;
  onExplorePrograms?: () => void;
  onSelectPlan?: (planName: string) => void;
  onBookCoach?: (coachName: string) => void;
  onReadBlog?: (postTitle: string) => void;
}

export const FitMakerHomePage: React.FC<FitMakerHomePageProps> = () => {
  // Hero Image 3.5s Auto-rotation Carousel
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % FITMAKER_CONFIG.facilities.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Facility Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Visit / Tour Modal State
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [preferredFacilityTour, setPreferredFacilityTour] = useState<string>('Complete Facility Walkthrough');

  // Membership Enquiry Modal State
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-half-yearly');

  // Plan Comparison Toggle
  const [showPlanComparison, setShowPlanComparison] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Testimonial Carousel Index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Location Quick Visit Form state
  const [visitQuickForm, setVisitQuickForm] = useState({
    name: '',
    contact: '',
    date: '',
    time: '10:00 AM - 11:00 AM',
    note: '',
  });
  const [visitQuickErrors, setVisitQuickErrors] = useState<Record<string, string>>({});
  const [visitQuickSubmitted, setVisitQuickSubmitted] = useState(false);

  // General In-Page Contact Form state
  const [generalContactForm, setGeneralContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Physical Gym Membership',
    message: '',
  });
  const [generalContactErrors, setGeneralContactErrors] = useState<Record<string, string>>({});
  const [generalContactSubmitted, setGeneralContactSubmitted] = useState(false);

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleOpenTourWithFocus = (focusArea?: string) => {
    if (focusArea) setPreferredFacilityTour(focusArea);
    setVisitModalOpen(true);
  };

  const handleOpenMembershipPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setMembershipModalOpen(true);
  };

  const handleQuickVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!visitQuickForm.name.trim()) errs.name = 'Please provide your name.';
    if (!visitQuickForm.contact.trim()) errs.contact = 'Phone or email is required.';
    if (!visitQuickForm.date) errs.date = 'Select a date.';
    setVisitQuickErrors(errs);
    if (Object.keys(errs).length === 0) {
      setVisitQuickSubmitted(true);
    }
  };

  const handleGeneralContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!generalContactForm.name.trim()) errs.name = 'Full name is required.';
    if (!generalContactForm.email.trim() && !generalContactForm.phone.trim()) {
      errs.email = 'Please provide either an email or phone number.';
    }
    if (!generalContactForm.message.trim()) {
      errs.message = 'Please include a brief message or question.';
    }
    setGeneralContactErrors(errs);
    if (Object.keys(errs).length === 0) {
      setGeneralContactSubmitted(true);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const currentTestimonial = FITMAKER_CONFIG.testimonials[activeTestimonialIdx];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + FITMAKER_CONFIG.testimonials.length) % FITMAKER_CONFIG.testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % FITMAKER_CONFIG.testimonials.length);
  };

  return (
    <div className="bg-[#0b0303] text-zinc-300 selection:bg-[#E50914] selection:text-white overflow-hidden">
      
      {/* =========================================================================
          1. SECTION: HERO FOR A PHYSICAL GYM
          Headline: "YOUR FITNESS JOURNEY STARTS HERE."
          Supporting copy: "Train smarter, get stronger and build lasting habits with expert coaching, modern equipment and flexible membership options."
          Primary CTA: "Book a Free Gym Tour" | Secondary CTA: "Explore Memberships"
          Compact highlights: Personal Training, Strength & Conditioning, Flexible Memberships, Online Coaching
         ========================================================================= */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center overflow-hidden border-b border-[#220707] bg-gradient-to-b from-[#0d0303] via-[#0a0202] to-[#0d0303] pt-6 sm:pt-10"
      >
        {/* Dynamic Multi-layered Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#880000]/40 via-[#E50914]/30 to-transparent blur-[140px]" />
          <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#E50914]/15 blur-[160px]" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0303]/40 to-[#0b0303]/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Headline & Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Location Positioning Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e0707] border border-[#3b1212] text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
                <span>Physical Gym Centre &bull; {FITMAKER_CONFIG.branch.city}</span>
              </div>

              {/* Exact Required Headline */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight text-white leading-[0.95]">
                  YOUR FITNESS JOURNEY <br className="hidden sm:inline" />
                  <span className="text-[#E50914]">
                    STARTS HERE.
                  </span>
                </h1>
              </div>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {FITMAKER_CONFIG.brand.heroSupporting}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleOpenTourWithFocus('Complete Facility Walkthrough')}
                  className="px-8 py-4 rounded-full bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer flex items-center gap-2.5"
                >
                  <span>Book a Free Gym Tour</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <a
                  href="#memberships"
                  className="px-8 py-4 rounded-full bg-[#180606] hover:bg-[#280a0a] text-white font-heading font-bold uppercase tracking-wider text-xs border border-[#3d1212] hover:border-[#E50914] transition-all cursor-pointer backdrop-blur-md"
                >
                  Explore Memberships
                </a>
              </div>

              {/* Compact Highlights Pills */}
              <div className="pt-4 border-t border-[#260a0a] grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {FITMAKER_CONFIG.heroHighlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-2.5 rounded-xl bg-[#140606]/80 border border-[#2b0c0c] flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#E50914]" />
                    <span className="text-xs font-heading font-bold uppercase tracking-wide text-zinc-200">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Honest Physical Location Note */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-zinc-400 pt-1">
                <MapPin className="w-4 h-4 text-[#E50914] shrink-0" />
                <span>Visit our 15,000 sq ft physical facility in {FITMAKER_CONFIG.branch.city} or train remotely online.</span>
              </div>

            </div>

            {/* Right Hero Image: Extra Wide, Clean Enterprise Design, No Shadow, Auto-changing every 3.5s */}
            <div className="lg:col-span-6 relative flex items-center justify-center w-full">
              
              {/* Wide Image Frame with Smooth 3.5s Crossfade Transitions */}
              <div className="relative z-10 w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden border border-[#2d0e0e] select-none">
                {FITMAKER_CONFIG.facilities.map((fac, idx) => (
                  <div
                    key={fac.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                      idx === heroSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                ))}

                {/* Carousel Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-800">
                  {FITMAKER_CONFIG.facilities.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setHeroSlideIndex(dotIdx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === heroSlideIndex ? 'w-6 bg-[#E50914]' : 'w-1.5 bg-zinc-500 hover:bg-zinc-300'
                      }`}
                      aria-label={`Jump to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION: GYM FACILITY SHOWCASE (Highest-Priority New Section)
          Section title: "STEP INSIDE FITMAKER"
          Supporting text: "Explore the spaces, equipment and training areas that make every workout count."
          Gallery: Complete gym floor, Strength/free weights, Cardio, Functional, Personal training, Reception/lockers
          Click-to-expand lightbox, View all facilities interaction, Central data-driven
         ========================================================================= */}
      <section id="facilities" className="py-24 border-b border-[#220707] scroll-mt-20 bg-[#0d0303] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#240808] pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
                <Layers className="w-3 h-3 text-[#E50914]" />
                <span>Facility Walkthrough</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
                STEP INSIDE <span className="text-[#E50914]">FITMAKER</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Explore the spaces, equipment and training areas that make every workout count.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openLightboxAt(0)}
                className="px-5 py-2.5 rounded-full bg-[#1c0808] hover:bg-[#E50914] text-white text-xs font-heading font-bold uppercase tracking-wider border border-[#381111] transition-all cursor-pointer flex items-center gap-2 shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Fullscreen Gallery ({FITMAKER_CONFIG.facilities.length})</span>
              </button>
              <button
                onClick={() => handleOpenTourWithFocus('Complete Facility Walkthrough')}
                className="px-5 py-2.5 rounded-full bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Schedule In-Person Tour
              </button>
            </div>
          </div>

          {/* Editorial Grid with One Large Featured Photograph & Supporting Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Featured Hero Photograph (lg:col-span-7) */}
            <div
              onClick={() => openLightboxAt(0)}
              className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#310f0f] bg-[#140505] group cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.8)] min-h-[360px] sm:min-h-[460px] flex flex-col justify-end"
            >
              <img
                src={FITMAKER_CONFIG.facilities[0].image}
                alt={FITMAKER_CONFIG.facilities[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-[#E50914] text-white text-[10px] font-heading font-black uppercase tracking-wider">
                    {FITMAKER_CONFIG.facilities[0].badge}
                  </span>
                  <span className="text-xs uppercase font-semibold text-zinc-300">
                    {FITMAKER_CONFIG.facilities[0].category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wide group-hover:text-[#E50914] transition-colors">
                  {FITMAKER_CONFIG.facilities[0].title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                  {FITMAKER_CONFIG.facilities[0].description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {FITMAKER_CONFIG.facilities[0].specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-full bg-black/60 border border-zinc-700 text-[10px] text-zinc-300 backdrop-blur-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-[#E50914] font-bold uppercase">
                  <span className="flex items-center gap-1.5">
                    Click to Open Lightbox &rarr;
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal normal-case">
                    Illustrative demo photography
                  </span>
                </div>
              </div>
            </div>

            {/* Supporting 2x2 Grid (lg:col-span-5) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {FITMAKER_CONFIG.facilities.slice(1, 4).map((facility, fIdx) => (
                <div
                  key={facility.id}
                  onClick={() => openLightboxAt(fIdx + 1)}
                  className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 flex flex-col sm:flex-row lg:flex-row items-center shadow-lg"
                >
                  <div className="relative w-full sm:w-44 h-36 sm:h-full shrink-0 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#140606]/80 hidden sm:block" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[#E50914] text-[9px] font-heading font-bold uppercase tracking-wider">
                      {facility.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5 flex-1">
                    <h4 className="font-heading text-sm font-bold uppercase text-white group-hover:text-[#E50914] transition-colors leading-snug">
                      {facility.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {facility.description}
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] font-heading font-bold uppercase text-[#E50914]">
                        Enlarge &bull; View details &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Additional Remaining Facilities Cards (Recovery, Cardio, Strength) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {FITMAKER_CONFIG.facilities.slice(3).map((facility, idx) => (
              <div
                key={facility.id}
                onClick={() => openLightboxAt(idx + 3)}
                className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140606] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-[#3b1212] text-[#E50914] text-[10px] font-heading font-bold uppercase">
                      {facility.category}
                    </span>
                    <button
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/80 text-zinc-300 hover:text-white"
                      title="Enlarge"
                      aria-label="Enlarge image"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-heading text-base font-bold uppercase text-white group-hover:text-[#E50914] transition-colors">
                      {facility.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#220a0a]">
                  <span className="text-xs font-heading font-bold uppercase text-[#E50914]">
                    Inspect Area &rarr;
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {facility.specs[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Centralized Configurable Data Note for Gym Owner */}
          <div className="p-4 rounded-xl bg-[#170606] border border-[#300f0f] text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E50914] shrink-0" />
              <span>
                <strong>Gym Owner Note:</strong> All facility images, titles, specifications, and zones are managed centrally in <code className="text-white">src/data/fitmakerOfflineData.ts</code>. You can easily swap these illustrative demo images with real photos of your fitness facility.
              </span>
            </div>
            <button
              onClick={() => handleOpenTourWithFocus('Complete Facility Walkthrough')}
              className="px-4 py-1.5 rounded-full bg-[#E50914] text-white text-[11px] font-heading font-bold uppercase shrink-0 cursor-pointer"
            >
              Book In-Person Tour
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. SECTION: LOCATION AND PHYSICAL VISIT INFORMATION
          Section title: "FIND YOUR FIT. VISIT OUR GYM."
          Address, hours, phone, Google Maps directions, parking, available facilities, Schedule a Visit CTA
          Configurable demo confirmation / WhatsApp enquiry link
         ========================================================================= */}
      <section id="visit" className="py-24 border-b border-[#220707] scroll-mt-20 bg-gradient-to-b from-[#0d0303] via-[#110404] to-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
              <Navigation className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Physical Gym Location</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              FIND YOUR FIT. <span className="text-[#E50914]">VISIT OUR GYM.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Step inside our physical training centre. Get directions, view operating hours, and schedule your complimentary facility walkthrough.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Location Details & Operational Hours */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-[#140606] border border-[#2b0e0e] shadow-xl space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914] block mb-1">
                      Official Club Address
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-white">
                      {FITMAKER_CONFIG.branch.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      {FITMAKER_CONFIG.branch.address}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {FITMAKER_CONFIG.branch.landmark}
                    </p>
                  </div>

                  <a
                    href={FITMAKER_CONFIG.branch.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-[#E50914] hover:bg-[#c90812] text-white shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all cursor-pointer shrink-0"
                    title="Open Google Maps Directions"
                    aria-label="Open Google Maps Directions"
                  >
                    <Navigation className="w-5 h-5" />
                  </a>
                </div>

                {/* Operating Hours Table */}
                <div className="pt-4 border-t border-[#260a0a] space-y-2">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Operating Hours
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2f0d0d]">
                      <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Mon – Fri</span>
                      <span className="text-xs font-bold text-white block mt-0.5">{FITMAKER_CONFIG.branch.hours.weekdays}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2f0d0d]">
                      <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Saturday</span>
                      <span className="text-xs font-bold text-white block mt-0.5">{FITMAKER_CONFIG.branch.hours.saturday}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2f0d0d]">
                      <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Sunday</span>
                      <span className="text-xs font-bold text-white block mt-0.5">{FITMAKER_CONFIG.branch.hours.sunday}</span>
                    </div>
                  </div>
                </div>

                {/* Parking & Contact Row */}
                <div className="pt-4 border-t border-[#260a0a] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#180707] border border-[#2c0d0d]">
                    <Car className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block uppercase text-[11px]">Member Parking</span>
                      <span className="text-zinc-400 text-[11px] leading-tight block mt-0.5">
                        {FITMAKER_CONFIG.branch.parkingInfo}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#180707] border border-[#2c0d0d]">
                    <Phone className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block uppercase text-[11px]">Reception Line</span>
                      <span className="text-zinc-400 text-[11px] leading-tight block mt-0.5">
                        {FITMAKER_CONFIG.branch.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Directions Button & Honesty disclaimer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={FITMAKER_CONFIG.branch.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[10px] text-zinc-500 italic text-center sm:text-right">
                    Configurable demo coordinates &amp; address
                  </span>
                </div>

              </div>

            </div>

            {/* Right Interactive Schedule-a-Visit Quick Form */}
            <div className="lg:col-span-6 bg-[#140606] border border-[#2b0e0e] rounded-3xl p-6 sm:p-8 shadow-xl">
              
              {visitQuickSubmitted ? (
                <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white uppercase">
                    Tour Visit Scheduled
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{visitQuickForm.name}</strong>. Your preferred slot for <strong className="text-[#E50914]">{visitQuickForm.date} ({visitQuickForm.time})</strong> has been captured.
                  </p>
                  
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-600/30 text-[11px] text-amber-200/90 text-left flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Honest Demo Notice:</strong> As this is a frontend-only demonstration, no server database was written to. You can test the WhatsApp notification workflow below.
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://wa.me/${FITMAKER_CONFIG.branch.whatsappNumber}?text=${encodeURIComponent(`Hi FITMAKER Gym, I would like to schedule a tour!\nName: ${visitQuickForm.name}\nDate: ${visitQuickForm.date} (${visitQuickForm.time})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setVisitQuickSubmitted(false);
                        setVisitQuickForm({ name: '', contact: '', date: '', time: '10:00 AM - 11:00 AM', note: '' });
                      }}
                      className="py-3 px-6 bg-[#1f0909] text-zinc-300 font-heading font-bold text-xs uppercase tracking-wider rounded-full border border-[#3b1212] transition-colors cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickVisitSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914] block mb-1">
                      FAST TRACK BOOKING
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase">
                      Schedule An In-Person Gym Visit
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Includes 1-on-1 walk-through with a trainer and zero pressure sales.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={visitQuickForm.name}
                        onChange={(e) => setVisitQuickForm({ ...visitQuickForm, name: e.target.value })}
                        placeholder="e.g. Vikram Malhotra"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                      />
                      {visitQuickErrors.name && (
                        <p className="text-[#ff4d4d] text-[11px] mt-1">{visitQuickErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Contact (Phone / Email) *
                      </label>
                      <input
                        type="text"
                        value={visitQuickForm.contact}
                        onChange={(e) => setVisitQuickForm({ ...visitQuickForm, contact: e.target.value })}
                        placeholder="+91 98765 00000"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                      />
                      {visitQuickErrors.contact && (
                        <p className="text-[#ff4d4d] text-[11px] mt-1">{visitQuickErrors.contact}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={visitQuickForm.date}
                        onChange={(e) => setVisitQuickForm({ ...visitQuickForm, date: e.target.value })}
                        min={TODAY_ISO}
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white"
                      />
                      {visitQuickErrors.date && (
                        <p className="text-[#ff4d4d] text-[11px] mt-1">{visitQuickErrors.date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Preferred Time Slot
                      </label>
                      <select
                        value={visitQuickForm.time}
                        onChange={(e) => setVisitQuickForm({ ...visitQuickForm, time: e.target.value })}
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white"
                      >
                        <option value="07:00 AM - 08:00 AM">Morning (07:00 AM – 08:00 AM)</option>
                        <option value="10:00 AM - 11:00 AM">Midday (10:00 AM – 11:00 AM)</option>
                        <option value="05:30 PM - 06:30 PM">Evening (05:30 PM – 06:30 PM)</option>
                        <option value="07:30 PM - 08:30 PM">Night (07:30 PM – 08:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                      Anything specific you wish to see? (Optional)
                    </label>
                    <input
                      type="text"
                      value={visitQuickForm.note}
                      onChange={(e) => setVisitQuickForm({ ...visitQuickForm, note: e.target.value })}
                      placeholder="e.g. Free-weight platforms, sauna, personal training"
                      className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer"
                  >
                    Confirm My Free Tour Slot
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SECTION: MEMBERSHIP PLANS FOR AN OFFLINE GYM
          Plans: Monthly, Quarterly, Half-Yearly, Annual
          Price, duration, access included, facilities, PT benefits, CTA
          Clearly identified as illustrative demo pricing & stored centrally
          Compare plans interaction
         ========================================================================= */}
      <section id="memberships" className="py-24 border-b border-[#220707] scroll-mt-20 bg-[#0d0303] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
              <Award className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Transparent Gym Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              MEMBERSHIP <span className="text-[#E50914]">PLANS &amp; TIERS</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Join our physical gym centre with flexible commitment terms. All plans include full free-weight and cardio floor access.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setShowPlanComparison(!showPlanComparison)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1c0808] border border-[#3b1212] text-xs font-heading font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-[#E50914] transition-all cursor-pointer"
              >
                <span>{showPlanComparison ? 'Hide Plan Comparison Table' : 'Compare All 4 Plans Side-by-Side'}</span>
                {showPlanComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid (4 Plans) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {FITMAKER_CONFIG.membershipPlans.map((plan: PhysicalMembershipPlan) => {
              const isFeatured = plan.popular;

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                    isFeatured
                      ? 'bg-[#180606] border-2 border-[#E50914] shadow-[0_0_40px_rgba(229,9,20,0.35)] lg:-translate-y-2'
                      : 'bg-[#130505] border border-[#2b0e0e] hover:border-[#421414]'
                  }`}
                >
                  {/* Badge */}
                  {plan.savingsBadge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#E50914] text-white text-[10px] font-heading font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                      {plan.savingsBadge}
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-6">
                    {/* Header */}
                    <div className="space-y-2 pb-5 border-b border-[#2b0e0e]">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
                        {plan.durationLabel}
                      </span>
                      <h3 className="text-xl font-heading font-black uppercase text-white tracking-wide">
                        {plan.name}
                      </h3>

                      <div className="pt-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-heading font-black text-white">
                            ₹{plan.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-zinc-400 uppercase tracking-wider">
                            {plan.periodLabel}
                          </span>
                        </div>
                        {plan.originalPrice && (
                          <div className="text-[11px] text-zinc-500 line-through mt-0.5">
                            Regular: ₹{plan.originalPrice.toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>

                      <div className="text-[11px] text-zinc-400 pt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>{plan.accessIncluded}</span>
                      </div>
                    </div>

                    {/* Facilities Included */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-zinc-400 block">
                        Facility Access
                      </span>
                      <ul className="space-y-2">
                        {plan.trainingFacilities.map((fac, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                            <span>{fac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Coaching Benefits */}
                    <div className="space-y-2 pt-2 border-t border-[#240a0a]">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-zinc-400 block">
                        Coaching &amp; Perks
                      </span>
                      <ul className="space-y-2">
                        {plan.coachingBenefits.map((coach, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                            <span>{coach}</span>
                          </li>
                        ))}
                        {plan.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                            <Check className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="p-6 sm:p-7 pt-0">
                    <button
                      onClick={() => handleOpenMembershipPlan(plan.id)}
                      className={`w-full py-3.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isFeatured
                          ? 'bg-[#E50914] hover:bg-[#c90812] text-white shadow-[0_0_20px_rgba(229,9,20,0.5)]'
                          : 'bg-[#1e0707] hover:bg-[#2b0c0c] text-white border border-[#3b1212]'
                      }`}
                    >
                      Enquire About {plan.billingTerm}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side-by-Side Comparison Table Modal/Collapsible */}
          {showPlanComparison && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#140606] border border-[#2b0e0e] shadow-2xl overflow-x-auto animate-in fade-in duration-300 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#240808]">
                <h3 className="font-heading text-lg font-bold text-white uppercase">
                  Side-By-Side Plan Feature Matrix
                </h3>
                <span className="text-xs text-zinc-400">
                  Illustrative demo pricing &bull; No automated recurring billing
                </span>
              </div>

              <table className="w-full text-left text-xs text-zinc-300 border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#2b0e0e] text-zinc-400 uppercase font-heading text-[11px]">
                    <th className="py-3 px-4">Feature / Privilege</th>
                    <th className="py-3 px-4">Monthly</th>
                    <th className="py-3 px-4">Quarterly</th>
                    <th className="py-3 px-4 text-[#E50914]">Half-Yearly</th>
                    <th className="py-3 px-4">Annual Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#220707]">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Full Strength &amp; Cardio Floor Access</td>
                    <td className="py-3 px-4 text-green-400">✓ Unlimited</td>
                    <td className="py-3 px-4 text-green-400">✓ Unlimited</td>
                    <td className="py-3 px-4 text-green-400 font-bold">✓ Unlimited</td>
                    <td className="py-3 px-4 text-green-400 font-bold">✓ Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">InBody 570 Composition Scans</td>
                    <td className="py-3 px-4 text-zinc-500">1 Initial Scan</td>
                    <td className="py-3 px-4">1 / Month</td>
                    <td className="py-3 px-4 text-white">Bi-Weekly Scans</td>
                    <td className="py-3 px-4 text-[#E50914] font-bold">Monthly + Full Logs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">1-on-1 Personal Training Sessions</td>
                    <td className="py-3 px-4 text-zinc-500">Orientation Only</td>
                    <td className="py-3 px-4">1 Technique Audit</td>
                    <td className="py-3 px-4 text-white">2 1-on-1 Sessions</td>
                    <td className="py-3 px-4 text-[#E50914] font-bold">4 Quarterly Refreshers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Finnish Cedar Sauna &amp; Recovery</td>
                    <td className="py-3 px-4 text-zinc-500">—</td>
                    <td className="py-3 px-4 text-zinc-400">Standard Access</td>
                    <td className="py-3 px-4 text-green-400">✓ Full Access</td>
                    <td className="py-3 px-4 text-green-400 font-bold">✓ VIP Contrast Suite</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Travel Freeze Allowance</td>
                    <td className="py-3 px-4 text-zinc-500">—</td>
                    <td className="py-3 px-4 text-zinc-500">—</td>
                    <td className="py-3 px-4 text-white">30 Days Freeze</td>
                    <td className="py-3 px-4 text-[#E50914] font-bold">60 Days Freeze</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Guest Workout Passes</td>
                    <td className="py-3 px-4 text-zinc-500">—</td>
                    <td className="py-3 px-4">2 Passes</td>
                    <td className="py-3 px-4">4 Passes</td>
                    <td className="py-3 px-4 text-white">8 Passes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Pricing Disclaimer */}
          <div className="text-center">
            <p className="text-xs text-zinc-500 max-w-xl mx-auto">
              Prices shown are illustrative demo fees configured in <code className="text-[#E50914]">fitmakerOfflineData.ts</code>. FitMaker does not collect online card payments in this frontend-only showcase.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. SECTION: TRAINING PROGRAMS
          Section title: "TRAIN FOR YOUR GOALS."
          Strength Training, Weight Management, Personal Training, HIIT & Conditioning, Functional Fitness, Mobility & Recovery
          Realistic and responsible copy (no false promises)
         ========================================================================= */}
      <section id="programs" className="py-24 border-b border-[#220707] scroll-mt-20 bg-gradient-to-b from-[#0d0303] via-[#0f0404] to-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
              <Flame className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Coached Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              TRAIN FOR <span className="text-[#E50914]">YOUR GOALS.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Evidence-based athletic formats structured around sustainable progressive overload, joint integrity, and dedicated coach feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FITMAKER_CONFIG.programs.map((program) => (
              <div
                key={program.id}
                className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140606] via-[#140606]/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-[#3b1212] text-[10px] font-heading font-bold text-[#E50914] uppercase">
                      {program.format}
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 text-[10px] font-semibold text-zinc-300">
                      {program.intensity}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-heading text-lg font-bold uppercase text-white group-hover:text-[#E50914] transition-colors leading-snug">
                      {program.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {program.shortDescription}
                    </p>

                    <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2c0d0d] space-y-1">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-zinc-400 block">
                        Intended Audience:
                      </span>
                      <p className="text-[11px] text-zinc-300 leading-snug">
                        {program.intendedAudience}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {program.highlights.map((item, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#200808] text-[10px] text-zinc-400 font-medium">
                          &bull; {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#220707] flex items-center justify-between">
                  <button
                    onClick={() => handleOpenMembershipPlan('plan-half-yearly')}
                    className="text-xs font-heading font-bold uppercase tracking-wider text-[#E50914] group-hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Enquire About Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-zinc-500">
                    On-Site &bull; Gym Floor
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. SECTION: TRAINER PROFILES
          Card: Portrait, Name, Specialty, Short intro, Available training format, "Enquire About Training" CTA
          Illustrative demo profiles; supports both in-person personal training & online coaching
         ========================================================================= */}
      <section id="trainers" className="py-24 border-b border-[#220707] scroll-mt-20 bg-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
              <Award className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Certified Coaching Roster</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              COACHING <span className="text-[#E50914]">PROFILES</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Meet our gym floor trainers and remote specialists. Available for one-on-one personal training and digital coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FITMAKER_CONFIG.trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-[#140606] border border-[#2b0e0e] hover:border-[#E50914] rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140606] via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-[#3b1212] text-[#E50914] text-[10px] font-heading font-bold uppercase">
                      {trainer.trainingFormat}
                    </span>
                  </div>

                  <div className="p-5 space-y-2 text-center">
                    <h3 className="font-heading text-lg font-bold uppercase text-white group-hover:text-[#E50914] transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-[#E50914] font-semibold uppercase">
                      {trainer.role}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-medium">
                      {trainer.specialty}
                    </p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                      {trainer.shortBio}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => handleOpenMembershipPlan('plan-half-yearly')}
                    className="w-full py-2.5 rounded-full bg-[#1f0707] hover:bg-[#E50914] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    Enquire About Training
                  </button>
                  <span className="text-[9px] text-zinc-500 block text-center italic">
                    {trainer.demoNote}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. SECTION: ONLINE COACHING AS A SEPARATE SERVICE
          Section title: "YOUR COACH. WHEREVER YOU ARE."
          Workout plan preview, Weekly training schedule, Exercise demonstration cards, Progress tracking preview, Online consultation info, CTA
          Realistic dashboard / phone mockup preview
         ========================================================================= */}
      <section id="online-coaching" className="py-24 border-b border-[#220707] scroll-mt-20 bg-gradient-to-b from-[#0d0303] via-[#120404] to-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
              <Video className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Remote Fitness Coaching</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              YOUR COACH. <span className="text-[#E50914]">WHEREVER YOU ARE.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {FITMAKER_CONFIG.onlineCoaching.description}
            </p>
          </div>

          {/* Interactive Digital Coaching Mockup & Preview Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Phone Mockup / App Prototype Screen */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-[#130505] border-2 border-[#3b1212] rounded-[40px] p-5 shadow-[0_20px_60px_rgba(229,9,20,0.25)] space-y-4">
                
                {/* Simulated Phone Notch */}
                <div className="flex items-center justify-between px-3 pt-1 text-[10px] text-zinc-500 font-mono">
                  <span>09:41</span>
                  <div className="w-20 h-4 bg-black rounded-full mx-auto" />
                  <span>5G &bull; 98%</span>
                </div>

                {/* App Header */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1e0707] border border-[#350f0f]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E50914] text-white font-heading font-bold flex items-center justify-center text-xs">
                      FM
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">FitMaker Mobile App</span>
                      <span className="text-[10px] text-[#E50914] block">Week 4 &bull; Push/Pull/Legs Split</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-950 text-green-400 text-[9px] font-bold">
                    Active Coach
                  </span>
                </div>

                {/* Today's Prescribed Workout Card */}
                <div className="p-4 rounded-2xl bg-[#180707] border border-[#2b0c0c] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-heading font-bold text-[#E50914] uppercase">
                      Today's Training Session
                    </span>
                    <span className="text-[10px] text-zinc-400">45 Mins</span>
                  </div>

                  <h4 className="font-heading text-base font-bold text-white uppercase">
                    Heavy Lower Body &amp; Squat Volume
                  </h4>

                  <div className="space-y-2 pt-1">
                    {FITMAKER_CONFIG.onlineCoaching.mockWorkouts.map((w, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#110303] border border-[#220707] flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">{w.exercise}</span>
                          <span className="text-[10px] text-zinc-400">{w.setsReps}</span>
                        </div>
                        <span className="text-[9px] px-2 py-1 rounded bg-[#200808] text-[#E50914] font-semibold">
                          {w.videoDuration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Coach Audio Check-In Widget */}
                <div className="p-3 rounded-2xl bg-[#1b0808] border border-[#2e0e0e] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-white block">Coach Marcus Vance</span>
                    <p className="text-[10px] text-zinc-400 truncate">"Great bar speed on set 3. Add 2.5kg next Monday!"</p>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <span className="text-[10px] text-zinc-500 italic">
                    UI Demonstration Prototype &bull; Real Coaching App Sync
                  </span>
                </div>

              </div>
            </div>

            {/* Right: Online Coaching Pillars & Weekly Schedule */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FITMAKER_CONFIG.onlineCoaching.appFeatures.map((feat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#140606] border border-[#2b0e0e] space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#220808] border border-[#3b1212] flex items-center justify-center text-[#E50914]">
                      {idx === 0 && <Dumbbell className="w-5 h-5" />}
                      {idx === 1 && <Video className="w-5 h-5" />}
                      {idx === 2 && <Utensils className="w-5 h-5" />}
                      {idx === 3 && <MessageCircle className="w-5 h-5" />}
                    </div>
                    <h4 className="font-heading text-sm font-bold uppercase text-white">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Weekly Training Flow Preview */}
              <div className="p-6 rounded-3xl bg-[#140606] border border-[#2b0e0e] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#240808]">
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#E50914] block">
                      Sample Routine
                    </span>
                    <h4 className="font-heading text-base font-bold uppercase text-white">
                      Weekly Remote Coaching Schedule
                    </h4>
                  </div>
                  <span className="text-[10px] text-zinc-400">
                    Updated every Sunday
                  </span>
                </div>

                <div className="space-y-2">
                  {FITMAKER_CONFIG.onlineCoaching.mockSchedule.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#190707] border border-[#280b0b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-7 rounded-md bg-[#E50914]/20 border border-[#E50914]/50 flex items-center justify-center text-[10px] font-heading font-black text-[#E50914]">
                          {s.day}
                        </span>
                        <div>
                          <span className="font-bold text-white block">{s.session}</span>
                          <span className="text-[11px] text-zinc-400">{s.focus}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-zinc-400 sm:text-right italic">
                        {s.coachCheckin}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#240808]">
                  <button
                    onClick={() => handleOpenMembershipPlan('plan-half-yearly')}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#E50914] hover:bg-[#c90812] text-white font-heading font-bold uppercase tracking-wider text-xs transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer"
                  >
                    Enquire About Online Coaching
                  </button>

                  <span className="text-[11px] text-zinc-500">
                    Separate remote subscription or hybrid gym add-on
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          8. SECTION: TESTIMONIALS (Honest, sample demo member profiles)
         ========================================================================= */}
      <section id="testimonials" className="py-24 border-b border-[#220707] scroll-mt-20 bg-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
                <span>Sample Member Experience</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
                MEMBER <span className="text-[#E50914]">EXPERIENCES</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Honest feedback from athletes training on our physical gym floor and through our digital coaching service.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-[#1e0707] border border-[#3b1212] text-white flex items-center justify-center hover:bg-[#E50914] transition-colors cursor-pointer"
                title="Previous testimonial"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-[#1e0707] border border-[#3b1212] text-white flex items-center justify-center hover:bg-[#E50914] transition-colors cursor-pointer"
                title="Next testimonial"
                aria-label="Next testimonial"
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
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#E50914]/20 border border-[#E50914]/50 text-[10px] font-heading font-bold text-[#E50914] uppercase">
                  {currentTestimonial.membershipType}
                </span>
                <span className="text-xs text-zinc-400">
                  {currentTestimonial.duration}
                </span>
              </div>

              <blockquote className="text-base sm:text-xl text-zinc-200 font-medium italic leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>

              <div className="pt-2 border-t border-[#260a0a] flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Primary Goal: <span className="text-zinc-200">{currentTestimonial.goal}</span>
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 italic">
                  Illustrative sample testimonial
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. SECTION: FAQ ACCORDION
         ========================================================================= */}
      <section id="faqs" className="py-24 border-b border-[#220707] scroll-mt-20 bg-gradient-to-b from-[#0d0303] via-[#0e0303] to-[#0d0303]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1f0707] border border-[#3b1212] text-[10px] font-heading font-bold uppercase tracking-widest text-[#E50914]">
              <span>Everything You Need To Know</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              FREQUENTLY ASKED <span className="text-[#E50914]">QUESTIONS</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Clear answers regarding physical gym facilities, membership flexibility, tours, and coaching.
            </p>
          </div>

          <div className="space-y-3">
            {FITMAKER_CONFIG.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-[#140606] border border-[#2b0e0e] rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-heading text-base sm:text-lg font-bold uppercase tracking-wide transition-colors ${
                      isOpen ? 'text-[#E50914]' : 'text-white'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-[#1e0707] border border-[#381111] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#E50914] border-[#E50914]' : 'text-zinc-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-[#220707] pt-4 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. SECTION: CONTACT & GENERAL INQUIRY
          Address, hours, WhatsApp, enquiry form, gym tour CTA, online coaching CTA
         ========================================================================= */}
      <section id="contact" className="py-24 border-b border-[#220707] scroll-mt-20 bg-[#0d0303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-black uppercase tracking-tight text-white">
              CONTACT <span className="text-[#E50914]">FITMAKER</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Speak directly with our front desk managers, schedule a tour, or ask about our training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-2xl bg-[#140606] border border-[#2b0e0e] flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-white uppercase">Gym Centre Address</h4>
                  <p className="text-xs text-zinc-300 mt-0.5">{FITMAKER_CONFIG.branch.address}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{FITMAKER_CONFIG.branch.landmark}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#140606] border border-[#2b0e0e] flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-white uppercase">Gym Hours</h4>
                  <p className="text-xs text-zinc-300 mt-0.5">Mon – Fri: {FITMAKER_CONFIG.branch.hours.weekdays}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Sat: {FITMAKER_CONFIG.branch.hours.saturday} &bull; Sun: {FITMAKER_CONFIG.branch.hours.sunday}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#140606] border border-[#2b0e0e] flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-white uppercase">Phone / WhatsApp</h4>
                  <p className="text-xs text-zinc-300 mt-0.5">{FITMAKER_CONFIG.branch.phone}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Prompt assistance from front desk</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#180707] border border-[#3b1212] space-y-3">
                <span className="text-xs font-heading font-bold text-white uppercase block">
                  Direct Action Links
                </span>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleOpenTourWithFocus('Complete Facility Walkthrough')}
                    className="w-full py-2.5 rounded-xl bg-[#E50914] text-white text-xs font-heading font-bold uppercase transition-all cursor-pointer shadow-md text-center"
                  >
                    Book a Free Gym Tour &rarr;
                  </button>
                  <button
                    onClick={() => handleOpenMembershipPlan('plan-half-yearly')}
                    className="w-full py-2.5 rounded-xl bg-[#250a0a] hover:bg-[#350d0d] text-zinc-200 text-xs font-heading font-bold uppercase transition-colors cursor-pointer text-center border border-[#3d1212]"
                  >
                    Online Coaching Enquiry &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Right General Contact Form */}
            <div className="lg:col-span-7 bg-[#140606] border border-[#2b0e0e] rounded-3xl p-6 sm:p-8">
              {generalContactSubmitted ? (
                <div className="py-12 text-center space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white uppercase">
                    Message Prepared
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{generalContactForm.name}</strong>. Your message regarding <strong className="text-[#E50914]">{generalContactForm.serviceInterest}</strong> has been received in demo mode.
                  </p>
                  <button
                    onClick={() => {
                      setGeneralContactSubmitted(false);
                      setGeneralContactForm({ name: '', email: '', phone: '', serviceInterest: 'Physical Gym Membership', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#E50914] text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full hover:bg-[#c90812] transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGeneralContactSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-heading font-bold tracking-widest uppercase text-[#E50914] block mb-1">
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
                        value={generalContactForm.name}
                        onChange={(e) => setGeneralContactForm({ ...generalContactForm, name: e.target.value })}
                        placeholder="e.g. Jordan Miller"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                      />
                      {generalContactErrors.name && (
                        <p className="text-[#ff4d4d] text-[11px] mt-1">{generalContactErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={generalContactForm.email}
                        onChange={(e) => setGeneralContactForm({ ...generalContactForm, email: e.target.value })}
                        placeholder="jordan@example.com"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                      />
                      {generalContactErrors.email && (
                        <p className="text-[#ff4d4d] text-[11px] mt-1">{generalContactErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={generalContactForm.phone}
                        onChange={(e) => setGeneralContactForm({ ...generalContactForm, phone: e.target.value })}
                        placeholder="+91 98765 00000"
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                        Service Interest
                      </label>
                      <select
                        value={generalContactForm.serviceInterest}
                        onChange={(e) => setGeneralContactForm({ ...generalContactForm, serviceInterest: e.target.value })}
                        className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white"
                      >
                        <option value="Physical Gym Membership">Physical Gym Membership</option>
                        <option value="Free Gym Tour Booking">Free Gym Tour Booking</option>
                        <option value="1-on-1 Personal Training">1-on-1 Personal Training</option>
                        <option value="Online Fitness Coaching">Online Fitness Coaching</option>
                        <option value="Corporate / Group Pass">Corporate / Group Pass</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                      Message / Question *
                    </label>
                    <textarea
                      rows={3}
                      value={generalContactForm.message}
                      onChange={(e) => setGeneralContactForm({ ...generalContactForm, message: e.target.value })}
                      placeholder="Tell us what you would like to know..."
                      className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 resize-none"
                    />
                    {generalContactErrors.message && (
                      <p className="text-[#ff4d4d] text-[11px] mt-1">{generalContactErrors.message}</p>
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


      {/* Lightbox Component */}
      <FacilityLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        facilities={FITMAKER_CONFIG.facilities}
        currentIndex={lightboxIndex}
        onSelectIndex={setLightboxIndex}
      />

      {/* Visit Booking Modal */}
      <VisitBookingModal
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        preferredFacility={preferredFacilityTour}
      />

      {/* Membership Enquiry Modal */}
      <MembershipEnquiryModal
        isOpen={membershipModalOpen}
        onClose={() => setMembershipModalOpen(false)}
        selectedPlanId={selectedPlanId}
      />

    </div>
  );
};
