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
    <div className="status-transition">
      <Chip
        label={from}
        tone="from"
        size={size}
        radius={radius}
        icon={fromIcon ?? <span className="status-dot--from" aria-hidden="true" />}
      />
      <span className="status-transition__separator">to</span>
      <Chip
        label={to}
        tone="to"
        size={size}
        radius={radius}
        icon={toIcon ?? <span className="status-dot--to" aria-hidden="true" />}
      />
    </div>
  );
}
