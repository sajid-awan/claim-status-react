import { useState } from "react";

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
  const [isContextualOpen, setIsContextualOpen] = useState(false);

  return (
    <div className="claim-status-page">
      <div className="claim-status-page__breadcrumb">
        <Breadcrumb
          items={[
            { label: "Claim Management" },
            { label: "Claim" },
            { label: "Claim Status", active: true },
          ]}
        />
      </div>

      <div className="claim-status-page__card">
        <ClaimStatusLayout
          isContextualOpen={isContextualOpen}
          onContextualOpenChange={setIsContextualOpen}
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
              onOpenContext={() => setIsContextualOpen(true)}
            />
          }
        />
      </div>
    </div>
  );
}
