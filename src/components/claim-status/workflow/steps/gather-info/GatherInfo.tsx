import type { FormEvent } from "react";

import { GatherInfoAttachments } from "@/components/claim-status/workflow/steps/gather-info/GatherInfoAttachments";
import { GatherInfoFaxFields } from "@/components/claim-status/workflow/steps/gather-info/GatherInfoFaxFields";
import { GatherInfoFooter } from "@/components/claim-status/workflow/steps/gather-info/GatherInfoFooter";
import { GatherInfoIdentityFields } from "@/components/claim-status/workflow/steps/gather-info/GatherInfoIdentityFields";
import { WorkflowStepContent, WorkflowStepScroll } from "@/components/ui/WorkflowStepShell";
import type { GatherInfoFormData } from "@/types/gatherInfo";

interface GatherInfoProps {
  data: GatherInfoFormData;
  onChange: (data: GatherInfoFormData) => void;
  onNext: () => void;
}

export function GatherInfo({ data, onChange, onNext }: GatherInfoProps) {
  function updateField<K extends keyof GatherInfoFormData>(
    field: K,
    value: GatherInfoFormData[K],
  ) {
    onChange({ ...data, [field]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    onNext();
  }

  return (
    <form className="workflow-step-shell" onSubmit={handleSubmit}>
      <WorkflowStepScroll className="workflow-step-scroll--gather">
        <WorkflowStepContent className="workflow-step-content--spaced">
          <GatherInfoIdentityFields data={data} onFieldChange={updateField} />
          <GatherInfoFaxFields
            data={data}
            onFieldChange={updateField}
            onFaxRowsChange={(faxRows) => updateField("faxRows", faxRows)}
          />
          <GatherInfoAttachments
            fileName={data.files}
            linkedDocuments={data.linkedDocuments}
            onFileNameChange={(fileName) => updateField("files", fileName)}
            onLinkedDocumentsChange={(documents) => updateField("linkedDocuments", documents)}
          />
        </WorkflowStepContent>
      </WorkflowStepScroll>
      <GatherInfoFooter />
    </form>
  );
}
