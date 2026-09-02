import { ClaimTimeline } from "@/components/claim-status/contextual/claim-action/ClaimTimeline";
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
    <div className="min-h-0 flex-1 max-lg:flex-none max-lg:overflow-visible lg:overflow-y-auto lg:thin-scroll">
      <ClaimTimeline activities={mockClaimActivities} />
    </div>
  );
}
