import type { SVGProps } from "react";

/**
 * A hand-drawn icon set built on one grammar: 1.4 stroke, square caps,
 * right angles, and a single filled node standing for a live connection.
 * Deliberately not a library set — these belong to this brand only.
 */

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

/** Official WhatsApp glyph — this one has to be instantly recognisable. */
export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488" />
    </svg>
  );
}

/** Envelope drawn as a folded sheet with a live node at the seal. */
export function MailIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M2.5 5.5h19v13h-19z" />
      <path d="M2.5 5.5 12 13l9.5-7.5" />
      <circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Arrow that leaves the frame — used on every outbound link. */
export function ArrowOutIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function ArrowDownIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M12 4v16" />
      <path d="M5.5 13.5 12 20l6.5-6.5" />
    </svg>
  );
}

/** The brand's core mark: a hot wire arcing between two terminals. */
export function FilamentIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M2.5 12h4" />
      <path d="M17.5 12h4" />
      <path d="M6.5 12c0-4 2-4 2.75 0s2.75 4 3.5 0 2.75-4 3.5 0" />
      <circle cx="2.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="21.5" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Distribution board — used for the pricing panel. */
export function PanelIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M3.5 3.5h17v17h-17z" />
      <path d="M8 7.5v9M12 7.5v9M16 7.5v9" />
      <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Shield with a wire running through it — the 21-day support badge. */
export function SupportIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M12 2.5 20 6v6c0 5-3.4 8.2-8 9.5C7.4 20.2 4 17 4 12V6z" />
      <path d="M7.5 12h2.5l1.5-3 1.5 6 1-3h2.5" />
    </svg>
  );
}

/** Spanner shaped from the same wire grammar — the Care Plan. */
export function CareIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M15.5 3.2a5 5 0 0 0-5.9 6.4L3.4 15.8l2.8 2.8 6.2-6.2a5 5 0 0 0 6.4-5.9L16 9.3l-1.9-.5-.5-1.9z" />
      <circle cx="6.6" cy="17.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Bracket pair with a caret — the custom build path. */
export function CustomIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M8.5 4.5h-4v15h4M15.5 4.5h4v15h-4" />
      <path d="M10 14.5 12 9.5l2 5" />
      <path d="M10.6 12.8h2.8" />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <path d="M12 21.5S5 15.6 5 10.2a7 7 0 0 1 14 0c0 5.4-7 11.3-7 11.3z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

/** Magnifier for the search illustration. */
export function SearchIcon(props: P) {
  return (
    <svg {...base} aria-hidden {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

/** Filled star, for the rating row in the search illustration. */
export function StarIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.44 6.2 20.5l1.1-6.47L2.6 9.45l6.5-.95z" />
    </svg>
  );
}
