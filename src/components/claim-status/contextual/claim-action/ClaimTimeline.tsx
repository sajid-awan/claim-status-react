import { ClaimActivityItem } from "@/components/claim-status/contextual/claim-action/ClaimActivityItem";
import type { ClaimActivity } from "@/types/claim";

interface ClaimTimelineProps {
  activities: ClaimActivity[];
}

export function ClaimTimeline({ activities }: ClaimTimelineProps) {
  if (activities.length === 0) {
    return <p className="px-4 py-6 text-sm text-gray-400">No activity recorded for this claim yet.</p>;
  }

  return (
    <ul className="py-3 sm:py-4">
      {activities.map((activity) => (
        <ClaimActivityItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}
