"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Switch, rebuilt as a physical breaker toggle: square track,
 * ember when live, hairline grey when open.
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-7 w-13 shrink-0 items-center rounded-none border border-hairline p-[3px] transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "data-[state=checked]:border-filament data-[state=checked]:bg-[color-mix(in_oklab,var(--color-filament)_16%,transparent)]",
        "data-[state=unchecked]:bg-ink-3",
        "focus-visible:outline-2 focus-visible:outline-filament focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-full w-6 rounded-none transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[state=checked]:translate-x-[26px] data-[state=checked]:bg-filament",
          "data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-ash-dim",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
