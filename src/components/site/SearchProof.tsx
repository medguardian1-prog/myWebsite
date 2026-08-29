"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { SplitWords, FadeUp } from "./TextReveal";
import { Button } from "@/components/ui/button";
import { SearchIcon, StarIcon, WhatsAppIcon } from "./Icons";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * Pays off the hero's claim by showing it: one drawn search results page,
 * toggled between the customer finding you and the customer not finding you.
 *
 * Deliberately not Google's branding — putting their logo on a fabricated
 * result implies an endorsement Vysan doesn't have. And deliberately one
 * panel, no side commentary: the earlier version explained the picture in a
 * second card, which is a sign the picture wasn't clear enough on its own.
 */

/** A competitor's listing — real enough to read, generic enough to be no one. */
function CompetitorRow({ rank }: { rank: number }) {
  return (
    <li className="flex gap-4 border-t border-hairline px-5 py-5 md:px-7">
      <span className="mt-1 font-mono text-[10px] tabular-nums text-ash-dim">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] tracking-[0.06em] text-ash-dim">
          competitor.co.za
        </p>
        <div className="mt-2 h-[10px] w-[46%] rounded-sm bg-ash-dim/45" />
        <div className="mt-2.5 h-[7px] w-[78%] rounded-sm bg-ash-dim/25" />
        <div className="mt-1.5 h-[7px] w-[58%] rounded-sm bg-ash-dim/25" />
      </div>
      <span className="hidden shrink-0 self-start rounded-full border border-hairline px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ash sm:block">
        Has a site
      </span>
    </li>
  );
}

export default function SearchProof() {
  const [found, setFound] = useState(true);

  return (
    <section id="found" className="relative bg-ink px-[var(--gutter)] py-24 md:py-36">
      <div className="flex items-baseline gap-4">
        <span className="label !text-filament">(01)</span>
        <span className="label">Why it matters</span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <SplitWords
          as="h2"
          text="What customers see when they search."
          className="max-w-[15ch] font-display text-[clamp(2.3rem,6.2vw,5.6rem)] leading-[0.92] tracking-[-0.035em]"
        />
        <FadeUp delay={0.1}>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-ash md:text-base">
            Same customer, same search. The only difference between the two
            views below is whether you have a website.
          </p>
        </FadeUp>
      </div>

      <FadeUp delay={0.06} y={30}>
        <div className="mx-auto mt-12 max-w-[860px]">
          {/* ---- the toggle ---- */}
          <div
            role="group"
            aria-label="Compare search results with and without a website"
            className="inline-flex rounded-full border border-hairline p-1"
          >
            {[
              { on: true, label: "With a website" },
              { on: false, label: "Without one" },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setFound(opt.on)}
                aria-pressed={found === opt.on}
                className={cn(
                  "relative rounded-full px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-500 md:px-5 md:text-[11px]",
                  found === opt.on ? "text-ink" : "text-ash hover:text-bone",
                )}
              >
                {found === opt.on && (
                  <motion.span
                    layoutId="search-toggle"
                    className="absolute inset-0 rounded-full bg-bone"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                <span className="relative">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* ---- the page ---- */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-ink-2">
            <div className="border-b border-hairline p-5 md:p-6">
              <span className="flex items-center gap-3 rounded-full border border-hairline bg-ink px-5 py-3.5">
                <SearchIcon className="size-4 shrink-0 text-ash-dim" />
                <span className="truncate text-[13px] text-bone md:text-[15px]">
                  plumber durban north
                </span>
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={found ? "found" : "missing"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {found ? (
                  <>
                    {/* You, first, doing the selling before anyone speaks to them. */}
                    <li className="relative px-5 py-6 md:px-7">
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[2px] bg-filament"
                      />
                      <div className="flex gap-4">
                        <span className="mt-1 font-mono text-[10px] tabular-nums text-filament">
                          01
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] tracking-[0.06em] text-ash">
                            yourbusiness.co.za
                          </p>
                          <p className="mt-1.5 font-display text-[clamp(1.15rem,2.2vw,1.55rem)] leading-tight tracking-[-0.015em] text-bone">
                            Your Business — Plumbing in Durban North
                          </p>
                          <p className="mt-2 max-w-[54ch] text-[13px] leading-relaxed text-ash">
                            Emergency call-outs, geysers, leak detection and
                            bathroom fit-outs. Same-day quotes — WhatsApp us any
                            time.
                          </p>
                          <div className="mt-3 flex items-center gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon key={i} className="size-3 text-filament-gold" />
                            ))}
                            <span className="ml-1.5 font-mono text-[10px] text-ash">
                              4.9 · 37 reviews
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <CompetitorRow rank={2} />
                    <CompetitorRow rank={3} />
                  </>
                ) : (
                  <>
                    <CompetitorRow rank={1} />
                    <CompetitorRow rank={2} />
                    <CompetitorRow rank={3} />
                    {/* And you: an empty seat where a listing should be. */}
                    <li className="border-t border-hairline px-5 py-6 md:px-7">
                      <div className="flex items-center gap-4 rounded-xl border border-dashed border-ash-dim/50 px-5 py-5">
                        <span className="font-mono text-[10px] text-ash-dim">—</span>
                        <div>
                          <p className="text-[14px] font-medium text-bone/90">
                            Your business isn&rsquo;t on this page.
                          </p>
                          <p className="mt-1 text-[12.5px] leading-relaxed text-ash">
                            The customer never finds out you exist — they just
                            call whoever came first.
                          </p>
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </motion.ul>
            </AnimatePresence>
          </div>

          {/* ---- one line of consequence, then the ask ---- */}
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={found ? "a" : "b"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-[44ch] text-[14px] leading-relaxed text-ash"
              >
                {found
                  ? "First on the page, prices visible, one tap to WhatsApp you."
                  : "Every enquiry goes to whoever the customer could actually find."}
              </motion.p>
            </AnimatePresence>
            <Magnetic strength={0.24} className="shrink-0">
              <Button asChild variant="filament" shape="pill">
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Fix that
                </a>
              </Button>
            </Magnetic>
          </div>

          <p className="mt-5 text-[11.5px] leading-relaxed text-ash-dim">
            Drawn illustration — the rankings and ratings are invented to show
            the pattern, and the pattern is the real part.
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
