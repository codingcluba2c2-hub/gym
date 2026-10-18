import React, { useState } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Trash2,
  Edit,
  ExternalLink,
  LogOut,
  ChevronDown,
  Search,
  Dumbbell,
  Clock,
  Plus,
  Save,
  CheckCircle,
  Download,
  ShieldCheck,
  UserCheck,
  Bell,
  Sparkles,
  LayoutGrid,
  MoreVertical,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import type { User as EnterpriseUser, MemberProfile } from '../../types/gymEnterprise';

interface AdminPanelProps {
  user: EnterpriseUser;
  profile: MemberProfile | null;
  onLogout: () => void;
  onGoToPublicSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  user: _user,
  profile: _profile,
  onLogout,
  onGoToPublicSite,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'member' | 'workout' | 'diet' | 'schedule' | 'trainers' | 'billing' | 'report' | 'setting'
  >('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [targetCategory, setTargetCategory] = useState<'Gold' | 'Silver' | 'Platinum'>('Gold');

  // Interactive member management list
  const [membersList, setMembersList] = useState([
    { id: 'FM-101', name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', phone: '+91 98201 44521', plan: 'Pro Athlete Annual', status: 'Active', joined: 'Jan 2026' },
    { id: 'FM-102', name: 'Aman Deep Singh', email: 'amandeep.fit@gmail.com', phone: '+91 98112 33490', plan: 'Champion Custom', status: 'Active', joined: 'Feb 2026' },
    { id: 'FM-103', name: 'Priya Verma', email: 'priya.verma@outlook.com', phone: '+91 98765 22100', plan: 'Starter Fitness', status: 'Active', joined: 'Mar 2026' },
    { id: 'FM-104', name: 'Karan Mehra', email: 'karan.m@gmail.com', phone: '+91 99201 88331', plan: 'Pro Athlete Annual', status: 'Pending', joined: 'Mar 2026' },
    { id: 'FM-105', name: 'Sunil Yadav', email: 'sunil.yadav@gmail.com', phone: '+91 98334 19222', plan: 'Champion Custom', status: 'Expired', joined: 'Dec 2025' },
    { id: 'FM-106', name: 'Ankit Tiwari', email: 'ankit.tiwari@gmail.com', phone: '+91 98901 22998', plan: 'Pro Athlete Annual', status: 'Active', joined: 'Apr 2026' },
  ]);

  // Interactive Trainer Roster
  const [trainersList] = useState([
    { name: 'Sangram Chougule', role: 'Head Coach & Pro Bodybuilding Specialist', exp: '12+ Years', rating: '5.0/5.0', clients: 48, status: 'On Floor' },
    { name: 'Mukesh Singh Gehlot', role: 'National Powerlifting & Heavy Strength Coach', exp: '15+ Years', rating: '4.9/5.0', clients: 35, status: 'In Session' },
    { name: 'Aryan Deshmukh', role: 'Athletic Conditioning & Hypertrophy Specialist', exp: '8+ Years', rating: '4.9/5.0', clients: 42, status: 'Available' },
    { name: 'Rohit Rajput', role: 'Fat Shred & Metabolic Conditioning Coach', exp: '7+ Years', rating: '4.8/5.0', clients: 30, status: 'Available' },
  ]);

  // Interactive Batch Schedule
  const [batches] = useState([
    { title: 'Morning Heavy Iron Alpha', time: '06:00 AM - 07:30 AM', coach: 'Sangram Chougule', room: 'Strength Zone A', cap: '24 / 25 Enrolled', status: 'Filling Fast' },
    { title: 'Cardio Engine & HIIT Sprint', time: '08:00 AM - 09:15 AM', coach: 'Rohit Rajput', room: 'Sprint Turf', cap: '18 / 20 Enrolled', status: 'Open' },
    { title: 'Midday Powerlifting & Form Flow', time: '12:00 PM - 01:00 PM', coach: 'Mukesh Singh Gehlot', room: 'Heavy Plate Deck', cap: '15 / 15 Enrolled', status: 'Full' },
    { title: 'Evening Hypertrophy Overload', time: '06:00 PM - 07:30 PM', coach: 'Aryan Deshmukh', room: 'Free Weight Deck', cap: '28 / 30 Enrolled', status: 'Filling Fast' },
  ]);

  // Attendance Records
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: '3536', name: 'Aman Deep Singh', date: '8/21/25', checkIn: '06:00 am', checkOut: '08:00 am', timeSpend: '2 Hours', status: 'Present', activity: 'Powerlifting' },
    { id: '4152', name: 'Karan Mehra', date: '8/21/25', checkIn: '06:00 am', checkOut: '08:00 am', timeSpend: '2 Hours', status: 'Absent', activity: 'Bodybuilding' },
    { id: '9261', name: 'Priya Verma', date: '8/21/25', checkIn: '06:00 am', checkOut: '08:00 am', timeSpend: '2 Hours', status: 'Present', activity: 'Cardio & HIIT' },
    { id: '8811', name: 'Sunil Yadav', date: '8/21/25', checkIn: '06:00 am', checkOut: '08:00 am', timeSpend: '2 Hours', status: 'Absent', activity: 'Hypertrophy' },
    { id: '5523', name: 'Ankit Tiwari', date: '8/21/25', checkIn: '07:15 am', checkOut: '08:45 am', timeSpend: '1.5 Hours', status: 'Present', activity: 'CrossFit' },
  ]);

  // Billing transactions
  const [billingList] = useState([
    { id: 'TXN-9021', member: 'Rahul Sharma', plan: 'Pro Athlete Annual', amount: '₹19,999', date: 'Today 02:15 PM', status: 'Settled', method: 'UPI / Razorpay' },
    { id: 'TXN-9020', member: 'Aman Deep Singh', plan: 'Champion Custom Tier', amount: '₹39,999', date: 'Yesterday 04:30 PM', status: 'Settled', method: 'UPI / PhonePe' },
    { id: 'TXN-9019', member: 'Ankit Tiwari', plan: 'Pro Athlete Annual', amount: '₹19,999', date: 'Oct 16, 2026', status: 'Settled', method: 'HDFC NetBanking' },
    { id: 'TXN-9018', member: 'Priya Verma', plan: 'Starter Fitness Plan', amount: '₹1,499', date: 'Oct 15, 2026', status: 'Settled', method: 'Paytm UPI' },
    { id: 'TXN-9017', member: 'Karan Mehra', plan: 'Pro Athlete 3-Month', amount: '₹6,499', date: 'Oct 14, 2026', status: 'Refunded', method: 'ICICI NetBanking' },
  ]);

  // Settings State
  const [gymTitle, setGymTitle] = useState('FitMaker India Athletic Club');
  const [gymOpenHours, setGymOpenHours] = useState('Mon - Sat: 5:00 AM - 11:00 PM | Sun: 6:00 AM - 8:00 PM');
  const [adminPhone, setAdminPhone] = useState('+91 98200 12345');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const totalIncome = 3845000;
  const totalExpense = 450000;

  const handleDeleteRecord = (id: string) => {
    setAttendanceRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteMember = (id: string) => {
    setMembersList((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'member', label: 'Member', icon: Users },
    { id: 'workout', label: 'Workout Routine', icon: Calendar },
    { id: 'diet', label: 'Diet Chart', icon: Calendar },
    { id: 'schedule', label: 'Batch Schedule', icon: Clock },
    { id: 'trainers', label: 'Trainer List', icon: UserCheck },
    { id: 'billing', label: 'Billing List', icon: DollarSign },
    { id: 'report', label: 'Report', icon: TrendingUp },
    { id: 'setting', label: 'Setting', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#111317] text-[#A6ACBE] flex font-sans antialiased">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-[#181B20] border-r border-[#23272F] flex flex-col justify-between p-5 shrink-0 hidden md:flex">
        <div className="space-y-8">
          
          {/* FitFlow Brand Mark */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5500] to-[#FF7700] flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(255,85,0,0.5)]">
              F
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white block">
              fit<span className="text-[#FF5500]">flow</span>
            </span>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF5500] to-[#FF6A00] text-white shadow-[0_4px_20px_rgba(255,85,0,0.4)]'
                      : 'text-[#878D9D] hover:text-white hover:bg-[#1E2229]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Upgrade Card + Logout (Exact Fitflow Sidebar) */}
        <div className="space-y-4 pt-6 border-t border-[#23272F]">
          <div className="bg-[#1F232B] p-4 rounded-xl border border-[#2B303B] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#878D9D]">Upgrade to</span>
              <span className="px-2 py-0.5 rounded bg-[#FF5500] text-white text-[10px] font-bold">PRO</span>
            </div>
            <div className="text-base font-bold text-white">Basic</div>
            <span className="text-[11px] text-[#878D9D] block">21 Days Left</span>
            <div className="w-full bg-[#2C323E] h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-[#FFB800] h-full w-[65%] rounded-full"></div>
            </div>
            <button
              onClick={() => setActiveTab('billing')}
              className="w-full mt-2 py-2 rounded-lg bg-[#2B303B] hover:bg-[#FF5500] text-xs font-semibold text-white transition-all cursor-pointer"
            >
              Upgrade Plan
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-xs font-semibold text-[#878D9D] hover:text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>

            <button
              onClick={onGoToPublicSite}
              className="flex items-center gap-1.5 text-xs text-[#FF5500] hover:underline cursor-pointer"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Search & Admin Profile Bar (Exact Fitflow Dashboard) */}
        <header className="h-20 bg-[#181B20] border-b border-[#23272F] px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="w-4 h-4 text-[#878D9D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Find something here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1F232B] border border-[#2B303B] rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#878D9D] focus:outline-none focus:border-[#FF5500] transition-colors"
            />
          </div>

          {/* Mobile Tab Scroller */}
          <div className="flex md:hidden items-center gap-1 overflow-x-auto py-1 max-w-[180px]">
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg capitalize shrink-0 ${
                  activeTab === item.id ? 'bg-[#FF5500] text-white' : 'text-zinc-400 bg-[#252A35]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Sparkle Action Icon */}
            <button className="w-9 h-9 rounded-full bg-[#1F232B] border border-[#2B303B] flex items-center justify-center text-[#FF5500] hover:text-white hover:bg-[#FF5500] transition-colors cursor-pointer">
              <Sparkles className="w-4 h-4 fill-current" />
            </button>

            {/* Notification Bell with Red Badge */}
            <div className="relative">
              <button className="w-9 h-9 rounded-full bg-[#1F232B] border border-[#2B303B] flex items-center justify-center text-[#878D9D] hover:text-white transition-colors cursor-pointer">
                <Bell className="w-4 h-4" />
              </button>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] absolute -top-0.5 -right-0.5 border-2 border-[#181B20]"></span>
            </div>

            {/* Admin Avatar & Dropdown */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#2B303B]">
              <img
                src="/admin-emon.jpg"
                alt="Emon Super Admin"
                className="w-9 h-9 rounded-full object-cover border border-[#2B303B]"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-white leading-tight">
                  Emon
                </span>
                <span className="block text-[10px] text-[#878D9D] font-medium">
                  Super Admin
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#878D9D] cursor-pointer hover:text-white" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Views according to activeTab */}
        <div className="p-6 lg:p-8 space-y-7 max-w-7xl">

          {/* TAB 1: EXACT FITFLOW DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* TOP ROW: Welcome Hero Card + Member Activity Venn Diagram */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Welcome Card with Athlete Holding Dumbbells */}
                <div className="lg:col-span-8 bg-gradient-to-r from-[#181B20] via-[#1E2229] to-[#14171C] border border-[#23272F] rounded-2xl p-7 relative overflow-hidden flex flex-col justify-between min-h-[260px] shadow-xl">
                  <div className="relative z-10 max-w-md space-y-3">
                    <span className="text-xs text-[#878D9D] font-medium block">
                      January 11, 2024
                    </span>
                    <span className="text-sm font-semibold text-[#878D9D] block">
                      Welcome Back, <strong className="text-white">Emon</strong>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      Ready to set up your club's <br className="hidden sm:block" />Loyalty Card?
                    </h2>
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('member')}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5500] to-[#FF6A00] hover:from-[#ff6a00] hover:to-[#ff7b1a] text-white text-xs font-bold shadow-[0_4px_20px_rgba(255,85,0,0.4)] transition-all cursor-pointer"
                      >
                        Set Up
                      </button>
                    </div>
                  </div>

                  {/* 3 Pagination Lines */}
                  <div className="flex items-center gap-1.5 pt-4 relative z-10">
                    <div className="w-6 h-1 rounded-full bg-white"></div>
                    <div className="w-4 h-1 rounded-full bg-[#2C323E]"></div>
                    <div className="w-4 h-1 rounded-full bg-[#2C323E]"></div>
                  </div>

                  {/* Cutout Athlete Image on Right */}
                  <div className="absolute right-0 bottom-0 top-0 w-[42%] max-w-[340px] pointer-events-none hidden sm:block">
                    <img
                      src="/fitflow-athlete-banner.jpg"
                      alt="Muscular Athlete with Dumbbells"
                      className="w-full h-full object-cover object-top opacity-90 filter contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#181B20] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181B20] via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* 2. Member Activity Venn Bubble Diagram */}
                <div className="lg:col-span-4 bg-[#181B20] border border-[#23272F] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Member Activity</h3>
                    <MoreVertical className="w-4 h-4 text-[#878D9D] cursor-pointer" />
                  </div>

                  {/* Venn Diagram Visual */}
                  <div className="relative h-40 my-3 flex items-center justify-center">
                    {/* Big Orange Bubble */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF5500] to-[#E04B00] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_25px_rgba(255,85,0,0.3)] absolute left-4 z-10">
                      90%
                    </div>

                    {/* Yellow Bubble */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFB800] to-[#E6A600] flex items-center justify-center text-black font-bold text-xs shadow-md absolute right-8 top-3 z-20 opacity-95">
                      89%
                    </div>

                    {/* Green Bubble */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D084] to-[#00A86B] flex items-center justify-center text-white font-bold text-xs shadow-md absolute right-14 bottom-2 z-30">
                      65%
                    </div>

                    {/* Small Blue Bubble */}
                    <div className="w-8 h-8 rounded-full bg-[#0070F3] flex items-center justify-center text-[9px] font-bold text-white absolute right-4 top-1/2 -translate-y-1/2 z-20">
                      30%
                    </div>
                  </div>

                  {/* Legend Labels */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#878D9D] pt-2 border-t border-[#23272F]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5500]"></span>
                      <span>08:00 - 10:00</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00D084]"></span>
                      <span>10:00 - 14:00</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E50914]"></span>
                      <span>10:00 - 14:00</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FFB800]"></span>
                      <span>10:00 - 14:00</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* MIDDLE ROW: 3 Key Stat Cards (Current Members, New Members, Today Visitor) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Current Members */}
                <div className="bg-[#181B20] border border-[#23272F] rounded-2xl p-6 shadow-xl relative">
                  <div className="flex items-center justify-between text-xs text-[#878D9D]">
                    <span className="font-semibold text-sm text-white">Current Members</span>
                    <Users className="w-4 h-4 text-[#878D9D]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-extrabold text-white">5,890</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-semibold text-emerald-400">+3,840 (26,80%)</span>
                      <span className="text-emerald-400 font-bold flex items-center text-xs">
                        <ArrowUp className="w-3.5 h-3.5" />
                        <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. New Members */}
                <div className="bg-[#181B20] border border-[#23272F] rounded-2xl p-6 shadow-xl relative">
                  <div className="flex items-center justify-between text-xs text-[#878D9D]">
                    <span className="font-semibold text-sm text-white">New Members</span>
                    <TrendingUp className="w-4 h-4 text-[#878D9D]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-extrabold text-white">2,000</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-semibold text-emerald-400">+530 (8,38%)</span>
                      <span className="text-emerald-400 font-bold flex items-center text-xs">
                        <ArrowUp className="w-3.5 h-3.5" />
                        <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Today Visitor */}
                <div className="bg-[#181B20] border border-[#23272F] rounded-2xl p-6 shadow-xl relative">
                  <div className="flex items-center justify-between text-xs text-[#878D9D]">
                    <span className="font-semibold text-sm text-white">Today Visitor</span>
                    <TrendingUp className="w-4 h-4 text-[#878D9D]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-extrabold text-white">5,00</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-semibold text-emerald-400">+530 (8,38%)</span>
                      <span className="text-emerald-400 font-bold flex items-center text-xs">
                        <ArrowUp className="w-3.5 h-3.5" />
                        <ArrowDown className="w-3.5 h-3.5 text-zinc-600" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM ROW: Membership Status Report (Curved Line Chart) + Membership Target (Gauge) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Membership Status Report Interactive SVG Line Chart */}
                <div className="lg:col-span-8 bg-[#181B20] border border-[#23272F] rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Membership Status Report</h3>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-4 text-xs font-medium text-[#878D9D]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500]"></span> Gold
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E580A0]"></span> Silver
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00D084]"></span> Platinum
                      </span>
                    </div>
                  </div>

                  {/* Line Chart Component */}
                  <div className="relative pt-4 pb-2">
                    {/* Floating Tooltip Mockup at Jun */}
                    <div className="absolute left-[44%] top-4 z-20 bg-[#14171C]/95 border border-[#2C323E] rounded-xl p-3 shadow-2xl text-[11px] space-y-1 backdrop-blur-md">
                      <div className="flex items-center justify-between gap-3 text-[#FF5500] font-bold">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FF5500]"></span> Gold:</span>
                        <span>1,240</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-[#E580A0]">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E580A0]"></span> Silver:</span>
                        <span>30%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-[#00D084]">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00D084]"></span> Platinum:</span>
                        <span>30%</span>
                      </div>
                      <div className="w-0.5 h-20 bg-dashed border-l border-dashed border-[#FF5500]/70 absolute -bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"></div>
                    </div>

                    <svg viewBox="0 0 700 220" className="w-full h-52 overflow-visible">
                      <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF5500" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#FF5500" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      {[200, 160, 120, 80, 40].map((y, idx) => (
                        <g key={idx}>
                          <text x="0" y={y + 4} fill="#5A6175" fontSize="10" fontFamily="sans-serif">
                            {idx === 0 ? '0' : idx === 1 ? '200' : idx === 2 ? '400' : idx === 3 ? '600' : '800'}
                          </text>
                          <line x1="30" y1={y} x2="690" y2={y} stroke="#252A35" strokeDasharray="3 3" />
                        </g>
                      ))}

                      {/* Platinum Line (Green) */}
                      <path
                        d="M 35 150 Q 80 130, 140 145 T 250 135 T 350 160 T 450 120 T 550 140 T 670 125"
                        fill="none"
                        stroke="#00D084"
                        strokeWidth="2.5"
                      />

                      {/* Silver Line (Pink/Mauve) */}
                      <path
                        d="M 35 135 Q 90 145, 160 125 T 270 140 T 360 135 T 470 100 T 560 160 T 670 140"
                        fill="none"
                        stroke="#E580A0"
                        strokeWidth="2.5"
                      />

                      {/* Gold Line (Orange with Indicator Dot) */}
                      <path
                        d="M 35 160 Q 90 150, 160 130 T 270 150 T 360 90 T 460 70 T 550 170 T 670 150"
                        fill="none"
                        stroke="#FF5500"
                        strokeWidth="3"
                      />

                      {/* Active Node Highlight */}
                      <circle cx="360" cy="90" r="5" fill="#FF5500" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>

                    {/* Months Axis */}
                    <div className="flex justify-between text-[11px] text-[#5A6175] pl-8 pt-1">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec'].map((m) => (
                        <span key={m} className={m === 'Jun' ? 'text-[#FF5500] font-bold' : ''}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Membership Target Semi-Circle Gauge */}
                <div className="lg:col-span-4 bg-[#181B20] border border-[#23272F] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Membership Target</h3>
                      <div className="flex items-center gap-1 text-xs text-[#878D9D] mt-1 cursor-pointer hover:text-white">
                        <span>Gold</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <MoreVertical className="w-4 h-4 text-[#878D9D] cursor-pointer" />
                  </div>

                  {/* Semi-Circle Gradient Gauge */}
                  <div className="relative flex flex-col items-center justify-center my-4">
                    <svg viewBox="0 0 240 140" className="w-56 h-36">
                      <defs>
                        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FF5500" />
                          <stop offset="50%" stopColor="#FFA07A" />
                          <stop offset="100%" stopColor="#FFC0CB" />
                        </linearGradient>
                      </defs>

                      {/* Background Arch Track */}
                      <path
                        d="M 30 130 A 90 90 0 0 1 210 130"
                        fill="none"
                        stroke="#252A35"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />

                      {/* Foreground Gradient Arch Fill (75.55%) */}
                      <path
                        d="M 30 130 A 90 90 0 0 1 185 65"
                        fill="none"
                        stroke="url(#gaugeGrad)"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Centered Gauge Percentage */}
                    <div className="absolute top-16 text-center">
                      <span className="text-3xl font-black text-white block">75.55%</span>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold mt-1">
                        +10%
                      </span>
                    </div>
                  </div>

                  {/* Target vs Today comparison */}
                  <div className="text-center space-y-2 pt-2 border-t border-[#23272F]">
                    <p className="text-xs text-[#878D9D]">It's higher than yesterday</p>
                    <div className="flex items-center justify-center gap-8">
                      <div>
                        <span className="text-[10px] text-[#878D9D] block">Target</span>
                        <span className="text-base font-bold text-white flex items-center justify-center gap-0.5">
                          200 <ArrowDown className="w-3.5 h-3.5 text-red-400" />
                        </span>
                      </div>
                      <div className="w-px h-7 bg-[#2B303B]"></div>
                      <div>
                        <span className="text-[10px] text-[#878D9D] block">Today</span>
                        <span className="text-base font-bold text-white flex items-center justify-center gap-0.5">
                          250 <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MEMBER MANAGEMENT */}
          {activeTab === 'member' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Member Directory</h1>
                  <p className="text-xs text-[#878D9D]">Manage member subscriptions, contact details, and account status</p>
                </div>
                <button
                  onClick={() => {
                    const newId = `FM-${Math.floor(100 + Math.random() * 900)}`;
                    const newMem = {
                      id: newId,
                      name: 'New Registered Athlete',
                      email: `athlete.${newId.toLowerCase()}@district.com`,
                      phone: '+1 (555) 700-1122',
                      plan: 'Performance Annual',
                      status: 'Active',
                      joined: 'Just now'
                    };
                    setMembersList([newMem, ...membersList]);
                  }}
                  className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" /> Add New Member
                </button>
              </div>

              <div className="bg-[#181B20] border border-[#23272F] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{membersList.length} Registered Members</span>
                  <span className="text-xs text-[#878D9D]">Filtered by all active tiers</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#252A35] text-[#878D9D] uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Pass ID</th>
                        <th className="py-3 px-4">Member Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Plan Tier</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#23272F] text-zinc-300">
                      {membersList.map((m) => (
                        <tr key={m.id} className="hover:bg-[#1E2229] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-white">{m.id}</td>
                          <td className="py-3 px-4 font-bold text-white">{m.name}</td>
                          <td className="py-3 px-4 text-[#878D9D]">{m.email}</td>
                          <td className="py-3 px-4 text-zinc-300">{m.phone}</td>
                          <td className="py-3 px-4 text-emerald-400 font-medium">{m.plan}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              m.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : m.status === 'Pending'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleDeleteMember(m.id)}
                                className="p-1 rounded text-red-400 hover:text-white transition-colors cursor-pointer"
                                title="Remove Member"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORKOUT ROUTINE MANAGER */}
          {activeTab === 'workout' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Workout Routine Manager</h1>
                  <p className="text-xs text-[#878D9D]">Design, assign, and customize training splits for gym members</p>
                </div>
                <button
                  onClick={() => alert('New training blueprint created.')}
                  className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" /> Create Custom Split
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Tier 1: Foundation Hypertrophy',
                    target: 'Beginner to Intermediate',
                    duration: '8 Weeks',
                    splits: ['Day 1: Upper Body Push', 'Day 2: Posterior Pull', 'Day 3: Quad & Glute Focus', 'Day 4: Shoulders & Abs', 'Day 5: HIIT Conditioning']
                  },
                  {
                    title: 'Tier 2: Elite Power & Density',
                    target: 'Advanced Athletes',
                    duration: '12 Weeks',
                    splits: ['Day 1: Heavy Bench & Triceps', 'Day 2: Deadlift & Lat Thickness', 'Day 3: Heavy Squat & Hamstrings', 'Day 4: Overhead Press & Traps', 'Day 5: Full Body Functional']
                  },
                  {
                    title: 'Tier 3: Fat Shred & Metabolic Engine',
                    target: 'Weight Loss & Conditioning',
                    duration: '6 Weeks',
                    splits: ['Day 1: Kettlebell Giant Sets', 'Day 2: High Density Sprints', 'Day 3: Core & Plyometrics', 'Day 4: Turf Prowler Engine', 'Day 5: Contrast Active Recovery']
                  }
                ].map((routine, i) => (
                  <div key={i} className="bg-[#181B20] border border-[#23272F] p-6 rounded-2xl space-y-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-[#FF5500]/10 text-[#FF5500] text-[10px] font-bold">
                        {routine.duration}
                      </span>
                      <Dumbbell className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{routine.title}</h3>
                      <p className="text-xs text-[#878D9D] mt-0.5">{routine.target}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#252A35]">
                      {routine.splits.map((s, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-[#1F232B] text-xs text-zinc-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]"></span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => alert(`Routine "${routine.title}" assigned to current batch.`)}
                      className="w-full py-2 bg-[#252A35] hover:bg-[#FF5500] hover:text-white text-xs font-bold text-zinc-200 rounded-xl transition-all cursor-pointer mt-2"
                    >
                      Assign to Members
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DIET CHART */}
          {activeTab === 'diet' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Enterprise Diet &amp; Nutrition Charts</h1>
                  <p className="text-xs text-[#878D9D]">Calorie prescriptions, macronutrient ratios, and certified food templates</p>
                </div>
                <button
                  onClick={() => alert('New nutrition template generated.')}
                  className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Diet Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Lean Bulking Blueprint (2,800 kcal)',
                    protein: '190g',
                    carbs: '340g',
                    fats: '75g',
                    notes: 'Geared towards progressive hypertrophy with clean carbohydrates (rice, oats, sweet potato) and high biological value protein sources.'
                  },
                  {
                    name: 'Aggressive Fat Shred (2,000 kcal)',
                    protein: '200g',
                    carbs: '140g',
                    fats: '55g',
                    notes: 'High satiety caloric deficit with green fibrous vegetables, egg whites, wild salmon, and whey isolate post-workout.'
                  },
                  {
                    name: 'Keto Athletic Performance (2,300 kcal)',
                    protein: '160g',
                    carbs: '30g',
                    fats: '175g',
                    notes: 'Ketogenic energy adaptation utilizing grass-fed beef, avocados, MCT oils, and high electrolyte hydration.'
                  },
                  {
                    name: 'Plant-Based Muscle Engine (2,500 kcal)',
                    protein: '170g',
                    carbs: '310g',
                    fats: '65g',
                    notes: 'Complete amino profile through pea & brown rice protein blends, lentils, tempeh, quinoa, and chia seed fats.'
                  }
                ].map((diet, idx) => (
                  <div key={idx} className="bg-[#181B20] border border-[#23272F] p-6 rounded-2xl shadow-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{diet.name}</h3>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">CERTIFIED</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl bg-[#1F232B] text-center">
                        <span className="text-[10px] text-[#878D9D] block">Protein</span>
                        <span className="text-sm font-bold text-white">{diet.protein}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#1F232B] text-center">
                        <span className="text-[10px] text-[#878D9D] block">Carbs</span>
                        <span className="text-sm font-bold text-amber-400">{diet.carbs}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#1F232B] text-center">
                        <span className="text-[10px] text-[#878D9D] block">Fats</span>
                        <span className="text-sm font-bold text-blue-400">{diet.fats}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#878D9D] leading-relaxed">{diet.notes}</p>

                    <button
                      onClick={() => alert(`Assigned ${diet.name} to athlete roster.`)}
                      className="w-full py-2 bg-[#252A35] hover:bg-[#FF5500] hover:text-white text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
                    >
                      Assign to Members
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BATCH SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Daily Batch &amp; Class Schedule</h1>
                  <p className="text-xs text-[#878D9D]">Timetable for group workouts, personal coaching, and open floor sessions</p>
                </div>
                <button
                  onClick={() => alert('New training batch slot opened.')}
                  className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Batch Slot
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {batches.map((b, idx) => (
                  <div key={idx} className="bg-[#181B20] border border-[#23272F] p-6 rounded-2xl shadow-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        {b.time}
                      </span>
                      <span className="text-xs font-semibold text-[#878D9D]">{b.status}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{b.title}</h3>
                      <p className="text-xs text-[#878D9D] mt-0.5">Instructor: <strong className="text-white">{b.coach}</strong> &bull; {b.room}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-[#252A35]">
                      <span className="text-[#878D9D]">Capacity:</span>
                      <span className="text-white">{b.cap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TRAINERS LIST */}
          {activeTab === 'trainers' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Certified Coach &amp; Trainer Roster</h1>
                  <p className="text-xs text-[#878D9D]">Staff performance, client allocation, and active duty statuses</p>
                </div>
                <button
                  onClick={() => alert('Coach onboarding modal.')}
                  className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" /> Onboard Trainer
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {trainersList.map((tr, idx) => (
                  <div key={idx} className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl shadow-lg space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FF5500] to-amber-500 flex items-center justify-center text-white font-black text-base">
                      {tr.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{tr.name}</h3>
                      <p className="text-[11px] text-[#878D9D] leading-tight mt-0.5">{tr.role}</p>
                    </div>
                    <div className="pt-2 border-t border-[#252A35] text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#878D9D]">Experience:</span>
                        <span className="text-white font-bold">{tr.exp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#878D9D]">Rating:</span>
                        <span className="text-amber-400 font-bold">{tr.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#878D9D]">Assigned Members:</span>
                        <span className="text-emerald-400 font-bold">{tr.clients} Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BILLING LIST */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Billing &amp; Revenue Transactions</h1>
                  <p className="text-xs text-[#878D9D]">Membership payments, renewals, gateway settlements, and receipts</p>
                </div>
                <button
                  onClick={() => alert('Financial ledger CSV export initiated.')}
                  className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" /> Export CSV Ledger
                </button>
              </div>

              <div className="bg-[#181B20] border border-[#23272F] rounded-2xl p-6 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#252A35] text-[#878D9D] uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Transaction ID</th>
                        <th className="py-3 px-4">Member</th>
                        <th className="py-3 px-4">Plan</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">Method</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#23272F] text-zinc-300">
                      {billingList.map((tx) => (
                        <tr key={tx.id} className="hover:bg-[#1E2229]">
                          <td className="py-3 px-4 font-mono font-bold text-white">{tx.id}</td>
                          <td className="py-3 px-4 font-bold text-white">{tx.member}</td>
                          <td className="py-3 px-4 text-emerald-400">{tx.plan}</td>
                          <td className="py-3 px-4 font-bold text-white">{tx.amount}</td>
                          <td className="py-3 px-4 text-[#878D9D]">{tx.date}</td>
                          <td className="py-3 px-4 text-zinc-300">{tx.method}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              tx.status === 'Settled'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-red-500/10 text-red-400'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: REPORT (ORIGINAL DETAILED FITFLOW DASHBOARD VIEW) */}
          {activeTab === 'report' && (
            <div className="space-y-7 animate-in fade-in duration-200">
              {/* Page Title & Search Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Report</h1>
                  <p className="text-xs text-[#878D9D]">Operations and real-time member metrics report</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <select className="bg-[#181B20] border border-[#2B303B] text-xs text-white rounded-xl px-4 py-2.5 focus:outline-none appearance-none pr-8 cursor-pointer">
                      <option>Select Date (Monthly)</option>
                      <option>This Week</option>
                      <option>Last 30 Days</option>
                      <option>Year To Date</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#878D9D] absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 4 TOP SUMMARY CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl relative shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#878D9D]">
                      <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5" />
                      </span>
                      <span>Total Income</span>
                    </div>
                    <span className="text-[#878D9D] text-xs">&bull;&bull;&bull;</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-white">₹{totalIncome.toLocaleString('en-IN')}</h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>10%</span>
                      <span className="text-[#878D9D] font-normal">+₹15,000 today</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl relative shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#878D9D]">
                      <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                        <TrendingDown className="w-3.5 h-3.5" />
                      </span>
                      <span>Total Expense</span>
                    </div>
                    <span className="text-[#878D9D] text-xs">&bull;&bull;&bull;</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-white">₹{totalExpense.toLocaleString('en-IN')}</h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-400 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>0.5%</span>
                      <span className="text-[#878D9D] font-normal">+$20 today</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl relative shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#878D9D]">
                      <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                        <Users className="w-3.5 h-3.5" />
                      </span>
                      <span>Total Member</span>
                    </div>
                    <span className="text-[#878D9D] text-xs">&bull;&bull;&bull;</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-white">1,406</h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>0.8%</span>
                      <span className="text-[#878D9D] font-normal">+18 today</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl relative shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#878D9D]">
                      <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                        <Calendar className="w-3.5 h-3.5" />
                      </span>
                      <span>Attendance</span>
                    </div>
                    <span className="text-[#878D9D] text-xs">&bull;&bull;&bull;</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-white">1,400</h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-400 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>0.8%</span>
                      <span className="text-[#878D9D] font-normal">-12 today</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-[#181B20] border border-[#23272F] rounded-2xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Daily Attendance Record</h3>
                  <span className="text-xs text-[#878D9D]">{attendanceRecords.length} records active today</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#252A35] text-[#878D9D] uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Member Id</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Attendance Date</th>
                        <th className="py-3 px-4">Check-in</th>
                        <th className="py-3 px-4">Check-out</th>
                        <th className="py-3 px-4">Time Spend</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Activity</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#23272F] text-zinc-300">
                      {attendanceRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-[#1E2229] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-white">{record.id}</td>
                          <td className="py-3 px-4 font-semibold text-white">{record.name}</td>
                          <td className="py-3 px-4 text-[#878D9D]">{record.date}</td>
                          <td className="py-3 px-4 text-emerald-400 font-medium">&searr; {record.checkIn}</td>
                          <td className="py-3 px-4 text-red-400 font-medium">&nearr; {record.checkOut}</td>
                          <td className="py-3 px-4">{record.timeSpend}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              record.status === 'Present'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-white font-medium">{record.activity}</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-1 rounded text-amber-400 hover:text-white transition-colors" title="Edit">
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteRecord(record.id)}
                                className="p-1 rounded text-red-400 hover:text-white transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTING */}
          {activeTab === 'setting' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-bold text-white">System &amp; Facility Settings</h1>
                <p className="text-xs text-[#878D9D]">Gym operating parameters, notification webhooks, and security privileges</p>
              </div>

              {settingsSaved && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Facility configuration successfully persisted!
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-[#181B20] border border-[#23272F] p-6 rounded-2xl space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Gym Organization Name
                    </label>
                    <input
                      type="text"
                      value={gymTitle}
                      onChange={(e) => setGymTitle(e.target.value)}
                      className="w-full bg-[#1F232B] border border-[#2B303B] rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Operating Schedule &amp; Turnstile Hours
                    </label>
                    <input
                      type="text"
                      value={gymOpenHours}
                      onChange={(e) => setGymOpenHours(e.target.value)}
                      className="w-full bg-[#1F232B] border border-[#2B303B] rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Front Desk Administrative Contact
                    </label>
                    <input
                      type="text"
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      className="w-full bg-[#1F232B] border border-[#2B303B] rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Target Tier Calibration
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Gold', 'Silver', 'Platinum'] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setTargetCategory(cat)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            targetCategory === cat
                              ? 'bg-[#FF5500] text-white shadow-md'
                              : 'bg-[#1F232B] border border-[#2B303B] text-[#878D9D] hover:text-white'
                          }`}
                        >
                          {cat} Membership
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#252A35] flex items-center justify-between">
                  <span className="text-xs text-[#878D9D]">Enterprise Gym OS v2.4.0</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Facility Settings
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
