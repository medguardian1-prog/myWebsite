"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, contact } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { SplitWords, FadeUp } from "./TextReveal";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./Icons";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * Objection handling, on the page rather than waiting in a WhatsApp thread.
 *
 * Every question here is one someone silently asks the moment they read
 * "R3,300" — who owns it, what does hosting cost, what about the domain, what
 * happens when the free support ends. Unanswered, each one is a reason to
 * close the tab. The answers are also emitted as FAQPage structured data from
 * the layout, which is how they can appear directly in a Google result.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-ink px-[var(--gutter)] py-24 md:py-36"
    >
      <div className="flex items-baseline gap-4">
        <span className="label !text-filament">(06)</span>
        <span className="label">Before you ask</span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <SplitWords
          as="h2"
          text="The questions everyone asks."
          className="max-w-[13ch] font-display text-[clamp(2.3rem,6.2vw,5.6rem)] leading-[0.92] tracking-[-0.035em]"
        />
        <FadeUp delay={0.1}>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-ash md:text-base">
            Answered here rather than after you&rsquo;ve committed. If
            something isn&rsquo;t covered, message me and I&rsquo;ll tell you
            straight.
          </p>
        </FadeUp>
      </div>

      <FadeUp y={30}>
        <ul className="mt-14 border-t border-hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-hairline">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-7"
                  >
                    <span className="font-mono text-[10px] tabular-nums text-ash-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[clamp(1.15rem,2.4vw,1.75rem)] leading-tight tracking-[-0.015em] transition-colors duration-400",
                        isOpen ? "text-bone" : "text-bone/80 group-hover:text-bone",
                      )}
                    >
                      {f.q}
                    </span>
                    {/* Plus that becomes a minus — one bar rotates, nothing else. */}
                    <span aria-hidden className="relative size-4 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ash transition-colors duration-400 group-hover:bg-filament" />
                      <span
                        className={cn(
                          "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ash transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-filament",
                          isOpen && "rotate-90 opacity-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-7 pl-[calc(0.625rem+1.25rem)] text-[14.5px] leading-relaxed text-ash md:pl-[calc(0.625rem+2rem)] md:text-[15px]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Magnetic strength={0.26}>
            <Button asChild variant="filament" shape="pill">
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                Ask me something else
              </a>
            </Button>
          </Magnetic>
          <span className="label !text-ash-dim">Usually replies same day</span>
        </div>
      </FadeUp>
    </section>
  );
}
