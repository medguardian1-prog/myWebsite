"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * One delegated listener for the only conversions this site has.
 *
 * Pageviews alone won't tell Vysan whether the page works — the question is
 * whether people press the button, and which button, from which section. This
 * records that without any per-link wiring, so new CTAs are covered
 * automatically.
 */
export default function Telemetry() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a) return;

      const href = a.getAttribute("href") ?? "";
      const kind = href.includes("wa.me")
        ? "whatsapp"
        : href.startsWith("mailto:")
          ? "email"
          : href.includes("vercel.app")
            ? "demo"
            : null;
      if (!kind) return;

      // Nearest landmark with an id gives us "which section did they convert
      // from", which is the difference between knowing a number and knowing
      // what to change.
      const from = a.closest<HTMLElement>("section[id], footer, header")?.id || "other";
      const label = a.innerText.replace(/\s+/g, " ").trim().slice(0, 40);

      track(kind, { from, label });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
