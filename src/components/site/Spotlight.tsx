"use client";

import { useEffect } from "react";

/**
 * One delegated listener that lets every `.wire-border` surface catch the
 * pointer like a showroom light: a soft pool of heat follows the cursor
 * across the card, and the hairline border brightens nearest to it.
 *
 * It only writes two custom properties to the card under the pointer, so no
 * React state changes and nothing re-renders. Pointer devices only.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const el = (last.target as HTMLElement | null)?.closest<HTMLElement>(".wire-border");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${last.clientX - r.left}px`);
      el.style.setProperty("--my", `${last.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
