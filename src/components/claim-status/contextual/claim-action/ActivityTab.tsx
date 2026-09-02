import { ClaimTimeline } from "@/components/claim-status/contextual/claim-action/ClaimTimeline";
import { mockClaimActivities } from "@/data/activities";

export function ActivityTab() {
  return <ClaimTimeline activities={mockClaimActivities} />;
}
