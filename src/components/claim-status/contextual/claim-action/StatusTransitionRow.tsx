import type { ReactNode } from "react";

import { Chip, type ChipRadius, type ChipSize } from "@/components/ui/Chip";

interface StatusTransitionRowProps {
  from: string;
  to: string;
  fromIcon?: ReactNode;
  toIcon?: ReactNode;
  size?: ChipSize;
  radius?: ChipRadius;
}

export function StatusTransitionRow({
  from,
  to,
  fromIcon,
  toIcon,
  size = "md",
  radius = "full",
}: StatusTransitionRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-dot gap-y-1.5">
      <Chip
        label={from}
        tone="from"
        size={size}
        radius={radius}
        icon={
          fromIcon ?? <span className="size-2 shrink-0 rounded-full bg-ink" aria-hidden="true" />
        }
      />
      <span className="text-body-sm font-normal leading-body text-ink/40">to</span>
      <Chip
        label={to}
        tone="to"
        size={size}
        radius={radius}
        icon={
          toIcon ?? (
            <span className="size-2 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
          )
        }
      />
    </div>
  );
}
