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

function trackClassName(
  isFirst: boolean,
  isLast: boolean,
  lineBeforeOrange: boolean,
  lineAfterOrange: boolean,
) {
  const classes = ["relative isolate flex h-5 w-full items-center justify-center"];

  if (!isFirst) {
    classes.push(
      "before:absolute before:top-1/2 before:right-1/2 before:-z-10 before:h-1 before:w-1/2 before:-translate-y-1/2 before:content-['']",
      lineBeforeOrange ? "before:bg-brand-500" : "before:bg-[#d3d2d2]",
    );
  }

  if (!isLast) {
    classes.push(
      "after:absolute after:top-1/2 after:left-1/2 after:-z-10 after:h-1 after:w-1/2 after:-translate-y-1/2 after:content-['']",
      lineAfterOrange ? "after:bg-brand-500" : "after:bg-[#d3d2d2]",
    );
  }

  return classes.join(" ");
}

function StepCircle({ status }: { status: WorkflowStepStatus }) {
  if (status === "completed") {
    return (
      <span
        className="relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500"
        aria-hidden="true"
      >
        <Check size={12} weight="bold" className="text-white" />
      </span>
    );
  }

  if (status === "active") {
    return (
      <span
        className="relative z-10 block size-5 shrink-0 rounded-full bg-brand-500"
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className="relative z-10 block size-5 shrink-0 rounded-full bg-[#d3d2d2]"
      aria-hidden="true"
    />
  );
}

export function WorkflowProgress({ currentStep, completedSteps }: WorkflowProgressProps) {
  return (
    <ol className="flex shrink-0 px-1 py-4 max-lg:px-1 sm:px-2 sm:py-6 lg:px-0 lg:pr-3">
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
            <div className={trackClassName(isFirst, isLast, lineBeforeOrange, lineAfterOrange)}>
              <StepCircle status={status} />
            </div>
            <span
              className={`mt-2 w-full px-0.5 text-center text-xs font-normal leading-4 sm:mt-3 sm:text-sm sm:leading-[17px] min-[1420px]:text-base min-[1420px]:leading-[19px] ${
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
