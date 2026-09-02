import { CloudCheck, UserCircleDashed } from "@/components/icons";

import type { ActivitySource } from "@/types/claim";

interface ActivityBadgeProps {
  source: ActivitySource;
  className?: string;
}

export function ActivityBadge({ source, className = "" }: ActivityBadgeProps) {
  if (source === "Host Sync") {
    return (
      <span
        className={`inline-flex h-7 w-fit max-w-full items-center gap-1 rounded-full border border-link-bg bg-link-bg py-[7px] pl-[9px] pr-[9px] text-sm font-medium leading-[14px] text-link ${className}`}
      >
        <CloudCheck size={18} weight="regular" className="shrink-0" />
        <span className="truncate">{source}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-7 w-fit max-w-full items-center gap-1 rounded-full border border-success-light bg-success-light py-[7px] pl-[9px] pr-[9px] text-sm font-normal leading-[14px] text-success ${className}`}
    >
      <UserCircleDashed size={18} weight="regular" className="shrink-0 text-success" />
      <span className="truncate">{source}</span>
    </span>
  );
}
