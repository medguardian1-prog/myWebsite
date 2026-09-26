import { specs, turnaround } from "@/lib/site";
import CountUp from "./CountUp";

/**
 * Replaces the scrolling marquee that used to sit here. A ticker is motion for
 * its own sake; these are the four numbers a business owner is actually trying
 * to find out, so they get to sit still and be read.
 *
 * Read like a spec sheet on a performance car: each figure sweeps up from zero
 * once as it arrives, then holds. Hover a cell and its gauge line runs hot.
 */
export default function SpecBand() {
  return (
    <section
      aria-label="What it costs and how long it takes"
      className="relative z-10 border-y border-hairline bg-ink-2/50"
    >
      <dl className="mx-auto grid max-w-[1700px] grid-cols-2 gap-px bg-hairline lg:grid-cols-4">
        {specs.map((s, i) => (
          <div
            key={s.value}
            className="group relative flex flex-col justify-between gap-6 overflow-hidden bg-ink px-[clamp(1.25rem,3vw,2.75rem)] py-8 transition-colors duration-700 hover:bg-ink-2 md:py-11"
          >
            <span
              aria-hidden
              className="absolute right-[clamp(1.25rem,3vw,2.75rem)] top-5 font-mono text-[9px] tracking-[0.2em] text-ash-dim transition-colors duration-500 group-hover:text-filament md:top-7"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <dd className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none tracking-[-0.025em] text-bone">
              <CountUp value={s.value} delay={i * 0.12} />
            </dd>
            <dt className="label max-w-[18ch] leading-relaxed">{s.label}</dt>
            {/* Gauge line: resting hairline, runs hot on hover. */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 [background:var(--filament-gradient)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </div>
        ))}
      </dl>
      <p className="mx-auto max-w-[1700px] border-t border-hairline px-[var(--gutter)] py-3.5 text-[12px] text-ash-dim">
        {turnaround.detail} No deposit schedule, no retainer, no lock-in.
      </p>
    </section>
  );
}
