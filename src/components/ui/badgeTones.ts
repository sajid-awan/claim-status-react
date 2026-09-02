import type { BadgeTone } from "@/components/ui/StatusBadge";

const statusToneMap: Record<string, BadgeTone> = {
  Pending: "gray",
  "In Progress": "orange",
  Completed: "orange",
  "Claim Paid Not Posted": "orange",
  Accepted: "green",
  Rejected: "red",
  Delivered: "green",
};

export function toneForStatus(status: string): BadgeTone {
  return statusToneMap[status] ?? "gray";
}

const sourceToneMap: Record<string, BadgeTone> = {
  User: "green",
  "Host Sync": "blue",
  System: "gray",
};

export function toneForSource(source: string): BadgeTone {
  return sourceToneMap[source] ?? "gray";
}
