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
    <div className="mb-2 flex min-h-row-sm flex-col gap-0.5 border-b border-border-subtle py-1 last:mb-0 last:border-b-0 sm:h-row-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
      <span className="shrink-0 text-body-sm font-normal leading-body text-ink-subtle">{label}:</span>
      <span className="min-w-0 text-body-sm font-normal leading-body text-ink sm:text-right">{value || "\u00A0"}</span>
    </div>
  );
}

export function ClaimActivityItem({ activity, isLast = false }: ClaimActivityItemProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <TimelineItem variant="activity" className="pb-4" isLast={isLast}>
        <div className="flex items-center justify-between rounded-md border border-dashed border-surface-gray-200 px-3 py-2 text-body-sm text-ink-muted">
          <span>Activity hidden</span>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="inline-flex shrink-0 items-center gap-1 text-body-md font-medium leading-tight text-brand-500 hover:text-brand-600"
          >
            <Eye size={18} weight="regular" className="shrink-0" /> Show
          </button>
        </div>
      </TimelineItem>
    );
  }

  return (
    <TimelineItem variant="activity" isLast={isLast}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-dot gap-y-1.5">
          <span className="text-body-sm font-medium leading-compact text-ink">{activity.user}</span>
          <span className="size-1 shrink-0 self-center rounded-full bg-ink-subtle" aria-hidden="true" />
          <span className="self-center text-xs font-normal leading-3 text-ink-subtle">{activity.timestamp}</span>
          <ActivityBadge source={activity.source} className="basis-full md:ml-2.5 md:basis-auto" />
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="inline-flex shrink-0 items-center gap-1 text-body-md font-medium leading-tight text-brand-500 hover:text-brand-600"
        >
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
        <div className="mt-2.5 rounded-xl border border-border-subtle bg-white p-3.5">
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
