"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling on pointer devices.
 *
 * Driven by a plain rAF loop rather than GSAP's ticker: GSAP is now only
 * fetched for the desktop pinned gallery, and making the whole page's scroll
 * depend on it would have pulled the library back into the initial bundle for
 * everyone. Lenis moves the real window scroll position, so ScrollTrigger —
 * whenever the gallery loads it — stays in sync off native scroll events.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // lerp rather than duration: a fixed easing curve restarts on every
      // wheel tick, which is what makes smooth-scroll libraries feel rubbery.
      // A frame-rate-independent lerp just keeps chasing the target, so
      // continuous scrolling stays continuous.
      lerp: 0.085,
      wheelMultiplier: 0.92,
      // Never intercept touch. Native momentum on iOS and Android beats
      // anything reimplemented in JS, and hijacking it is the single biggest
      // cause of "this site scrolls badly on my phone".
      syncTouch: false,
      touchMultiplier: 1,
    });

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // In-page anchors have to go through Lenis or they fight it.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
