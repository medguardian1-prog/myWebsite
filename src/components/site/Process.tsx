"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/site";
import { SplitWords, FadeUp } from "./TextReveal";
import { cn } from "@/lib/utils";

/**
 * Four steps strung along a wire that charges as you scroll past it. The node
 * for each step goes live the moment the current reaches it.
 */
export default function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const chargeRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    if (!wrap) return;

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top 78%",
      end: "bottom 62%",
      scrub: true,
      onUpdate: (self) => {
        if (chargeRef.current) {
          chargeRef.current.style.transform = `scaleY(${self.progress})`;
        }
        // Light each node as the current passes it, not before.
        const n = Math.min(
          processSteps.length,
          Math.floor(self.progress * processSteps.length + 0.35),
        );
        setReached((prev) => (prev === n ? prev : n));
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="process" className="relative bg-ink px-[var(--gutter)] py-24 md:py-36">
      <div className="flex items-baseline gap-4">
        <span className="label !text-filament">(03)</span>
        <span className="label">How it runs</span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <SplitWords
          as="h2"
          text="Four steps. Starts with a message."
          className="max-w-[13ch] font-display text-[clamp(2.3rem,6.2vw,5.6rem)] leading-[0.92] tracking-[-0.035em]"
        />
        <FadeUp delay={0.1}>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-ash md:text-base">
            No briefs to fill in, no discovery workshop, no account manager. You
            talk to the person building the thing, start to finish.
          </p>
        </FadeUp>
      </div>

      <div ref={wrapRef} className="relative mt-16 md:mt-24">
        {/* The wire itself */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-hairline md:left-[11px]"
        >
          <div
            ref={chargeRef}
            className="h-full w-full origin-top scale-y-0 [background:linear-gradient(to_bottom,var(--color-filament-hot),var(--color-filament),var(--color-filament-gold),var(--color-volt))]"
          />
        </div>

        <ol className="flex flex-col">
          {processSteps.map((s, i) => {
            const live = i < reached;
            return (
              <li
                key={s.n}
                className="group relative grid gap-4 pb-14 pl-10 last:pb-0 md:grid-cols-[13rem_1fr] md:gap-10 md:pl-16"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1 grid size-4 place-items-center rounded-full border transition-all duration-700 md:size-6",
                    live
                      ? "border-volt bg-volt/15"
                      : "border-hairline bg-ink",
                  )}
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-700",
                      live ? "size-1.5 bg-volt md:size-2" : "size-1 bg-ash-dim",
                    )}
                  />
                </span>

                <div className="flex items-baseline gap-4 md:flex-col md:gap-3">
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.2em] transition-colors duration-700",
                      live ? "text-volt" : "text-ash-dim",
                    )}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-display text-[clamp(1.7rem,4vw,2.6rem)] leading-none tracking-[-0.02em]">
                    {s.title}
                  </h3>
                </div>

                <p className="max-w-[52ch] text-[15px] leading-relaxed text-ash md:pt-1">
                  {s.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
