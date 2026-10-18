import React, { useState } from 'react';
import { WEEKLY_SCHEDULE, type ScheduleItem } from '../../data/gymData';
import { Clock, User, MapPin, Flame } from 'lucide-react';

interface WeeklyScheduleProps {
  onBookClass: (className: string) => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ onBookClass }) => {
  const days: ScheduleItem['day'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const [activeDay, setActiveDay] = useState<ScheduleItem['day']>('Monday');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('All');

  const daySchedule = WEEKLY_SCHEDULE.filter((item) => item.day === activeDay);

  const filteredSchedule = selectedIntensity === 'All'
    ? daySchedule
    : daySchedule.filter((item) => item.intensity === selectedIntensity);

  return (
    <section className="bg-[#0b0f19] py-20 border-b border-blue-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-400 block">
            TIMETABLE &bull; COURSE SCHEDULE
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
            WEEKLY TRAINING SCHEDULE
          </h2>
          <p className="text-sm text-slate-400">
            Browse our structured weekly timetable across barbell decks, high-intensity turf lanes, and mobility suites.
          </p>
        </div>

        {/* Day Selection Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar mb-8">
          {days.map((day) => {
            const isSelected = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                    : 'bg-[#151525] border border-blue-900/40 text-slate-400 hover:text-white'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Intensity Filter */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 px-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Filter by intensity:</span>
            {['All', 'High', 'Intense', 'Moderate', 'All Levels'].map((intensity) => (
              <button
                key={intensity}
                onClick={() => setSelectedIntensity(intensity)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedIntensity === intensity
                    ? 'bg-blue-950 text-blue-300 border border-blue-400'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {intensity}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 italic">
            * Sample timetable for demo purposes
          </span>
        </div>

        {/* Schedule List Table / Cards */}
        <div className="space-y-3">
          {filteredSchedule.length === 0 ? (
            <div className="p-8 text-center bg-[#12121e]/80 border border-blue-900/30 rounded-xl text-sm text-slate-400">
              No sessions scheduled for this intensity filter on {activeDay}.
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div
                key={item.id}
                className="bg-[#12121e]/80 border border-blue-900/30 hover:border-blue-500/50 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 group"
              >
                {/* Time & Program */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-24 shrink-0 font-heading text-lg font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{item.time}</span>
                  </div>

                  <div>
                    <h4 className="font-heading text-lg font-bold text-white uppercase group-hover:text-blue-400 transition-colors">
                      {item.program}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        {item.trainer}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {item.room}
                      </span>
                      <span>&bull;</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Intensity tag & Book CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-blue-950/60">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-[11px] font-semibold text-blue-300">
                    <Flame className="w-3 h-3 text-blue-400" />
                    <span>{item.intensity}</span>
                  </span>

                  <button
                    onClick={() => onBookClass(item.program)}
                    className="px-4 py-2 bg-blue-950/80 hover:bg-blue-600 hover:text-white text-blue-200 text-xs font-heading font-bold uppercase tracking-wider rounded-lg border border-blue-500/30 transition-all cursor-pointer shadow-sm"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
