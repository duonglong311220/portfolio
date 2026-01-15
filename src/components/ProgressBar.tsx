import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed left-0 top-0 z-[80] h-1 w-full bg-transparent">
      <motion.div
        className="h-full bg-zinc-900 dark:bg-white"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

