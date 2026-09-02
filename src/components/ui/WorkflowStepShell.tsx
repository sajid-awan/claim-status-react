import type { ReactNode } from "react";

export function WorkflowStepShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`workflow-step-shell ${className}`.trim()}>{children}</div>;
}

export function WorkflowStepScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`app-scroll workflow-step-scroll ${className}`.trim()}>{children}</div>;
}

export function WorkflowStepContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`workflow-step-content ${className}`.trim()}>{children}</div>;
}
