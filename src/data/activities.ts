import type { ClaimActivity } from "@/types/claim";

export const mockClaimActivities: ClaimActivity[] = [
  {
    id: "act-1",
    user: "majeed, biallal",
    timestamp: "07/20/2026 09:22 AM",
    source: "User",
    claimStatusChange: {
      from: "Claim Paid Not Posted",
      to: "Claim Paid Not Posted",
    },
    statusChange: { from: "Pending", to: "In Progress" },
    detail: {
      oldAssignee: "",
      newAssignee: "majeed, biallal",
      oldFollowUpDate: "",
      followUpDate: "",
    },
  },
  {
    id: "act-2",
    user: "Mehmood, Saqib",
    timestamp: "01/29/2026 02:00 AM",
    source: "Host Sync",
    statusChange: { from: "Pending", to: "Completed" },
  },
  {
    id: "act-3",
    user: "Mehmood, Saqib",
    timestamp: "01/29/2026 02:00 AM",
    source: "Host Sync",
    statusChange: { from: "Pending", to: "Completed" },
  },
  {
    id: "act-4",
    user: "Mehmood, Saqib",
    timestamp: "01/29/2026 02:00 AM",
    source: "Host Sync",
    statusChange: { from: "Pending", to: "Completed" },
  },
  {
    id: "act-5",
    user: "Mehmood, Saqib",
    timestamp: "01/29/2026 02:00 AM",
    source: "Host Sync",
    statusChange: { from: "Pending", to: "Completed" },
  },
];

export interface ActivityNote {
  id: string;
  author: string;
  timestamp: string;
  note: string;
}

export const mockActivityNotes: ActivityNote[] = [
  {
    id: "note-1",
    author: "majeed, biallal",
    timestamp: "07/20/2026 09:24 AM",
    note: "Reached out to payer for confirmation on adjudication timeline.",
  },
  {
    id: "note-2",
    author: "Mehmood, Saqib",
    timestamp: "01/29/2026 02:05 AM",
    note: "Host sync completed successfully, no discrepancies found.",
  },
  {
    id: "note-3",
    author: "Hassan, Sajid",
    timestamp: "01/28/2026 04:41 PM",
    note: "Flagged for secondary review due to billed amount variance.",
  },
];

export interface ClaimDetailField {
  label: string;
  value: string;
}

export const mockClaimDetailFields: ClaimDetailField[] = [
  { label: "Claim Number", value: "CLM-2026-10021" },
  { label: "Claim Type", value: "Professional" },
  { label: "Date Of Service", value: "07/12/2026" },
  { label: "Date Received", value: "07/14/2026" },
  { label: "Payer Name", value: "Aetna Better Health" },
  { label: "Payer Claim ID", value: "AET-88291045" },
  { label: "Filing Indicator", value: "Commercial" },
  { label: "Total Charges", value: "$1,655.00" },
];
