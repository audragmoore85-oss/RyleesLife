import { moodConfig, type Mood } from "@/lib/types";

interface MoodBadgeProps {
  mood: Mood;
  size?: "sm" | "md";
}

export default function MoodBadge({ mood, size = "md" }: MoodBadgeProps) {
  const config = moodConfig[mood];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`mood-pill ${config.bg} ${config.text} ${sizeClasses}`}
    >
      <span className="text-base">{config.emoji}</span>
      {config.label}
    </span>
  );
}
