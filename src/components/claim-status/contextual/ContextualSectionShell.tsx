import type { ReactNode } from "react";

interface ContextualSectionShellProps {
  children: ReactNode;
}

/** Content wrapper — scroll is handled by ContextualContent. */
export function ContextualSectionShell({ children }: ContextualSectionShellProps) {
  return <div className="panel-content">{children}</div>;
}
