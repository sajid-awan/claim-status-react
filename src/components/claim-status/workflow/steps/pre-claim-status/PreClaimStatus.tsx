import { ClaimLevelInfo } from "@/components/claim-status/workflow/steps/pre-claim-status/ClaimLevelInfo";
import { PatientLevelInfo } from "@/components/claim-status/workflow/steps/pre-claim-status/PatientLevelInfo";
import { PreClaimStatusFooter } from "@/components/claim-status/workflow/steps/pre-claim-status/PreClaimStatusFooter";
import { InfoTimeline } from "@/components/ui/InfoTimeline";
import { getClaimLevelInfoRows, getPatientLevelInfoRows } from "@/data/claims";
import type { Claim } from "@/types/claim";

interface PreClaimStatusProps {
  claim: Claim;
  onNext: () => void;
}

export function PreClaimStatus({ claim, onNext }: PreClaimStatusProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col max-lg:flex-none">
      <div className="min-h-0 flex-1 overflow-y-auto py-4 thin-scroll max-lg:flex-none max-lg:overflow-visible lg:overflow-y-auto">
        <InfoTimeline>
          <ClaimLevelInfo rows={getClaimLevelInfoRows(claim)} />
          <PatientLevelInfo rows={getPatientLevelInfoRows(claim)} />
        </InfoTimeline>
      </div>
      <PreClaimStatusFooter onNext={onNext} />
    </div>
  );
}
