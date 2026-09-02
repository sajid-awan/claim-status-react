import type { ReactNode } from "react";

export type BadgeTone = "gray" | "orange" | "green" | "blue" | "red";

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
  icon?: ReactNode;
  highlighted?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  gray: "bg-surface-gray-100 text-ink-muted",
  orange: "bg-brand-50 text-brand-500",
  green: "bg-success-light text-success",
  blue: "bg-link-bg text-link",
  red: "bg-rose-50 text-rose-600",
};

export function StatusBadge({
  label,
  tone = "gray",
  icon,
  highlighted = false,
}: StatusBadgeProps) {
  const highlightClass =
    highlighted && tone === "orange"
      ? "border border-brand-500 bg-brand-50 text-brand-500"
      : toneClasses[tone];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${highlightClass}`}
    >
      {icon}
      {label}
    </span>
  );
}
