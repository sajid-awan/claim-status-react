import { useState } from "react";
import { Calendar, Eye, EyeSlash } from "@/components/icons";

import { ActivityBadge } from "@/components/claim-status/contextual/claim-action/ActivityBadge";
import { StatusChange } from "@/components/claim-status/contextual/claim-action/StatusChange";
import { StatusTransitionRow } from "@/components/claim-status/contextual/claim-action/StatusTransitionRow";
import { TimelineItem } from "@/components/ui/Timeline";
import type { ClaimActivity } from "@/types/claim";

interface ClaimActivityItemProps {
  activity: ClaimActivity;
  isLast?: boolean;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="activity-detail-row">
      <span className="activity-detail-row__label">{label}:</span>
      <span className="activity-detail-row__value">{value || "\u00A0"}</span>
    </div>
  );
}

export function ClaimActivityItem({ activity, isLast = false }: ClaimActivityItemProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <TimelineItem variant="activity" className="pb-4" isLast={isLast}>
        <div className="activity-item__hidden">
          <span>Activity hidden</span>
          <button type="button" onClick={() => setVisible(true)} className="activity-item__action">
            <Eye size={18} weight="regular" className="shrink-0" /> Show
          </button>
        </div>
      </TimelineItem>
    );
  }

  return (
    <TimelineItem variant="activity" isLast={isLast}>
      <div className="activity-item__header">
        <div className="activity-item__meta">
          <span className="activity-item__user">{activity.user}</span>
          <span className="activity-item__dot" aria-hidden="true" />
          <span className="activity-item__timestamp">{activity.timestamp}</span>
          <ActivityBadge source={activity.source} className="activity-item__badge" />
        </div>
        <button type="button" onClick={() => setVisible(false)} className="activity-item__action">
          <EyeSlash size={18} weight="regular" className="shrink-0" /> Hide
        </button>
      </div>

      <p className="activity-item__section-label">Updated Status From:</p>

      <div className="activity-item__status-block">
        {activity.claimStatusChange && (
          <div className="activity-item__status-row">
            <StatusTransitionRow
              from={activity.claimStatusChange.from}
              to={activity.claimStatusChange.to}
            />
          </div>
        )}
        <div className="activity-item__status-row">
          <StatusChange change={activity.statusChange} />
        </div>
      </div>

      {activity.detail && (
        <div className="activity-item__detail-card">
          <DetailRow label="Old Assignee" value={activity.detail.oldAssignee} />
          <DetailRow label="New Assignee" value={activity.detail.newAssignee} />
          <DetailRow label="Old Status" value={activity.statusChange.from} />
          <DetailRow label="New Status" value={activity.statusChange.to} />
          <DetailRow label="Old Follow-up Date" value={activity.detail.oldFollowUpDate} />
          <DetailRow label="Follow-up Date" value={activity.detail.followUpDate} />
          <div className="mt-2">
            <Calendar size={16} weight="regular" className="text-brand-500" aria-hidden />
          </div>
        </div>
      )}
    </TimelineItem>
  );
}
