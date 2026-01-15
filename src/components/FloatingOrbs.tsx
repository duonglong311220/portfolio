import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FloatingOrbs() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const orb = "absolute rounded-full blur-2xl opacity-40 mix-blend-multiply dark:mix-blend-screen";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={cx(orb, "h-64 w-64 bg-zinc-200 dark:bg-zinc-700", "-left-20 -top-16")}
        animate={{ x: [0, 40, 0], y: [0, 18, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease }}
      />
      <motion.div
        className={cx(orb, "h-72 w-72 bg-zinc-300 dark:bg-zinc-800", "right-[-80px] top-10")}
        animate={{ x: [0, -30, 0], y: [0, 28, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease, delay: 0.6 }}
      />
      <motion.div
        className={cx(orb, "h-56 w-56 bg-zinc-200 dark:bg-zinc-700", "left-10 bottom-[-70px]")}
        animate={{ x: [0, 22, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease, delay: 1.1 }}
      />
    </div>
  );
}

