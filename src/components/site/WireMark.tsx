import { cn } from "@/lib/utils";

/**
 * The HOTTWIREE logotype, drawn rather than typed.
 *
 * Monoline strokes with square caps — the same grammar as the site's icon set —
 * so the mark reads as bent wire, not as a font. The double T is the brand's
 * tell, and here it's literal: the two crossbars are one continuous hot wire
 * strung between two terminals, with solder nodes where it meets each stem.
 *
 * When `power` is set the mark performs a switch-on rather than a stroke-draw:
 * terminals snap live, a surge runs the length of the wire, then each letter
 * heats up through the ember ramp — dark red, flicker, orange, white — in
 * order of its distance from the wire, so the current visibly spreads outward
 * through the word instead of sweeping left to right. A pen drawing letters is
 * a portfolio cliché; a filament coming up to temperature is the brand.
 */

const ADVANCE = 104;
const W = 74; // letter width
const H = 120; // cap height
const X = (i: number) => i * ADVANCE;

export const MARK_LETTERS: readonly string[] = [
  // H
  `M${X(0)},0 V${H} M${X(0) + W},0 V${H} M${X(0)},60 H${X(0) + W}`,
  // O
  `M${X(1) + 37},0 C${X(1) + 61},0 ${X(1) + W},27 ${X(1) + W},60 C${X(1) + W},93 ${X(1) + 61},${H} ${X(1) + 37},${H} C${X(1) + 13},${H} ${X(1)},93 ${X(1)},60 C${X(1)},27 ${X(1) + 13},0 ${X(1) + 37},0 Z`,
  // T — stem only; the crossbar is the shared hot wire
  `M${X(2) + 37},0 V${H}`,
  // T
  `M${X(3) + 37},0 V${H}`,
  // W
  `M${X(4)},0 L${X(4) + 18},${H} L${X(4) + 37},40 L${X(4) + 56},${H} L${X(4) + W},0`,
  // I
  `M${X(5) + 17},0 H${X(5) + 57} M${X(5) + 37},0 V${H} M${X(5) + 17},${H} H${X(5) + 57}`,
  // R
  `M${X(6)},${H} V0 H${X(6) + 40} C${X(6) + 70},0 ${X(6) + 70},60 ${X(6) + 40},60 H${X(6)} M${X(6) + 42},60 L${X(6) + W},${H}`,
  // E
  `M${X(7) + W},0 H${X(7)} V${H} H${X(7) + W} M${X(7)},60 H${X(7) + 50}`,
  // E
  `M${X(8) + W},0 H${X(8)} V${H} H${X(8) + W} M${X(8)},60 H${X(8) + 50}`,
];

/**
 * Distance of each letter from the hot wire, in "hops". Drives the switch-on
 * order: the two Ts are on the wire, so they light first and it spreads out.
 */
const HOPS = [2, 1, 0, 0, 1, 2, 3, 4, 5];

const STEM_A = X(2) + 37;
const STEM_B = X(3) + 37;
export const MARK_BAR_X1 = X(2) - 8;
export const MARK_BAR_X2 = X(3) + W + 8;

/** Terminals at each end, solder nodes where the wire meets the stems. */
export const MARK_NODES: readonly { x: number; r: number }[] = [
  { x: MARK_BAR_X1, r: 12 },
  { x: STEM_A, r: 6 },
  { x: STEM_B, r: 6 },
  { x: MARK_BAR_X2, r: 12 },
];

export default function WireMark({
  className,
  hotClassName = "text-filament",
  power = false,
}: {
  className?: string;
  /** Colour class for the hot wire and its nodes. */
  hotClassName?: string;
  /** Run the switch-on sequence (hero only). */
  power?: boolean;
}) {
  const SURGE = 0.62; // wire lights over this long
  const LETTER_START = 0.30; // first letter catches before the surge finishes

  return (
    <svg
      viewBox="-10 -16 926 150"
      className={cn("block", className)}
      role="img"
      aria-label="HOTTWIREE"
      fill="none"
    >
      <title>HOTTWIREE</title>

      <g strokeWidth={13} strokeLinecap="square" strokeLinejoin="miter">
        {MARK_LETTERS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="currentColor"
            className={power ? "mark-letter" : undefined}
            style={
              power
                ? { animationDelay: `${LETTER_START + HOPS[i] * 0.105}s` }
                : undefined
            }
          />
        ))}
      </g>

      <g className={hotClassName}>
        {/* The wire. Surges from the left terminal to the right. */}
        <path
          d={`M${MARK_BAR_X1},0 H${MARK_BAR_X2}`}
          stroke="currentColor"
          strokeWidth={13}
          strokeLinecap="square"
          pathLength={1}
          className={power ? "mark-surge" : undefined}
          style={power ? { animationDuration: `${SURGE}s` } : undefined}
        />
        {MARK_NODES.map((n, i) => (
          <circle
            key={n.x}
            cx={n.x}
            cy={0}
            r={n.r}
            fill="currentColor"
            className={power ? "mark-node" : undefined}
            style={
              power
                ? {
                    // Each node lights as the surge reaches it.
                    animationDelay: `${0.06 + (i / (MARK_NODES.length - 1)) * SURGE * 0.85}s`,
                  }
                : undefined
            }
          />
        ))}
      </g>
    </svg>
  );
}
