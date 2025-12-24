import './index.css'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {motion, AnimatePresence, useReducedMotion} from "framer-motion";
import {
    ArrowRight,
    Briefcase,
    Code2,
    Download,
    ExternalLink,
    // Github,
    // Linkedin,
    Mail,
    MapPin,
    Moon,
    Phone,
    Sun,
    Link
} from "lucide-react";

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function formatYearRange(start: string, end?: string) {
    return end ? `${start} – ${end}` : `${start} – Present`;
}

import { PROFILE } from "./data";

import { NAV } from "./data";

import { HIGHLIGHTS } from "./data";

import { SKILLS } from "./data";

import { EXPERIENCE } from "./data";

import type { Project } from "./data";

import { PROJECTS } from "./data";

const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
    fadeUp: {
        hidden: {opacity: 0, y: 18},
        visible: {opacity: 1, y: 0, transition: {duration: 0.65, ease}},
    },
    fade: {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 0.55, ease}},
    },
    stagger: {
        hidden: {},
        visible: {
            transition: {staggerChildren: 0.08, delayChildren: 0.08},
        },
    },
};

function useActiveSection(sectionIds: string[]) {
    const [active, setActive] = useState(sectionIds[0] ?? "home");

    useEffect(() => {
        const els = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
                if (visible[0]?.target?.id) setActive(visible[0].target.id);
            },
            {
                root: null,
                rootMargin: "-20% 0px -65% 0px",
                threshold: [0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
            }
        );

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [sectionIds]);

    return active;
}

function useScrollProgress() {
    const [p, setP] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement;
            const scrollTop = doc.scrollTop;
            const max = doc.scrollHeight - doc.clientHeight;
            const pct = max > 0 ? scrollTop / max : 0;
            setP(clamp(pct, 0, 1));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return p;
}

function Section({
                     id,
                     eyebrow,
                     title,
                     children,
                     className,
                 }: {
    id: string;
    eyebrow: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    const reduce = useReducedMotion();

    return (
        <section id={id} className={cx("scroll-mt-24", className)}>
            <motion.div
                initial={reduce ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
                variants={variants.fadeUp}
                className="mb-8"
            >
                <div className="text-xs font-medium tracking-[0.22em] uppercase text-zinc-500 dark:text-zinc-400">
                    {eyebrow}
                </div>
                <div className="mt-2 flex items-end justify-between gap-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {title}
                    </h2>
                    <div className="hidden sm:block h-px flex-1 bg-zinc-200 dark:bg-zinc-800"/>
                </div>
            </motion.div>
            {children}
        </section>
    );
}

function Pill({children}: { children: React.ReactNode }) {
    return (
        <span
            className="inline-flex items-center rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-200 shadow-sm">
      {children}
    </span>
    );
}

function GlassCard({
                       children,
                       className,
                   }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cx(
                "rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
                className
            )}
        >
            {children}
        </div>
    );
}

function MagneticButton({
                            children,
                            className,
                            onClick,
                            href,
                            target,
                            rel,
                        }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
}) {
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
    const reduce = useReducedMotion();

    const [offset, setOffset] = useState({x: 0, y: 0});

    useEffect(() => {
        const el = ref.current;
        if (!el || reduce) return;

        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const mx = e.clientX - (r.left + r.width / 2);
            const my = e.clientY - (r.top + r.height / 2);
            setOffset({x: clamp(mx * 0.12, -10, 10), y: clamp(my * 0.12, -10, 10)});
        };

        const onLeave = () => setOffset({x: 0, y: 0});

        // @ts-ignore
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            // @ts-ignore
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [reduce]);

    const shared = {
        ref: (node: any) => {
            ref.current = node;
        },
        className: cx(
            "relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
            "transition-shadow",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600",
            className
        ),
        style: reduce
            ? undefined
            : ({transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`} as any),
        onClick,
    };

    if (href) {
        return (
            <a href={href} target={target} rel={rel} {...(shared as any)}>
                {children}
            </a>
        );
    }

    return (
        <button type="button" {...(shared as any)}>
            {children}
        </button>
    );
}

function ProjectModal({
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

function SkillBar({name, level}: { name: string; level: number }) {
    const reduce = useReducedMotion();
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    {name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{level}%</div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <motion.div
                    initial={reduce ? {width: `${level}%`} : {width: 0}}
                    whileInView={{width: `${level}%`}}
                    viewport={{once: true, amount: 0.6}}
                    transition={{duration: 0.9, ease}}
                    className="h-full rounded-full bg-zinc-900 dark:bg-white"
                />
            </div>
        </div>
    );
}

function FloatingOrbs() {
    const reduce = useReducedMotion();
    if (reduce) return null;

    const orb =
        "absolute rounded-full blur-2xl opacity-40 mix-blend-multiply dark:mix-blend-screen";

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                className={cx(orb, "h-64 w-64 bg-zinc-200 dark:bg-zinc-700", "-left-20 -top-16")}
                animate={{x: [0, 40, 0], y: [0, 18, 0], scale: [1, 1.12, 1]}}
                transition={{duration: 10, repeat: Infinity, ease}}
            />
            <motion.div
                className={cx(orb, "h-72 w-72 bg-zinc-300 dark:bg-zinc-800", "right-[-80px] top-10")}
                animate={{x: [0, -30, 0], y: [0, 28, 0], scale: [1, 1.1, 1]}}
                transition={{duration: 12, repeat: Infinity, ease, delay: 0.6}}
            />
            <motion.div
                className={cx(orb, "h-56 w-56 bg-zinc-200 dark:bg-zinc-700", "left-10 bottom-[-70px]")}
                animate={{x: [0, 22, 0], y: [0, -18, 0], scale: [1, 1.08, 1]}}
                transition={{duration: 11, repeat: Infinity, ease, delay: 1.1}}
            />
        </div>
    );
}

export default function PortfolioPage() {
    const sectionIds = useMemo(() => NAV.map((n) => n.id), []);
    const active = useActiveSection(sectionIds);
    const progress = useScrollProgress();

    const reduce = useReducedMotion();

    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [selected, setSelected] = useState<Project | null>(null);

    useEffect(() => {
        const stored =
            (typeof window !== "undefined" &&
                (localStorage.getItem("portfolio_theme") as any)) ||
            null;

        const prefersDark =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initial: "light" | "dark" = stored ?? (prefersDark ? "dark" : "light");
        setTheme(initial);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        try {
            localStorage.setItem("portfolio_theme", theme);
        } catch {
        }
    }, [theme]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({behavior: "smooth", block: "start"});
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
            {/* Top progress */}
            <div className="fixed left-0 top-0 z-[80] h-1 w-full bg-transparent">
                <motion.div
                    className="h-full bg-zinc-900 dark:bg-white"
                    style={{width: `${progress * 100}%`}}
                />
            </div>

            {/* Decorative */}
            <div className="relative">
                <FloatingOrbs/>
            </div>

            {/* Header */}
            <header
                className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                    <button
                        onClick={() => scrollTo("home")}
                        className="group inline-flex items-center gap-2"
                        aria-label="Go to top"
                    >
            <span
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
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
                  transition={{duration: 3.6, repeat: Infinity, ease}}
              />
              <span className="font-semibold">DL</span>
            </span>
                        <div className="leading-tight text-left">
                            <div className="text-sm font-semibold">{PROFILE.name}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {PROFILE.role}
                            </div>
                        </div>
                    </button>

                    <nav
                        className="hidden md:flex items-center gap-1 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 p-1">
                        {NAV.map((item) => {
                            const isActive = active === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
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
                                            transition={{type: "spring", stiffness: 520, damping: 40}}
                                        />
                                    )}
                                    <span className="relative">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <MagneticButton
                            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4"/>
                            ) : (
                                <Moon className="h-4 w-4"/>
                            )}
                            <span className="hidden sm:inline">Theme</span>
                        </MagneticButton>
                        <MagneticButton
                            href={PROFILE.links.cv}
                            className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                        >
                            <Download className="h-4 w-4"/>
                            <span className="hidden sm:inline">CV</span>
                        </MagneticButton>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* HERO */}
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
                                <span className="h-2 w-2 rounded-full bg-emerald-500"/>
                                Available for freelance / new opportunities
                            </motion.div>

                            <motion.h1
                                variants={variants.fadeUp}
                                className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight"
                            >
                                Building modern UI,
                                <span className="block text-zinc-700 dark:text-zinc-200">
                  powered by motion.
                </span>
                            </motion.h1>

                            <motion.p
                                variants={variants.fadeUp}
                                className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed"
                            >
                                {PROFILE.tagline}
                            </motion.p>

                            <motion.div
                                variants={variants.fadeUp}
                                className="mt-6 flex flex-wrap items-center gap-3"
                            >
                                <MagneticButton
                                    onClick={() => scrollTo("projects")}
                                    className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                                >
                                    View projects <ArrowRight className="h-4 w-4"/>
                                </MagneticButton>
                                <MagneticButton
                                    onClick={() => scrollTo("contact")}
                                    className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                                >
                                    Contact <Mail className="h-4 w-4"/>
                                </MagneticButton>

                                <div className="ml-0 sm:ml-2 flex items-center gap-2">
                                    <a
                                        href={PROFILE.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition"
                                        aria-label="GitHub"
                                    >
                                        <Code2 className="h-4 w-4"/>
                                    </a>
                                    <a
                                        href={PROFILE.links.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition"
                                        aria-label="LinkedIn"
                                    >
                                        <Link className="h-4 w-4"/>
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={variants.fadeUp}
                                className="mt-7 flex flex-wrap gap-2"
                            >
                                <Pill>
                                    <MapPin className="h-3.5 w-3.5 mr-2"/> {PROFILE.location}
                                </Pill>
                                <Pill>
                                    <Code2 className="h-3.5 w-3.5 mr-2"/> React • TS • UI Motion
                                </Pill>
                                <Pill>
                                    <Briefcase className="h-3.5 w-3.5 mr-2"/> 2+ yrs experience
                                </Pill>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={reduce ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{once: true, amount: 0.35}}
                            variants={variants.fade}
                            className="lg:col-span-5"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                            Snapshot
                                        </div>
                                        <div className="mt-1 text-lg font-semibold">
                                            What I do best
                                        </div>
                                    </div>
                                    <div className="h-10 w-10 rounded-2xl bg-zinc-900/10 dark:bg-white/10"/>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {HIGHLIGHTS.map((h) => (
                                        <motion.div
                                            key={h.title}
                                            whileHover={reduce ? undefined : {y: -2}}
                                            transition={{duration: 0.2, ease}}
                                            className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900/10 dark:bg-white/10">
                                                    <h.icon className="h-4 w-4"/>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold">
                                                        {h.title}
                                                    </div>
                                                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                                                        {h.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["React", "TypeScript", "Tailwind", "Motion", "Odoo", "Mobiscroll"].map(
                                        (t) => (
                                            <Pill key={t}>{t}</Pill>
                                        )
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </section>

                {/* ABOUT */}
                <Section id="about" eyebrow="About" title="A bit about me" className="py-12">
                    <div className="grid lg:grid-cols-12 gap-6">
                        <motion.div
                            initial={reduce ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{once: true, amount: 0.25}}
                            variants={variants.fadeUp}
                            className="lg:col-span-7"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <p className="text-zinc-700 dark:text-zinc-200 leading-relaxed">
                                    I’m a frontend developer who cares about clean UI, solid
                                    performance, and small details that make products feel premium.
                                    I enjoy building reusable component systems, polishing
                                    interactions, and translating designs into responsive,
                                    accessible experiences.
                                </p>

                                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                                    <div
                                        className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4">
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Focus
                                        </div>
                                        <div className="mt-1 text-sm font-semibold">
                                            Motion + Usability
                                        </div>
                                        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                            Smooth transitions, micro-interactions, and clean UX.
                                        </div>
                                    </div>
                                    <div
                                        className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4">
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Strength
                                        </div>
                                        <div className="mt-1 text-sm font-semibold">
                                            Component Architecture
                                        </div>
                                        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                            Reusable patterns, predictable state, maintainable code.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Performance", "A11y", "Design Systems", "API Integration"].map(
                                        (t) => (
                                            <Pill key={t}>{t}</Pill>
                                        )
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>

                        <motion.div
                            initial={reduce ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{once: true, amount: 0.25}}
                            variants={variants.fadeUp}
                            className="lg:col-span-5"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                    Quick facts
                                </div>
                                <div className="mt-4 space-y-3 text-sm">
                                    <div
                                        className="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 px-4 py-3">
                                        <span className="text-zinc-600 dark:text-zinc-300">Role</span>
                                        <span className="font-medium">{PROFILE.role}</span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 px-4 py-3">
                                        <span className="text-zinc-600 dark:text-zinc-300">Location</span>
                                        <span className="font-medium">{PROFILE.location}</span>
                                    </div>
                                    <div
                                        className="flex items-center justify-between rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 px-4 py-3">
                                        <span className="text-zinc-600 dark:text-zinc-300">Stack</span>
                                        <span className="font-medium">React + TS</span>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                        Contact
                                    </div>
                                    <div className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                                        <a
                                            className="flex items-center gap-2 hover:underline"
                                            href={`mailto:${PROFILE.email}`}
                                        >
                                            <Mail className="h-4 w-4"/> {PROFILE.email}
                                        </a>
                                        <a
                                            className="flex items-center gap-2 hover:underline"
                                            href={`tel:${PROFILE.phone}`}
                                        >
                                            <Phone className="h-4 w-4"/> {PROFILE.phone}
                                        </a>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </Section>

                {/* SKILLS */}
                <Section id="skills" eyebrow="Skills" title="What I use to build" className="py-12">
                    <div className="grid lg:grid-cols-12 gap-6">
                        <motion.div
                            initial={reduce ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{once: true, amount: 0.25}}
                            variants={variants.fadeUp}
                            className="lg:col-span-7"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <div className="grid gap-4">
                                    {SKILLS.map((s) => (
                                        <SkillBar key={s.name} name={s.name} level={s.level}/>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>

                        <motion.div
                            initial={reduce ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{once: true, amount: 0.25}}
                            variants={variants.fadeUp}
                            className="lg:col-span-5"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                    Motion presets
                                </div>
                                <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                    This template includes: scroll reveal, magnetic buttons,
                                    animated nav pill, hover depth, and modal transitions — with
                                    <span className="font-medium text-zinc-800 dark:text-zinc-100">
                    {" "}reduced motion{" "}
                  </span>
                                    support.
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    {["Scroll reveal", "Hover lift", "Nav pill", "Modal", "Orbs", "Progress"].map(
                                        (t) => (
                                            <div
                                                key={t}
                                                className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4"
                                            >
                                                <div className="text-sm font-semibold">{t}</div>
                                                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                    Smooth & subtle
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </Section>

                {/* WORK */}
                <Section id="work" eyebrow="Work" title="Experience" className="py-12">
                    <div className="grid gap-4">
                        {EXPERIENCE.map((job, idx) => (
                            <motion.div
                                key={`${job.company}-${job.role}`}
                                initial={reduce ? "visible" : "hidden"}
                                whileInView="visible"
                                viewport={{once: true, amount: 0.25}}
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
                                                <div className="h-3 w-3 rounded-full bg-zinc-900 dark:bg-white"/>
                                                {idx !== EXPERIENCE.length - 1 && (
                                                    <div
                                                        className="mx-auto mt-2 h-[calc(100%-12px)] w-px bg-zinc-200 dark:bg-zinc-800"/>
                                                )}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-11">
                                            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                                                {job.bullets.map((b) => (
                                                    <li key={b} className="flex gap-2">
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400"/>
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
                </Section>

                {/* PROJECTS */}
                <Section id="projects" eyebrow="Projects" title="Selected work" className="py-12">
                    <motion.div
                        initial={reduce ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{once: true, amount: 0.2}}
                        variants={variants.stagger}
                        className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
                    >
                        {PROJECTS.map((p) => (
                            <motion.button
                                key={p.title}
                                variants={variants.fadeUp}
                                whileHover={reduce ? undefined : {y: -4}}
                                whileTap={reduce ? undefined : {scale: 0.98}}
                                transition={{duration: 0.25, ease}}
                                onClick={() => setSelected(p)}
                                className="text-left"
                            >
                                <GlassCard className="overflow-hidden">
                                    <div className="relative h-44">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{backgroundImage: `url(${p.image})`}}
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent"/>
                                        <div className="absolute left-4 right-4 bottom-4">
                                            <div className="flex flex-wrap gap-2">
                                                {p.tags.slice(0, 3).map((t) => (
                                                    <Pill key={t}>{t}</Pill>
                                                ))}
                                            </div>
                                            <div className="mt-3 text-lg font-semibold text-white">
                                                {p.title}
                                            </div>
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
                                                Details <ArrowRight className="h-4 w-4"/>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.button>
                        ))}
                    </motion.div>

                    {selected && <ProjectModal project={selected} onClose={() => setSelected(null)}/>}
                </Section>

                {/* CONTACT */}
                <Section id="contact" eyebrow="Contact" title="Let’s build something" className="py-12">
                    <div className="grid lg:grid-cols-12 gap-6">
                        <motion.div
                            initial={reduce ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{once: true, amount: 0.25}}
                            variants={variants.fadeUp}
                            className="lg:col-span-7"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                    If you want a portfolio, landing page, or product UI with smooth
                                    motion — message me.
                                </div>

                                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                                    <a
                                        href={`mailto:${PROFILE.email}`}
                                        className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4 hover:shadow-lg transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900/10 dark:bg-white/10">
                                                <Mail className="h-4 w-4"/>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">Email</div>
                                                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                                    {PROFILE.email}
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a
                                        href={`tel:${PROFILE.phone}`}
                                        className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4 hover:shadow-lg transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900/10 dark:bg-white/10">
                                                <Phone className="h-4 w-4"/>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">Phone</div>
                                                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                                    {PROFILE.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <MagneticButton
                                        href={PROFILE.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                                    >
                                        <Code2 className="h-4 w-4"/> GitHub
                                    </MagneticButton>
                                    <MagneticButton
                                        href={PROFILE.links.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                                    >
                                        <Link className="h-4 w-4"/> LinkedIn
                                    </MagneticButton>
                                    <MagneticButton
                                        href={PROFILE.links.cv}
                                        className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                                    >
                                        <Download className="h-4 w-4"/> Download CV
                                    </MagneticButton>
                                </div>
                            </GlassCard>
                        </motion.div>

                        <motion.div
                            initial={reduce ? "visible" : "hidden"}
                            whileInView="visible"
                            viewport={{once: true, amount: 0.25}}
                            variants={variants.fadeUp}
                            className="lg:col-span-5"
                        >
                            <GlassCard className="p-5 sm:p-6">
                                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                    Built-in polish
                                </div>
                                <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                    This page uses subtle glass surfaces, typographic hierarchy,
                                    responsive grids, and consistent spacing. Motion is smooth but
                                    not distracting.
                                </div>

                                <div
                                    className="mt-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/60 p-4">
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Tip
                                    </div>
                                    <div className="mt-1 text-sm">
                                        Replace the <span className="font-medium">PROFILE</span>,
                                        <span className="font-medium"> PROJECTS</span>, and
                                        <span className="font-medium"> EXPERIENCE</span> arrays at
                                        the top — the layout updates automatically.
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </Section>

                {/* FOOTER */}
                <footer className="py-10">
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <div>
                            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
                        </div>
                        <div className="flex items-center gap-3">
                            <a className="hover:underline" href={PROFILE.links.github}>
                                GitHub
                            </a>
                            <span className="opacity-40">/</span>
                            <a className="hover:underline" href={PROFILE.links.linkedin}>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
