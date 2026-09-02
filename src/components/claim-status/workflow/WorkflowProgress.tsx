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
  const baseClass = "relative z-[1] flex h-5 w-5 shrink-0 items-center justify-center rounded-full";

  if (status === "completed") {
    return (
      <span className={`${baseClass} bg-brand-500`} aria-hidden="true">
        <Check size={14} weight="bold" className="text-white" />
      </span>
    );
  }

  if (status === "active") {
    return <span className={`${baseClass} bg-brand-500`} aria-hidden="true" />;
  }

  return <span className={`${baseClass} bg-step-inactive`} aria-hidden="true" />;
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
    <div className="relative isolate flex h-5 w-full items-center justify-center">
      {showLineBefore ? (
        <span
          aria-hidden
          className={`absolute right-1/2 top-1/2 z-[-1] h-1 w-1/2 -translate-y-1/2 ${
            lineBeforeOrange ? "bg-brand-500" : "bg-step-inactive"
          }`}
        />
      ) : null}
      {showLineAfter ? (
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 z-[-1] h-1 w-1/2 -translate-y-1/2 ${
            lineAfterOrange ? "bg-brand-500" : "bg-step-inactive"
          }`}
        />
      ) : null}
      <StepCircle status={status} />
    </div>
  );
}

export function WorkflowProgress({ currentStep, completedSteps }: WorkflowProgressProps) {
  return (
    <ol className="flex shrink-0 px-4 py-4 sm:py-6 lg:pr-3">
      {workflowSteps.map((step, index) => {
        const status = statusFor(step.id, currentStep, completedSteps);
        const isFirst = index === 0;
        const isLast = index === workflowSteps.length - 1;
        const prevStepId = index > 0 ? workflowSteps[index - 1]!.id : null;
        const isCompleted = status === "completed";
        const lineBeforeOrange = !isFirst && Boolean(prevStepId && completedSteps.has(prevStepId));
        const lineAfterOrange = !isLast && isCompleted;

        return (
          <li key={step.id} className="flex min-w-0 flex-1 flex-col items-center">
            <StepTrack
              status={status}
              showLineBefore={!isFirst}
              showLineAfter={!isLast}
              lineBeforeOrange={lineBeforeOrange}
              lineAfterOrange={lineAfterOrange}
            />
            <span
              className={`mt-2 w-full px-0.5 text-center text-xs font-normal leading-4 sm:mt-3 sm:text-body-sm sm:leading-tight ${
                status === "active" ? "text-brand-500" : "text-ink"
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
