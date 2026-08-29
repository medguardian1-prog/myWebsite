"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { SplitWords, FadeUp } from "./TextReveal";
import { Button } from "@/components/ui/button";
import { ArrowOutIcon, PinIcon, SearchIcon, StarIcon, WhatsAppIcon } from "./Icons";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";

/**
 * Pays off the hero's claim by showing it.
 *
 * This is a drawn illustration of a search results page, not a screenshot and
 * not Google's branding — putting their logo on a fabricated result would imply
 * an endorsement Vysan doesn't have, and it's the kind of thing a client's
 * lawyer notices. The competing results are deliberately abstracted to grey
 * bars: it keeps the eye on the one row that matters and avoids naming real
 * businesses in a losing position.
 */

/** A competitor result, drawn as bars rather than invented company names. */
function GhostResult({ delay = 0 }: { delay?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex gap-3.5 border-t border-hairline px-4 py-4 md:px-6 md:py-5"
    >
      <span className="mt-0.5 size-6 shrink-0 rounded-full bg-ink-3" />
      <span className="min-w-0 flex-1">
        <span className="block h-[9px] w-[52%] rounded-full bg-ash-dim/35" />
        <span className="mt-2.5 block h-[6px] w-[30%] rounded-full bg-ash-dim/20" />
        <span className="mt-3 block h-[6px] w-[86%] rounded-full bg-ash-dim/15" />
        <span className="mt-1.5 block h-[6px] w-[64%] rounded-full bg-ash-dim/15" />
      </span>
      <span className="label hidden shrink-0 self-center !text-[8px] !text-ash-dim sm:block">
        Has a site
      </span>
    </motion.li>
  );
}

export default function SearchProof() {
  const [found, setFound] = useState(false);

  return (
    <section
      id="found"
      className="relative bg-ink px-[var(--gutter)] py-24 md:py-36"
    >
      <div className="flex items-baseline gap-4">
        <span className="label !text-filament">(01)</span>
        <span className="label">The problem</span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <SplitWords
          as="h2"
          text="Here is what that actually looks like."
          className="max-w-[15ch] font-display text-[clamp(2.3rem,6.2vw,5.6rem)] leading-[0.92] tracking-[-0.035em]"
        />
        <FadeUp delay={0.1}>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-ash md:text-base">
            Same customer, same search, ten seconds of their attention. The only
            variable is whether you exist on the page. Flip it and watch what
            happens to your position.
          </p>
        </FadeUp>
      </div>

      {/* ---- the switch ---- */}
      <FadeUp>
        <div
          role="group"
          aria-label="Compare search results"
          className="mt-12 inline-flex rounded-full border border-hairline p-1"
        >
          {[
            { on: false, label: "Without a website" },
            { on: true, label: "With a website" },
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
                  className="absolute inset-0 rounded-full [background:var(--filament-gradient)]"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
              <span className="relative">{opt.label}</span>
            </button>
          ))}
        </div>
      </FadeUp>

      {/* ---- the illustration ---- */}
      <FadeUp delay={0.06} y={34}>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.75fr_1fr] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-ink-2">
            {/* search field */}
            <div className="flex items-center gap-3 border-b border-hairline p-4 md:p-6">
              <span className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-hairline bg-ink px-4 py-3 md:px-5 md:py-3.5">
                <SearchIcon className="size-4 shrink-0 text-ash-dim" />
                <span className="truncate font-sans text-[13px] text-bone md:text-[15px]">
                  plumber durban north
                </span>
                <span className="ml-auto hidden h-4 w-px bg-filament sm:block" />
              </span>
            </div>

            <p className="label px-4 pt-4 !text-[9px] md:px-6">
              About 41 200 results
            </p>

            <AnimatePresence mode="wait">
              <motion.ul
                key={found ? "found" : "missing"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="mt-2"
              >
                {found ? (
                  <>
                    {/* Your listing, at the top, doing the selling for you. */}
                    <motion.li
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="relative border-t border-hairline px-4 py-5 md:px-6 md:py-6"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[2px] [background:var(--filament-gradient)]"
                      />
                      <div className="flex gap-3.5">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-filament/40 bg-filament/10">
                          <span className="size-1.5 rounded-full bg-filament" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] tracking-[0.08em] text-ash">
                            yourbusiness.co.za
                          </p>
                          <p className="mt-1.5 font-display text-[clamp(1.15rem,2.2vw,1.6rem)] leading-tight tracking-[-0.015em] text-bone">
                            Your Business — Plumbing in Durban North
                          </p>
                          <p className="mt-2 max-w-[56ch] text-[13px] leading-relaxed text-ash">
                            Emergency call-outs, geysers, leak detection and
                            bathroom fit-outs across Durban North. Same-day
                            quotes, WhatsApp us any time.
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="flex items-center gap-1.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon key={i} className="size-3 text-filament-gold" />
                              ))}
                              <span className="ml-1 font-mono text-[10px] text-ash">
                                4.9 · 37 reviews
                              </span>
                            </span>
                          </div>

                          <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-3.5">
                            {["Services", "Pricing", "Reviews", "WhatsApp"].map((l) => (
                              <li
                                key={l}
                                className="font-mono text-[10px] uppercase tracking-[0.12em] text-filament"
                              >
                                {l}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.li>
                    <GhostResult delay={0.12} />
                    <GhostResult delay={0.18} />
                  </>
                ) : (
                  <>
                    <GhostResult delay={0.02} />
                    <GhostResult delay={0.08} />
                    <GhostResult delay={0.14} />
                    {/* You, eventually, if they keep scrolling. Most don't. */}
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.55, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
                      className="flex gap-3.5 border-t border-dashed border-hairline px-4 py-4 md:px-6 md:py-5"
                    >
                      <span className="mt-0.5 size-6 shrink-0 rounded-full bg-ink-3" />
                      <span className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] tracking-[0.08em] text-ash-dim">
                          facebook.com · page
                        </p>
                        <p className="mt-1.5 font-display text-[clamp(1rem,1.8vw,1.3rem)] leading-tight text-ash">
                          Your Business
                        </p>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ash-dim">
                          No website. Last posted 2023. Hours not listed.
                        </p>
                      </span>
                      <span className="label shrink-0 self-center !text-[8px] !text-ash-dim">
                        Page 2
                      </span>
                    </motion.li>
                  </>
                )}
              </motion.ul>
            </AnimatePresence>

            <p className="border-t border-hairline px-4 py-3.5 text-[12px] text-ash-dim md:px-6">
              {found
                ? "You are the first thing they read, and the call button is right there."
                : "Three quarters of people never scroll past the first few results."}
            </p>
          </div>

          {/* ---- side card ---- */}
          <div className="rounded-2xl border border-hairline bg-ink-2 p-6 md:p-7">
            <p className="label">{found ? "What they do next" : "What happens now"}</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={found ? "a" : "b"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {found ? (
                  <>
                    <p className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.05] tracking-[-0.02em]">
                      They message you before they message anyone else.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
                      {[
                        "They can see what you do in four seconds",
                        "Your prices answer the question they were going to ask",
                        "One tap opens WhatsApp with your number in it",
                      ].map((t) => (
                        <li
                          key={t}
                          className="flex gap-3 text-[13.5px] leading-snug text-bone/85"
                        >
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-filament" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.05] tracking-[-0.02em]">
                      They call the competitor who turned up first.
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
                      {[
                        "No prices, so they assume you're expensive",
                        "No hours, so they assume you're closed",
                        "No site, so they assume you're small",
                      ].map((t) => (
                        <li
                          key={t}
                          className="flex gap-3 text-[13.5px] leading-snug text-ash"
                        >
                          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-ash-dim" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-7 flex items-center gap-2 border-t border-hairline pt-6">
              <PinIcon className="size-4 shrink-0 text-ash-dim" />
              <p className="text-[12px] leading-relaxed text-ash-dim">
                Swap in your trade and your town — the shape of it does not change.
              </p>
            </div>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Magnetic strength={0.26}>
            <Button asChild variant="filament" size="lg" shape="pill">
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                Get on that page
              </a>
            </Button>
          </Magnetic>
          <a
            href="#work"
            className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-bone"
          >
            See the builds
            <ArrowOutIcon className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
        <p className="mt-6 max-w-[70ch] text-[12px] leading-relaxed text-ash-dim">
          Illustration, not a screenshot — the layout above is drawn, and the
          rankings, ratings and result count are made up to show the pattern.
          The pattern is the real part.
        </p>
      </FadeUp>
    </section>
  );
}
