import type { Claim, InfoRowData } from "@/types/claim";

export const mockClaim: Claim = {
  id: "clm-10021",
  claimNumber: "CLM-2026-10021",
  status: "Claim Paid Not Posted",
  provider: {
    practiceName: "OIBO",
    groupNpi: "1720557432",
    taxId: "82-4413259",
    renderingProviderName: "Jarmon, Nicholas",
    providerNpi: "-",
    physicalAddress: "P.O. Box 3030 Mechanicsburg,\nNew York, NY, 00398",
    payToAddress: "P.O. Box 3030 Mechanicsburg,\nNew York, NY, 00398",
  },
  patient: {
    name: "Keraitis, Bonnie",
    dob: "12/12/1966",
    policyMemberId: "POL123456",
    policyHolder: "Keraitis, Bonnie",
    insuredRelationship: "Self",
    totalBilledAmount: "$1,655.00",
    placeOfService: "11",
  },
};

export function getClaimLevelInfoRows(claim: Claim): InfoRowData[] {
  return [
    { label: "Practice Name", value: claim.provider.practiceName },
    { label: "Group NPI", value: claim.provider.groupNpi },
    { label: "Tax ID", value: claim.provider.taxId },
    { label: "Rendering Provider Name", value: claim.provider.renderingProviderName },
    { label: "Provider NPI", value: claim.provider.providerNpi },
    { label: "Physical Address", value: claim.provider.physicalAddress },
    { label: "Pay to Address", value: claim.provider.payToAddress },
  ];
}

export function getPatientLevelInfoRows(claim: Claim): InfoRowData[] {
  return [
    { label: "Patient Name", value: claim.patient.name },
    { label: "Patient DOB", value: claim.patient.dob },
    { label: "Policy/Member ID", value: claim.patient.policyMemberId },
    { label: "Policy Holder", value: claim.patient.policyHolder },
    { label: "Insured Relationship", value: claim.patient.insuredRelationship },
    { label: "Total Billed Amount", value: claim.patient.totalBilledAmount },
    { label: "Place Of Service", value: claim.patient.placeOfService },
  ];
}
