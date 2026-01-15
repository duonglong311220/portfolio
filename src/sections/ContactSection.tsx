import { motion, useReducedMotion } from "framer-motion";
import { Code2, Download, Link, Mail, Phone } from "lucide-react";
import SectionCus from "../components/section";
import GlassCard from "../ui/glassCard";
import MagneticButton from "../components/MagneticButton";
import { variants } from "../lib/animation";

interface ContactSectionProps {
  profile: {
    email: string;
    phone: string;
    links: {
      github: string;
      linkedin: string;
      cv: string;
    };
  };
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const reduce = useReducedMotion();

  return (
    <SectionCus id="contact" eyebrow="Contact" title="Let's build something" className="py-12">
      <div className="grid lg:grid-cols-12 gap-6">
        <motion.div
          initial={reduce ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={variants.fadeUp}
          className="lg:col-span-7"
        >
          <GlassCard className="p-5 sm:p-6">
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              If you want a portfolio, landing page, or product UI with smooth motion — message me.
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900/10 dark:bg-white/10">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Email</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">{profile.email}</div>
                  </div>
                </div>
              </a>

              <a
                href={`tel:${profile.phone}`}
                className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900/10 dark:bg-white/10">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Phone</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">{profile.phone}</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <MagneticButton
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
              >
                <Code2 className="h-4 w-4" /> GitHub
              </MagneticButton>
              <MagneticButton
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
              >
                <Link className="h-4 w-4" /> LinkedIn
              </MagneticButton>
              <MagneticButton
                href={profile.links.cv}
                className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
              >
                <Download className="h-4 w-4" /> Download CV
              </MagneticButton>
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
              Built-in polish
            </div>
            <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              This page uses subtle glass surfaces, typographic hierarchy, responsive grids, and
              consistent spacing. Motion is smooth but not distracting.
            </div>

            <div className="mt-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Tip</div>
              <div className="mt-1 text-sm">
                Replace the <span className="font-medium">PROFILE</span>,
                <span className="font-medium"> PROJECTS</span>, and
                <span className="font-medium"> EXPERIENCE</span> arrays at the top — the layout
                updates automatically.
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionCus>
  );
}

