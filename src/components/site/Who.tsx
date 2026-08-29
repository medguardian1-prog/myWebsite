"use client";

import Image from "next/image";
import { owner, site, contact } from "@/lib/site";
import blur from "@/lib/blur.json";
import { SplitWords, FadeUp } from "./TextReveal";
import { Button } from "@/components/ui/button";
import { InstagramIcon, PinIcon, WhatsAppIcon } from "./Icons";
import Magnetic from "./Magnetic";

const blurMap = blur as Record<string, string>;

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
                TODO: Vysan — when you have a good photo of yourself, drop it at
                /public/vysan.jpg and point this Image at it. Until then this is
                Durban rather than a stock face: it makes the "based in Durban"
                claim concrete without pretending to be you.
              */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-3">
                <Image
                  src="/durban.webp"
                  alt="The arch of Moses Mabhida Stadium, Durban"
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  placeholder={blurMap.durban ? "blur" : "empty"}
                  blurDataURL={blurMap.durban}
                  className="object-cover"
                />
                {/* Drafting grid, so the plate reads as a document not a postcard. */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-bone) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,11,0.88)_0%,rgba(8,7,11,0.08)_42%,rgba(8,7,11,0.32)_100%)]"
                />
                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4">
                  <span className="label !text-[9px] !text-bone">
                    Moses Mabhida
                    <br />
                    Durban, KZN
                  </span>
                  <span className="font-mono text-[9px] tabular-nums text-ash-dim">
                    29°49&rsquo;S 31°01&rsquo;E
                  </span>
                </div>
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
