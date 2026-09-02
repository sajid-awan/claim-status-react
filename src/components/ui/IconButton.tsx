import type { ReactNode } from "react";

export type IconButtonSize = "sm" | "md";
export type IconButtonRadius = "none" | "sm" | "md" | "lg" | "full";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  active?: boolean;
  size?: IconButtonSize;
  radius?: IconButtonRadius;
}

const sizeClass: Record<IconButtonSize, string> = {
  sm: "icon-btn--sm",
  md: "icon-btn--md",
};

const radiusClass: Record<IconButtonRadius, string> = {
  none: "icon-btn--radius-none",
  sm: "icon-btn--radius-sm",
  md: "icon-btn--radius-md",
  lg: "icon-btn--radius-lg",
  full: "icon-btn--radius-full",
};

const glyphClass: Record<IconButtonSize, string> = {
  sm: "icon-btn__glyph--sm",
  md: "icon-btn__glyph--md",
};

export function IconButton({
  icon,
  label,
  active = false,
  size = "md",
  radius = "md",
  className = "",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`icon-btn ${sizeClass[size]} ${radiusClass[radius]} ${active ? "icon-btn--active" : "icon-btn--idle"} ${className}`.trim()}
      {...rest}
    >
      <span className={`icon-btn__glyph ${glyphClass[size]}`}>{icon}</span>
    </button>
  );
}
