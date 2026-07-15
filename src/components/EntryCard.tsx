"use client";

import { useState, useMemo, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Sparkles, Music, Heart, Target, CheckCircle2 } from "lucide-react";
import { moodConfig, type JournalEntry } from "@/lib/types";
import MoodBadge from "./MoodBadge";

interface EntryCardProps {
  entry: JournalEntry;
  index: number;
}

const DAD_REACTIONS = ["❤️", "😊", "🙏", "💪", "🥰"];

export default function EntryCard({ entry, index }: EntryCardProps) {
  const formattedDate = format(parseISO(entry.date), "EEEE, MMMM d, yyyy");
  const moodCfg = moodConfig[entry.mood];
  const [activeHighlights, setActiveHighlights] = useState<string[]>([]);
  const [reactions, setReactions] = useState<string[]>([]);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedReactions = localStorage.getItem(`reactions-${entry.id}`);
      if (savedReactions) setReactions(JSON.parse(savedReactions));
      const savedGoals = localStorage.getItem(`goals-${entry.id}`);
      if (savedGoals) setCompletedGoals(JSON.parse(savedGoals));
    } catch {}
  }, [entry.id]);

  const saveReactions = (newReactions: string[]) => {
    setReactions(newReactions);
    try {
      localStorage.setItem(`reactions-${entry.id}`, JSON.stringify(newReactions));
    } catch {}
  };

  const saveGoals = (newGoals: string[]) => {
    setCompletedGoals(newGoals);
    try {
      localStorage.setItem(`goals-${entry.id}`, JSON.stringify(newGoals));
    } catch {}
  };

  const toggleHighlight = (highlight: string) => {
    setActiveHighlights((prev) =>
      prev.includes(highlight)
        ? prev.filter((h) => h !== highlight)
        : [...prev, highlight]
    );
  };

  const toggleReaction = (emoji: string) => {
    saveReactions(
      reactions.includes(emoji)
        ? reactions.filter((r) => r !== emoji)
        : [...reactions, emoji]
    );
  };

  const toggleGoal = (goal: string) => {
    saveGoals(
      completedGoals.includes(goal)
        ? completedGoals.filter((g) => g !== goal)
        : [...completedGoals, goal]
    );
  };

  const goalProgress = entry.goals
    ? Math.round((completedGoals.length / entry.goals.length) * 100)
    : 0;

  const renderBody = useMemo(() => {
    if (activeHighlights.length === 0) {
      return entry.body;
    }

    const parts: (string | { text: string; key: string })[] = [];
    let remaining = entry.body;

    while (remaining.length > 0) {
      let earliestIndex = Infinity;
      let matchedHighlight = "";

      for (const highlight of activeHighlights) {
        const idx = remaining.toLowerCase().indexOf(highlight.toLowerCase());
        if (idx !== -1 && idx < earliestIndex) {
          earliestIndex = idx;
          matchedHighlight = highlight;
        }
      }

      if (earliestIndex === Infinity) {
        parts.push(remaining);
        break;
      }

      if (earliestIndex > 0) {
        parts.push(remaining.substring(0, earliestIndex));
      }

      const matchedText = remaining.substring(
        earliestIndex,
        earliestIndex + matchedHighlight.length
      );
      parts.push({ text: matchedText, key: matchedHighlight });

      remaining = remaining.substring(earliestIndex + matchedHighlight.length);
    }

    return parts.map((part, i) =>
      typeof part === "string" ? (
        part
      ) : (
        <mark
          key={`${part.key}-${i}`}
          className="bg-gradient-to-r from-yellow-200 to-amber-200 rounded px-0.5 py-0.5 text-slate-800 font-semibold shadow-sm animate-fade-in"
        >
          {part.text}
        </mark>
      )
    );
  }, [entry.body, activeHighlights]);

  const cardClass = entry.isLetter ? "letter-card" : "journal-card";

  return (
    <article
      className={`${cardClass} animate-slide-up border-l-4 ${moodCfg.border}`}
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

      {entry.stickers && entry.stickers.length > 0 && (
        <div className="flex gap-1.5 mb-3 text-2xl">
          {entry.stickers.map((sticker, i) => (
            <span key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              {sticker}
            </span>
          ))}
        </div>
      )}

      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap font-handwriting text-[15px]">
        {renderBody}
      </p>

      {entry.nowPlaying && (
        <div className="mt-3 flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg px-3 py-2 border border-purple-100">
          <Music className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-slate-400 font-medium">Now playing</span>
          <span className="text-sm text-purple-600 font-medium">{entry.nowPlaying}</span>
          <span className="ml-auto flex gap-0.5">
            <span className="w-1 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-2 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
            <span className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "450ms" }} />
          </span>
        </div>
      )}

      {entry.goals && entry.goals.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            <Target className="w-3.5 h-3.5" />
            Goals
            <span className="text-slate-300 font-normal normal-case ml-1">
              — tap to check off
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {entry.goals.map((goal, i) => {
              const isDone = mounted && completedGoals.includes(goal);
              return (
                <div
                  key={i}
                  className="goal-item"
                  onClick={() => toggleGoal(goal)}
                >
                  <div
                    className={`goal-checkbox ${
                      isDone
                        ? "bg-emerald-400 border-emerald-400"
                        : "border-slate-300 hover:border-emerald-300"
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={isDone ? "line-through text-slate-400" : ""}>
                    {goal}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            {completedGoals.length} of {entry.goals.length} completed ({goalProgress}%)
          </p>
        </div>
      )}

      {entry.highlights && entry.highlights.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Highlights
            <span className="text-slate-300 font-normal normal-case ml-1">
              — click to highlight in the entry
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.highlights.map((highlight, i) => {
              const isActive = activeHighlights.includes(highlight);
              return (
                <button
                  key={i}
                  onClick={() => toggleHighlight(highlight)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-amber-300 to-yellow-300 text-slate-800 border-amber-400 shadow-md scale-105"
                      : "bg-gradient-to-r from-pink-50 to-purple-50 text-purple-600 border-purple-100 hover:scale-105 hover:shadow-sm"
                  }`}
                >
                  {isActive && <span className="mr-1">✨</span>}
                  {highlight}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {entry.gratitude && entry.gratitude.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            <Heart className="w-3.5 h-3.5 text-emerald-400" />
            Gratitude Jar
          </div>
          <div className="flex flex-wrap gap-2">
            {entry.gratitude.map((item, i) => (
              <div key={i} className="gratitude-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
          <Heart className="w-3.5 h-3.5 text-pink-400" />
          Dad&apos;s Reaction
          <span className="text-slate-300 font-normal normal-case ml-1">
            — tap to let Rylee know you read it
          </span>
        </div>
        <div className="flex gap-2">
          {DAD_REACTIONS.map((emoji) => {
            const isActive = mounted && reactions.includes(emoji);
            return (
              <button
                key={emoji}
                onClick={() => toggleReaction(emoji)}
                className={`text-2xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "scale-125 drop-shadow-md"
                    : "opacity-40 hover:opacity-80 hover:scale-110"
                }`}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}
