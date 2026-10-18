import React, { useState } from 'react';
import { db } from '../../services/enterpriseStorage';
import {
  Calendar,
  CreditCard,
  User,
  Activity,
  Flame,
  Award,
  LogOut,
  ExternalLink,
  Dumbbell,
  CheckCircle,
  Clock,
  Apple,
  Download,
  ShieldCheck,
  Save,
  ChevronRight
} from 'lucide-react';
import type { User as EnterpriseUser, MemberProfile } from '../../types/gymEnterprise';

interface MemberDashboardProps {
  user: EnterpriseUser;
  profile: MemberProfile;
  onLogout: () => void;
  onExplorePublicPlans: () => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  user,
  profile,
  onLogout,
  onExplorePublicPlans,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'diet' | 'billing' | 'settings'>('overview');
  const [checkedInToday, setCheckedInToday] = useState(false);

  // Form states for Settings tab
  const [fullName, setFullName] = useState(profile.fullName || 'Rahul Sharma');
  const [phone, setPhone] = useState(profile.phone || '+91 98201 44521');
  const [emergencyContact, setEmergencyContact] = useState(profile.emergencyContact || '+91 98765 12340');
  const [fitnessGoal, setFitnessGoal] = useState('Hypertrophy & Lean Bulk');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Workout Split Checkboxes
  const [completedWorkouts, setCompletedWorkouts] = useState<Record<string, boolean>>({
    'ex-1': true,
    'ex-2': true,
    'ex-3': false,
    'ex-4': false,
    'ex-5': false,
  });

  const toggleWorkout = (id: string) => {
    setCompletedWorkouts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const memberships = db.getMemberships().filter((m) => m.memberId === profile.id);
  const activePlanName = memberships[0]?.planNameSnapshot || 'Pro Athlete Annual';

  const memberStats = [
    { title: 'Active Plan', value: activePlanName, note: 'Valid until Dec 2026', icon: CreditCard, color: 'text-amber-400' },
    { title: 'Workout Streak', value: '18 Days', note: '+3 days vs last month', icon: Flame, color: 'text-[#FF5500]' },
    { title: 'Total Sessions', value: '42 Workouts', note: '84 hours on floor', icon: Dumbbell, color: 'text-emerald-400' },
    { title: 'Calories Burned', value: '28,400 kcal', note: 'Avg 650 kcal/session', icon: Activity, color: 'text-blue-400' },
  ];

  const upcomingClasses = [
    { name: 'Hypertrophy Upper Body Split', trainer: 'Sangram Chougule', time: 'Today 06:30 PM', room: 'Iron Deck A' },
    { name: 'Olympic Heavy Strength Engine', trainer: 'Mukesh Singh Gehlot', time: 'Tomorrow 07:00 AM', room: 'Power Deck' },
    { name: 'Contrast Plunge & Sauna Recovery', trainer: 'Self-guided', time: 'Friday 05:00 PM', room: 'Recovery Suite' },
  ];

  const handleCheckInToggle = () => {
    setCheckedInToday(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#111317] text-[#A6ACBE] flex font-sans antialiased">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-[#181B20] border-r border-[#23272F] flex flex-col justify-between p-5 shrink-0 hidden md:flex">
        <div className="space-y-8">
          
          {/* Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF5500] to-[#FF7700] flex items-center justify-center text-white font-black text-lg shadow-[0_0_15px_rgba(255,85,0,0.5)]">
              F
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white block">
              fit<span className="text-[#FF5500]">flow</span>
            </span>
          </div>

          {/* Member Navigation Tabs */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Member Overview', icon: Activity },
              { id: 'workout', label: 'Workout Routine', icon: Dumbbell },
              { id: 'diet', label: 'Diet & Macros', icon: Calendar },
              { id: 'billing', label: 'My Membership', icon: CreditCard },
              { id: 'settings', label: 'Profile Settings', icon: User },
            ].map((item) => {
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

        {/* Member Card & Actions */}
        <div className="space-y-4 pt-6 border-t border-[#23272F]">
          <div className="bg-[#1F232B] p-4 rounded-xl border border-[#2B303B] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>Member Pass</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">ACTIVE</span>
            </div>
            <p className="text-xs text-[#878D9D]">Pass ID: #FM-{profile.id.slice(0, 6)}</p>
            <button
              onClick={handleCheckInToggle}
              disabled={checkedInToday}
              className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                checkedInToday
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-[#FF5500] hover:bg-[#ff6a00] text-white shadow-md'
              }`}
            >
              {checkedInToday ? '✓ Checked In Today' : 'Tap To Check-In'}
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
              onClick={onExplorePublicPlans}
              className="flex items-center gap-1.5 text-xs text-[#FF5500] hover:underline cursor-pointer"
            >
              <span>Explore Plans</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN MEMBER DASHBOARD CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 bg-[#181B20] border-b border-[#23272F] px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <span className="text-xs text-[#878D9D] block">FitFlow Portal &bull; Member Zone</span>
            <h2 className="text-lg font-bold text-white leading-none mt-0.5">{profile.fullName}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Tab Pills */}
            <div className="flex md:hidden items-center gap-1 overflow-x-auto py-1">
              {(['overview', 'workout', 'diet', 'billing', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg capitalize ${
                    activeTab === tab ? 'bg-[#FF5500] text-white' : 'text-zinc-400 bg-[#252A35]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-[#2B303B]">
              <div className="w-9 h-9 rounded-xl bg-[#FF5500]/20 border border-[#FF5500] flex items-center justify-center text-white font-bold text-xs">
                {profile.fullName.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-white leading-tight">
                  {profile.fullName}
                </span>
                <span className="block text-[10px] text-emerald-400 font-semibold uppercase">
                  Verified Member
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Views according to activeTab */}
        <div className="p-6 lg:p-8 space-y-7 max-w-7xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-7 animate-in fade-in duration-200">
              {/* Member 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {memberStats.map((st, i) => {
                  const Icon = st.icon;
                  return (
                    <div key={i} className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl shadow-lg relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#878D9D]">{st.title}</span>
                        <Icon className={`w-4 h-4 ${st.color}`} />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-2xl font-bold text-white">{st.value}</h3>
                        <p className="text-[11px] text-[#878D9D] mt-1">{st.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress & Routine Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Weekly Schedule & Booked Classes */}
                <div className="lg:col-span-7 bg-[#181B20] border border-[#23272F] p-6 rounded-2xl shadow-lg space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Upcoming Training Sessions</h3>
                      <p className="text-xs text-[#878D9D]">Coach-led classes and dedicated floor slots</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#FF5500]/10 text-[#FF5500] text-xs font-bold">
                      3 Scheduled
                    </span>
                  </div>

                  <div className="space-y-3">
                    {upcomingClasses.map((cls, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#1F232B] border border-[#2B303B] hover:border-[#FF5500]/50 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white">{cls.name}</h4>
                          <div className="flex items-center gap-3 text-xs text-[#878D9D]">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" /> {cls.trainer}
                            </span>
                            <span>&bull;</span>
                            <span>{cls.room}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-emerald-400 block">{cls.time}</span>
                          <button
                            onClick={() => setActiveTab('workout')}
                            className="text-[11px] text-[#FF5500] hover:underline font-semibold mt-1"
                          >
                            View Routine &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Nutrition & Target Summary */}
                <div className="lg:col-span-5 bg-[#181B20] border border-[#23272F] p-6 rounded-2xl shadow-lg space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Daily Target &amp; Macros</h3>
                    <p className="text-xs text-[#878D9D]">Personalized coach recommendations</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white">Calories (2,450 / 2,600 kcal)</span>
                        <span className="text-emerald-400">94%</span>
                      </div>
                      <div className="w-full bg-[#252A35] h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[94%] rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white">Protein (165g / 180g)</span>
                        <span className="text-amber-400">91%</span>
                      </div>
                      <div className="w-full bg-[#252A35] h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[91%] rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-white">Water Intake (3.2L / 4.0L)</span>
                        <span className="text-blue-400">80%</span>
                      </div>
                      <div className="w-full bg-[#252A35] h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full w-[80%] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#252A35]/50 border border-[#2F3543] flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#FF5500] shrink-0" />
                    <p className="text-xs text-zinc-300">
                      You are only <strong className="text-white">2 workouts</strong> away from unlocking the "Gold Hypertrophy" badge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WORKOUT ROUTINE */}
          {activeTab === 'workout' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Assigned Workout Program</h1>
                  <p className="text-xs text-[#878D9D]">5-Day Hypertrophy &amp; Athletic Conditioning Split</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold">
                    Week 4 of 12 (Active)
                  </span>
                </div>
              </div>

              {/* Day routines */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    day: 'Day 1 (Today)',
                    focus: 'Chest, Delts & Triceps Overload',
                    drills: [
                      { id: 'ex-1', name: 'Barbell Incline Bench Press', sets: '4 sets x 8-10 reps', rest: '90s', target: 'Upper Chest' },
                      { id: 'ex-2', name: 'Flat Dumbbell Press', sets: '4 sets x 10 reps', rest: '75s', target: 'Pectoralis Major' },
                      { id: 'ex-3', name: 'Cable Lateral Raises', sets: '4 sets x 15 reps', rest: '60s', target: 'Side Delts' },
                      { id: 'ex-4', name: 'Overhead Tricep Rope Extension', sets: '3 sets x 12 reps', rest: '60s', target: 'Tricep Long Head' },
                    ]
                  },
                  {
                    day: 'Day 2 (Tomorrow)',
                    focus: 'Back Thickness & Lat Width Engine',
                    drills: [
                      { id: 'ex-5', name: 'Conventional Deadlift', sets: '4 sets x 6 reps', rest: '120s', target: 'Posterior Chain' },
                      { id: 'ex-6', name: 'Weighted Pull-Ups', sets: '4 sets x 8 reps', rest: '90s', target: 'Lats' },
                      { id: 'ex-7', name: 'Chest-Supported T-Bar Row', sets: '3 sets x 10 reps', rest: '75s', target: 'Rhomboids' },
                      { id: 'ex-8', name: 'Incline Dumbbell Hammer Curls', sets: '3 sets x 12 reps', rest: '60s', target: 'Brachialis' },
                    ]
                  },
                  {
                    day: 'Day 3',
                    focus: 'Quad Dominance & Hamstring Power',
                    drills: [
                      { id: 'ex-9', name: 'Barbell Back Squat', sets: '5 sets x 6-8 reps', rest: '120s', target: 'Quads / Glutes' },
                      { id: 'ex-10', name: 'Romanian Dumbbell Deadlift', sets: '4 sets x 10 reps', rest: '90s', target: 'Hamstrings' },
                      { id: 'ex-11', name: 'Walking Dumbbell Lunges', sets: '3 sets x 20 steps', rest: '60s', target: 'Legs' },
                    ]
                  },
                  {
                    day: 'Day 4',
                    focus: 'Shoulder Cannonball & Abs Core',
                    drills: [
                      { id: 'ex-12', name: 'Seated Dumbbell Shoulder Press', sets: '4 sets x 8 reps', rest: '90s', target: 'Front / Side Delts' },
                      { id: 'ex-13', name: 'Hanging Leg Raises', sets: '4 sets x 15 reps', rest: '45s', target: 'Lower Core' },
                      { id: 'ex-14', name: 'Face Pulls with Cable Rope', sets: '4 sets x 15 reps', rest: '60s', target: 'Rear Delts' },
                    ]
                  }
                ].map((split, idx) => (
                  <div key={idx} className="bg-[#181B20] border border-[#23272F] p-6 rounded-2xl shadow-lg space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#252A35]">
                      <div>
                        <span className="text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">{split.day}</span>
                        <h3 className="text-base font-bold text-white">{split.focus}</h3>
                      </div>
                      <span className="text-xs text-[#878D9D] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" /> 60-75 min
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {split.drills.map((drill) => {
                        const isDone = completedWorkouts[drill.id];
                        return (
                          <div
                            key={drill.id}
                            onClick={() => toggleWorkout(drill.id)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                                : 'bg-[#1F232B] border-[#2B303B] hover:border-[#FF5500]/40 text-zinc-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-500'
                              }`}>
                                {isDone && <CheckCircle className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <h4 className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                                  {drill.name}
                                </h4>
                                <span className="text-[11px] text-[#878D9D]">{drill.sets} &bull; Rest: {drill.rest}</span>
                              </div>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-zinc-400 bg-[#252A35] px-2 py-0.5 rounded">
                              {drill.target}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DIET & MACROS */}
          {activeTab === 'diet' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">Daily Nutrition &amp; Macro Plan</h1>
                  <p className="text-xs text-[#878D9D]">Calibrated for Lean Muscle Hypertrophy &amp; Athletic Performance</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white bg-[#1F232B] border border-[#2B303B] px-3 py-1.5 rounded-xl font-bold">
                    Target: 2,600 kcal / Day
                  </span>
                </div>
              </div>

              {/* Macro Bar Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl">
                  <span className="text-xs text-[#878D9D] font-bold block">Protein Target</span>
                  <div className="text-2xl font-bold text-white mt-1">180g <span className="text-xs text-emerald-400 font-normal">/ 720 kcal</span></div>
                  <div className="w-full bg-[#252A35] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[91%]"></div>
                  </div>
                </div>
                <div className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl">
                  <span className="text-xs text-[#878D9D] font-bold block">Carbohydrates</span>
                  <div className="text-2xl font-bold text-white mt-1">310g <span className="text-xs text-amber-400 font-normal">/ 1,240 kcal</span></div>
                  <div className="w-full bg-[#252A35] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-amber-400 h-full w-[85%]"></div>
                  </div>
                </div>
                <div className="bg-[#181B20] border border-[#23272F] p-5 rounded-2xl">
                  <span className="text-xs text-[#878D9D] font-bold block">Healthy Fats</span>
                  <div className="text-2xl font-bold text-white mt-1">70g <span className="text-xs text-blue-400 font-normal">/ 630 kcal</span></div>
                  <div className="w-full bg-[#252A35] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-blue-400 h-full w-[78%]"></div>
                  </div>
                </div>
              </div>

              {/* Meal Timeline */}
              <div className="bg-[#181B20] border border-[#23272F] p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Apple className="w-4 h-4 text-[#FF5500]" /> Recommended Meal Breakdown
                </h3>
                <div className="space-y-3">
                  {[
                    { meal: 'Meal 1 &bull; 08:00 AM', title: 'Power Protein Oats & Whole Eggs', items: '4 Egg whites + 2 whole eggs, 80g rolled oats with almond butter, scoop of isolate whey, blueberries.', macros: 'P: 45g | C: 65g | F: 18g' },
                    { meal: 'Meal 2 &bull; 01:00 PM', title: 'Grilled Chicken, Jasmine Rice & Greens', items: '200g lean breast, 1.5 cups steamed jasmine rice, roasted asparagus, 1 tbsp olive oil dressing.', macros: 'P: 50g | C: 70g | F: 14g' },
                    { meal: 'Meal 3 &bull; 05:00 PM (Pre-Workout)', title: 'Cream of Rice & Banana Fuel', items: '60g cream of rice with cinnamon, sliced banana, 1 scoop whey hydrosylate with pinch of pink salt.', macros: 'P: 30g | C: 60g | F: 3g' },
                    { meal: 'Meal 4 &bull; 08:30 PM (Post-Workout Dinner)', title: 'Atlantic Salmon & Sweet Potato', items: '180g wild salmon fillet, 250g baked sweet potato, mixed steamed broccoli and carrots.', macros: 'P: 42g | C: 55g | F: 22g' },
                  ].map((m, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#1F232B] border border-[#2B303B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-[#FF5500]" dangerouslySetInnerHTML={{ __html: m.meal }} />
                        <h4 className="text-sm font-bold text-white mt-0.5">{m.title}</h4>
                        <p className="text-xs text-[#878D9D] mt-1">{m.items}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-[#252A35] px-2.5 py-1 rounded-lg">
                          {m.macros}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MY MEMBERSHIP & BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">My Membership &amp; Invoices</h1>
                  <p className="text-xs text-[#878D9D]">Manage your subscription, renew pass, or download payment receipts</p>
                </div>
                <button
                  onClick={onExplorePublicPlans}
                  className="px-4 py-2 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Change Plan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Active Plan Banner */}
              <div className="bg-gradient-to-r from-[#181B20] via-[#1E2229] to-[#252A35] border border-[#FF5500]/30 p-6 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      CURRENT SUBSCRIPTION
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">{activePlanName}</h2>
                    <p className="text-xs text-[#878D9D] mt-1">Full 24/7 access to all Iron District &amp; FitFlow gym floors, locker, sauna, and classes.</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-[#878D9D]">Renewal Date</div>
                    <div className="text-base font-bold text-white">December 31, 2026</div>
                    <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">Auto-renewal enabled</span>
                  </div>
                </div>
              </div>

              {/* Payment History Invoices Table */}
              <div className="bg-[#181B20] border border-[#23272F] rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Invoice History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#252A35] text-[#878D9D] uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Invoice #</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Plan</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#23272F] text-zinc-300">
                      {[
                        { id: 'INV-2026-081', date: 'Aug 01, 2026', plan: 'Pro Athlete Annual', amount: '₹19,999', method: 'UPI / Razorpay &bull;&bull;&bull;&bull; 4242', status: 'PAID' },
                        { id: 'INV-2025-072', date: 'Aug 01, 2025', plan: 'Pro Athlete Annual', amount: '₹17,999', method: 'UPI / PhonePe &bull;&bull;&bull;&bull; 4242', status: 'PAID' },
                        { id: 'INV-2024-044', date: 'Aug 01, 2024', plan: 'Starter Monthly x12', amount: '₹11,999', method: 'HDFC NetBanking &bull;&bull;&bull;&bull; 1188', status: 'PAID' },
                      ].map((inv) => (
                        <tr key={inv.id} className="hover:bg-[#1E2229]">
                          <td className="py-3 px-4 font-mono font-bold text-white">{inv.id}</td>
                          <td className="py-3 px-4 text-[#878D9D]">{inv.date}</td>
                          <td className="py-3 px-4 text-white font-medium">{inv.plan}</td>
                          <td className="py-3 px-4 font-bold text-white">{inv.amount}</td>
                          <td className="py-3 px-4 text-[#878D9D]" dangerouslySetInnerHTML={{ __html: inv.method }} />
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => alert(`Receipt ${inv.id} downloaded.`)}
                              className="inline-flex items-center gap-1 text-[11px] text-[#FF5500] hover:underline font-bold cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-bold text-white">Profile &amp; Account Settings</h1>
                <p className="text-xs text-[#878D9D]">Update your contact details, emergency phone, and goals</p>
              </div>

              {saveSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Changes have been saved successfully to your member file!
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="bg-[#181B20] border border-[#23272F] p-6 rounded-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#1F232B] border border-[#2B303B] rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Email Address (Account ID)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-[#1F232B]/60 border border-[#2B303B] rounded-xl px-4 py-3 text-zinc-500 text-xs cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1F232B] border border-[#2B303B] rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Emergency Contact Number
                    </label>
                    <input
                      type="tel"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full bg-[#1F232B] border border-[#2B303B] rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#878D9D] mb-2">
                      Primary Fitness Goal
                    </label>
                    <select
                      value={fitnessGoal}
                      onChange={(e) => setFitnessGoal(e.target.value)}
                      className="w-full bg-[#1F232B] border border-[#2B303B] rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-[#FF5500] cursor-pointer"
                    >
                      <option>Hypertrophy &amp; Lean Bulk</option>
                      <option>Fat Loss &amp; Conditioning</option>
                      <option>Strength &amp; Powerlifting</option>
                      <option>Athletic Agility &amp; Mobility</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#252A35] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#878D9D]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Encrypted with Enterprise AES-256</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#FF5500] hover:bg-[#ff6a00] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Profile
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
