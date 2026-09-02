export type WorkflowStepId = "pre-claim" | "gather-info" | "verify" | "additional-detail";

export interface WorkflowStepConfig {
  id: WorkflowStepId;
  label: string;
}

export type WorkflowStepStatus = "completed" | "active" | "pending";

export type QuickContextTabId = "claim-action" | "submission" | "fax";

export type ContextualTabId =
  | "claim-action"
  | "submission"
  | "fax"
  | "documents"
  | "users"
  | "calls";

export interface ContextualNavItem {
  id: ContextualTabId;
  label: string;
}
