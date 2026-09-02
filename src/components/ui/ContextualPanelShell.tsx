import type { ReactNode } from "react";

export function ContextualPanelScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`app-scroll min-h-0 flex-1 max-lg:flex-none max-lg:overflow-visible lg:overflow-y-auto lg:box-border lg:pr-4 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function ContextualPanelContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`box-border ${className}`.trim()}>{children}</div>;
}
