import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { FacilityItem } from '../../data/fitmakerOfflineData';

interface FacilityLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: FacilityItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
}

export const FacilityLightbox: React.FC<FacilityLightboxProps> = ({
  isOpen,
  onClose,
  facilities,
  currentIndex,
  onSelectIndex,
}) => {
  const currentFacility = facilities[currentIndex];

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % facilities.length);
  }, [currentIndex, facilities.length, onSelectIndex]);

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + facilities.length) % facilities.length);
  }, [currentIndex, facilities.length, onSelectIndex]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentFacility) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-lg animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Facility view: ${currentFacility.title}`}
    >
      {/* Background backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Main Lightbox Card */}
      <div className="relative z-10 w-full max-w-5xl bg-[#120505] border border-[#3b1212] rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-[#190707] border-b border-[#2d0e0e]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#E50914] text-white text-[10px] font-heading font-black uppercase tracking-wider">
              {currentFacility.badge}
            </span>
            <div className="hidden sm:block">
              <span className="text-xs uppercase font-semibold text-zinc-400">
                FitMaker Facility Showcase &bull; {currentIndex + 1} of {facilities.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden md:inline-block pr-3">
              Press <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-zinc-700 text-[10px] text-zinc-300">Esc</kbd> to close &bull; <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-zinc-700 text-[10px] text-zinc-300">&larr;</kbd> <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-zinc-700 text-[10px] text-zinc-300">&rarr;</kbd> to navigate
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-[#2b0e0e] transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Container */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[460px] overflow-hidden group">
          <img
            src={currentFacility.image}
            alt={currentFacility.title}
            className="w-full h-full max-h-[58vh] object-cover sm:object-contain select-none"
          />

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-[#E50914] border border-[#3b1212] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
            aria-label="Previous Facility Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 hover:bg-[#E50914] border border-[#3b1212] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105"
            aria-label="Next Facility Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Clear Illustrative Disclaimer overlay */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 border border-zinc-800 text-[10px] text-zinc-400 backdrop-blur-sm">
            Demo Asset &bull; Illustrative Gym Environment
          </div>
        </div>

        {/* Footer Info & Facility Details */}
        <div className="p-5 sm:p-7 bg-[#140606] border-t border-[#2d0e0e] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-heading font-bold text-[#E50914] uppercase tracking-wider block">
                {currentFacility.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-wide">
                {currentFacility.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <MapPin className="w-4 h-4 text-[#E50914]" />
              <span>Available on Main Gym Floor</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
            {currentFacility.description}
          </p>

          {/* Specifications Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {currentFacility.specs.map((spec, sIdx) => (
              <span
                key={sIdx}
                className="px-3 py-1 rounded-full bg-[#200808] border border-[#3d1212] text-[11px] font-semibold text-zinc-300"
              >
                &bull; {spec}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
