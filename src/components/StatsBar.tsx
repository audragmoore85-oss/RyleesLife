import { CalendarHeart, MessageCircle, Smile } from "lucide-react";
import type { JournalEntry, Mood } from "@/lib/types";
import { moodConfig } from "@/lib/types";

interface StatsBarProps {
  entries: JournalEntry[];
}

export default function StatsBar({ entries }: StatsBarProps) {
  const totalEntries = entries.length;
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<Mood, number>);

  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  const topMoodConfig = topMood ? moodConfig[topMood[0] as Mood] : null;

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-white/50">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center">
          <CalendarHeart className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Entries</p>
          <p className="text-lg font-bold text-slate-700 leading-none">{totalEntries}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-white/50">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Sharing with</p>
          <p className="text-lg font-bold text-slate-700 leading-none">Dad 💜</p>
        </div>
      </div>

      {topMoodConfig && (
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-white/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
            <Smile className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Top mood</p>
            <p className="text-lg font-bold text-slate-700 leading-none">
              {topMoodConfig.emoji} {topMoodConfig.label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
