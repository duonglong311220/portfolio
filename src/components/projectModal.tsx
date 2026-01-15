import type { Project } from "../data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import GlassCard from "../ui/glassCard";
import Pill from "./Pill";
import MagneticButton from "./MagneticButton";
import { ease } from "../lib/animation";

export default function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const reduce = useReducedMotion();

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="fixed inset-0 z-[60]"
                >
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 18}}
                        animate={{opacity: 1, y: 0}}
                        exit={reduce ? {opacity: 0} : {opacity: 0, y: 18}}
                        transition={{duration: 0.35, ease}}
                        className="absolute left-1/2 top-1/2 w-[min(960px,92vw)] -translate-x-1/2 -translate-y-1/2"
                    >
                        <GlassCard className="overflow-hidden">
                            <div className="relative h-44 sm:h-56">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{backgroundImage: `url(${project.image})`}}
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/30 to-transparent"/>
                                <div className="absolute left-5 bottom-4 right-5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {project.tags.slice(0, 4).map((t) => (
                                            <Pill key={t}>{t}</Pill>
                                        ))}
                                    </div>
                                    <div className="mt-3 text-xl sm:text-2xl font-semibold text-white">
                                        {project.title}
                                    </div>
                                    <div className="mt-1 text-sm text-zinc-200">
                                        {project.description}
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 sm:p-6">
                                <div className="grid sm:grid-cols-12 gap-5">
                                    <div className="sm:col-span-8">
                                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                            Key highlights
                                        </div>
                                        <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                                            {project.highlights.map((h) => (
                                                <li key={h} className="flex gap-2">
                                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400"/>
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                            Links
                                        </div>
                                        <div className="mt-3 flex flex-col gap-2">
                                            {project.links.live && (
                                                <MagneticButton
                                                    href={project.links.live}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="bg-zinc-900 text-white hover:shadow-lg dark:bg-white dark:text-zinc-950"
                                                >
                                                    Live demo <ExternalLink className="h-4 w-4"/>
                                                </MagneticButton>
                                            )}
                                            {project.links.repo && (
                                                <MagneticButton
                                                    href={project.links.repo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="bg-white text-zinc-900 border border-zinc-200 hover:shadow-lg dark:bg-zinc-950 dark:text-white dark:border-zinc-800"
                                                >
                                                    Source <Code2 className="h-4 w-4"/>
                                                </MagneticButton>
                                            )}
                                            <MagneticButton
                                                onClick={onClose}
                                                className="bg-zinc-100 text-zinc-900 hover:shadow-lg dark:bg-zinc-900 dark:text-zinc-50"
                                            >
                                                Close
                                            </MagneticButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}