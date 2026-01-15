import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, Code2, Link, Mail, MapPin } from "lucide-react";
import GlassCard from "../ui/glassCard";
import MagneticButton from "../components/MagneticButton";
import Pill from "../components/Pill";
import { variants } from "../lib/animation";

interface HeroSectionProps {
  profile: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    links: {
      github: string;
      linkedin: string;
    };
  };
  highlights: Array<{
    icon: any;
    title: string;
    desc: string;
  }>;
  onNavigate: (id: string) => void;
}

export default function HeroSection({ profile, highlights, onNavigate }: HeroSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative pt-14 sm:pt-18 pb-14 scroll-mt-24">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <motion.div
          initial={reduce ? "visible" : "hidden"}
          animate="visible"
          variants={variants.stagger}
          className="lg:col-span-7"
        >
          <motion.div
            variants={variants.fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-200"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for freelance / new opportunities
          </motion.div>

          <motion.h1
            variants={variants.fadeUp}
            className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight"
          >
            Building modern UI,
            <span className="block text-zinc-700 dark:text-zinc-200">powered by motion.</span>
          </motion.h1>

          <motion.p
            variants={variants.fadeUp}
            className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={variants.fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
            <MagneticButton
              onClick={() => onNavigate("projects")}
              className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
            >
              View projects <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              onClick={() => onNavigate("contact")}
              className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
            >
              Contact <Mail className="h-4 w-4" />
            </MagneticButton>

            <div className="ml-0 sm:ml-2 flex items-center gap-2">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition"
                aria-label="GitHub"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition"
                aria-label="LinkedIn"
              >
                <Link className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={variants.fadeUp} className="mt-7 flex flex-wrap gap-2">
            <Pill>
              <MapPin className="h-3.5 w-3.5 mr-2" /> {profile.location}
            </Pill>
            <Pill>
              <Code2 className="h-3.5 w-3.5 mr-2" /> React • TS • UI Motion
            </Pill>
            <Pill>
              <Briefcase className="h-3.5 w-3.5 mr-2" /> 2+ yrs experience
            </Pill>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={variants.fade}
          className="lg:col-span-5"
        >
          <GlassCard className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Snapshot</div>
                <div className="mt-1 text-lg font-semibold">What I do best</div>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-zinc-900/10 dark:bg-white/10" />
            </div>

            <div className="mt-5 space-y-3">
              {highlights.map((h) => (
                <motion.div
                  key={h.title}
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900/10 dark:bg-white/10">
                      <h.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{h.title}</div>
                      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{h.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["React", "TypeScript", "Tailwind", "Motion", "Odoo", "Mobiscroll"].map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

