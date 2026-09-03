import { ClaimLevelInfo } from "@/components/claim-status/workflow/steps/pre-claim-status/ClaimLevelInfo";
import { PatientLevelInfo } from "@/components/claim-status/workflow/steps/pre-claim-status/PatientLevelInfo";
import { PreClaimStatusFooter } from "@/components/claim-status/workflow/steps/pre-claim-status/PreClaimStatusFooter";
import { Timeline } from "@/components/ui/Timeline";
import { WorkflowStepContent, WorkflowStepScroll, WorkflowStepShell } from "@/components/ui/WorkflowStepShell";
import { getClaimLevelInfoRows, getPatientLevelInfoRows } from "@/data/claims";
import type { Claim } from "@/types/claim";

interface PreClaimStatusProps {
  claim: Claim;
  onNext: () => void;
}

export function PreClaimStatus({ claim, onNext }: PreClaimStatusProps) {
  return (
    <WorkflowStepShell>
      <WorkflowStepScroll className="workflow-step-scroll--padded">
        <WorkflowStepContent>
          <Timeline variant="info">
            <ClaimLevelInfo rows={getClaimLevelInfoRows(claim)} />
            <PatientLevelInfo rows={getPatientLevelInfoRows(claim)} />
          </Timeline>
        </WorkflowStepContent>
      </WorkflowStepScroll>
      <PreClaimStatusFooter onNext={onNext} />
    </WorkflowStepShell>
  );
}
