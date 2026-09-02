import { WorkflowHeader } from "@/components/claim-status/workflow/WorkflowHeader";
import { WorkflowProgress } from "@/components/claim-status/workflow/WorkflowProgress";
import { WorkflowContent } from "@/components/claim-status/workflow/WorkflowContent";
import type { Claim } from "@/types/claim";
import type { GatherInfoFormData } from "@/types/gatherInfo";
import type { WorkflowStepId } from "@/types/workflow";

interface WorkflowPanelProps {
  claim: Claim;
  currentStep: WorkflowStepId;
  completedSteps: Set<WorkflowStepId>;
  gatherInfoData: GatherInfoFormData;
  onGatherInfoChange: (data: GatherInfoFormData) => void;
  onNext: () => void;
  onBack: () => void;
  onClose?: () => void;
  onOpenContext?: () => void;
}

export function WorkflowPanel({
  claim,
  currentStep,
  completedSteps,
  gatherInfoData,
  onGatherInfoChange,
  onNext,
  onBack,
  onClose,
  onOpenContext,
}: WorkflowPanelProps) {
  return (
    <section aria-label="Claim status workflow" className="workflow-panel">
      <WorkflowHeader title="Claim Status" onBack={onBack} onClose={onClose} onOpenContext={onOpenContext} />
      <WorkflowProgress currentStep={currentStep} completedSteps={completedSteps} />
      <WorkflowContent
        claim={claim}
        currentStep={currentStep}
        gatherInfoData={gatherInfoData}
        onGatherInfoChange={onGatherInfoChange}
        onNext={onNext}
        onClose={onClose}
      />
    </section>
  );
}
