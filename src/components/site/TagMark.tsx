import { cn } from "@/lib/utils";
import {
  MARK_LETTERS,
  MARK_NODES,
  MARK_BAR_X1,
  MARK_BAR_X2,
} from "./WireMark";

/**
 * The footer's mark: the logotype thrown up as a piece.
 *
 * Built the way a throw-up actually is, back to front — a hard offset drop
 * shadow, a keyline, then the letter interiors knocked back to the wall
 * colour. Mitre joins and square caps keep the limbs chunky and angular;
 * rounded joins are what make this kind of lettering read as balloons instead
 * of paint, which is exactly what the first attempt got wrong.
 *
 * A turbulence displacement filter roughens the edges so the vectors carry a
 * hand quality, and the whole piece leans, because nothing worth looking at is
 * painted upright.
 *
 * It shares WireMark's geometry rather than inventing a second alphabet, so
 * the tag and the logotype are recognisably the same word.
 */

const FILL = 34; // limb weight
const KEYLINE = FILL + 7; // outline sits proud of the fill
const DROP_X = 13;
const DROP_Y = 15;
const SLANT = -12;

const BAR = `M${MARK_BAR_X1},0 H${MARK_BAR_X2}`;
const ALL = [...MARK_LETTERS, BAR];

/** One pass over every limb of the word, at a given weight and colour. */
function Pass({
  width,
  stroke,
  opacity,
}: {
  width: number;
  stroke: string;
  opacity?: number;
}) {
  return (
    <g
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeMiterlimit={4}
      opacity={opacity}
    >
      {ALL.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

export default function TagMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-66 -36 1034 220"
      className={cn("block", className)}
      role="img"
      aria-label="HOTTWIREE"
      fill="none"
    >
      <title>HOTTWIREE</title>

      <defs>
        {/*
          Low-frequency fractal noise through a displacement map. Scale is the
          whole trick: much under 5 and it looks like a rendering fault, much
          over 10 and the letters stop being readable at this weight.
        */}
        <filter
          id="tag-rough"
          x="-10%"
          y="-25%"
          width="120%"
          height="150%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.016"
            numOctaves={3}
            seed={17}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={7}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <g filter="url(#tag-rough)" transform={`translate(10,0) skewX(${SLANT})`}>
        {/* 1. The drop. Warm rather than black, so it reads against the ink. */}
        <g transform={`translate(${DROP_X},${DROP_Y})`}>
          <Pass width={KEYLINE} stroke="#2b1509" />
        </g>

        {/* 2. Keyline. */}
        <Pass width={KEYLINE} stroke="currentColor" />

        {/* 3. Interiors knocked back to the wall, leaving the outline. */}
        <Pass width={FILL} stroke="var(--color-ink)" />

        {/* 4. The wire still runs hot through it — the brand's tell survives. */}
        <g>
          <path
            d={BAR}
            stroke="var(--color-filament)"
            strokeWidth={9}
            strokeLinecap="square"
            opacity={0.75}
          />
          {MARK_NODES.map((n) => (
            <circle
              key={n.x}
              cx={n.x}
              cy={0}
              r={n.r * 0.7}
              fill="var(--color-filament)"
              opacity={0.75}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
