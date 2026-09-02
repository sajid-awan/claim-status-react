import { WorkflowFooter } from "@/components/claim-status/workflow/WorkflowFooter";

interface GatherInfoFooterProps {
  onContinue: () => void;
}

export function GatherInfoFooter({ onContinue }: GatherInfoFooterProps) {
  return <WorkflowFooter onNext={onContinue} />;
}
