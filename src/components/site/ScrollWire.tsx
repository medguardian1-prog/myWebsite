"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline down the right edge that charges as you read — the same "current
 * filling a wire" idea as the Process section, applied to the whole page.
 * Written straight to a transform, never to React state, so scrolling costs
 * nothing.
 */
export default function ScrollWire() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-14 z-[80] hidden h-[calc(100vh-3.5rem)] w-px bg-hairline md:block"
    >
      <div
        ref={ref}
        className="h-full w-full origin-top scale-y-0 bg-[linear-gradient(to_bottom,var(--color-filament-hot),var(--color-filament),var(--color-filament-gold))]"
      />
    </div>
  );
}
