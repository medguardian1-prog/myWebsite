/** Shared easing curve. Typed as a tuple so Framer Motion accepts it. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Heavier curtain curve, for full-screen wipes. */
export const EASE_WIPE: [number, number, number, number] = [0.83, 0, 0.17, 1];

/**
 * Linear ramp for scroll-linked values: maps `v` across [a, b] onto [from, to],
 * clamped. Used through `useTransform(progress, ramp(...))` rather than the
 * array form on purpose — the array form lets Framer hand the animation to a
 * native ScrollTimeline, which mis-maps target offsets on pinned (sticky)
 * sections and leaves them stuck. The function form always runs on the JS
 * frame loop and always matches the scroll position.
 */
export function ramp(a: number, b: number, from: number, to: number): (v: number) => number;
export function ramp(
  a: number,
  b: number,
  from: number,
  to: number,
  unit: string,
): (v: number) => string;
export function ramp(a: number, b: number, from: number, to: number, unit?: string) {
  return (v: number) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
    const n = from + (to - from) * t;
    return unit ? `${n}${unit}` : n;
  };
}
