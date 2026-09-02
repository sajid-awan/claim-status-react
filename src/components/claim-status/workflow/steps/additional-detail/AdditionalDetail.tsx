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
      <WorkflowStepScroll className="flex items-center justify-center">
        <WorkflowStepContent className="flex w-full max-w-[var(--width-content-narrow)] flex-col items-center px-5 py-8 text-center">
          <img src="/assets/claim.svg" alt="" className="mb-6 h-20 w-20" aria-hidden />

          <h3 className="text-xl font-semibold leading-tight text-ink">Claim is Not On File</h3>
          <p className="mt-2 text-body-sm font-normal leading-body text-ink-muted">
            A resubmission is required based on the result of this claim status.
          </p>

          <div className="mt-8 w-full text-left">
            <FormField label="Next Follow Up Date?" required>
              <DatePicker
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.value ?? null)}
                showIcon
                dateFormat="mm/dd/yy"
              />
            </FormField>
          </div>

          <div className="mt-4 flex w-full items-start gap-2.5 rounded-lg bg-surface-gray-100 px-3 py-3 text-left">
            <Info size={18} className="mt-0.5 shrink-0 text-ink-muted" weight="fill" />
            <p className="text-body-sm font-normal leading-body text-ink-muted">
              Claim will be assigned to &apos;No Claim On File&apos; Module.
            </p>
          </div>
        </WorkflowStepContent>
      </WorkflowStepScroll>
      <AdditionalDetailFooter onSave={handleSave} saving={saving} />
    </WorkflowStepShell>
  );
}
