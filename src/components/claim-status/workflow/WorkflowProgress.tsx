import { Check } from "@/components/icons";

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
  const modifier =
    status === "pending" ? "workflow-step__circle--pending" : "workflow-step__circle--active";

  if (status === "completed") {
    return (
      <span className={`workflow-step__circle workflow-step__circle--completed`} aria-hidden="true">
        <Check size={14} weight="bold" className="text-white" />
      </span>
    );
  }

  return <span className={`workflow-step__circle ${modifier}`} aria-hidden="true" />;
}

function StepTrack({
  lineBeforeOrange,
  lineAfterOrange,
  showLineBefore,
  showLineAfter,
  status,
}: {
  lineBeforeOrange: boolean;
  lineAfterOrange: boolean;
  showLineBefore: boolean;
  showLineAfter: boolean;
  status: WorkflowStepStatus;
}) {
  return (
    <div className="workflow-step__track">
      {showLineBefore ? (
        <span
          aria-hidden
          className={`workflow-step__connector workflow-step__connector--before ${
            lineBeforeOrange ? "workflow-step__connector--active" : "workflow-step__connector--inactive"
          }`}
        />
      ) : null}
      {showLineAfter ? (
        <span
          aria-hidden
          className={`workflow-step__connector workflow-step__connector--after ${
            lineAfterOrange ? "workflow-step__connector--active" : "workflow-step__connector--inactive"
          }`}
        />
      ) : null}
      <StepCircle status={status} />
    </div>
  );
}

export function WorkflowProgress({ currentStep, completedSteps }: WorkflowProgressProps) {
  return (
    <ol className="workflow-progress">
      {workflowSteps.map((step, index) => {
        const status = statusFor(step.id, currentStep, completedSteps);
        const isFirst = index === 0;
        const isLast = index === workflowSteps.length - 1;
        const prevStepId = index > 0 ? workflowSteps[index - 1]!.id : null;
        const isCompleted = status === "completed";
        const lineBeforeOrange = !isFirst && Boolean(prevStepId && completedSteps.has(prevStepId));
        const lineAfterOrange = !isLast && isCompleted;

        return (
          <li key={step.id} className="workflow-step">
            <StepTrack
              status={status}
              showLineBefore={!isFirst}
              showLineAfter={!isLast}
              lineBeforeOrange={lineBeforeOrange}
              lineAfterOrange={lineAfterOrange}
            />
            <span
              className={`workflow-step__label ${
                status === "active" ? "workflow-step__label--active" : "workflow-step__label--idle"
              }`.trim()}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
