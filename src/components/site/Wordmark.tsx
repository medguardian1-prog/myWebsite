import { cn } from "@/lib/utils";

/**
 * HOTTWIREE is spelled with a double T on purpose — that's the brand mark,
 * not a typo. So the mark makes the point for us: the TT is the only part
 * that carries the filament gradient, everywhere it appears.
 */
export default function Wordmark({
  className,
  ttClassName,
}: {
  className?: string;
  ttClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>HO</span>
      <span
        className={cn("filament-text animate-filament", ttClassName)}
        // The double T is the brand's tell; don't let it get read as a typo.
        title="HOTTWIREE — spelled with a double T"
      >
        TT
      </span>
      <span>WIREE</span>
    </span>
  );
}
