import type { ReactNode } from "react";

interface ContextualSectionShellProps {
  children: ReactNode;
}

export function ContextualSectionShell({ children }: ContextualSectionShellProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="contextual-panel-scroll min-h-0 flex-1">
        <div className="contextual-panel-content">{children}</div>
      </div>
    </div>
  );
}
