import { ClockCountdown, HourglassHigh, SealCheck } from "@/components/icons";

import { StatusTransitionRow } from "@/components/claim-status/contextual/claim-action/StatusTransitionRow";
import type { ClaimStatusValue, StatusChangeData } from "@/types/claim";

interface StatusChangeProps {
  change: StatusChangeData;
}

function statusIcon(status: ClaimStatusValue, active = false) {
  const className = active ? "status-icon--active" : "status-icon--idle";

  switch (status) {
    case "Pending":
      return <HourglassHigh size={16} weight="regular" className={className} aria-hidden="true" />;
    case "In Progress":
      return <ClockCountdown size={16} weight="regular" className={className} aria-hidden="true" />;
    case "Completed":
      return <SealCheck size={16} weight="fill" className={className} aria-hidden="true" />;
    default:
      return undefined;
  }
}

export function StatusChange({ change }: StatusChangeProps) {
  return (
    <StatusTransitionRow
      from={change.from}
      to={change.to}
      fromIcon={statusIcon(change.from)}
      toIcon={statusIcon(change.to, true)}
    />
  );
}
