import type { ReactNode } from "react";

import { ClaimAction } from "@/components/claim-status/contextual/claim-action/ClaimAction";
import { Calls } from "@/components/claim-status/contextual/calls/Calls";
import { Documents } from "@/components/claim-status/contextual/documents/Documents";
import { Fax } from "@/components/claim-status/contextual/fax/Fax";
import { Submission } from "@/components/claim-status/contextual/submission/Submission";
import { Users } from "@/components/claim-status/contextual/users/Users";
import { ContextualPanelContent, ContextualPanelScroll } from "@/components/ui/ContextualPanelShell";
import type { ContextualTabId, QuickContextTabId } from "@/types/workflow";

interface ContextualContentProps {
  activeContext: ContextualTabId;
}

const SIDEBAR_ONLY_CONTEXTS = new Set<ContextualTabId>(["documents", "users", "calls"]);
const QUICK_TAB_CONTEXTS = new Set<ContextualTabId>(["claim-action", "submission", "fax"]);

function isQuickTabContext(id: ContextualTabId): id is QuickContextTabId {
  return QUICK_TAB_CONTEXTS.has(id);
}

function renderQuickTabContent(activeContext: QuickContextTabId): ReactNode {
  switch (activeContext) {
    case "claim-action":
      return <ClaimAction />;
    case "submission":
      return <Submission />;
    case "fax":
      return <Fax />;
    default:
      return null;
  }
}

export function ContextualContent({ activeContext }: ContextualContentProps) {
  const content = SIDEBAR_ONLY_CONTEXTS.has(activeContext)
    ? renderSidebarContent(activeContext)
    : isQuickTabContext(activeContext)
      ? renderQuickTabContent(activeContext)
      : null;

  return (
    <div className="contextual-panel__content">
      <ContextualPanelScroll>
        <ContextualPanelContent>{content}</ContextualPanelContent>
      </ContextualPanelScroll>
    </div>
  );
}

function renderSidebarContent(activeContext: ContextualTabId): ReactNode {
  switch (activeContext) {
    case "documents":
      return <Documents />;
    case "users":
      return <Users />;
    case "calls":
      return <Calls />;
    default:
      return null;
  }
}
