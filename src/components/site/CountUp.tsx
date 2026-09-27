"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EASE } from "@/lib/motion";

/**
 * Counts the number inside a string up from zero the first time it's seen —
 * "R3,300" runs R0 → R3,300, "21 days" runs 0 → 21 — like an instrument
 * cluster sweeping on at ignition. Whatever sits around the number is left
 * alone, and the final string is always exactly what was passed in, so the
 * copy in `site.ts` stays the source of truth.
 *
 * Server-renders the finished value, so the number is readable (and
 * indexable) before any script runs.
 */
export default function CountUp({
  value,
  duration = 1.6,
  delay = 0,
  className,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotionSafe();
  const match = useMemo(() => value.match(/^(\D*)([\d,]+)(.*)$/), [value]);
  const [text, setText] = useState(value);
  const armed = useRef(false);

  // Drop to zero before first paint in view, so the sweep has somewhere to
  // start from. Only when we're actually going to animate.
  useEffect(() => {
    if (!match || reduce || armed.current) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Already on screen at load (above the fold): count immediately.
    armed.current = true;
    if (r.top > window.innerHeight) setText(`${match[1]}0${match[3]}`);
  }, [match, reduce]);

  useEffect(() => {
    if (!inView || !match || reduce) return;
    const [, pre, num, post] = match;
    const target = Number(num.replace(/,/g, ""));
    const grouped = num.includes(",");
    const controls = animate(0, target, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        const n = Math.round(v);
        setText(`${pre}${grouped ? n.toLocaleString("en-US") : n}${post}`);
      },
      onComplete: () => setText(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}
