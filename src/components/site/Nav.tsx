"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, navLinks } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./Icons";
import WireMark from "./WireMark";
import { EASE, EASE_WIPE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The nav as a title block, not a floating pill.
 *
 * Full-width strip divided into cells by hairlines, like the header of an
 * engineering drawing: mark / sections / local time / a phone number. The
 * number sits where a "get started" button usually goes because the number
 * *is* the offer — one person, reachable — and a visitor who only ever reads
 * the top of the page still leaves with it.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  // Durban wall-clock. Signals a real person in a real timezone, and quietly
  // answers "will he even reply now?" before it's asked.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Africa/Johannesburg",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
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
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-hairline bg-ink/85 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-[1700px] items-stretch">
          {/* ---- mark ---- */}
          <a
            href="#top"
            aria-label="HOTTWIREE — back to top"
            className="flex items-center border-r border-hairline pl-[var(--gutter)] pr-6 transition-colors duration-300 hover:bg-ink-2/60 md:pr-8"
          >
            <WireMark className="h-3 w-auto text-bone md:h-[13px]" />
          </a>

          {/* ---- sections ---- */}
          <div className="hidden items-center gap-9 border-r border-hairline px-9 lg:flex">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative flex items-baseline gap-1.5 py-2"
              >
                <span className="font-mono text-[9px] text-ash-dim transition-colors duration-300 group-hover:text-filament">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] text-ash transition-colors duration-300 group-hover:text-bone">
                  {l.label}
                </span>
                <span className="absolute -bottom-px left-0 h-px w-0 bg-filament transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex-1" />

          {/* ---- Durban clock ---- */}
          <div
            className="hidden items-center gap-2.5 border-l border-hairline px-7 md:flex"
            aria-label={`Local time in Durban: ${time}`}
          >
            <span className="label !text-[9px] !text-ash-dim">Durban</span>
            <span className="font-mono text-[12px] tabular-nums text-bone">
              {time || "--:--"}
            </span>
          </div>

          {/* ---- the number ---- */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-3 border-l border-hairline px-7 pr-[var(--gutter)] transition-colors duration-300 hover:bg-wa/10 sm:flex"
          >
            <WhatsAppIcon className="size-4 text-wa" />
            <span className="font-mono text-[12px] tracking-[0.04em] text-bone transition-colors duration-300 group-hover:text-wa">
              {contact.phoneDisplay}
            </span>
          </a>

          {/* ---- burger ---- */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex items-center border-l border-hairline px-[var(--gutter)] lg:hidden"
          >
            <span className="relative block h-3 w-5">
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
        </nav>
      </header>

      {/* ---- mobile overlay ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col justify-end bg-ink px-[var(--gutter)] pb-[var(--gutter)] pt-24 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_WIPE }}
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-hairline">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, delay: 0.12 + i * 0.06, ease: EASE }}
                  >
                    <span className="font-display text-[clamp(2.2rem,10vw,3.4rem)] leading-none tracking-[-0.02em] text-bone">
                      {l.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-ash-dim">
                      0{i + 1}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <Button asChild variant="wa" size="lg" shape="pill" className="w-full">
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
