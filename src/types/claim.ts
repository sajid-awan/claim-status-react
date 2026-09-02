export interface InfoRowData {
  label: string;
  value: string;
}

export interface Provider {
  practiceName: string;
  groupNpi: string;
  taxId: string;
  renderingProviderName: string;
  providerNpi: string;
  physicalAddress: string;
  payToAddress: string;
}

export interface Patient {
  name: string;
  dob: string;
  policyMemberId: string;
  policyHolder: string;
  insuredRelationship: string;
  totalBilledAmount: string;
  placeOfService: string;
}

export type ClaimStatusValue = "Pending" | "In Progress" | "Completed" | "Claim Paid Not Posted";

export interface Claim {
  id: string;
  claimNumber: string;
  status: ClaimStatusValue;
  provider: Provider;
  patient: Patient;
}

export type ActivitySource = "User" | "Host Sync" | "System";

export interface StatusChangeData {
  from: ClaimStatusValue;
  to: ClaimStatusValue;
}

export interface ClaimActivityDetail {
  oldAssignee: string;
  newAssignee: string;
  oldFollowUpDate: string;
  followUpDate: string;
}

export interface ClaimActivity {
  id: string;
  user: string;
  timestamp: string;
  source: ActivitySource;
  claimStatusChange?: { from: string; to: string };
  statusChange: StatusChangeData;
  detail?: ClaimActivityDetail;
}
