import { ClaimStatusLayout } from "@/components/claim-status/ClaimStatusLayout";
import { ContextualPanel } from "@/components/claim-status/contextual/ContextualPanel";
import { WorkflowPanel } from "@/components/claim-status/workflow/WorkflowPanel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useClaimStatus } from "@/hooks/useClaimStatus";
import type { Claim } from "@/types/claim";

interface ClaimStatusPageProps {
  claim: Claim;
  onClose?: () => void;
}

export function ClaimStatusPage({ claim, onClose }: ClaimStatusPageProps) {
  const {
    activeContext,
    setActiveContext,
    currentStep,
    completedSteps,
    gatherInfoData,
    setGatherInfoData,
    isFirstStep,
    goToNextStep,
    goToPreviousStep,
  } = useClaimStatus(claim);

  return (
    <div className="flex flex-col md:flex-none lg:h-full lg:min-h-0 lg:flex-1">
      <div className="shrink-0 pb-2 sm:pb-3">
        <Breadcrumb
          items={[
            { label: "Claim Management" },
            { label: "Claim" },
            { label: "Claim Status", active: true },
          ]}
        />
      </div>

      <div className="flex flex-col overflow-visible rounded-xl border border-black/[0.06] bg-white px-2  md:flex-none md:overflow-visible lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:px-0">
        <ClaimStatusLayout
          contextual={
            <ContextualPanel activeContext={activeContext} onChangeContext={setActiveContext} />
          }
          workflow={
            <WorkflowPanel
              claim={claim}
              currentStep={currentStep}
              completedSteps={completedSteps}
              gatherInfoData={gatherInfoData}
              onGatherInfoChange={setGatherInfoData}
              onNext={goToNextStep}
              onBack={isFirstStep ? () => onClose?.() : goToPreviousStep}
              onClose={onClose}
            />
          }
        />
      </div>
    </div>
  );
}
