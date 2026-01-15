import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cx, clamp } from "../lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      setOffset({ x: clamp(mx * 0.12, -10, 10), y: clamp(my * 0.12, -10, 10) });
    };

    const onLeave = () => setOffset({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove as any);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as any);
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
      : ({ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` } as any),
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

