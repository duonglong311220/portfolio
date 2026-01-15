import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import SectionCus from "../components/section";
import GlassCard from "../ui/glassCard";
import Pill from "../components/Pill";
import { variants } from "../lib/animation";

interface AboutSectionProps {
  profile: {
    role: string;
    location: string;
    email: string;
    phone: string;
  };
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const reduce = useReducedMotion();

  return (
    <SectionCus id="about" eyebrow="About" title="A bit about me" className="py-12">
      <div className="grid lg:grid-cols-12 gap-6">
        <motion.div
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={variants.fadeUp}
          className="lg:col-span-7"
        >
          <GlassCard className="p-5 sm:p-6">
            <p className="text-zinc-700 dark:text-zinc-200 leading-relaxed">
              I'm a frontend developer who cares about clean UI, solid performance, and small
              details that make products feel premium. I enjoy building reusable component systems,
              polishing interactions, and translating designs into responsive, accessible
              experiences.
            </p>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Focus</div>
                <div className="mt-1 text-sm font-semibold">Motion + Usability</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  Smooth transitions, micro-interactions, and clean UX.
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Strength</div>
                <div className="mt-1 text-sm font-semibold">Component Architecture</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  Reusable patterns, predictable state, maintainable code.
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Performance", "A11y", "Design Systems", "API Integration"].map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={variants.fadeUp}
          className="lg:col-span-5"
        >
          <GlassCard className="p-5 sm:p-6">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Quick facts</div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 px-4 py-3">
                <span className="text-zinc-600 dark:text-zinc-300">Role</span>
                <span className="font-medium">{profile.role}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 px-4 py-3">
                <span className="text-zinc-600 dark:text-zinc-300">Location</span>
                <span className="font-medium">{profile.location}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 px-4 py-3">
                <span className="text-zinc-600 dark:text-zinc-300">Stack</span>
                <span className="font-medium">React + TS</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Contact</div>
              <div className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                <a
                  className="flex items-center gap-2 hover:underline"
                  href={`mailto:${profile.email}`}
                >
                  <Mail className="h-4 w-4" /> {profile.email}
                </a>
                <a className="flex items-center gap-2 hover:underline" href={`tel:${profile.phone}`}>
                  <Phone className="h-4 w-4" /> {profile.phone}
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionCus>
  );
}

