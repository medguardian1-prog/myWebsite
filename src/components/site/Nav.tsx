"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, navLinks, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./Icons";
import Wordmark from "./Wordmark";
import Magnetic from "./Magnetic";
import { cn } from "@/lib/utils";
import { EASE, EASE_WIPE } from "@/lib/motion";

export default function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          condensed ? "px-[var(--gutter)] pt-3" : "px-[var(--gutter)] pt-6",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[1700px] items-center justify-between gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            condensed
              ? "glass rounded-full px-4 py-2 md:px-5 md:py-2.5"
              : "rounded-full border border-transparent px-0 py-1",
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — back to top`}
          >
            <span className="relative grid size-2.5 place-items-center">
              <span className="absolute inset-0 rounded-full bg-volt animate-live" />
            </span>
            <Wordmark className="text-[15px] font-semibold tracking-[0.16em] md:text-base" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-ash transition-colors duration-300 hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 [background:var(--filament-gradient)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.28} className="hidden sm:!inline-block">
              <Button asChild variant="filament" size="sm" shape="pill">
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-3.5" />
                  WhatsApp me
                </a>
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-hairline transition-colors duration-300 hover:border-filament lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-bone transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px bg-bone transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col justify-end bg-ink px-[var(--gutter)] pb-[var(--gutter)] pt-28 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_WIPE }}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-[clamp(2.6rem,13vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-bone"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.8,
                      delay: 0.12 + i * 0.06,
                      ease: EASE,
                    }}
                  >
                    {l.label}
                    <span className="ml-3 align-super font-mono text-[10px] tracking-[0.2em] text-ash-dim">
                      0{i + 1}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="filament-rule my-8" />

            <div className="flex flex-col gap-3">
              <Button asChild variant="filament" size="lg" shape="pill" className="w-full">
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  {contact.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="wire" size="lg" shape="pill" className="w-full">
                <a href={contact.mailto}>Email instead</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
