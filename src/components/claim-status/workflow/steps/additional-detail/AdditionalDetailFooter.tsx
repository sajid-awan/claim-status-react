import { Check, CircleNotch } from "@/components/icons";

import { WorkflowFooter } from "@/components/claim-status/workflow/WorkflowFooter";

interface AdditionalDetailFooterProps {
  onSave: () => void;
  saving: boolean;
}

export function AdditionalDetailFooter({ onSave, saving }: AdditionalDetailFooterProps) {
  return (
    <WorkflowFooter
      onNext={onSave}
      nextLabel={saving ? "Saving…" : "Save & Close"}
      nextIcon={saving ? <CircleNotch size={20} className="animate-spin" /> : <Check size={20} weight="bold" />}
      nextIconPosition="left"
      nextDisabled={saving}
    />
  );
}
