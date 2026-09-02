import type { ReactNode } from "react";

interface InfoCardProps {
  children: ReactNode;
  className?: string;
}

export function InfoCard({ children, className = "" }: InfoCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-card)] border border-border-tertiary bg-white px-4 py-3 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
