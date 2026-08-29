"use client";

import { useState } from "react";
import { pricing, contact } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SplitWords, FadeUp } from "./TextReveal";
import Magnetic from "./Magnetic";
import {
  CareIcon,
  CustomIcon,
  PanelIcon,
  SupportIcon,
  WhatsAppIcon,
  ArrowOutIcon,
} from "./Icons";

const WA = "https://wa.me/27838555008?text=";

/**
 * Priced like a distribution board rather than a SaaS table: one live circuit
 * (the R3,300 build), one optional add-on you physically switch on, and one
 * path that has to be quoted. The switch rewrites the WhatsApp message so the
 * first thing Vysan reads is exactly what the client picked.
 */
export default function Pricing() {
  const [care, setCare] = useState(false);

  const message = care
    ? "Hi Vysan, I saw your site. I want the R3,300 landing page site plus the R400/month Care Plan for my business."
    : "Hi Vysan, I saw your site. I want the R3,300 landing page site for my business.";

  return (
    <section id="pricing" className="relative bg-ink px-[var(--gutter)] py-24 md:py-36">
      <div className="flex items-baseline gap-4">
        <span className="label !text-filament">(03)</span>
        <span className="label">The price</span>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <SplitWords
          as="h2"
          text="One price. Written down. No surprises."
          className="max-w-[14ch] font-display text-[clamp(2.3rem,6.2vw,5.6rem)] leading-[0.92] tracking-[-0.035em]"
        />
        <FadeUp delay={0.1}>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-ash md:text-base">
            You know what it costs before you message me. What you see below is the
            whole thing — no setup fee, no per-page charge, no annual contract.
          </p>
        </FadeUp>
      </div>

      {/* ---- 21 days: applies to everything, so it sits above everything ---- */}
      <FadeUp>
        <div className="wire-border mt-14 flex flex-col gap-5 overflow-hidden rounded-2xl border border-hairline bg-ink-2 p-6 md:flex-row md:items-center md:gap-8 md:p-8">
          <div className="flex shrink-0 items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-filament/40 bg-filament/10 text-filament">
              <SupportIcon className="size-5" />
            </span>
            <div>
              <p className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none tracking-[-0.02em]">
                {pricing.support.headline}
              </p>
              <p className="label mt-2 !text-filament">Included · every single build</p>
            </div>
          </div>
          <div className="h-px w-full bg-hairline md:h-12 md:w-px" />
          <p className="max-w-[52ch] text-[14px] leading-relaxed text-ash md:text-[15px]">
            {pricing.support.detail} Three weeks after your site goes live, anything
            that needs fixing or changing gets done — you don&rsquo;t pay for it and
            you don&rsquo;t have to sign anything to get it.
          </p>
        </div>
      </FadeUp>

      {/* ---- the board ---- */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Anchor offer */}
        <FadeUp className="lg:col-span-7" y={34}>
          <div
            className="wire-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ink-2 p-7 md:p-10"
            data-live="true"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,122,26,0.30), rgba(8,7,11,0) 70%)",
              }}
            />

            <div className="relative flex items-start justify-between gap-6">
              <div>
                <span className="label !text-filament-gold">The offer</span>
                <h3 className="mt-3 max-w-[15ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[0.98] tracking-[-0.025em]">
                  {pricing.standard.label}
                </h3>
              </div>
              <PanelIcon className="size-7 shrink-0 text-ash-dim" />
            </div>

            <div className="relative mt-8 flex items-end gap-3">
              <span className="filament-text animate-filament font-display text-[clamp(3.6rem,10vw,7rem)] leading-[0.8] tracking-[-0.045em]">
                {pricing.standard.priceLabel}
              </span>
              <span className="label mb-2 !text-ash">{pricing.standard.cadence}</span>
            </div>

            <p className="relative mt-6 max-w-[44ch] text-[15px] leading-relaxed text-ash">
              {pricing.standard.summary}
            </p>

            <ul className="relative mt-8 grid gap-3 border-t border-hairline pt-8 sm:grid-cols-2">
              {pricing.standard.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-snug text-bone/85">
                  <span className="mt-[7px] size-1 shrink-0 rounded-full bg-filament" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Live total — reflects the Care Plan switch in the card alongside. */}
            <div className="relative mt-10 flex flex-col gap-5 border-t border-hairline pt-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="label">Your total</p>
                <p className="mt-2 font-mono text-[clamp(1.1rem,2.2vw,1.5rem)] tabular-nums text-bone">
                  R3,300{" "}
                  <span className="text-ash-dim">once-off</span>
                  {care && (
                    <span className="text-filament"> + R400 / month</span>
                  )}
                </p>
              </div>
              <Magnetic strength={0.26} className="self-start sm:self-auto">
                <Button asChild variant="filament" size="lg" shape="pill">
                  <a
                    href={`${WA}${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-4" />
                    Book this build
                  </a>
                </Button>
              </Magnetic>
            </div>
          </div>
        </FadeUp>

        {/* Add-on + custom path */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <FadeUp delay={0.08} y={34} className="h-full">
            <div className="wire-border flex h-full flex-col rounded-2xl border border-hairline bg-ink-2 p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="label !text-filament">Optional add-on</span>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-none tracking-[-0.02em]">
                    {pricing.care.label}
                  </h3>
                </div>
                <CareIcon className="size-6 shrink-0 text-ash-dim" />
              </div>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div className="flex items-end gap-2">
                  <span className="font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-[0.8] tracking-[-0.03em] text-bone">
                    {pricing.care.priceLabel}
                  </span>
                  <span className="label mb-1.5 !text-ash">/ month</span>
                </div>

                <label className="flex cursor-pointer items-center gap-3">
                  <span className="label !text-[9px]">{care ? "On" : "Off"}</span>
                  <Switch
                    checked={care}
                    onCheckedChange={setCare}
                    aria-label="Add the monthly Care Plan to your total"
                  />
                </label>
              </div>

              <p className="mt-5 text-[14px] leading-relaxed text-ash">
                {pricing.care.summary}
              </p>

              <ul className="mt-6 grid gap-2.5 border-t border-hairline pt-6">
                {pricing.care.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[13.5px] leading-snug text-bone/80">
                    <span className="mt-[7px] size-1 shrink-0 rounded-full bg-filament" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[12.5px] leading-relaxed text-ash-dim">
                Skip it and nothing changes about your site — you still get the
                21 days of free support.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.14} y={34}>
            <div className="wire-border flex flex-col rounded-2xl border border-dashed border-hairline p-7 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="label">Beyond the package</span>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-none tracking-[-0.02em]">
                    {pricing.custom.label}
                  </h3>
                </div>
                <CustomIcon className="size-6 shrink-0 text-ash-dim" />
              </div>

              <p className="mt-5 max-w-[40ch] text-[14px] leading-relaxed text-ash">
                {pricing.custom.summary}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {pricing.custom.includes.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ash-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <Button asChild variant="wire" size="default" shape="pill" className="mt-7 self-start">
                <a
                  href={`${WA}${encodeURIComponent(
                    "Hi Vysan, I need something more advanced than the standard package. Can you quote me?",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get a quote
                  <ArrowOutIcon className="size-3.5" />
                </a>
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>

      <FadeUp>
        <p className="mt-8 max-w-[70ch] text-[13px] leading-relaxed text-ash-dim">
          Prices in South African Rand. Anything outside the standard package is
          quoted per project — message me on {contact.phoneDisplay} and I&rsquo;ll
          tell you straight whether it fits the R3,300 build or needs a quote.
        </p>
      </FadeUp>
    </section>
  );
}
