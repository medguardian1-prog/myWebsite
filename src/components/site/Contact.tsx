"use client";

import { contact, pricing } from "@/lib/site";
import { SplitWords, FadeUp } from "./TextReveal";
import { ArrowOutIcon, MailIcon, WhatsAppIcon } from "./Icons";

const ROWS = [
  {
    key: "wa",
    kicker: "Fastest",
    label: contact.phoneDisplay,
    sub: "WhatsApp — send a voice note if it’s easier",
    href: contact.whatsapp,
    external: true,
    Icon: WhatsAppIcon,
  },
  {
    key: "mail",
    kicker: "Or",
    label: contact.email,
    sub: "Email — tell me the business and what you need",
    href: contact.mailto,
    external: false,
    Icon: MailIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-hairline bg-ink px-[var(--gutter)] py-24 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(70% 60% at 20% 110%, rgba(255,122,26,0.22) 0%, rgba(8,7,11,0) 70%)",
        }}
      />

      <div className="relative">
        <div className="flex items-baseline gap-4">
          <span className="label !text-filament">(06)</span>
          <span className="label">The ask</span>
        </div>

        <SplitWords
          as="h2"
          text="Let’s get your business found."
          className="mt-6 max-w-[11ch] font-display text-[clamp(2.8rem,9vw,8rem)] leading-[0.88] tracking-[-0.04em]"
        />

        <FadeUp delay={0.12}>
          <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-ash md:text-lg">
            One message is all this takes. Tell me what your business does and
            I&rsquo;ll tell you what I&rsquo;d build — no quote form, no call
            booking, no pitch deck.
          </p>
        </FadeUp>

        {/* ---- the two ways in ---- */}
        <ul className="mt-14 border-t border-hairline">
          {ROWS.map(({ key, kicker, label, sub, href, external, Icon }, i) => (
            <li key={key} className="border-b border-hairline">
              <FadeUp delay={0.06 * i}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group relative flex items-center gap-5 overflow-hidden px-2 py-7 md:gap-8 md:py-10"
                >
                  {/* Heat sweeps in from the left on hover. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 [background:var(--filament-gradient)] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />

                  <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-hairline transition-colors duration-500 group-hover:border-ink/30 md:size-14">
                    <Icon className="size-4 text-filament transition-colors duration-500 group-hover:text-ink md:size-5" />
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span className="label block transition-colors duration-500 group-hover:!text-ink/60">
                      {kicker}
                    </span>
                    <span className="mt-1.5 block truncate font-display text-[clamp(1.5rem,5vw,3.4rem)] leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-ink">
                      {label}
                    </span>
                    <span className="mt-2 block text-[13px] text-ash transition-colors duration-500 group-hover:text-ink/70 md:text-sm">
                      {sub}
                    </span>
                  </span>

                  <ArrowOutIcon className="relative size-5 shrink-0 text-ash-dim transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink md:size-7" />
                </a>
              </FadeUp>
            </li>
          ))}
        </ul>

        {/* ---- restate the offer, one last time ---- */}
        <FadeUp delay={0.1}>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ["R3,300", "Once-off, for the full landing page site"],
              ["R400 / mo", "Care Plan — optional, cancel any time"],
              [`${pricing.support.days} days`, "Free support after launch, always included"],
            ].map(([big, small]) => (
              <div key={big} className="border-t border-hairline pt-5">
                <p className="font-display text-[clamp(1.6rem,3vw,2.3rem)] leading-none tracking-[-0.02em] text-bone">
                  {big}
                </p>
                <p className="mt-2.5 max-w-[26ch] text-[13px] leading-relaxed text-ash">
                  {small}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
