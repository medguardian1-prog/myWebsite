"use client";

import { useEffect, useRef } from "react";

/**
 * The pointer drags a length of hot wire behind it.
 *
 * A chain of points eases toward the one ahead of it, so the tail lags, whips
 * on direction changes and collapses to nothing when you stop moving. It's
 * drawn as a tapering stroke that cools from white through ember to dark —
 * literally the thing the business is named after.
 *
 * The native cursor is deliberately left visible. Hiding it for a dot-and-ring
 * is the single most common "designer site" tell, and it costs real usability
 * on a page whose whole job is getting someone to press a button.
 */

const JOINTS = 16;
const EASE = 0.42;

export default function FilamentCursor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: JOINTS }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let seen = false;
    let heat = 0; // 0 idle, 1 moving fast — drives brightness and thickness

    const onMove = (e: PointerEvent) => {
      if (!seen) {
        seen = true;
        for (const p of pts) {
          p.x = e.clientX;
          p.y = e.clientY;
        }
      }
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);

      const head = pts[0];
      const dx = tx - head.x;
      const dy = ty - head.y;
      const speed = Math.hypot(dx, dy);

      head.x += dx * EASE;
      head.y += dy * EASE;
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * EASE;
        pts[i].y += (pts[i - 1].y - pts[i].y) * EASE;
      }

      // Heat rises quickly with movement and bleeds away slowly, so a flick
      // leaves a bright wire that dims instead of snapping off.
      const target = Math.min(1, speed / 34);
      heat += (target - heat) * (target > heat ? 0.35 : 0.06);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (seen && heat > 0.012) {
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 0; i < pts.length - 1; i++) {
          const t = i / (pts.length - 1); // 0 at the tip, 1 at the tail
          const cool = 1 - t;
          const a = cool * cool * heat;
          if (a < 0.01) continue;

          // White at the tip, ember through the middle, deep red as it cools.
          const r = 255;
          const g = Math.round(90 + 150 * cool);
          const b = Math.round(20 + 150 * cool * cool * cool);

          ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.6})`;
          ctx.lineWidth = 0.5 + 1.6 * cool * heat;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
          ctx.stroke();
        }

        ctx.globalCompositeOperation = "source-over";
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] hidden [@media(pointer:fine)]:block motion-reduce:!hidden"
    />
  );
}
