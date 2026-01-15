import React from "react";
import { cx } from "../lib/utils";

export default function GlassCard({
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