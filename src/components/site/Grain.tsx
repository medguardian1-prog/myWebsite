"use client";

/**
 * Fixed film-grain plate. SVG turbulence rather than a bitmap so it costs
 * nothing to download and stays crisp on any density.
 */
export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.16] mix-blend-overlay motion-reduce:opacity-[0.1]"
    >
      <svg className="h-full w-full">
        <filter id="hw-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hw-grain)" />
      </svg>
    </div>
  );
}
