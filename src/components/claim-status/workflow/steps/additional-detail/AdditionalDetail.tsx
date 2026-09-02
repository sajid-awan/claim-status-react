import { useRef, useState } from "react";
import { Info } from "@/components/icons";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";

import { AdditionalDetailFooter } from "@/components/claim-status/workflow/steps/additional-detail/AdditionalDetailFooter";
import { FormField } from "@/components/claim-status/workflow/steps/gather-info/GatherInfoFields";

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
    <div className="flex min-h-0 flex-1 flex-col max-lg:flex-none">
      <Toast ref={toastRef} />
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto thin-scroll max-lg:flex-none max-lg:overflow-visible lg:overflow-y-auto">
        <div className="flex w-full max-w-[420px] flex-col items-center px-5 py-8 text-center">
          <img src="/assets/claim.svg" alt="" className="mb-6 h-20 w-20" aria-hidden />

          <h3 className="text-xl font-semibold leading-tight text-ink">Claim is Not On File</h3>
          <p className="mt-2 text-sm font-normal leading-[21px] text-ink-muted">
            A resubmission is required based on the result of this claim status.
          </p>

          <div className="mt-8 w-full text-left">
            <FormField label="Next Follow Up Date?" required>
              <Calendar
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.value ?? null)}
                showIcon
                dateFormat="mm/dd/yy"
                className="gather-calendar"
              />
            </FormField>
          </div>

          <div className="mt-4 flex w-full items-start gap-2.5 rounded-lg bg-surface-gray-100 px-3 py-3 text-left">
            <Info size={18} className="mt-0.5 shrink-0 text-ink-muted" weight="fill" />
            <p className="text-sm font-normal leading-[21px] text-ink-muted">
              Claim will be assigned to &apos;No Claim On File&apos; Module.
            </p>
          </div>
        </div>
      </div>
      <AdditionalDetailFooter onSave={handleSave} saving={saving} />
    </div>
  );
}
