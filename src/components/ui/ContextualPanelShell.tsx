import type { ReactNode } from "react";

export function ContextualPanelScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`app-scroll panel-scroll ${className}`.trim()}>{children}</div>;
}

export function ContextualPanelContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`panel-content ${className}`.trim()}>{children}</div>;
}
