import { motion, useReducedMotion } from "framer-motion";
import { Download, Moon, Sun } from "lucide-react";
import { cx } from "../lib/utils";
import MagneticButton from "./MagneticButton";
// import UpsideDownScene from "./UpsideDownScene.tsx";

interface HeaderProps {
  profile: {
    name: string;
    role: string;
    links: {
      cv: string;
    };
  };
  nav: readonly { readonly id: string; readonly label: string }[];
  activeSection: string;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  onNavigate: (id: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header({
  profile,
  nav,
  activeSection,
  theme,
  onThemeToggle,
  onNavigate,
}: HeaderProps) {
  const reduce = useReducedMotion();

  return (
    <header className="top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-sm h-1/2">
      <div className="mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate("home")}
          className="group inline-flex items-center gap-2"
          aria-label="Go to top"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <motion.span
              className="absolute inset-0 rounded-xl"
              animate={
                reduce
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 rgba(0,0,0,0)",
                        "0 10px 25px rgba(0,0,0,0.08)",
                        "0 0 0 rgba(0,0,0,0)",
                      ],
                    }
              }
              transition={{ duration: 3.6, repeat: Infinity, ease }}
            />
            <span className="font-semibold">DL</span>
          </span>
          <div className="leading-tight text-left">
            <div className="text-sm font-semibold">{profile.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{profile.role}</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 p-1">
          {nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cx(
                  "relative px-3 py-2 text-sm rounded-xl transition",
                  "text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white",
                  isActive && "text-zinc-900 dark:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-xl bg-zinc-900/10 dark:bg-white/10"
                    transition={{ type: "spring", stiffness: 520, damping: 40 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton
            onClick={onThemeToggle}
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">Theme</span>
          </MagneticButton>
          <MagneticButton
            href={profile.links.cv}
            className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">CV</span>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}

