"use client";

import { useState } from "react";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from "date-fns";
import { moodConfig, type JournalEntry, type Mood } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MoodCalendarProps {
  entries: JournalEntry[];
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MoodCalendar({ entries }: MoodCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
    <div className="journal-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
          Mood Calendar
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <span className="text-sm font-semibold text-slate-600 min-w-[100px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={nextMonth}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-[10px] font-semibold text-slate-400 uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
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
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all ${
                moodCfg
                  ? `${moodCfg.bg} ${moodCfg.text} font-bold hover:scale-110 cursor-pointer shadow-sm`
                  : "bg-slate-50 text-slate-300"
              }`}
              title={entry ? `${format(day, "MMM d")}: ${moodCfg?.label} — ${entry.title}` : format(day, "MMM d")}
            >
              <span className="text-sm">{moodCfg?.emoji || format(day, "d")}</span>
              {moodCfg && (
                <span className="text-[8px] mt-0.5">{format(day, "d")}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
        {(Object.keys(moodConfig) as Mood[]).map((mood) => {
          const cfg = moodConfig[mood];
          const count = entries.filter((e) => e.mood === mood).length;
          if (count === 0) return null;
          return (
            <div key={mood} className={`flex items-center gap-1 text-[10px] ${cfg.text}`}>
              <span className="text-sm">{cfg.emoji}</span>
              <span className="font-medium">{cfg.label}</span>
              <span className="opacity-50">({count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
