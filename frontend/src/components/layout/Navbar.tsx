import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenEnquiry: (planName?: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenEnquiry, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'classes', label: 'Course' },
    { id: 'membership', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('classes');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#03091e]/95 backdrop-blur-md border-b border-blue-900/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with diamond icon matching reference image */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-white group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all">
              {/* Stacked diamonds matching reference logo */}
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className="w-3.5 h-3.5 border-2 border-white rotate-45 absolute -top-0.5"></div>
                <div className="w-3.5 h-3.5 border-2 border-blue-400 rotate-45 absolute -bottom-0.5 opacity-80"></div>
              </div>
            </div>
            <div>
              <span className="font-heading text-xl font-black tracking-widest text-white block group-hover:text-blue-400 transition-colors uppercase leading-none">
                FITNESS
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-blue-400 block mt-0.5">
                PREMIUM CLUB
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links matching Reference (Home, About Us, Course, Pricing, Contact) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-semibold tracking-wide transition-all cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Pill + Portal Login matching Reference */}
          <div className="hidden md:flex items-center gap-3">
            {/* Pill Search Input matching the reference mockup search button */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="flex items-center px-4 py-2 rounded-full border border-blue-400/60 bg-blue-950/40 hover:border-blue-400 focus-within:border-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                <Search className="w-4 h-4 text-blue-300 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-blue-300/70 focus:outline-none w-24 focus:w-32 transition-all font-medium"
                />
              </div>
            </form>

            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider text-blue-200 hover:text-white bg-blue-950/80 hover:bg-blue-900 border border-blue-500/30 rounded-full transition-all cursor-pointer"
            >
              Portal Login
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenEnquiry('Membership General')}
              className="px-3 py-1.5 text-[11px] font-heading font-bold uppercase tracking-wider text-blue-950 bg-white rounded-full font-bold"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-blue-950 border border-blue-900/60 text-white hover:text-blue-400 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#03091e] border-b border-blue-900/40 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 text-sm font-semibold tracking-wider uppercase rounded transition-colors ${
                    isActive
                      ? 'bg-blue-900/50 text-blue-400 border-l-4 border-blue-400'
                      : 'text-slate-300 hover:bg-blue-950/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-blue-600 text-white"
              >
                Portal Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
