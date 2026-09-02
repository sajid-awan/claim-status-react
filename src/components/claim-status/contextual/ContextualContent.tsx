import { ClaimTimeline } from "@/components/claim-status/contextual/claim-action/ClaimTimeline";
import { ContextualPanelContent, ContextualPanelScroll } from "@/components/ui/ContextualPanelShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { mockClaimActivities } from "@/data/activities";
import type { QuickContextTabId } from "@/types/workflow";

interface ContextualContentProps {
  quickTab: QuickContextTabId;
}

export function ContextualContent({ quickTab }: ContextualContentProps) {
  if (quickTab !== "claim-action") {
    return <EmptyState />;
  }

  return (
    <ContextualPanelScroll className="max-lg:overflow-visible">
      <ContextualPanelContent>
        <ClaimTimeline activities={mockClaimActivities} />
      </ContextualPanelContent>
    </ContextualPanelScroll>
  );
}
