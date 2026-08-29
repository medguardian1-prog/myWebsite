"use client";

import { FilamentIcon } from "./Icons";

const TOP = [
  "Custom built",
  "Live in days",
  "R3,300 flat",
  "21 days free support",
  "Built in Durban",
];

const BOTTOM = [
  "No templates",
  "No monthly lock-in",
  "Mobile first",
  "Loads fast",
  "Wired to your WhatsApp",
  "Working across SA",
];

/**
 * Two counter-scrolling rails. Pure CSS keyframes rather than a scroll-linked
 * animation — it runs on the compositor and costs nothing on a mid-range phone.
 */
export default function Ticker() {
  return (
    <div
      aria-hidden
      className="relative select-none border-y border-hairline bg-ink-2/40 py-5 md:py-7"
    >
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
        <div
          className="flex shrink-0 animate-marquee items-center gap-10 pr-10 md:gap-16 md:pr-16"
          style={{ ["--marquee-duration" as string]: "46s" }}
        >
          {[...TOP, ...TOP].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 md:gap-16">
              <span className="font-display text-[clamp(1.5rem,3.6vw,3rem)] leading-none tracking-[-0.02em] whitespace-nowrap text-bone">
                {t}
              </span>
              <FilamentIcon className="size-5 shrink-0 text-filament md:size-6" />
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)] md:mt-4">
        <div
          className="flex shrink-0 animate-marquee items-center gap-8 pr-8 md:gap-12 md:pr-12"
          style={{
            ["--marquee-duration" as string]: "38s",
            animationDirection: "reverse",
          }}
        >
          {[...BOTTOM, ...BOTTOM].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-8 md:gap-12">
              <span className="label whitespace-nowrap !text-ash">{t}</span>
              <span className="size-1 shrink-0 rounded-full bg-volt" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
