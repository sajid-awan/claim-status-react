import type { ReactNode } from "react";

import { appScrollClassName } from "@/components/ui/appScrollClassName";

export function WorkflowStepShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex min-h-0 flex-1 flex-col max-lg:flex-none lg:overflow-hidden ${className}`.trim()}>
      {children}
    </div>
  );
}

export function WorkflowStepScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`${appScrollClassName} min-h-0 flex-1 max-lg:flex-none max-lg:overflow-y-auto lg:box-border lg:overflow-y-auto lg:px-4 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function WorkflowStepContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`box-border ${className}`.trim()}>{children}</div>;
}
