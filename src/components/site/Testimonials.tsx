import { testimonials } from "@/lib/site";
import { FadeUp } from "./TextReveal";

/**
 * Renders nothing until there is something real to render.
 *
 * The five builds on this site are demos, so there is nobody to quote yet and
 * inventing one would undo the honesty the rest of the page is built on. The
 * section is here so that the day a paying client says something good, it's
 * one entry in `site.ts` and it appears — no design work needed at the moment
 * you're busiest.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section
      id="words"
      className="relative bg-ink px-[var(--gutter)] py-24 md:py-36"
    >
      <div className="flex items-baseline gap-4">
        <span className="label !text-filament">(—)</span>
        <span className="label">In their words</span>
      </div>

      <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <FadeUp key={t.name} delay={i * 0.06} y={30}>
            <li className="wire-border flex h-full flex-col justify-between rounded-2xl border border-hairline bg-ink-2 p-7">
              <blockquote className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] leading-[1.25] tracking-[-0.015em] text-bone">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="mt-8 border-t border-hairline pt-5">
                <p className="text-[14px] text-bone">{t.name}</p>
                {t.url ? (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-1.5 block transition-colors hover:!text-filament"
                  >
                    {t.business}
                  </a>
                ) : (
                  <p className="label mt-1.5">{t.business}</p>
                )}
              </footer>
            </li>
          </FadeUp>
        ))}
      </ul>
    </section>
  );
}
