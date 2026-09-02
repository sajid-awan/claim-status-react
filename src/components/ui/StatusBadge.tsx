import type { ReactNode } from "react";

import { Chip, type ChipRadius, type ChipSize, type ChipTone } from "@/components/ui/Chip";

export type BadgeTone = Extract<ChipTone, "gray" | "orange" | "green" | "blue" | "red">;

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  icon?: ReactNode;
  highlighted?: boolean;
  size?: ChipSize;
  radius?: ChipRadius;
  className?: string;
}

export function StatusBadge({
  label,
  tone = "gray",
  icon,
  highlighted = false,
  size = "sm",
  radius = "full",
  className = "",
}: StatusBadgeProps) {
  return (
    <Chip
      label={label}
      tone={tone}
      size={size}
      radius={radius}
      icon={icon}
      highlighted={highlighted}
      className={className}
    />
  );
}
