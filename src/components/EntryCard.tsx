import { format, parseISO } from "date-fns";
import { Sparkles } from "lucide-react";
import type { JournalEntry } from "@/lib/types";
import MoodBadge from "./MoodBadge";

interface EntryCardProps {
  entry: JournalEntry;
  index: number;
}

export default function EntryCard({ entry, index }: EntryCardProps) {
  const formattedDate = format(parseISO(entry.date), "EEEE, MMMM d, yyyy");

  return (
    <article
      className="journal-card animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <time className="text-sm text-slate-400 font-medium">
            {formattedDate}
          </time>
          <h2 className="text-xl font-bold text-slate-800 mt-0.5">
            {entry.title}
          </h2>
        </div>
        <MoodBadge mood={entry.mood} />
      </div>

      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap font-handwriting text-[15px]">
        {entry.body}
      </p>

      {entry.highlights && entry.highlights.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Highlights
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.highlights.map((highlight, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 text-xs font-medium text-purple-600 border border-purple-100"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
