import entriesData from "@/data/entries.json";
import type { JournalEntry } from "@/lib/types";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import EntryCard from "@/components/EntryCard";
import MoodCalendar from "@/components/MoodCalendar";
import { Heart } from "lucide-react";
import { moodConfig } from "@/lib/types";

export default function Home() {
  const entries = (entriesData as JournalEntry[]).sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.id.localeCompare(a.id);
  });

  return (
    <main className="min-h-screen pb-20">
      <Header />
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-wrap items-center gap-3 justify-center mb-8">
          <StatsBar entries={entries} />
          <MoodCalendar entries={entries} />
        </div>

        <div className="space-y-5 relative">
          {entries.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-purple-300" />
              </div>
              <p className="text-slate-400 text-lg">No journal entries yet.</p>
              <p className="text-slate-300 text-sm mt-1">
                Check back soon for updates!
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-pink-200 via-purple-200 to-indigo-200 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900" />
              <div className="space-y-5">
                {entries.map((entry, index) => {
                  const moodCfg = moodConfig[entry.mood];
                  return (
                    <div key={entry.id} className="relative pl-8">
                      <div
                        className="timeline-dot absolute left-0 top-6"
                        style={{ backgroundColor: moodCfg.color }}
                      />
                      <EntryCard entry={entry} index={index} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <footer className="text-center mt-12 pt-8 border-t border-white/40 dark:border-slate-700/40">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> for Dad
          </p>
        </footer>
      </div>
    </main>
  );
}
