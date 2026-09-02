import { CloudCheck, UserCircleDashed } from "@/components/icons";

import type { ActivitySource } from "@/types/claim";

interface ActivityBadgeProps {
  source: ActivitySource;
  className?: string;
}

export function ActivityBadge({ source, className = "" }: ActivityBadgeProps) {
  if (source === "Host Sync") {
    return (
      <span className={`activity-badge activity-badge--host-sync ${className}`.trim()}>
        <CloudCheck size={16} weight="regular" className="shrink-0" />
        <span className="activity-badge__label">{source}</span>
      </span>
    );
  }

  return (
    <span className={`activity-badge activity-badge--user ${className}`.trim()}>
      <UserCircleDashed size={16} weight="regular" className="shrink-0 text-success" />
      <span className="activity-badge__label">{source}</span>
    </span>
  );
}
