"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/site";
import blur from "@/lib/blur.json";
import { ArrowOutIcon } from "./Icons";
import { cn } from "@/lib/utils";

const blurMap = blur as Record<string, string>;

/**
 * One demo. The still is a real screenshot of the live site; hold the pointer
 * on it for a beat and the actual site loads in behind it, scaled down to fit.
 * Proof beats a mockup, and a mockup beats a promise.
 */
export default function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const frameRef = useRef<HTMLDivElement>(null);

  // The preview iframe renders at a fixed 1440px desktop viewport, so it has
  // to be scaled by however much the card has shrunk relative to that.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      el.style.setProperty(
        "--preview-scale",
        String(entry.contentRect.width / 1440),
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const host = new URL(project.url).host;

  const arm = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    window.clearTimeout(timer.current);
    // Beat of delay so sweeping across the gallery doesn't fire five loads.
    timer.current = window.setTimeout(() => setLive(true), 420);
  };

  const disarm = () => {
    window.clearTimeout(timer.current);
    setLive(false);
    setLoaded(false);
  };

  return (
    <article
      className={cn("group/card relative flex flex-col", className)}
      onPointerEnter={arm}
      onPointerLeave={disarm}
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-filament">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-[clamp(1.7rem,3vw,2.75rem)] leading-none tracking-[-0.02em]">
            {project.name}
          </h3>
        </div>
        <span className="label hidden shrink-0 !text-ash-dim sm:block">
          {project.year}
        </span>
      </div>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        data-cursor-label="Live"
        aria-label={`Open the live ${project.name} site in a new tab`}
        className="wire-border relative block overflow-hidden rounded-2xl border border-hairline bg-ink-2"
      >
        {/* Chrome bar: the real domain, because the real domain is the proof. */}
        <div className="flex items-center gap-2.5 border-b border-hairline bg-ink-3/80 px-4 py-2.5">
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full transition-colors duration-500",
              live ? "bg-volt animate-live" : "bg-ash-dim",
            )}
          />
          <span className="truncate font-mono text-[10px] tracking-[0.1em] text-ash">
            {host}
          </span>
          <ArrowOutIcon className="ml-auto size-3.5 shrink-0 text-ash-dim transition-all duration-500 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-filament" />
        </div>

        <div ref={frameRef} className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.shot}
            alt={`Screenshot of the ${project.name} website`}
            fill
            sizes="(min-width: 1024px) 60vw, 92vw"
            placeholder={blurMap[project.slug] ? "blur" : "empty"}
            blurDataURL={blurMap[project.slug]}
            className={cn(
              "object-cover object-top transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              "scale-[1.02] group-hover/card:scale-100",
              loaded && "opacity-0",
            )}
            priority={index === 0}
          />

          {live && (
            <iframe
              src={project.url}
              title={`Live preview of ${project.name}`}
              tabIndex={-1}
              aria-hidden
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setLoaded(true)}
              // Rendered at a desktop viewport then scaled to the card, so the
              // preview shows the real desktop layout rather than a squeezed one.
              className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
              style={{
                width: "1440px",
                height: "900px",
                transform: "scale(var(--preview-scale))",
                opacity: loaded ? 1 : 0,
                transition: "opacity .6s ease",
              }}
            />
          )}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,11,0.55),transparent_45%)] opacity-70 transition-opacity duration-700 group-hover/card:opacity-30"
          />
        </div>
      </a>

      <div className="mt-5 flex flex-col gap-3">
        <p className="label !text-filament-gold">{project.sector}</p>
        {/* TODO: Vysan confirm/replace this description */}
        <p className="max-w-[46ch] text-[14px] leading-relaxed text-ash md:text-[15px]">
          {project.blurb}
        </p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash-dim"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
