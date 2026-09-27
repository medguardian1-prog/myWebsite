"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * The chapter marker every section opens with: "(03) ——— The price".
 *
 * The rule between the number and the name draws itself across as the
 * section arrives, like a line being ruled on a drawing before anything is
 * written on it. One shared component so every chapter opens the same way.
 */
export default function SectionLabel({ n, children }: { n: string; children: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="label !text-filament tabular-nums">({n})</span>
      <motion.span
        aria-hidden
        className="h-px w-14 origin-left [background:var(--filament-gradient)] md:w-24"
        initial={{ scaleX: 0, opacity: 0.4 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
      />
      <span className="label">{children}</span>
    </div>
  );
}
