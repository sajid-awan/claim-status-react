import { ClaimActivityItem } from "@/components/claim-status/contextual/claim-action/ClaimActivityItem";
import { ActivityTimeline } from "@/components/ui/Timeline";
import type { ClaimActivity } from "@/types/claim";

interface ClaimTimelineProps {
  activities: ClaimActivity[];
}

export function ClaimTimeline({ activities }: ClaimTimelineProps) {
  if (activities.length === 0) {
    return <p className="px-4 py-6 text-body-sm text-ink-muted">No activity recorded for this claim yet.</p>;
  }

  return (
    <ActivityTimeline>
      {activities.map((activity, index) => (
        <ClaimActivityItem
          key={activity.id}
          activity={activity}
          isLast={index === activities.length - 1}
        />
      ))}
    </ActivityTimeline>
  );
}
