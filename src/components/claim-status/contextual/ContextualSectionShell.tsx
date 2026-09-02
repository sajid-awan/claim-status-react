import { ContextualPanelContent, ContextualPanelScroll } from "@/components/ui/ContextualPanelShell";
import type { ReactNode } from "react";

interface ContextualSectionShellProps {
  children: ReactNode;
}

export function ContextualSectionShell({ children }: ContextualSectionShellProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ContextualPanelScroll>
        <ContextualPanelContent>{children}</ContextualPanelContent>
      </ContextualPanelScroll>
    </div>
  );
}
