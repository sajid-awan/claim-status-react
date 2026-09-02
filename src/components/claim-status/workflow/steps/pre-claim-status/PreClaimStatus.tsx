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
    <div className="workflow-step-shell">
      <div className="workflow-step-scroll py-4">
        <div className="workflow-step-content">
          <InfoTimeline>
            <ClaimLevelInfo rows={getClaimLevelInfoRows(claim)} />
            <PatientLevelInfo rows={getPatientLevelInfoRows(claim)} />
          </InfoTimeline>
        </div>
      </div>
      <PreClaimStatusFooter onNext={onNext} />
    </div>
  );
}
