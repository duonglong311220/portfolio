import { motion, useReducedMotion } from "framer-motion";
import SectionCus from "../components/section";
import GlassCard from "../ui/glassCard";
import Pill from "../components/Pill";
import { variants } from "../lib/animation";
import { formatYearRange } from "../lib/utils";

interface Experience {
  company: string;
  role: string;
  start: string;
  end?: string;
  location: string;
  tags: string[];
  bullets: string[];
}

interface WorkSectionProps {
  experience: Experience[];
}

export default function WorkSection({ experience }: WorkSectionProps) {
  const reduce = useReducedMotion();

  return (
    <SectionCus id="work" eyebrow="Work" title="Experience" className="py-12">
      <div className="grid gap-4">
        {experience.map((job, idx) => (
          <motion.div
            key={`${job.company}-${job.role}`}
            initial={reduce ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={variants.fadeUp}
          >
            <GlassCard className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">
                    {job.role} · {job.company}
                  </div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {formatYearRange(job.start, job.end)} · {job.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid sm:grid-cols-12 gap-4">
                <div className="sm:col-span-1 hidden sm:flex">
                  <div className="relative mx-auto">
                    <div className="h-3 w-3 rounded-full bg-zinc-900 dark:bg-white" />
                    {idx !== experience.length - 1 && (
                      <div className="mx-auto mt-2 h-[calc(100%-12px)] w-px bg-zinc-200 dark:bg-zinc-800" />
                    )}
                  </div>
                </div>
                <div className="sm:col-span-11">
                  <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionCus>
  );
}

