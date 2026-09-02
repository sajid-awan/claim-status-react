import type { WorkflowStepConfig } from "@/types/workflow";

export const workflowSteps: WorkflowStepConfig[] = [
  { id: "pre-claim", label: "Pre-Claim Status Context" },
  { id: "gather-info", label: "Gather Info" },
  { id: "verify", label: "Verify" },
  { id: "additional-detail", label: "Add Detail" },
];
