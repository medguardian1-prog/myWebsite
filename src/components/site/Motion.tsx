"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes Framer Motion drop transform and layout
 * animations for anyone with the OS setting on, keeping only opacity. Without
 * it every reveal on this page would still fly, since Framer's default is to
 * ignore the preference.
 */
export default function Motion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
