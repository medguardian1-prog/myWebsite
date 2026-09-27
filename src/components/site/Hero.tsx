"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EASE, ramp } from "@/lib/motion";
import { contact, owner } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, WhatsAppIcon } from "./Icons";
import FilamentField from "./FilamentField";
import HeroGauge from "./HeroGauge";
import Magnetic from "./Magnetic";
import WireMark from "./WireMark";

const RISE: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.15, delay: 0.1 + i * 0.09, ease: EASE },
  }),
};

export default function Hero() {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => setReady(true), []);

  const animate = ready ? "show" : "hidden";

  // Leaving the hero is a drive-through, not a page scroll: the statement lifts
  // and fades, the gauge falls back, and the mark rushes toward you as the
  // next chapter slides over it. All transforms and opacity, so it's free.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, ramp(0, 1, 0, -140));
  const copyO = useTransform(scrollYProgress, ramp(0, 0.55, 1, 0));
  const gaugeY = useTransform(scrollYProgress, ramp(0, 1, 0, 90));
  const gaugeR = useTransform(scrollYProgress, ramp(0, 1, 0, -18));
  const markS = useTransform(scrollYProgress, ramp(0, 1, 1, 1.22));
  const markO = useTransform(scrollYProgress, ramp(0.2, 0.9, 1, 0.15));
  const glowO = useTransform(scrollYProgress, ramp(0, 0.8, 1, 0.25));

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between gap-8 overflow-hidden pb-6 pt-24 md:pt-28"
    >
      {/* Static heat under the canvas — this is what shows if WebGL is off. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink"
        style={{
          backgroundImage:
            "radial-gradient(80% 55% at 72% 38%, rgba(255,122,26,0.20) 0%, rgba(232,72,10,0.07) 38%, rgba(8,7,11,0) 72%)",
        }}
      />
      <motion.div aria-hidden className="absolute inset-0" style={reduce ? undefined : { opacity: glowO }}>
        <FilamentField energy={0.75} />
      </motion.div>
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
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-filament opacity-60" />
            <span className="relative size-1.5 rounded-full bg-filament" />
          </span>
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

      {/* ---- statement, pushed off-centre to the right ---- */}
      <div className="relative z-10 mt-14 flex items-center justify-between gap-10 px-[var(--gutter)] md:mt-0">
        <motion.div
          className="hidden w-[clamp(15rem,22vw,21rem)] shrink-0 lg:block"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
          style={reduce ? undefined : { y: gaugeY, rotate: gaugeR }}
        >
          <HeroGauge />
        </motion.div>

        <motion.div
          className="ml-auto max-w-[38rem] lg:mr-[2vw]"
          style={reduce ? undefined : { y: copyY, opacity: copyO }}
        >
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
        </motion.div>
      </div>

      {/* ---- the mark, bent into place along the floor ---- */}
      <div className="relative z-10 mt-16 md:mt-0">
        <motion.div
          className="origin-bottom px-[var(--gutter)]"
          style={reduce ? undefined : { scale: markS, opacity: markO }}
        >
          {/* Mounted only once `ready` so the draw-on stagger plays in view. */}
          {ready && <WireMark power className="h-auto w-full text-bone" />}
        </motion.div>

        {/* ---- floor strip ---- */}
        <motion.div
          className="mt-6 flex items-center justify-between gap-4 border-t border-hairline px-[var(--gutter)] pt-4"
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
            <span className="mx-2 opacity-40">/</span>5 business days
          </p>
        </motion.div>
      </div>
    </section>
  );
}
