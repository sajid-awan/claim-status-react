import { PreClaimStatus } from "@/components/claim-status/workflow/steps/pre-claim-status/PreClaimStatus";
import { GatherInfo } from "@/components/claim-status/workflow/steps/gather-info/GatherInfo";
import { Verify } from "@/components/claim-status/workflow/steps/verify/Verify";
import { AdditionalDetail } from "@/components/claim-status/workflow/steps/additional-detail/AdditionalDetail";
import type { Claim } from "@/types/claim";
import type { GatherInfoFormData } from "@/types/gatherInfo";
import type { WorkflowStepId } from "@/types/workflow";

interface WorkflowContentProps {
  claim: Claim;
  currentStep: WorkflowStepId;
  gatherInfoData: GatherInfoFormData;
  onGatherInfoChange: (data: GatherInfoFormData) => void;
  onNext: () => void;
  onClose?: () => void;
}

function renderStep(
  currentStep: WorkflowStepId,
  claim: Claim,
  gatherInfoData: GatherInfoFormData,
  onGatherInfoChange: (data: GatherInfoFormData) => void,
  onNext: () => void,
  onClose?: () => void,
) {
  switch (currentStep) {
    case "pre-claim":
      return <PreClaimStatus claim={claim} onNext={onNext} />;
    case "gather-info":
      return <GatherInfo data={gatherInfoData} onChange={onGatherInfoChange} onNext={onNext} />;
    case "verify":
      return <Verify data={gatherInfoData} onNext={onNext} />;
    case "additional-detail":
      return <AdditionalDetail onClose={onClose} />;
    default:
      return null;
  }
}

export function WorkflowContent({
  claim,
  currentStep,
  gatherInfoData,
  onGatherInfoChange,
  onNext,
  onClose,
}: WorkflowContentProps) {
  return (
    <div className="workflow-content">
      {renderStep(currentStep, claim, gatherInfoData, onGatherInfoChange, onNext, onClose)}
    </div>
  );
}
