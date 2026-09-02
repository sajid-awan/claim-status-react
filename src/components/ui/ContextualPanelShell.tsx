import type { ReactNode } from "react";

import { appScrollClassName } from "@/components/ui/appScrollClassName";

export function ContextualPanelScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`${appScrollClassName} min-h-0 flex-1 overflow-y-auto overflow-x-hidden lg:box-border lg:pr-4 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function ContextualPanelContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`box-border ${className}`.trim()}>{children}</div>;
}
