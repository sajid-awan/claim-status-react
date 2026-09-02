import type { GatherInfoFormData } from "@/types/gatherInfo";
import type { InfoRowData } from "@/types/claim";

export const gatherTypeOptions = [
  { label: "Not On File", value: "not-on-file" },
  { label: "On File", value: "on-file" },
];

export const gatherCityOptions = [
  { label: "Mechanicsburg", value: "mechanicsburg" },
  { label: "New York", value: "new-york" },
  { label: "Peridot", value: "peridot" },
];

export const defaultGatherInfoData: GatherInfoFormData = {
  insuranceRepName: "Mubashir Ahmad",
  selectType: "not-on-file",
  patientSearch: "test",
  payerSubmissionType: "address",
  address: "xyz",
  city: "peridot",
  state: "Arizona",
  zipCode: "85542",
  resubmitMethod: "edi",
  timelyFilingLimit: "12",
  additionalNotes: "Test",
  files: "No file attached",
  linkedDocuments: [],
  faxFrom: "(478) 675-6688",
  faxTo: "(321) 558-9668",
  faxRows: [
    { id: "1", receiverName: "Ali", subject: "test" },
    { id: "2", receiverName: "Ali", subject: "test" },
  ],
};

function labelFor(options: { label: string; value: string }[], value: string | null) {
  return options.find((option) => option.value === value)?.label ?? value ?? "";
}

export function getVerifyRows(data: GatherInfoFormData): InfoRowData[] {
  return [
    { label: "Selected Type", value: labelFor(gatherTypeOptions, data.selectType) },
    {
      label: "Can you please search by patient name, date of service, and billed amount as well?",
      value: data.patientSearch || "—",
    },
    {
      label: "What is the correct payer ID or submission address to send this claim to?",
      value: data.payerSubmissionType === "payer-id" ? "Payer ID" : "Address",
    },
    { label: "Address", value: data.address || "—" },
    { label: "City", value: labelFor(gatherCityOptions, data.city) },
    { label: "State", value: data.state || "—" },
    { label: "Zip Code", value: data.zipCode || "—" },
    {
      label: "Is there a preferred method to resubmit (EDI, fax, portal, mail or email)?",
      value:
        {
          edi: "EDI",
          fax: "Fax",
          portal: "Portal",
          mail: "Mail",
          email: "Email",
        }[data.resubmitMethod] ?? data.resubmitMethod,
    },
    { label: "What is the timely filing limit?", value: data.timelyFilingLimit || "—" },
    { label: "Additional Claim Status Notes", value: data.additionalNotes || "—" },
    { label: "Files", value: formatGatherFiles(data) },
  ];
}

function formatGatherFiles(data: GatherInfoFormData): string {
  const parts: string[] = [];
  if (data.files && data.files !== "No file attached") parts.push(data.files);
  parts.push(...data.linkedDocuments);
  return parts.length > 0 ? parts.join(", ") : "No file attached";
}
