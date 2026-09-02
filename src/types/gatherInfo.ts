export type PayerSubmissionType = "payer-id" | "address";
export type ResubmitMethod = "edi" | "fax" | "portal" | "mail" | "email";

export interface FaxRow {
  id: string;
  receiverName: string;
  subject: string;
}

export interface GatherInfoFormData {
  insuranceRepName: string;
  selectType: string;
  patientSearch: string;
  payerSubmissionType: PayerSubmissionType;
  address: string;
  city: string | null;
  state: string;
  zipCode: string;
  resubmitMethod: ResubmitMethod;
  timelyFilingLimit: string;
  additionalNotes: string;
  files: string;
  faxFrom: string;
  faxTo: string;
  faxRows: FaxRow[];
}
