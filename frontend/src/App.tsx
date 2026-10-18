import { useState, useEffect } from 'react';
import { initializeEnterpriseStorage, db } from './services/enterpriseStorage';
import { authService } from './services/authService';
import { FitMakerNavbar } from './components/layout/FitMakerNavbar';
import { FitMakerFooter } from './components/layout/FitMakerFooter';
import { EnquiryModal } from './components/shared/EnquiryModal';
import { AuthModal } from './components/auth/AuthModal';
import { VisitBookingModal } from './components/home/VisitBookingModal';
import { ArrowUp } from 'lucide-react';

// Single Integrated FitMaker Page Flow
import { FitMakerHomePage } from './components/home/FitMakerHomePage';

// Enterprise Portals
import { MemberDashboard } from './components/member/MemberDashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import type { User, MemberProfile, UserRole } from './types/gymEnterprise';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [currentView, setCurrentView] = useState<'main' | 'admin-panel' | 'member-dashboard'>('main');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [enquiryPlan, setEnquiryPlan] = useState<string>('Half-Yearly Builder Plan');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Authenticated Session State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    initializeEnterpriseStorage();
    const session = db.getSession();
    return session ? session.user : null;
  });

  const [currentProfile, setCurrentProfile] = useState<MemberProfile | null>(() => {
    const session = db.getSession();
    return session ? session.profile : null;
  });

  useEffect(() => {
    initializeEnterpriseStorage();
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to dynamically detect which physical gym section is currently in view
  useEffect(() => {
    if (currentView !== 'main') return;

    const sectionIds = [
      'home',
      'facilities',
      'visit',
      'memberships',
      'programs',
      'trainers',
      'online-coaching',
      'testimonials',
      'faqs',
      'contact'
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, [currentView]);

  // Smooth scroll handler
  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'main') {
      setCurrentView('main');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setActiveSection(sectionId);
  };

  const handleOpenEnquiry = (planName?: string) => {
    if (planName) setEnquiryPlan(planName);
    setIsEnquiryOpen(true);
  };

  const handleOpenTour = () => {
    setIsTourModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: UserRole) => {
    const session = db.getSession();
    if (session) {
      setCurrentUser(session.user);
      setCurrentProfile(session.profile);
    }

    if (role === 'ADMIN' || role === 'STAFF') {
      setCurrentView('admin-panel');
    } else {
      setCurrentView('member-dashboard');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentProfile(null);
    setCurrentView('main');
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated View: Admin & Staff Panel
  if (currentView === 'admin-panel' && currentUser && currentProfile) {
    if (currentUser.role !== 'ADMIN' && currentUser.role !== 'STAFF') {
      return (
        <div className="min-h-screen bg-[#0d0303] flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl font-heading font-bold text-red-500 uppercase">Access Denied (403)</h2>
            <p className="text-xs text-zinc-400">Your account does not possess administrative privileges.</p>
            <button
              onClick={() => setCurrentView('member-dashboard')}
              className="px-4 py-2 bg-[#E50914] text-white font-heading font-bold uppercase text-xs rounded"
            >
              Go to Member Dashboard
            </button>
          </div>
        </div>
      );
    }

    return (
      <AdminPanel
        user={currentUser}
        profile={currentProfile}
        onLogout={handleLogout}
        onGoToPublicSite={() => {
          setCurrentView('main');
          handleNavigateSection('home');
        }}
      />
    );
  }

  // Dedicated View: Member Dashboard
  if (currentView === 'member-dashboard' && currentUser && currentProfile) {
    return (
      <div className="min-h-screen flex flex-col bg-[#111317]">
        <MemberDashboard
          user={currentUser}
          profile={currentProfile}
          onLogout={handleLogout}
          onExplorePublicPlans={() => {
            setCurrentView('main');
            handleNavigateSection('memberships');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0303] text-zinc-300 selection:bg-[#E50914] selection:text-white">
      {/* FitMaker Navigation with Live Active Section Sync */}
      <FitMakerNavbar
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenTour={handleOpenTour}
        onOpenAuth={() => {
          if (currentUser) {
            if (currentUser.role === 'ADMIN' || currentUser.role === 'STAFF') {
              setCurrentView('admin-panel');
            } else {
              setCurrentView('member-dashboard');
            }
          } else {
            setIsAuthOpen(true);
          }
        }}
      />

      {/* Single Unified Page with Sections: Hero, Facilities, Visit, Memberships, Programs, Trainers, Online Coaching, Testimonials, FAQ, Contact */}
      <main className="flex-1">
        <FitMakerHomePage
          onStartJourney={() => handleOpenTour()}
          onExplorePrograms={() => handleNavigateSection('programs')}
          onSelectPlan={(plan) => handleOpenEnquiry(plan)}
          onBookCoach={(coachName) => handleOpenEnquiry(`Coaching with ${coachName}`)}
          onReadBlog={(title) => handleOpenEnquiry(`Blog inquiry: ${title}`)}
        />
      </main>

      {/* FitMaker Footer */}
      <FitMakerFooter
        onNavigate={handleNavigateSection}
        onOpenEnquiry={() => handleOpenEnquiry('General Consultation')}
        onOpenTour={handleOpenTour}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:bg-[#c90812] transition-all cursor-pointer transform hover:-translate-y-1"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Interactive Membership Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultPlan={enquiryPlan}
      />

      {/* Direct Gym Tour Booking Modal */}
      <VisitBookingModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        preferredFacility="Complete Facility Walkthrough"
      />

      {/* Enterprise Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
