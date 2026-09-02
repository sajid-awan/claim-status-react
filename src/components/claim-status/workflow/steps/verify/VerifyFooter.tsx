import { WorkflowFooter } from "@/components/claim-status/workflow/WorkflowFooter";

interface VerifyFooterProps {
  onNext: () => void;
}

export function VerifyFooter({ onNext }: VerifyFooterProps) {
  return <WorkflowFooter onNext={onNext} />;
}
