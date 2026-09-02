import { useRef, useState } from "react";
import { Info } from "@/components/icons";
import { Toast } from "primereact/toast";

import { AdditionalDetailFooter } from "@/components/claim-status/workflow/steps/additional-detail/AdditionalDetailFooter";
import { DatePicker } from "@/components/ui/DatePicker";
import { FormField } from "@/components/ui/FormField";
import { WorkflowStepContent, WorkflowStepScroll, WorkflowStepShell } from "@/components/ui/WorkflowStepShell";

interface AdditionalDetailProps {
  onClose?: () => void;
}

export function AdditionalDetail({ onClose }: AdditionalDetailProps) {
  const [followUpDate, setFollowUpDate] = useState<Date | null>(new Date(2025, 9, 29));
  const [saving, setSaving] = useState(false);
  const toastRef = useRef<Toast>(null);

  function handleSave() {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toastRef.current?.show({
        severity: "success",
        summary: "Claim Saved",
        detail: "Claim status was saved and closed successfully.",
        life: 2500,
      });
      onClose?.();
    }, 700);
  }

  return (
    <WorkflowStepShell>
      <Toast ref={toastRef} />
      <WorkflowStepScroll className="workflow-step-scroll--center">
        <WorkflowStepContent className="empty-state">
          <img src="/assets/claim.svg" alt="" className="empty-state__image" aria-hidden />

          <h3 className="empty-state__title">Claim is Not On File</h3>
          <p className="empty-state__description">
            A resubmission is required based on the result of this claim status.
          </p>

          <div className="empty-state__form">
            <FormField label="Next Follow Up Date?" required>
              <DatePicker
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.value ?? null)}
                showIcon
                dateFormat="mm/dd/yy"
              />
            </FormField>
          </div>

          <div className="empty-state__info">
            <Info size={18} className="empty-state__info-icon" weight="fill" />
            <p className="empty-state__info-text">
              Claim will be assigned to &apos;No Claim On File&apos; Module.
            </p>
          </div>
        </WorkflowStepContent>
      </WorkflowStepScroll>
      <AdditionalDetailFooter onSave={handleSave} saving={saving} />
    </WorkflowStepShell>
  );
}
