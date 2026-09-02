import { WorkflowFooter } from "@/components/claim-status/workflow/WorkflowFooter";

interface PreClaimStatusFooterProps {
  onNext: () => void;
}

export function PreClaimStatusFooter({ onNext }: PreClaimStatusFooterProps) {
  return <WorkflowFooter onNext={onNext} />;
}
