export type Mood =
  | "happy"
  | "excited"
  | "calm"
  | "sad"
  | "angry"
  | "confused"
  | "grateful"
  | "tired";

export interface JournalEntry {
  id: string;
  date: string;
  mood: Mood;
  title: string;
  body: string;
  highlights?: string[];
}

export const moodConfig: Record<
  Mood,
  { label: string; emoji: string; color: string; bg: string; text: string }
> = {
  happy: {
    label: "Happy",
    emoji: "😊",
    color: "#FBBF24",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  excited: {
    label: "Excited",
    emoji: "🤩",
    color: "#F97316",
    bg: "bg-orange-100",
    text: "text-orange-700",
  },
  calm: {
    label: "Calm",
    emoji: "😌",
    color: "#22D3EE",
    bg: "bg-cyan-100",
    text: "text-cyan-700",
  },
  sad: {
    label: "Sad",
    emoji: "😢",
    color: "#6366F1",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
  },
  angry: {
    label: "Frustrated",
    emoji: "😤",
    color: "#EF4444",
    bg: "bg-red-100",
    text: "text-red-700",
  },
  confused: {
    label: "Confused",
    emoji: "🤔",
    color: "#A78BFA",
    bg: "bg-violet-100",
    text: "text-violet-700",
  },
  grateful: {
    label: "Grateful",
    emoji: "🙏",
    color: "#34D399",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  tired: {
    label: "Tired",
    emoji: "😴",
    color: "#94A3B8",
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
};
