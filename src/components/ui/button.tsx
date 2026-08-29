import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button, re-skinned end to end for HOTTWIREE — nothing of the
 * default rounded-md/primary look survives.
 */
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] transition-[color,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Molten primary: the gradient lives in a pseudo-layer so it can shift.
        filament:
          "text-ink font-semibold overflow-hidden [background:var(--filament-gradient)] [background-size:200%_100%] hover:[background-position:100%_0] shadow-[0_0_0_1px_rgba(255,122,26,0.35),0_18px_50px_-18px_rgba(255,122,26,0.75)]",
        volt: "bg-volt text-ink font-semibold hover:bg-[#c8ff6b] shadow-[0_18px_50px_-20px_rgba(182,255,61,0.8)]",
        wire: "border border-hairline text-bone hover:border-filament hover:text-filament-gold bg-transparent",
        glass: "glass text-bone hover:border-[color-mix(in_oklab,var(--color-filament)_55%,transparent)] hover:text-filament-gold",
        ghost: "text-ash hover:text-bone",
      },
      size: {
        sm: "h-9 px-4",
        default: "h-12 px-6",
        lg: "h-14 px-8 text-[12px]",
        icon: "size-12",
      },
      shape: {
        pill: "rounded-full",
        cut: "rounded-none [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]",
        square: "rounded-none",
      },
    },
    defaultVariants: { variant: "wire", size: "default", shape: "pill" },
  },
);

function Button({
  className,
  variant,
  size,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
