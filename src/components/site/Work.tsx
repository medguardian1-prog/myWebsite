"use client";

import { useEffect, useRef } from "react";
import { contact, projects } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { SplitWords, FadeUp } from "./TextReveal";
import ProjectCard from "./ProjectCard";
import Magnetic from "./Magnetic";
import { WhatsAppIcon } from "./Icons";

/**
 * The credibility engine. On desktop the section pins and the five demo
 * builds travel sideways under a filament progress rail; below 1024px that
 * becomes a plain vertical stack, because a hijacked horizontal scroll on a
 * phone is how you lose the exact person this site is trying to convince.
 */
export default function Work() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

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
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(track, { x: 0 });
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
        <div className="flex items-baseline gap-4">
          <span className="label !text-filament">(02)</span>
          <span className="label">The work</span>
        </div>

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
        className="mt-16 hidden h-[100svh] items-center overflow-hidden lg:flex motion-reduce:!hidden"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-[clamp(2rem,4vw,5rem)] pl-[var(--gutter)] will-change-transform"
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              className="w-[min(58vw,880px)] shrink-0"
            />
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

      {/* Progress rail for the pinned run. */}
      <div className="mx-[var(--gutter)] hidden h-px bg-hairline lg:block motion-reduce:!hidden">
        <div
          ref={barRef}
          className="h-full origin-left scale-x-0 [background:var(--filament-gradient)]"
        />
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
