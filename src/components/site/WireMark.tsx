import { cn } from "@/lib/utils";

/**
 * The HOTTWIREE logotype, drawn rather than typed.
 *
 * Every letter is constructed from a single-weight stroke with square caps —
 * the same grammar as the site's icon set — so the mark reads as bent wire,
 * not as a font. The double T is the brand's tell, and here it's literal: the
 * two crossbars are one continuous hot wire spanning both letters, terminated
 * with a filled node at each end, exactly like the FilamentIcon.
 *
 * `draw` animates the strokes on like a wire being bent into shape; used once,
 * in the hero. Nav and footer render it static.
 */

// Letter grid: 76 wide, 120 tall, 36 gap. One path per letter keeps the
// draw-on stagger simple.
const X = (i: number) => i * 112;

const LETTERS: readonly string[] = [
  // H
  `M${X(0)},0 V120 M${X(0) + 76},0 V120 M${X(0)},62 H${X(0) + 76}`,
  // O
  `M${X(1) + 38},0 C${X(1) + 63},0 ${X(1) + 76},26 ${X(1) + 76},60 C${X(1) + 76},94 ${X(1) + 63},120 ${X(1) + 38},120 C${X(1) + 13},120 ${X(1)},94 ${X(1)},60 C${X(1)},26 ${X(1) + 13},0 ${X(1) + 38},0 Z`,
  // T (stem only — the crossbar is the shared hot wire below)
  `M${X(2) + 38},0 V120`,
  // T
  `M${X(3) + 38},0 V120`,
  // W
  `M${X(4)},0 L${X(4) + 19},120 L${X(4) + 38},42 L${X(4) + 57},120 L${X(4) + 76},0`,
  // I
  `M${X(5) + 18},0 H${X(5) + 58} M${X(5) + 38},0 V120 M${X(5) + 18},120 H${X(5) + 58}`,
  // R
  `M${X(6)},120 V0 H${X(6) + 42} C${X(6) + 74},0 ${X(6) + 74},62 ${X(6) + 42},62 H${X(6)} M${X(6) + 46},64 L${X(6) + 76},120`,
  // E
  `M${X(7) + 76},0 H${X(7)} V120 H${X(7) + 76} M${X(7)},60 H${X(7) + 52}`,
  // E
  `M${X(8) + 76},0 H${X(8)} V120 H${X(8) + 76} M${X(8)},60 H${X(8) + 52}`,
];

// The hot wire: one bar across both T stems, node at each terminal.
const BAR_X1 = X(2) - 6;
const BAR_X2 = X(3) + 82;

export default function WireMark({
  className,
  hotClassName = "text-filament",
  draw = false,
}: {
  className?: string;
  /** Colour class for the TT wire and its terminals. */
  hotClassName?: string;
  /** Animate the strokes drawing on (hero only). */
  draw?: boolean;
}) {
  const anim = (i: number) =>
    draw
      ? {
          pathLength: 1,
          strokeDasharray: "1",
          strokeDashoffset: "1",
          style: {
            animation: `wire-draw 0.9s cubic-bezier(0.16,1,0.3,1) ${0.07 * i}s forwards`,
          },
          className: "wire-anim",
        }
      : {};

  return (
    <svg
      viewBox="-16 -16 1004 152"
      className={cn("block", className)}
      role="img"
      aria-label="HOTTWIREE"
      fill="none"
    >
      <title>HOTTWIREE</title>

      <g stroke="currentColor" strokeWidth={14} strokeLinecap="square">
        {LETTERS.map((d, i) => (
          <path key={i} d={d} {...anim(i)} />
        ))}
      </g>

      <g className={hotClassName}>
        <path
          d={`M${BAR_X1},0 H${BAR_X2}`}
          stroke="currentColor"
          strokeWidth={14}
          strokeLinecap="square"
          {...anim(LETTERS.length)}
        />
        {[BAR_X1, BAR_X2].map((cx) => (
          <circle
            key={cx}
            cx={cx}
            cy={0}
            r={13}
            fill="currentColor"
            className={draw ? "wire-anim" : undefined}
            style={
              draw
                ? {
                    opacity: 0,
                    animation: `wire-node 0.4s ease ${0.07 * LETTERS.length + 0.55}s forwards`,
                  }
                : undefined
            }
          />
        ))}
      </g>
    </svg>
  );
}
