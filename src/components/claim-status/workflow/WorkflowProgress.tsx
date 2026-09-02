import { CheckCircle } from "@/components/icons";

import { workflowSteps } from "@/data/workflow";
import type { WorkflowStepId, WorkflowStepStatus } from "@/types/workflow";

interface WorkflowProgressProps {
  currentStep: WorkflowStepId;
  completedSteps: Set<WorkflowStepId>;
}

function statusFor(
  stepId: WorkflowStepId,
  currentStep: WorkflowStepId,
  completedSteps: Set<WorkflowStepId>,
): WorkflowStepStatus {
  if (stepId === currentStep) return "active";
  if (completedSteps.has(stepId)) return "completed";
  return "pending";
}

function StepCircle({ status }: { status: WorkflowStepStatus }) {
  if (status === "completed") {
    return (
      <span className="workflow-stepper__circle workflow-stepper__circle--completed" aria-hidden="true">
        <CheckCircle size={20} weight="fill" className="text-white" />
      </span>
    );
  }

  if (status === "active") {
    return <span className="workflow-stepper__circle workflow-stepper__circle--active" aria-hidden="true" />;
  }

  return <span className="workflow-stepper__circle workflow-stepper__circle--pending" aria-hidden="true" />;
}

export function WorkflowProgress({ currentStep, completedSteps }: WorkflowProgressProps) {
  return (
    <ol className="workflow-stepper">
      {workflowSteps.map((step, index) => {
        const status = statusFor(step.id, currentStep, completedSteps);
        const isFirst = index === 0;
        const isLast = index === workflowSteps.length - 1;
        const prevStepId = index > 0 ? workflowSteps[index - 1]!.id : null;
        const isCompleted = status === "completed";
        const lineBeforeOrange = !isFirst && Boolean(prevStepId && completedSteps.has(prevStepId));
        const lineAfterOrange = !isLast && isCompleted;

        const trackClasses = [
          "workflow-stepper__track",
          !isFirst
            ? `workflow-stepper__track--line-before ${lineBeforeOrange ? "workflow-stepper__line--active" : "workflow-stepper__line--inactive"}`
            : "",
          !isLast
            ? `workflow-stepper__track--line-after ${lineAfterOrange ? "workflow-stepper__line--active" : "workflow-stepper__line--inactive"}`
            : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={step.id} className="flex min-w-0 flex-1 flex-col items-center">
            <div className={trackClasses}>
              <StepCircle status={status} />
            </div>
            <span
              className={`workflow-stepper__label ${
                status === "active" ? "workflow-stepper__label--active" : "workflow-stepper__label--inactive"
              }`}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
