"use client";

import { owner, site, contact } from "@/lib/site";
import { SplitWords, FadeUp } from "./TextReveal";
import { Button } from "@/components/ui/button";
import { InstagramIcon, PinIcon, WhatsAppIcon } from "./Icons";
import Magnetic from "./Magnetic";

const SPEC: readonly (readonly [string, string])[] = [
  ["Name", owner.name],
  ["Age", String(owner.age)],
  ["Role", owner.role],
  ["Base", owner.base],
  ["Studying", owner.school],
  ["Year", owner.year],
];

/**
 * The human section. One person, named, with a phone number that reaches him.
 * That is the actual differentiator, so it gets stated plainly rather than
 * dressed up as a team.
 */
export default function Who() {
  return (
    <section id="who" className="relative bg-ink px-[var(--gutter)] py-24 md:py-36">
      <div className="flex items-baseline gap-4">
        <span className="label !text-filament">(05)</span>
        <span className="label">Who builds it</span>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---- dossier plate ---- */}
        <FadeUp className="lg:col-span-5" y={34}>
          <div className="lg:sticky lg:top-28">
            <div className="wire-border overflow-hidden rounded-2xl border border-hairline bg-ink-2">
              {/*
                TODO: Vysan — drop a photo of yourself at /public/vysan.jpg and
                swap this block for a next/image. Until then this stays a mark
                rather than a stock face, because a stock face reads as a lie.
              */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-3">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(85% 60% at 50% 78%, rgba(255,122,26,0.26) 0%, rgba(232,72,10,0.09) 40%, rgba(8,7,11,0) 72%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-hairline) 1px, transparent 1px), linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="filament-text animate-filament font-display text-[clamp(5rem,16vw,9rem)] leading-none tracking-[-0.05em]">
                    VC
                  </span>
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(255,122,26,0.10),transparent)]"
                />
                <span className="label absolute bottom-4 left-5 !text-[9px]">
                  Operator
                </span>
              </div>

              <dl className="divide-y divide-hairline border-t border-hairline">
                {SPEC.map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-4 px-5 py-3.5">
                    <dt className="label w-[5.5rem] shrink-0 !text-[9px]">{k}</dt>
                    <dd className="text-[13.5px] leading-snug text-bone/90">{v}</dd>
                  </div>
                ))}
                <div className="flex items-center gap-4 px-5 py-3.5">
                  <dt className="label w-[5.5rem] shrink-0 !text-[9px]">Status</dt>
                  <dd className="flex items-center gap-2 text-[13.5px] text-filament">
                    <span className="size-1.5 rounded-full bg-filament " />
                    Taking on work
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-ash transition-colors hover:text-bone"
              >
                <InstagramIcon className="size-4 transition-colors group-hover:text-filament" />
                {site.instagram.handle}
              </a>
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-ash-dim">
                <PinIcon className="size-4" />
                {site.locale}
              </span>
            </div>
          </div>
        </FadeUp>

        {/* ---- the story ---- */}
        <div className="lg:col-span-7">
          <SplitWords
            as="h2"
            text="Not an agency. One developer, and you have his number."
            className="max-w-[17ch] font-display text-[clamp(2.1rem,5vw,4.4rem)] leading-[0.94] tracking-[-0.03em]"
          />

          <FadeUp delay={0.08}>
            <div className="filament-rule my-9" />
          </FadeUp>

          <div className="grid gap-6 text-[15px] leading-relaxed text-ash md:text-base">
            <FadeUp delay={0.1}>
              <p>
                I&rsquo;m {owner.name}, {owner.age}, in my final year at{" "}
                <span className="text-bone">{owner.school}</span>, working out of{" "}
                {owner.base}. HOTTWIREE is me — there is no team of twelve behind a
                stock photo, and there&rsquo;s no account manager between you and
                the person writing the code.
              </p>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p>
                I started this because of what I keep seeing around Durban: good
                businesses that are effectively invisible the moment someone looks
                them up. A guesthouse with no rates online. A builder whose only
                page is a Facebook profile that stopped in 2023. The work is fine.
                The finding is the problem.
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p>
                So the price is{" "}
                <span className="text-bone">R3,300 and it&rsquo;s written on this page</span>
                , the build takes{" "}
                <span className="text-bone">five business days</span>, and the work
                is custom every time. The reason I can move that fast is that
                it&rsquo;s just me: you send a voice note, I change it that
                afternoon.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.22}>
            <blockquote className="mt-12 border-l border-filament/50 pl-6 font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.15] tracking-[-0.02em] text-bone">
              I&rsquo;d rather show you five builds you can open than talk about
              ten you can&rsquo;t.
            </blockquote>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.28}>
                <Button asChild variant="filament" size="lg" shape="pill">
                  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-4" />
                    Message me directly
                  </a>
                </Button>
              </Magnetic>
              <span className="label !text-ash-dim">
                Usually replies same day
              </span>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
