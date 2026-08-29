"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";
import { EASE } from "@/lib/motion";

/**
 * Persistent way out. Appears once the hero is behind you and stays put — the
 * whole site is a sales pitch, so the close should never be more than a thumb
 * away.
 */
export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp Vysan on ${contact.phoneDisplay}`}
          data-cursor="link"
          className="group fixed bottom-5 right-5 z-[90] flex items-center gap-3 rounded-full bg-volt py-3 pl-4 pr-5 text-ink shadow-[0_18px_50px_-16px_rgba(182,255,61,0.6)] md:bottom-7 md:right-7"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.5, ease: EASE }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-volt animate-ring"
          />
          <WhatsAppIcon className="relative size-5" />
          <span className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
            <span className="hidden sm:inline">Message </span>Vysan
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
