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

const sizeClasses: Record<IconButtonSize, { button: string; icon: string }> = {
  sm: { button: "h-9 w-9 p-1", icon: "h-5 w-5 [&>svg]:h-5 [&>svg]:w-5" },
  md: { button: "h-10 w-10 p-1", icon: "h-6 w-6 [&>svg]:h-6 [&>svg]:w-6" },
};

const radiusClasses: Record<IconButtonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
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
  const sizing = sizeClasses[size];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex shrink-0 cursor-pointer items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${radiusClasses[radius]} ${sizing.button} ${
        active
          ? "border-brand-500 bg-brand-500 text-white hover:bg-brand-600 [&_svg]:text-white"
          : "border-transparent bg-surface-page text-ink-muted hover:bg-surface-page hover:text-ink"
      } ${className}`.trim()}
      {...rest}
    >
      <span className={`flex items-center justify-center ${sizing.icon}`}>{icon}</span>
    </button>
  );
}
