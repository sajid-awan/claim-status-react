import { useState } from "react";
import { Calendar, Eye, EyeSlash } from "@/components/icons";

import { ActivityBadge } from "@/components/claim-status/contextual/claim-action/ActivityBadge";
import { StatusChange } from "@/components/claim-status/contextual/claim-action/StatusChange";
import { StatusTransitionRow } from "@/components/claim-status/contextual/claim-action/StatusTransitionRow";
import type { ClaimActivity } from "@/types/claim";

interface ClaimActivityItemProps {
  activity: ClaimActivity;
}

const timelineItemClass =
  "relative pl-6 before:absolute before:left-0.5 before:top-[9px] before:size-2.5 before:rounded-full before:bg-border-primary before:content-[''] after:absolute after:bottom-0 after:left-[7px] after:top-[25px] after:w-px after:bg-border-primary after:content-[''] last:after:hidden sm:pl-8";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex min-h-[30px] flex-col gap-0.5 border-b border-black/[0.06] py-1 last:mb-0 last:border-b-0 sm:h-[30px] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
      <span className="shrink-0 text-sm font-normal leading-[21px] text-ink-subtle">{label}:</span>
      <span className="min-w-0 text-sm font-normal leading-[21px] text-ink sm:text-right">
        {value || "\u00A0"}
      </span>
    </div>
  );
}

export function ClaimActivityItem({ activity }: ClaimActivityItemProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <li className={`${timelineItemClass} pb-4`}>
        <div className="flex items-center justify-between rounded-md border border-dashed border-surface-gray-200 px-3 py-2 text-sm text-ink-muted">
          <span>Activity hidden</span>
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="inline-flex h-[18px] items-center gap-1 text-[15px] font-medium leading-[18px] text-brand-500 hover:text-brand-600"
          >
            <Eye size={18} weight="regular" className="shrink-0" /> Show
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`${timelineItemClass} pb-6`}>
      <div className="flex items-start justify-between gap-2 md:items-center">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-[3.5px] gap-y-1">
          <span className="text-sm font-medium leading-[14px] text-ink">{activity.user}</span>
          <span className="size-1 shrink-0 rounded-full bg-ink-subtle" aria-hidden="true" />
          <span className="text-xs font-normal leading-3 text-ink-subtle">{activity.timestamp}</span>
          <ActivityBadge source={activity.source} className="basis-full md:ml-2.5 md:basis-auto" />
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="inline-flex shrink-0 items-center gap-1 pt-0.5 text-[15px] font-medium leading-[18px] text-brand-500 hover:text-brand-600"
        >
          <EyeSlash size={18} weight="regular" className="shrink-0" /> Hide
        </button>
      </div>

      <p className="mt-2 text-xs font-normal leading-[18px] text-ink-subtle md:mt-[3.5px]">Updated Status From:</p>

      <div className="flex flex-col">
        {activity.claimStatusChange && (
          <div className="pt-[3.5px]">
            <StatusTransitionRow
              from={activity.claimStatusChange.from}
              to={activity.claimStatusChange.to}
            />
          </div>
        )}
        <div className="pt-[3.5px]">
          <StatusChange change={activity.statusChange} />
        </div>
      </div>

      {activity.detail && (
        <div className="mt-[10.5px] rounded-xl border border-black/[0.06] bg-white p-[13px]">
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
