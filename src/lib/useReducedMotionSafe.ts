"use client";

import { useEffect, useState } from "react";

/**
 * `prefers-reduced-motion`, read only after hydration.
 *
 * Framer's own hook answers on the very first client render, which means the
 * markup can differ from what the server sent (the server can't know the
 * preference) and React refuses to patch it. This starts `false` on both
 * sides, then flips — and follows the setting if it changes mid-visit.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduce;
}
