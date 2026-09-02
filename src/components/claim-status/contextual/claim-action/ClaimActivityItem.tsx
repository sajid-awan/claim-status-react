import { useState } from "react";
import { Calendar, Eye, EyeSlash } from "@/components/icons";

import { ActivityBadge } from "@/components/claim-status/contextual/claim-action/ActivityBadge";
import { StatusChange } from "@/components/claim-status/contextual/claim-action/StatusChange";
import { StatusTransitionRow } from "@/components/claim-status/contextual/claim-action/StatusTransitionRow";
import type { ClaimActivity } from "@/types/claim";

interface ClaimActivityItemProps {
  activity: ClaimActivity;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex min-h-[30px] flex-col gap-0.5 border-b border-border-subtle py-1 last:mb-0 last:border-b-0 sm:h-[30px] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
      <span className="shrink-0 text-body-sm font-normal leading-body text-ink-subtle">{label}:</span>
      <span className="min-w-0 text-body-sm font-normal leading-body text-ink sm:text-right">
        {value || "\u00A0"}
      </span>
    </div>
  );
}

export function ClaimActivityItem({ activity }: ClaimActivityItemProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <li className="activity-item pb-4">
        <div className="flex items-center justify-between rounded-md border border-dashed border-surface-gray-200 px-3 py-2 text-body-sm text-ink-muted">
          <span>Activity hidden</span>
          <button type="button" onClick={() => setVisible(true)} className="activity-item__toggle">
            <Eye size={18} weight="regular" className="shrink-0" /> Show
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="activity-item">
      <div className="activity-item__header">
        <div className="activity-item__meta">
          <span className="activity-item__user">{activity.user}</span>
          <span className="size-1 shrink-0 rounded-full bg-ink-subtle" aria-hidden="true" />
          <span className="activity-item__timestamp">{activity.timestamp}</span>
          <ActivityBadge source={activity.source} className="ml-0 md:ml-2.5" />
        </div>
        <button type="button" onClick={() => setVisible(false)} className="activity-item__toggle">
          <EyeSlash size={18} weight="regular" className="shrink-0" /> Hide
        </button>
      </div>

      <p className="mt-2 text-xs font-normal leading-tight text-ink-subtle">Updated Status From:</p>

      <div className="flex flex-col">
        {activity.claimStatusChange && (
          <div className="pt-dot">
            <StatusTransitionRow
              from={activity.claimStatusChange.from}
              to={activity.claimStatusChange.to}
            />
          </div>
        )}
        <div className="pt-dot">
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
    </li>
  );
}
