"use client";

import { contact, navLinks, owner, site } from "@/lib/site";
import WireMark from "./WireMark";
import { InstagramIcon, WhatsAppIcon, MailIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink pt-16">
      <div className="grid gap-10 px-[var(--gutter)] pb-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-14">
        <div>
          <p className="max-w-[34ch] font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.15] tracking-[-0.02em]">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-[38ch] text-[13.5px] leading-relaxed text-ash">
            Freelance web development by {owner.name}, based in {owner.base} and
            working with businesses across South Africa.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label">Sections</p>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] text-ash transition-colors duration-300 hover:text-bone"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="text-[14px] text-ash transition-colors duration-300 hover:text-bone"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label">Reach me</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-[14px] text-ash transition-colors duration-300 hover:text-bone"
              >
                <WhatsAppIcon className="size-4 text-ash-dim transition-colors group-hover:text-filament" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={contact.mailto}
                className="group flex items-center gap-2.5 break-all text-[14px] text-ash transition-colors duration-300 hover:text-bone"
              >
                <MailIcon className="size-4 shrink-0 text-ash-dim transition-colors group-hover:text-filament" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-[14px] text-ash transition-colors duration-300 hover:text-bone"
              >
                <InstagramIcon className="size-4 text-ash-dim transition-colors group-hover:text-filament" />
                {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* The mark, oversized and cropped by the floor. */}
      <div
        aria-hidden
        className="select-none overflow-hidden px-[var(--gutter)]"
      >
        <WireMark
          className="h-auto w-full text-hairline"
          hotClassName="text-filament/35"
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-hairline px-[var(--gutter)] py-5 text-[11px] text-ash-dim sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono tracking-[0.1em]">
          © {year} {site.name}
        </p>
        <p className="font-mono tracking-[0.1em]">
          Designed &amp; built by {owner.name} · {site.locale}
        </p>
      </div>
    </footer>
  );
}
