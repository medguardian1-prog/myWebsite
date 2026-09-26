"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { turnaround } from "@/lib/site";

/**
 * An instrument, not an illustration: the turnaround drawn as a dial.
 *
 * On load it does what a performance car's cluster does at ignition — the
 * needle sweeps the whole scale and falls back to rest — and then it settles
 * on the number that matters: five business days. Scroll hard and it revs
 * with you, then drops back to five as you slow down. The only thing it ever
 * *reads* is the real turnaround from `site.ts`.
 */

const MAX = 10;
const SWEEP = 270; // degrees of travel, -135° → +135°
const C = 160; // centre
const R = 128; // arc radius

const angleFor = (v: number) => -SWEEP / 2 + (v / MAX) * SWEEP;

function polar(deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  // Rounded so server and client serialise identical attribute strings.
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(C + r * Math.sin(a)), y: round(C - r * Math.cos(a)) };
}

const ARC = (() => {
  const s = polar(-SWEEP / 2, R);
  const e = polar(SWEEP / 2, R);
  return `M${s.x},${s.y} A${R},${R} 0 1 1 ${e.x},${e.y}`;
})();

const TICKS = Array.from({ length: MAX * 5 + 1 }, (_, i) => {
  const v = i / 5;
  const major = i % 5 === 0;
  const a = angleFor(v);
  const o = polar(a, R - 10);
  const n = polar(a, R - (major ? 26 : 17));
  const t = polar(a, R - 42);
  return { v, major, o, n, t };
});

export default function HeroGauge({ className }: { className?: string }) {
  const rest = Number(turnaround.value) || 5;
  const reduce = useReducedMotionSafe();
  const still = useRef(false);
  still.current = reduce;

  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const rev = useTransform(velocity, (v) =>
    still.current ? 0 : Math.min(MAX - rest, Math.abs(v) / 700),
  );
  const raw = useTransform([base, rev], ([b, r]: number[]) => Math.min(MAX, b + r));
  const value = useSpring(raw, { stiffness: 140, damping: 18, mass: 0.6 });

  const rotate = useTransform(value, (v) => angleFor(v));
  const fill = useTransform(value, (v) => v / MAX);
  const readout = useTransform(value, (v) => String(Math.round(v)).padStart(2, "0"));

  useEffect(() => {
    if (reduce) {
      base.set(rest);
      return;
    }
    // Ignition sweep: full scale, a beat, then fall back to the real figure.
    const seq = animate(base, [0, MAX, MAX, rest], {
      duration: 2.2,
      times: [0, 0.38, 0.5, 1],
      ease: [0.33, 1, 0.68, 1],
      delay: 0.5,
    });
    return () => seq.stop();
  }, [base, reduce, rest]);

  return (
    <figure
      className={className}
      aria-label={`Turnaround: ${turnaround.label}, from go-ahead to live`}
    >
      <svg viewBox="0 0 320 300" className="h-auto w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="gauge-heat" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stopColor="var(--color-filament-hot)" />
            <stop offset="0.5" stopColor="var(--color-filament)" />
            <stop offset="1" stopColor="var(--color-filament-gold)" />
          </linearGradient>
          <radialGradient id="gauge-glow">
            <stop offset="0" stopColor="rgba(255,122,26,0.18)" />
            <stop offset="1" stopColor="rgba(255,122,26,0)" />
          </radialGradient>
        </defs>

        <circle cx={C} cy={C} r={R + 24} fill="url(#gauge-glow)" />

        {/* Bezel */}
        <circle cx={C} cy={C} r={R + 12} fill="none" stroke="var(--color-hairline)" />
        <circle
          cx={C}
          cy={C}
          r={R + 16}
          fill="none"
          stroke="var(--color-hairline)"
          strokeDasharray="1 5"
        />

        {/* Track, then the lit portion up to the needle */}
        <path d={ARC} fill="none" stroke="var(--color-ink-3)" strokeWidth={3} />
        <motion.path
          d={ARC}
          fill="none"
          stroke="url(#gauge-heat)"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ pathLength: fill }}
        />

        {/* Scale */}
        {TICKS.map(({ v, major, o, n, t }) => (
          <g key={v}>
            <line
              x1={o.x}
              y1={o.y}
              x2={n.x}
              y2={n.y}
              stroke={major ? "var(--color-bone)" : "var(--color-ash-dim)"}
              strokeOpacity={major ? 0.9 : 0.5}
              strokeWidth={major ? 1.5 : 1}
            />
            {major && (
              <text
                x={t.x}
                y={t.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-ash font-mono"
                fontSize={10}
                letterSpacing="0.05em"
              >
                {v}
              </text>
            )}
          </g>
        ))}

        {/* Rest marker at the real turnaround */}
        {(() => {
          const p = polar(angleFor(rest), R + 5);
          return <circle cx={p.x} cy={p.y} r={3} fill="var(--color-filament)" />;
        })()}

        {/* Needle */}
        <motion.g style={{ rotate, originX: `${C}px`, originY: `${C}px` }}>
          <line
            x1={C}
            y1={C + 18}
            x2={C}
            y2={C - R + 20}
            stroke="var(--color-filament)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,122,26,0.8))" }}
          />
        </motion.g>
        <circle cx={C} cy={C} r={7} fill="var(--color-ink)" stroke="var(--color-filament)" strokeWidth={1.5} />

        {/* Readout */}
        <motion.text
          x={C}
          y={C + 64}
          textAnchor="middle"
          className="fill-bone font-display"
          fontSize={50}
          letterSpacing="-0.02em"
        >
          {readout}
        </motion.text>
        <text
          x={C}
          y={C + 124}
          textAnchor="middle"
          className="fill-ash font-mono"
          fontSize={8.5}
          letterSpacing="0.28em"
        >
          BUSINESS DAYS · TO LIVE
        </text>
      </svg>
    </figure>
  );
}
