import { cn } from "@/lib/utils";
import {
  MARK_LETTERS,
  MARK_NODES,
  MARK_BAR_X1,
  MARK_BAR_X2,
} from "./WireMark";

/**
 * The footer mark: the logotype at rest, but never quite still.
 *
 * Two loops run forever, both slow enough to read as ambient rather than as
 * an animation demanding attention:
 *
 *  1. A soft band of light travels across the letterforms every twelve
 *     seconds, the way light moves over brushed metal. It's masked, so it
 *     lifts the strokes rather than adding anything on top of them.
 *  2. A single pulse of current runs the hot wire, over and over — the sign
 *     that the circuit is still live after the hero's switch-on.
 *
 * Both are CSS transforms on the compositor, so the cost of leaving them
 * running at the bottom of the page is effectively nothing.
 */

const PULSE_LEN = MARK_BAR_X2 - MARK_BAR_X1;
const BAR = `M${MARK_BAR_X1},0 H${MARK_BAR_X2}`;

export default function LiveMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-10 -18 926 154"
      className={cn("block", className)}
      role="img"
      aria-label="HOTTWIREE"
      fill="none"
    >
      <title>HOTTWIREE</title>

      <defs>
        <linearGradient id="live-sweep-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* The travelling band, as a mask over the bright copy of the mark. */}
        <mask id="live-sweep" maskUnits="userSpaceOnUse" x="-10" y="-18" width="926" height="154">
          <rect
            className="mark-sweep"
            x="-420"
            y="-40"
            width="380"
            height="220"
            fill="url(#live-sweep-grad)"
          />
        </mask>
      </defs>

      {/* Base: hairline, dim, the resting state. */}
      <g
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {MARK_LETTERS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* Highlight: the same strokes, revealed only under the band. */}
      <g
        mask="url(#live-sweep)"
        stroke="var(--color-bone)"
        strokeWidth={6}
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity={0.55}
      >
        {MARK_LETTERS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* The wire, and the pulse that keeps running it. */}
      <g>
        <path
          d={BAR}
          stroke="var(--color-filament)"
          strokeWidth={6}
          strokeLinecap="square"
          opacity={0.5}
        />
        {MARK_NODES.map((n) => (
          <circle
            key={n.x}
            cx={n.x}
            cy={0}
            r={n.r * 0.5}
            fill="var(--color-filament)"
            opacity={0.5}
          />
        ))}
        <g
          className="mark-pulse"
          style={{ ["--pulse-len" as string]: `${PULSE_LEN}px` }}
        >
          <circle
            cx={MARK_BAR_X1}
            cy={0}
            r={7}
            fill="var(--color-filament-gold)"
          />
        </g>
      </g>
    </svg>
  );
}
