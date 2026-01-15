import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../lib/utils";
import { variants } from "../lib/animation";

export default function SectionCus({
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