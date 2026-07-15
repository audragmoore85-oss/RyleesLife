"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm flex items-center justify-center hover:bg-white transition-all cursor-pointer dark:bg-slate-800/70 dark:border-slate-700/50 dark:hover:bg-slate-800"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
}
