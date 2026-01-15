import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionCus from "../components/section";
import GlassCard from "../ui/glassCard";
import Pill from "../components/Pill";
import { variants } from "../lib/animation";
import type { Project } from "../data";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

export default function ProjectsSection({ projects, onProjectSelect }: ProjectsSectionProps) {
  const reduce = useReducedMotion();

  return (
    <SectionCus id="projects" eyebrow="Projects" title="Selected work" className="py-12">
      <motion.div
        initial={reduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={variants.stagger}
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {projects.map((p) => (
          <motion.button
            key={p.title}
            variants={variants.fadeUp}
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onProjectSelect(p)}
            className="text-left"
          >
            <GlassCard className="overflow-hidden">
              <div className="relative h-44">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white">{p.title}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-sm text-zinc-700 dark:text-zinc-200 line-clamp-3">
                  {p.description}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Click to view details
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    Details <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.button>
        ))}
      </motion.div>
    </SectionCus>
  );
}

