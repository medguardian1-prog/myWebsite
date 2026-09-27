"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { projects } from "@/lib/site";
import { shots } from "@/lib/shots";
import { ramp } from "@/lib/motion";

/**
 * The cinematic beat between the problem and the proof.
 *
 * A pinned stage: a wall of the five demo builds starts as a framed plate in
 * the middle of the screen, then opens out to fill it as you scroll — the
 * reveal a car maker uses to bring a model out of the dark — while one line
 * about the standard lights up word by word over the top. The columns drift
 * against each other so the wall never sits still.
 *
 * Sticky positioning, not a JS pin, so phones scroll it natively. Everything
 * scroll-linked is transform or opacity. Reduced motion gets the wall at
 * rest and the whole line lit.
 */

const LINE =
  "Every build is drawn from scratch, tuned for the phone in your customer’s hand, and wired straight to your WhatsApp.";
const HOT = new Set(["scratch,", "phone", "WhatsApp."]);

// Five screenshots dealt across four columns, offset so no two neighbours
// repeat. Columns 2 and 4 are hidden on small screens.
const slugs = projects.map((p) => p.slug);
const COLUMNS = [0, 2, 4, 1].map((start) =>
  Array.from({ length: 4 }, (_, i) => slugs[(start + i * 2) % slugs.length]),
);

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, ramp(range[0], range[1], 0.12, 1));
  const hot = HOT.has(word);
  return (
    <motion.span
      style={{ opacity }}
      className={hot ? "italic filament-text animate-filament" : undefined}
    >
      {word}{" "}
    </motion.span>
  );
}

function Column({
  items,
  progress,
  dir,
  className,
}: {
  items: string[];
  progress: MotionValue<number>;
  dir: 1 | -1;
  className?: string;
}) {
  const y = useTransform(progress, dir === 1 ? ramp(0, 1, -22, 4, "%") : ramp(0, 1, 4, -22, "%"));
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-4 md:gap-6 ${className ?? ""}`}>
      {items.map((slug, i) => (
        <div
          key={`${slug}-${i}`}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-bone/10 bg-ink-3"
        >
          <Image
            src={shots[slug]}
            alt=""
            fill
            sizes="(min-width: 768px) 26vw, 48vw"
            className="object-cover object-top"
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function Standard() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const scale = useTransform(scrollYProgress, ramp(0.12, 0.5, 0.58, 1));
  const radius = useTransform(scrollYProgress, ramp(0.12, 0.5, 28, 0));
  const shade = useTransform(scrollYProgress, ramp(0.3, 0.5, 0.15, 0.8));
  const kickerO = useTransform(scrollYProgress, ramp(0.44, 0.52, 0, 1));
  const textO = useTransform(scrollYProgress, ramp(0.38, 0.5, 0, 1));
  const noteO = useTransform(scrollYProgress, ramp(0.86, 0.94, 0, 1));

  const words = LINE.split(" ");
  const from = 0.5;
  const to = 0.9;
  const step = (to - from) / words.length;

  return (
    <section
      ref={ref}
      aria-label="The standard every build is held to"
      className={reduce ? "relative bg-ink" : "relative h-[320vh] bg-ink"}
    >
      <div
        className={
          reduce
            ? "relative h-[100svh] overflow-hidden"
            : "sticky top-0 h-[100svh] overflow-hidden"
        }
      >
        {/* ---- the wall ---- */}
        <motion.div
          aria-hidden
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={reduce ? undefined : { scale, borderRadius: radius }}
        >
          <div className="absolute inset-[-12%] [perspective:1400px]">
            <div className="grid h-full grid-cols-2 gap-4 [transform:rotateX(18deg)_rotateZ(-8deg)] md:grid-cols-4 md:gap-6">
              {COLUMNS.map((items, i) => (
                <Column
                  key={i}
                  items={items}
                  progress={scrollYProgress}
                  dir={i % 2 === 0 ? 1 : -1}
                  className={i % 2 === 1 ? "hidden md:flex" : undefined}
                />
              ))}
            </div>
          </div>
          <motion.div
            className="absolute inset-0 bg-ink"
            style={{ opacity: reduce ? 0.84 : shade }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(8,7,11,0)_0%,rgba(8,7,11,0.85)_100%)]" />
          {/* A pool of dark directly behind the line, so it reads over any screenshot. */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(46%_38%_at_50%_50%,rgba(8,7,11,0.9)_0%,rgba(8,7,11,0)_100%)]"
            style={{ opacity: reduce ? 1 : textO }}
          />
        </motion.div>

        {/* ---- the line ---- */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-[var(--gutter)] text-center">
          <motion.p
            className="label !text-filament-gold"
            style={reduce ? undefined : { opacity: kickerO }}
          >
            The standard
          </motion.p>
          <motion.p
            style={reduce ? undefined : { opacity: textO }}
            className="mt-7 max-w-[22ch] font-display text-[clamp(2rem,5.4vw,5.2rem)] leading-[1.02] tracking-[-0.03em] text-bone text-balance">
            {reduce
              ? LINE
              : words.map((w, i) => (
                  <Word
                    key={`${w}-${i}`}
                    word={w}
                    progress={scrollYProgress}
                    range={[from + i * step, from + (i + 1) * step]}
                  />
                ))}
          </motion.p>
          <motion.p
            className="mt-9 max-w-[44ch] text-[13px] leading-relaxed text-ash md:text-sm"
            style={reduce ? undefined : { opacity: noteO }}
          >
            Behind the words: the five demonstration builds below, every one of
            them live. Keep scrolling and open any of them.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
