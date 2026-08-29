"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { contact, owner } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, WhatsAppIcon } from "./Icons";
import FilamentField from "./FilamentField";
import Magnetic from "./Magnetic";
import Wordmark from "./Wordmark";

const RISE: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.15, delay: 0.1 + i * 0.09, ease: EASE },
  }),
};

export default function Hero() {
  const [ready, setReady] = useState(false);
  const markRef = useRef<HTMLDivElement>(null);

  // Play the entrance on mount. There is no preloader to wait behind any
  // more — a percentage counter in front of a sales page costs more than the
  // drama is worth.
  useEffect(() => setReady(true), []);

  // Pointer position feeds a mask that reveals a hotter copy of the wordmark
  // only where the cursor is — written straight to CSS vars, never to state.
  useEffect(() => {
    const el = markRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
        el.style.setProperty("--spot-o", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--spot-o", "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const animate = ready ? "show" : "hidden";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between gap-8 overflow-hidden pb-6 pt-28 md:pt-32"
    >
      {/* Static heat under the canvas — this is what shows if WebGL is off. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink"
        style={{
          backgroundImage:
            "radial-gradient(80% 55% at 72% 38%, rgba(255,122,26,0.20) 0%, rgba(255,61,0,0.07) 38%, rgba(8,7,11,0) 72%)",
        }}
      />
      <FilamentField />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,11,0.72)_0%,rgba(8,7,11,0.15)_38%,rgba(8,7,11,0.55)_78%,var(--color-ink)_100%)]"
      />

      {/* ---- top meta row ---- */}
      <div className="relative z-10 flex items-start justify-between gap-6 px-[var(--gutter)]">
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="size-1.5 rounded-full bg-filament " />
          <span className="label !text-bone">Taking on work</span>
        </motion.div>

        <motion.div
          className="label text-right leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Durban · KZN
          <br />
          South Africa
        </motion.div>
      </div>

      {/* Quiet anchor in the left void so the composition isn't all right-hand. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[calc(var(--gutter)-0.25rem)] top-1/2 z-10 hidden -translate-y-1/2 items-center gap-4 lg:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="h-24 w-px bg-[linear-gradient(to_bottom,transparent,var(--color-filament),transparent)]" />
        <span className="label !text-[9px] !text-ash-dim">
          Freelance web development · Durban
        </span>
      </div>

      {/* ---- statement, pushed off-centre to the right ---- */}
      <div className="relative z-10 mt-14 px-[var(--gutter)] md:mt-0">
        <div className="ml-auto max-w-[38rem] lg:mr-[2vw]">
          <h1 className="font-display text-[clamp(2.1rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.02em] text-balance">
            <span className="line-mask">
              <motion.span
                className="block"
                variants={RISE}
                custom={0}
                initial="hidden"
                animate={animate}
              >
                Your customers Google you.
              </motion.span>
            </span>
            <span className="line-mask">
              <motion.span
                className="block italic filament-text animate-filament"
                variants={RISE}
                custom={1}
                initial="hidden"
                animate={animate}
              >
                Right now they find nothing.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ash md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
          >
            I&rsquo;m {owner.name.split(" ")[0]} — I build custom websites for South
            African businesses. Designed properly, built around what you actually
            sell, and{" "}
            <span className="text-bone">live in 5 business days</span>.{" "}
            <span className="text-bone">R3,300 flat</span>, with 21 days of free
            support on every build.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.68, ease: EASE }}
          >
            <Magnetic strength={0.3}>
              <Button asChild variant="filament" size="lg" shape="pill">
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Start on WhatsApp
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Button asChild variant="glass" size="lg" shape="pill">
                <a href="#found">
                  See what changes
                  <ArrowDownIcon className="size-3.5" />
                </a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* ---- the mark, full bleed along the floor ---- */}
      <div className="relative z-10 mt-16 md:mt-0">
        <div
          ref={markRef}
          className="relative px-[var(--gutter)]"
          style={
            {
              "--spot-x": "50%",
              "--spot-y": "50%",
              "--spot-o": "0",
            } as React.CSSProperties
          }
        >
          <div className="line-mask">
            <motion.div variants={RISE} custom={2} initial="hidden" animate={animate}>
              <Wordmark
                className="block whitespace-nowrap font-display text-[23.4vw] leading-[0.78] tracking-[-0.045em] text-bone"
              />
            </motion.div>
          </div>

          {/* Hotter twin, revealed only under the pointer. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden px-[var(--gutter)] transition-opacity duration-500 [@media(pointer:fine)]:block"
            style={{
              opacity: "var(--spot-o)",
              WebkitMaskImage:
                "radial-gradient(240px 240px at var(--spot-x) var(--spot-y), #000 0%, rgba(0,0,0,0.55) 45%, transparent 72%)",
              maskImage:
                "radial-gradient(240px 240px at var(--spot-x) var(--spot-y), #000 0%, rgba(0,0,0,0.55) 45%, transparent 72%)",
            }}
          >
            <Wordmark
              className="block whitespace-nowrap font-display text-[23.4vw] leading-[0.78] tracking-[-0.045em] filament-text animate-filament"
              ttClassName="!text-transparent"
            />
          </div>
        </div>

        {/* ---- floor strip ---- */}
        <motion.div
          className="mt-5 flex items-center justify-between gap-4 border-t border-hairline px-[var(--gutter)] pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a href="#found" className="group flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full border border-hairline transition-colors duration-500 group-hover:border-filament">
              <ArrowDownIcon className="size-3 text-ash transition-transform duration-500 group-hover:translate-y-0.5 group-hover:text-filament" />
            </span>
            <span className="label group-hover:text-bone">Scroll</span>
          </a>
          <p className="label text-right !text-ash-dim">
            <span className="text-filament">R3,300</span> flat
            <span className="mx-2 opacity-40">/</span>
            5 business days
          </p>
        </motion.div>
      </div>
    </section>
  );
}
