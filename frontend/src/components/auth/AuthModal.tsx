import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { X, Lock, Mail, User, Phone, ShieldAlert, LogIn, UserPlus, Shield, UserCheck } from 'lucide-react';
import type { UserRole } from '../../types/gymEnterprise';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Selected Login Type: strictly 2 roles (Admin vs Member)
  const [selectedRole, setSelectedRole] = useState<'member' | 'admin'>('member');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('member@test.com');
  const [loginPassword, setLoginPassword] = useState('member123');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRoleSelect = (role: 'member' | 'admin') => {
    setSelectedRole(role);
    setError(null);
    if (role === 'admin') {
      setLoginEmail('admin@irondistrict.com');
      setLoginPassword('admin123');
    } else {
      setLoginEmail('member@test.com');
      setLoginPassword('member123');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = authService.login(loginEmail, loginPassword);
    setLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user.role);
      onClose();
    } else {
      setError(res.message);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = authService.register(regName, regEmail, regPassword, regPhone);
    setLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user.role);
      onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#140606] border border-[#3b1212] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#1b0707] border-b border-[#3b1212]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#E50914] flex items-center justify-center text-white font-black text-xs shadow-[0_0_10px_rgba(229,9,20,0.5)]">
              FM
            </div>
            <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
              FITMAKER PORTAL
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-[#2c0d0d] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Sign In vs Register) */}
        <div className="flex border-b border-[#2b0e0e] bg-[#110505]">
          <button
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              mode === 'login'
                ? 'text-white border-b-2 border-[#E50914] bg-[#180606]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4 text-[#E50914]" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-3 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              mode === 'register'
                ? 'text-white border-b-2 border-[#E50914] bg-[#180606]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#E50914]" />
            <span>Register</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'login' ? (
            <>
              {/* STRICTLY 2 LOGIN OPTIONS: ADMIN vs MEMBER */}
              <div className="space-y-2">
                <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-zinc-400">
                  Select Login Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('member')}
                    className={`py-3 px-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedRole === 'member'
                        ? 'bg-[#E50914] text-white border-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.5)] font-bold'
                        : 'bg-[#180606] text-zinc-400 border-[#381111] hover:text-white hover:border-[#E50914]/50'
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                    <span className="text-xs uppercase font-heading">Member Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect('admin')}
                    className={`py-3 px-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-[#E50914] text-white border-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.5)] font-bold'
                        : 'bg-[#180606] text-zinc-400 border-[#381111] hover:text-white hover:border-[#E50914]/50'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    <span className="text-xs uppercase font-heading">Admin Login</span>
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="user@example.com"
                      required
                      className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      required
                      className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#E50914] hover:bg-[#c90812] active:scale-95 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all cursor-pointer mt-2 disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : `Sign In As ${selectedRole === 'admin' ? 'Super Admin' : 'Active Member'}`}
                </button>
              </form>
            </>
          ) : (
            /* Register Form (Creates a Member Account) */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Full Name *
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    required
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Email Address *
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="alex@example.com"
                    required
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1">
                  Create Password *
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full bg-[#1b0808] border border-[#3b1212] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#E50914] hover:bg-[#c90812] active:scale-95 text-white font-heading font-bold uppercase tracking-wider text-xs rounded-full shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all cursor-pointer mt-2 disabled:opacity-50"
              >
                {loading ? 'Creating Member Profile...' : 'Complete Member Registration'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
