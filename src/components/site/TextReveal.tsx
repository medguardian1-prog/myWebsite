"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { ElementType } from "react";

/**
 * One observer on the whole line, stagger on the children. Giving every word
 * its own viewport trigger looks equivalent but isn't: short words sit almost
 * entirely inside their clip mask, so their individual observers can report no
 * intersection and leave a hole where "a" or "an" should be.
 */
const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "115%", rotate: 3 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: EASE },
  },
};

/**
 * Splits a string into words and rises each one out of its own overflow mask.
 * Word-level rather than character-level: it reads as typography rather than
 * as a gimmick, and it costs a fraction of the DOM nodes.
 */
export function SplitWords({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delay = 0,
  once = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={container}
        custom={delay}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "0px 0px -14% 0px" }}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span className={cn("inline-block", wordClassName)} variants={word}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Plain fade-and-rise for paragraphs and blocks. */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
