import type { ReactNode } from "react";

interface InfoCardProps {
  children: ReactNode;
  className?: string;
}

export function InfoCard({ children, className = "" }: InfoCardProps) {
  return <div className={`info-card ${className}`.trim()}>{children}</div>;
}
