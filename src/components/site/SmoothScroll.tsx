"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis drives the scroll position; GSAP's ticker drives Lenis; ScrollTrigger
 * listens to Lenis. Wiring all three to one clock is what keeps the pinned
 * horizontal gallery from drifting a frame behind everything else.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: undefined,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

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
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.3 });
    };
    document.addEventListener("click", onClick);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
