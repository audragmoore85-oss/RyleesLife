"use client";

import { useState, useRef, useEffect } from "react";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { moodConfig, type JournalEntry, type Mood } from "@/lib/types";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

interface MoodCalendarProps {
  entries: JournalEntry[];
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MoodCalendar({ entries }: MoodCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOffset = getDay(monthStart);

  const entriesByDate = new Map<string, JournalEntry>();
  entries.forEach((entry) => {
    const dateKey = format(parseISO(entry.date), "yyyy-MM-dd");
    if (!entriesByDate.has(dateKey)) {
      entriesByDate.set(dateKey, entry);
    }
  });

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-white/50 hover:bg-white transition-all cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center">
          <CalendarDays className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-xs text-slate-400 font-medium">Mood Calendar</p>
          <p className="text-lg font-bold text-slate-700 leading-none">{format(currentMonth, "MMMM")}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 p-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              Mood Calendar
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <span className="text-xs font-semibold text-slate-600 min-w-[80px] text-center">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                onClick={nextMonth}
                className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-[9px] font-semibold text-slate-400 uppercase">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const entry = entriesByDate.get(dateKey);
              const mood = entry?.mood;
              const moodCfg = mood ? moodConfig[mood as Mood] : null;

              return (
                <div
                  key={dateKey}
                  className={`aspect-square rounded-md flex flex-col items-center justify-center text-[10px] transition-all ${
                    moodCfg
                      ? `${moodCfg.bg} ${moodCfg.text} font-bold hover:scale-110 cursor-pointer shadow-sm`
                      : "bg-slate-50 text-slate-300"
                  }`}
                  title={entry ? `${format(day, "MMM d")}: ${moodCfg?.label} — ${entry.title}` : format(day, "MMM d")}
                >
                  <span className="text-xs leading-none">{moodCfg?.emoji || format(day, "d")}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
            {(Object.keys(moodConfig) as Mood[]).map((mood) => {
              const cfg = moodConfig[mood];
              const count = entries.filter((e) => e.mood === mood).length;
              if (count === 0) return null;
              return (
                <div key={mood} className={`flex items-center gap-1 text-[9px] ${cfg.text}`}>
                  <span>{cfg.emoji}</span>
                  <span className="font-medium">{cfg.label}</span>
                  <span className="opacity-50">({count})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
