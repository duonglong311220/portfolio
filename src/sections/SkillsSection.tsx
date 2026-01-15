import { motion, useReducedMotion } from "framer-motion";
import SectionCus from "../components/section";
import SkillBar from "../components/skillBar";
import GlassCard from "../ui/glassCard";
import { variants } from "../lib/animation";

interface SkillsSectionProps {
  skills: Array<{ name: string; level: number }>;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const reduce = useReducedMotion();

  return (
    <SectionCus id="skills" eyebrow="Skills" title="What I use to build" className="py-12">
      <div className="grid lg:grid-cols-12 gap-6">
        <motion.div
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={variants.fadeUp}
          className="lg:col-span-7"
        >
          <GlassCard className="p-5 sm:p-6">
            <div className="grid gap-4">
              {skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} />
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
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Motion presets
            </div>
            <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              This template includes: scroll reveal, magnetic buttons, animated nav pill, hover
              depth, and modal transitions — with
              <span className="font-medium text-zinc-800 dark:text-zinc-100"> reduced motion </span>
              support.
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {["Scroll reveal", "Hover lift", "Nav pill", "Modal", "Orbs", "Progress"].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4"
                >
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Smooth & subtle
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionCus>
  );
}

