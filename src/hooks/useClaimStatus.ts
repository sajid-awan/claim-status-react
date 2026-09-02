import { useMemo, useState } from "react";

import { defaultGatherInfoData } from "@/data/gatherInfo";
import { workflowSteps } from "@/data/workflow";
import type { Claim } from "@/types/claim";
import type { GatherInfoFormData } from "@/types/gatherInfo";
import type { ContextualTabId, WorkflowStepId } from "@/types/workflow";

export function useClaimStatus(claim: Claim) {
  const [activeContext, setActiveContext] = useState<ContextualTabId>("fax");
  const [currentStep, setCurrentStep] = useState<WorkflowStepId>("gather-info");
  const [completedSteps, setCompletedSteps] = useState<Set<WorkflowStepId>>(new Set(["pre-claim"]));
  const [gatherInfoData, setGatherInfoData] = useState<GatherInfoFormData>(defaultGatherInfoData);

  const stepIndex = useMemo(
    () => workflowSteps.findIndex((step) => step.id === currentStep),
    [currentStep],
  );

  function goToNextStep() {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    const next = workflowSteps[stepIndex + 1];
    if (next) setCurrentStep(next.id);
  }

  function goToPreviousStep() {
    const previous = workflowSteps[stepIndex - 1];
    if (!previous) return;

    setCurrentStep(previous.id);
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      for (let i = stepIndex - 1; i < workflowSteps.length; i++) {
        next.delete(workflowSteps[i]!.id);
      }
      return next;
    });
  }

  return {
    claim,
    activeContext,
    setActiveContext,
    currentStep,
    setCurrentStep,
    completedSteps,
    gatherInfoData,
    setGatherInfoData,
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex === workflowSteps.length - 1,
    goToNextStep,
    goToPreviousStep,
  };
}
