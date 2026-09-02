import type { ReactNode } from "react";

export type ChipTone =
  | "gray"
  | "orange"
  | "green"
  | "blue"
  | "red"
  | "from"
  | "to";

export type ChipSize = "sm" | "md";
export type ChipRadius = "md" | "lg" | "full";

export interface ChipProps {
  label: string;
  tone?: ChipTone;
  size?: ChipSize;
  radius?: ChipRadius;
  icon?: ReactNode;
  highlighted?: boolean;
  className?: string;
}

const sizeClasses: Record<ChipSize, string> = {
  sm: "gap-1 px-2.5 py-1 text-xs",
  md: "min-h-7 gap-1 px-[var(--spacing-chip-x)] py-[var(--spacing-chip-y)] text-body-sm leading-snug",
};

const radiusClasses: Record<ChipRadius, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const toneClasses: Record<ChipTone, string> = {
  gray: "border border-transparent bg-surface-gray-100 font-medium text-ink-muted",
  orange: "border border-transparent bg-brand-50 font-medium text-brand-500",
  green: "border border-success-light bg-success-light font-normal text-success",
  blue: "border border-link-bg bg-link-bg font-medium text-link",
  red: "border border-transparent bg-rose-50 font-medium text-rose-600",
  from: "border border-surface-gray-100 bg-surface-gray-100 font-medium text-ink",
  to: "border border-surface-cream bg-surface-cream font-medium text-brand-500",
};

export function Chip({
  label,
  tone = "gray",
  size = "md",
  radius = "full",
  icon,
  highlighted = false,
  className = "",
}: ChipProps) {
  const highlightClass =
    highlighted && tone === "orange"
      ? "border border-brand-500 bg-brand-50 text-brand-500"
      : toneClasses[tone];

  return (
    <span
      className={`inline-flex w-fit max-w-full items-center overflow-visible whitespace-nowrap ${sizeClasses[size]} ${radiusClasses[radius]} ${highlightClass} ${className}`.trim()}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
}
