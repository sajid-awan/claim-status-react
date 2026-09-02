import { useState } from "react";

import {
  ClaimActionTabs,
  type ClaimActionTabId,
} from "@/components/claim-status/contextual/claim-action/ClaimActionTabs";
import { ActivityTab } from "@/components/claim-status/contextual/claim-action/ActivityTab";
import { DetailsTab } from "@/components/claim-status/contextual/claim-action/DetailsTab";
import { HistoryTab } from "@/components/claim-status/contextual/claim-action/HistoryTab";
import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";

function renderTab(tab: ClaimActionTabId) {
  switch (tab) {
    case "activity":
      return <ActivityTab />;
    case "details":
      return <DetailsTab />;
    case "history":
      return <HistoryTab />;
    default:
      return null;
  }
}

export function ClaimAction() {
  const [activeTab, setActiveTab] = useState<ClaimActionTabId>("activity");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-surface-gray-200 py-2.5">
        <ClaimActionTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>
      <ContextualSectionShell>{renderTab(activeTab)}</ContextualSectionShell>
    </div>
  );
}
