import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface FitMakerNavbarProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenAuth: () => void;
  onOpenEnquiry: (plan?: string) => void;
}

export const FitMakerNavbar: React.FC<FitMakerNavbarProps> = ({
  activeSection,
  onNavigateSection,
  onOpenAuth,
  onOpenEnquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'coaching', label: 'Coaching' },
    { id: 'membership', label: 'Membership' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateSection('programs');
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0f0404]/95 backdrop-blur-md border-b border-[#2a0e0e]/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-[#110505]/90 backdrop-blur-sm border-b border-[#220a0a]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* FitMaker Red Box Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E50914] flex items-center justify-center text-white font-heading font-black text-xl tracking-tighter shadow-[0_0_20px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform">
              FM
            </div>
            <div>
              <span className="font-heading text-xl font-black text-white tracking-wider block group-hover:text-[#E50914] transition-colors leading-none uppercase">
                Fit<span className="text-[#E50914]">Maker</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-zinc-400 block mt-0.5 font-semibold">
                Transform Your Body
              </span>
            </div>
          </button>

          {/* Search Icon & Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Search Button / Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              {searchOpen ? (
                <div className="flex items-center bg-[#1d0b0b] border border-[#E50914]/60 rounded-full px-3 py-1.5 transition-all shadow-[0_0_12px_rgba(229,9,20,0.25)]">
                  <Search className="w-4 h-4 text-zinc-400 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search program..."
                    autoFocus
                    className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-32"
                    onBlur={() => !searchQuery && setSearchOpen(false)}
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-zinc-500 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-[#200b0b] transition-colors cursor-pointer"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Navigation links with Elegant Underline Animation */}
            <nav className="flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative py-2 text-sm font-semibold tracking-wide transition-all cursor-pointer group ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    
                    {/* Enterprise Animated Underline Form */}
                    <span 
                      className={`absolute bottom-0 left-0 h-[2.5px] rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'w-full bg-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.9)]' 
                          : 'w-0 bg-[#E50914]/50 group-hover:w-full'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Auth Actions (Login & Red Pill Sign Up) */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-full bg-[#E50914] text-white text-[11px] font-bold uppercase cursor-pointer"
            >
              Login
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenEnquiry('Quick Sign Up')}
              className="px-3.5 py-1.5 rounded-full bg-[#E50914] text-white text-[11px] font-bold uppercase"
            >
              Sign Up
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1f0a0a] border border-[#3b1212] text-white hover:text-[#E50914]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#160606] border-b border-[#3b1212] px-4 pt-3 pb-6 space-y-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3.5 py-2.5 text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#E50914]/20 text-[#E50914] font-bold'
                      : 'text-zinc-300 hover:bg-[#200808] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E50914] shadow-[0_0_8px_rgba(229,9,20,0.8)]"></span>}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#300c0c] flex gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-1/2 py-2 text-center text-xs font-bold uppercase rounded-lg bg-[#200b0b] text-white border border-[#401212]"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry('Mobile Membership');
                }}
                className="w-1/2 py-2 text-center text-xs font-bold uppercase rounded-full bg-[#E50914] text-white"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
