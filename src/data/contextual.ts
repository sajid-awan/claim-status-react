export interface SubmissionAttempt {
  id: string;
  date: string;
  method: string;
  status: "Accepted" | "Rejected" | "Pending";
  confirmationNumber: string;
}

export const submissionSummary = {
  method: "Electronic (837P)",
  clearinghouse: "Change Healthcare",
  batchId: "BATCH-559201",
  submittedOn: "07/13/2026 06:10 PM",
  status: "Accepted" as const,
};

export const submissionAttempts: SubmissionAttempt[] = [
  { id: "sub-1", date: "07/13/2026 06:10 PM", method: "Electronic (837P)", status: "Accepted", confirmationNumber: "CN-9981234" },
  { id: "sub-2", date: "07/10/2026 11:42 AM", method: "Electronic (837P)", status: "Rejected", confirmationNumber: "CN-9975310" },
];

export const faxSummary = {
  status: "Delivered" as const,
  faxNumber: "(717) 555-0198",
  recipient: "Aetna Better Health - Appeals",
  sentOn: "07/15/2026 03:12 PM",
  pages: 6,
  coverNote: "Attached corrected claim with supporting documentation for reconsideration.",
};

export interface ClaimDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedOn: string;
  uploadedBy: string;
}

export const claimDocuments: ClaimDocument[] = [
  { id: "doc-1", name: "Claim Form CMS-1500.pdf", type: "PDF", size: "182 KB", uploadedOn: "07/12/2026", uploadedBy: "majeed, biallal" },
  { id: "doc-2", name: "EOB - Aetna.pdf", type: "PDF", size: "94 KB", uploadedOn: "07/16/2026", uploadedBy: "Mehmood, Saqib" },
  { id: "doc-3", name: "Medical Records.pdf", type: "PDF", size: "1.2 MB", uploadedOn: "07/16/2026", uploadedBy: "Hassan, Sajid" },
  { id: "doc-4", name: "Prior Authorization.pdf", type: "PDF", size: "76 KB", uploadedOn: "07/11/2026", uploadedBy: "majeed, biallal" },
];

export interface AssignedUser {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
}

export const assignedUsers: AssignedUser[] = [
  { id: "usr-1", name: "Hassan, Sajid", role: "Claims Owner", email: "sajid.hassan@savi.health", initials: "SH" },
  { id: "usr-2", name: "majeed, biallal", role: "Claims Specialist", email: "biallal.majeed@savi.health", initials: "MB" },
  { id: "usr-3", name: "Mehmood, Saqib", role: "Sync Service Account", email: "saqib.mehmood@savi.health", initials: "MS" },
];

export interface CallLogEntry {
  id: string;
  caller: string;
  direction: "Inbound" | "Outbound";
  duration: string;
  date: string;
  notes: string;
}

export const callLog: CallLogEntry[] = [
  { id: "call-1", caller: "Aetna Provider Services", direction: "Outbound", duration: "12m 04s", date: "07/18/2026 10:15 AM", notes: "Confirmed claim received, in adjudication review." },
  { id: "call-2", caller: "Patient - Bonnie Keraitis", direction: "Inbound", duration: "04m 32s", date: "07/17/2026 02:40 PM", notes: "Patient asked for claim status update." },
];
