import React from "react";

interface PillProps {
  children: React.ReactNode;
}

export default function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-200 shadow-sm">
      {children}
    </span>
  );
}

