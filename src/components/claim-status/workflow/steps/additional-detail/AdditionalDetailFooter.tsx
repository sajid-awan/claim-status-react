import { Check, CircleNotch } from "@/components/icons";

import { WorkflowFooter } from "@/components/claim-status/workflow/WorkflowFooter";

interface AdditionalDetailFooterProps {
  onSave: () => void;
  saving: boolean;
  disabled?: boolean;
}

export function AdditionalDetailFooter({ onSave, saving, disabled = false }: AdditionalDetailFooterProps) {
  return (
    <WorkflowFooter
      onNext={onSave}
      nextLabel={saving ? "Saving…" : "Save & Close"}
      nextIcon={saving ? <CircleNotch size={20} className="icon-spin" /> : <Check size={20} weight="bold" />}
      nextIconPosition="left"
      nextDisabled={saving || disabled}
    />
  );
}
