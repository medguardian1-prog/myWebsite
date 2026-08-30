import type { Metadata } from "next";
import Link from "next/link";
import { contact, navLinks } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/site/Icons";
import WireMark from "@/components/site/WireMark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * A dead link is a small trust event on a site whose whole argument is that
 * this developer is careful. It gets the brand treatment rather than the
 * framework default — and, since someone who lands here was looking for
 * something, a way to just ask.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-between px-[var(--gutter)] py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 50% at 50% 30%, rgba(255,122,26,0.14) 0%, rgba(8,7,11,0) 70%)",
        }}
      />

      <Link href="/" aria-label="HOTTWIREE — home" className="inline-flex">
        <WireMark className="h-3 w-auto text-bone" />
      </Link>

      <div className="max-w-[46rem]">
        <p className="label !text-filament">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.92] tracking-[-0.035em]">
          This page isn&rsquo;t here.
        </h1>
        <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-ash md:text-base">
          Either it moved or the link was wrong. Nothing is broken — head back
          to the site, or just message me and tell me what you were after.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button asChild variant="filament" size="lg" shape="pill">
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Ask me directly
            </a>
          </Button>
          <Button asChild variant="wire" size="lg" shape="pill">
            <Link href="/">Back to the site</Link>
          </Button>
        </div>
      </div>

      <nav aria-label="Sections" className="border-t border-hairline pt-5">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {navLinks.map((l, i) => (
            <li key={l.href}>
              <Link
                href={`/${l.href}`}
                className="group flex items-baseline gap-2 transition-colors duration-300"
              >
                <span className="font-mono text-[9px] text-ash-dim group-hover:text-filament">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] text-ash group-hover:text-bone">
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
