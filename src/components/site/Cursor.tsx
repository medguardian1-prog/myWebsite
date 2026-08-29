"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "default" | "link" | "view" | "drag";

/**
 * Two-part cursor: a hard core that tracks 1:1 and a lagging ring that
 * catches up. Elements opt into states with data-cursor="view|link|drag"
 * and can push a word into the ring with data-cursor-label.
 */
export default function Cursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.dataset.cursor = "on";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) setVisible(true);

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      const next = (el?.dataset.cursor as Mode | undefined) ?? (el ? "link" : "default");
      setMode((m) => (m === next ? m : next));
      setLabel(el?.dataset.cursorLabel ?? "");
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      delete document.documentElement.dataset.cursor;
    };
  }, [visible]);

  const ringSize = mode === "view" ? 84 : mode === "link" ? 52 : 34;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999] hidden [@media(pointer:fine)]:block motion-reduce:!hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .25s ease" }}
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 grid place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor:
            mode === "view" ? "transparent" : "color-mix(in oklab, #f4efe6 34%, transparent)",
          backgroundColor:
            mode === "view" ? "var(--color-filament)" : "transparent",
          mixBlendMode: mode === "view" ? "normal" : "difference",
        }}
      >
        {label ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
            {label}
          </span>
        ) : null}
      </div>
      <div
        ref={coreRef}
        className="absolute left-0 top-0 rounded-full"
        style={{
          width: 5,
          height: 5,
          background: "var(--color-volt)",
          boxShadow: "0 0 12px 2px color-mix(in oklab, var(--color-volt) 60%, transparent)",
          opacity: mode === "view" ? 0 : 1,
          transition: "opacity .2s ease",
        }}
      />
    </div>
  );
}
