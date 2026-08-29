"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "./Wordmark";
import { EASE_WIPE } from "@/lib/motion";

/**
 * Ignition sequence. Deliberately short — under a second and a half — because
 * the people landing here arrived from a cold WhatsApp message and will bail
 * on a spinner. Runs once per session and is skipped outright for anyone who
 * asked for reduced motion.
 */
export default function Preloader() {
  const [done, setDone] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("hw-ignited")) return;

    sessionStorage.setItem("hw-ignited", "1");
    // The hero waits on this flag so its reveal isn't wasted behind the curtain.
    document.documentElement.dataset.ignition = "running";
    setDone(false);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1250;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // Ease-out so the counter sprints then settles — reads as "charging up".
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        document.body.style.overflow = "";
        setDone(true);
        document.documentElement.dataset.ignition = "done";
        // Fire once the curtain has started lifting, not when it lands.
        window.setTimeout(() => window.dispatchEvent(new Event("hw:ignited")), 260);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink p-[var(--gutter)]"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE_WIPE }}
        >
          <div className="label flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-volt animate-live" />
            Ignition
          </div>

          <div className="relative">
            <Wordmark className="block font-display text-[clamp(3rem,13vw,11rem)] leading-none tracking-[-0.03em] text-ash-dim" />
            {/* The mark fills with heat as the counter climbs. */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
            >
              <Wordmark className="block font-display text-[clamp(3rem,13vw,11rem)] leading-none tracking-[-0.03em] text-bone" />
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="label max-w-[22ch]">Durban · South Africa</div>
            <div className="font-mono text-[clamp(2rem,6vw,4rem)] leading-none tabular-nums text-filament">
              {String(pct).padStart(3, "0")}
            </div>
          </div>

          <div className="absolute inset-x-[var(--gutter)] bottom-[calc(var(--gutter)-1px)] h-px bg-hairline">
            <div
              className="h-full [background:var(--filament-gradient)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
