import { ClaimTimeline } from "@/components/claim-status/contextual/claim-action/ClaimTimeline";
import { mockClaimActivities } from "@/data/activities";

export function ClaimAction() {
  return <ClaimTimeline activities={mockClaimActivities} />;
}
