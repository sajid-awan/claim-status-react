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

const sizeClass: Record<ChipSize, string> = {
  sm: "chip--sm",
  md: "chip--md",
};

const radiusClass: Record<ChipRadius, string> = {
  md: "chip--radius-md",
  lg: "chip--radius-lg",
  full: "chip--radius-full",
};

const toneClass: Record<ChipTone, string> = {
  gray: "chip--gray",
  orange: "chip--orange",
  green: "chip--green",
  blue: "chip--blue",
  red: "chip--red",
  from: "chip--from",
  to: "chip--to",
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
  const toneModifier =
    highlighted && tone === "orange" ? "chip--orange-highlight" : toneClass[tone];

  return (
    <span className={`chip ${sizeClass[size]} ${radiusClass[radius]} ${toneModifier} ${className}`.trim()}>
      {icon}
      <span className="chip__label">{label}</span>
    </span>
  );
}
