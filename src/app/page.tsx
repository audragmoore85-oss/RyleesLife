import entriesData from "@/data/entries.json";
import type { JournalEntry } from "@/lib/types";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import EntryCard from "@/components/EntryCard";
import { Heart } from "lucide-react";

export default function Home() {
  const entries = (entriesData as JournalEntry[]).sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <main className="min-h-screen pb-20">
      <Header />
      <div className="max-w-2xl mx-auto px-4">
        <StatsBar entries={entries} />

        <div className="space-y-5">
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
            entries.map((entry, index) => (
              <EntryCard key={entry.id} entry={entry} index={index} />
            ))
          )}
        </div>

        <footer className="text-center mt-12 pt-8 border-t border-white/40">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" /> for Dad
          </p>
        </footer>
      </div>
    </main>
  );
}
