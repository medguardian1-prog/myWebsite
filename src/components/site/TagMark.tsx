import { cn } from "@/lib/utils";
import {
  MARK_LETTERS,
  MARK_NODES,
  MARK_BAR_X1,
  MARK_BAR_X2,
} from "./WireMark";

/**
 * The footer's version of the mark: the same letterforms, thrown up as a tag.
 *
 * Three moves turn the precise logotype into street lettering without changing
 * a single coordinate — so it still reads as the same brand rather than a
 * second, unrelated logo:
 *
 *  1. Fat strokes knocked out by a slightly thinner stroke in the background
 *     colour, which leaves a hairline outline around every limb. That's the
 *     "blockbuster outline" of a throw-up, and at this weight it reads
 *     expensive rather than childish.
 *  2. A turbulence displacement filter, which gives the vector edges a real
 *     hand-drawn wobble — the difference between a font and a marker.
 *  3. A slant, because nobody tags upright.
 *
 * It sits behind the footer content, oversized and bleeding off both edges,
 * as a wall the page ends on.
 */

const OUTER = 29; // fat stroke — becomes the outline
const INNER = 22; // knockout — leaves (OUTER - INNER) / 2 of visible edge
const SLANT = -9;

export default function TagMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-46 -34 992 190"
      className={cn("block", className)}
      role="img"
      aria-label="HOTTWIREE"
      fill="none"
    >
      <title>HOTTWIREE</title>

      <defs>
        {/*
          Low-frequency fractal noise pushed through a displacement map. Scale
          is the whole trick: much under 6 and it looks like a rendering fault,
          much over 12 and the letters stop being readable.
        */}
        <filter
          id="tag-rough"
          x="-12%"
          y="-30%"
          width="124%"
          height="160%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011 0.019"
            numOctaves={3}
            seed={11}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={9}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g filter="url(#tag-rough)" transform={`translate(6,0) skewX(${SLANT})`}>
        {/* Outline pass */}
        <g
          stroke="currentColor"
          strokeWidth={OUTER}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {MARK_LETTERS.map((d, i) => (
            <path key={`o${i}`} d={d} />
          ))}
          <path d={`M${MARK_BAR_X1},0 H${MARK_BAR_X2}`} />
        </g>

        {/* Knockout pass — paints the page colour back over the middle. */}
        <g
          stroke="var(--color-ink)"
          strokeWidth={INNER}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {MARK_LETTERS.map((d, i) => (
            <path key={`k${i}`} d={d} />
          ))}
          <path d={`M${MARK_BAR_X1},0 H${MARK_BAR_X2}`} />
        </g>

        {/* The wire keeps its heat, so the brand's tell survives the treatment. */}
        <g className="text-filament/50">
          <path
            d={`M${MARK_BAR_X1},0 H${MARK_BAR_X2}`}
            stroke="currentColor"
            strokeWidth={5}
            strokeLinecap="round"
          />
          {MARK_NODES.map((n) => (
            <circle key={n.x} cx={n.x} cy={0} r={n.r * 0.55} fill="currentColor" />
          ))}
        </g>
      </g>
    </svg>
  );
}
