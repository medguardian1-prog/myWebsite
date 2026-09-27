"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { contact, projects } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { SplitWords, FadeUp } from "./TextReveal";
import ProjectCard from "./ProjectCard";
import Magnetic from "./Magnetic";
import { WhatsAppIcon } from "./Icons";
import SectionLabel from "./SectionLabel";

/**
 * The credibility engine. On desktop the section pins and the five demo
 * builds travel sideways under a filament progress rail; below 1024px that
 * becomes a plain vertical stack, because a hijacked horizontal scroll on a
 * phone is how you lose the exact person this site is trying to convince.
 */
export default function Work() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Only the pinned gallery needs GSAP, and the gallery only exists on wide
    // pointer screens — so the library is fetched lazily and phones never pay
    // for it at all.
    const wide = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    if (!wide.matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const wrap = wrapRef.current;
          if (!track || !wrap) return;

          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth + 64);

          // Showroom focus: the build nearest the centre of the screen comes
          // forward at full size and brightness, its neighbours recede. Written
          // straight to style, so the scrub never touches React state except
          // when the build in focus actually changes.
          const focus = () => {
            const mid = window.innerWidth / 2;
            let best = 0;
            let bestD = Infinity;
            cardRefs.current.forEach((el, i) => {
              if (!el) return;
              const r = el.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - mid);
              const t = Math.min(1, d / (window.innerWidth * 0.75));
              el.style.transform = `scale(${1 - t * 0.1})`;
              el.style.opacity = String(1 - t * 0.6);
              if (d < bestD) {
                bestD = d;
                best = i;
              }
            });
            setActive((prev) => (prev === best ? prev : best));
          };
          focus();

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (barRef.current) {
                  barRef.current.style.transform = `scaleX(${self.progress})`;
                }
                focus();
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(track, { x: 0 });
            cardRefs.current.forEach((el) => el?.removeAttribute("style"));
          };
        },
      );

      cleanup = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section id="work" className="relative bg-ink pt-24 md:pt-36">
      {/* ---- header ---- */}
      <div className="px-[var(--gutter)]">
        <SectionLabel n="02">The work</SectionLabel>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <SplitWords
            as="h2"
            text="Five builds. Open every one of them."
            className="max-w-[16ch] font-display text-[clamp(2.3rem,6.2vw,5.6rem)] leading-[0.92] tracking-[-0.035em]"
          />
          <FadeUp delay={0.1}>
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-ash md:text-base">
              These are demonstration builds, not client work — real, deployed and
              fully working, but built around invented businesses to show you a
              standard rather than a client list. Hover one on desktop and the
              site itself loads in behind the screenshot. Open them and judge the
              craft.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ---- desktop: pinned horizontal gallery ---- */}
      <div
        ref={wrapRef}
        className="relative mt-16 hidden h-[100svh] items-center overflow-hidden lg:flex motion-reduce:!hidden"
      >
        {/* Readout + rail: which build is in front, and how far through. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-6 z-10 flex items-center gap-6"
        >
          <span className="relative block h-[1.1em] overflow-hidden font-display text-[clamp(1.9rem,2.6vw,2.6rem)] leading-[1.1] tabular-nums text-bone">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {String(active + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="label">/ {String(projects.length).padStart(2, "0")}</span>
          <span className="h-px flex-1 bg-hairline">
            <span
              ref={barRef}
              className="block h-full origin-left scale-x-0 [background:var(--filament-gradient)]"
            />
          </span>
          <span className="label min-w-[16ch] text-right !text-filament-gold">
            {projects[active]?.sector}
          </span>
        </div>

        <div
          ref={trackRef}
          className="flex items-center gap-[clamp(2rem,4vw,5rem)] pl-[var(--gutter)] will-change-transform"
        >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-[min(56vw,880px,calc((100svh-420px)*1.6))] shrink-0 origin-center will-change-transform"
            >
              <ProjectCard project={p} index={i} />
            </div>
          ))}

          {/* Closing panel — the gallery ends on an ask, not on white space. */}
          <div className="flex w-[min(38vw,520px)] shrink-0 flex-col justify-center gap-6 pr-[var(--gutter)]">
            <p className="label !text-filament">(next)</p>
            <p className="font-display text-[clamp(2rem,3.4vw,3.4rem)] leading-[0.95] tracking-[-0.03em]">
              Yours gets built to the
              <span className="italic filament-text animate-filament"> same standard</span>.
            </p>
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-ash">
              Around your business rather than an invented one. Five business days,
              R3,300, and 21 days of free support after it goes live.
            </p>
            <Magnetic strength={0.28} className="self-start">
              <Button asChild variant="filament" size="lg" shape="pill">
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Start yours
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* ---- mobile / tablet: plain stack ---- */}
      <div className="mt-14 flex flex-col gap-16 px-[var(--gutter)] lg:hidden motion-reduce:!flex">
        {projects.map((p, i) => (
          <FadeUp key={p.slug} y={34}>
            <ProjectCard project={p} index={i} />
          </FadeUp>
        ))}

        <FadeUp>
          <div className="wire-border rounded-2xl border border-hairline p-7">
            <p className="label !text-filament">(next)</p>
            <p className="mt-4 font-display text-[clamp(1.9rem,8vw,2.6rem)] leading-[0.98] tracking-[-0.03em]">
              Yours gets built to the
              <span className="italic filament-text animate-filament"> same standard</span>.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-ash">
              Around your business rather than an invented one. Five business days,
              R3,300, and 21 days of free support after it goes live.
            </p>
            <Button
              asChild
              variant="filament"
              size="lg"
              shape="pill"
              className="mt-6 w-full"
            >
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                Start yours
              </a>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
