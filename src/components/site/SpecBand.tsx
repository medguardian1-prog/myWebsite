import { specs, turnaround } from "@/lib/site";

/**
 * Replaces the scrolling marquee that used to sit here. A ticker is motion for
 * its own sake; these are the four numbers a business owner is actually trying
 * to find out, so they get to sit still and be read.
 */
export default function SpecBand() {
  return (
    <section
      aria-label="What it costs and how long it takes"
      className="border-y border-hairline bg-ink-2/50"
    >
      <dl className="mx-auto grid max-w-[1700px] grid-cols-2 gap-px bg-hairline lg:grid-cols-4">
        {specs.map((s) => (
          <div
            key={s.value}
            className="flex flex-col justify-between gap-6 bg-ink px-[clamp(1.25rem,3vw,2.75rem)] py-8 md:py-11"
          >
            <dd className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none tracking-[-0.025em] text-bone">
              {s.value}
            </dd>
            <dt className="label max-w-[18ch] leading-relaxed">{s.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mx-auto max-w-[1700px] border-t border-hairline px-[var(--gutter)] py-3.5 text-[12px] text-ash-dim">
        {turnaround.detail} No deposit schedule, no retainer, no lock-in.
      </p>
    </section>
  );
}
