"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";
import { contact, owner } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, WhatsAppIcon } from "./Icons";
import FilamentField from "./FilamentField";
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

  useEffect(() => setReady(true), []);

  const animate = ready ? "show" : "hidden";

  return (
    <section
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
      <FilamentField energy={0.75} />
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
          <span className="size-1.5 rounded-full bg-filament" />
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

      {/* ---- the mark, bent into place along the floor ---- */}
      <div className="relative z-10 mt-16 md:mt-0">
        <div className="px-[var(--gutter)]">
          {/* Mounted only once `ready` so the draw-on stagger plays in view. */}
          {ready && <WireMark power className="h-auto w-full text-bone" />}
        </div>

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
