import { useRef } from "react";

import { Link, UploadSimple } from "@/components/icons";

import { GatherInfoFooter } from "@/components/claim-status/workflow/steps/gather-info/GatherInfoFooter";
import { FormField, QuestionField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { RadioField, RadioGroup } from "@/components/ui/Radio";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { WorkflowStepContent, WorkflowStepScroll, WorkflowStepShell } from "@/components/ui/WorkflowStepShell";
import { gatherCityOptions, gatherTypeOptions } from "@/data/gatherInfo";
import type { GatherInfoFormData, PayerSubmissionType, ResubmitMethod } from "@/types/gatherInfo";

interface GatherInfoProps {
  data: GatherInfoFormData;
  onChange: (data: GatherInfoFormData) => void;
  onNext: () => void;
}

const resubmitOptions = [
  { id: "edi", label: "EDI" },
  { id: "fax", label: "Fax" },
  { id: "portal", label: "Portal" },
  { id: "mail", label: "Mail" },
  { id: "email", label: "Email" },
] as const;

export function GatherInfo({ data, onChange, onNext }: GatherInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof GatherInfoFormData>(field: K, value: GatherInfoFormData[K]) {
    onChange({ ...data, [field]: value });
  }

  function addFaxRow() {
    onChange({
      ...data,
      faxRows: [...data.faxRows, { id: String(Date.now()), receiverName: "", subject: "" }],
    });
  }

  function updateFaxRow(id: string, field: "receiverName" | "subject", value: string) {
    onChange({
      ...data,
      faxRows: data.faxRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    });
  }

  return (
    <WorkflowStepShell>
      <WorkflowStepScroll className="pb-5">
        <WorkflowStepContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField label="Insurance Rep Name" required>
              <Input
                value={data.insuranceRepName}
                onChange={(e) => updateField("insuranceRepName", e.target.value)}
              />
            </FormField>
            <FormField label="Select Type">
              <Select
                value={data.selectType}
                options={gatherTypeOptions}
                onChange={(e) => updateField("selectType", e.value)}
              />
            </FormField>
          </div>

          <QuestionField label="Can you please search by patient name, date of service, and billed amount as well?">
            <Input
              value={data.patientSearch}
              onChange={(e) => updateField("patientSearch", e.target.value)}
              placeholder="Search by patient name, DOS & Billed amount"
            />
          </QuestionField>

          <QuestionField
            label="What is the correct payer ID or submission address to send this claim to?"
            required
          >
            <RadioGroup gap="md">
              <RadioField
                inputId="payer-id"
                name="payer-submission"
                value="payer-id"
                checked={data.payerSubmissionType === "payer-id"}
                label="Payer ID"
                onChange={(value) => updateField("payerSubmissionType", value as PayerSubmissionType)}
              />
              <RadioField
                inputId="address"
                name="payer-submission"
                value="address"
                checked={data.payerSubmissionType === "address"}
                label="Address"
                onChange={(value) => updateField("payerSubmissionType", value as PayerSubmissionType)}
              />
            </RadioGroup>
          </QuestionField>

          <FormField label="Address" required>
            <Input
              value={data.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Enter address"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1.5fr_1.5fr] xl:gap-5">
            <FormField label="City" required>
              <Select
                value={data.city}
                options={gatherCityOptions}
                onChange={(e) => updateField("city", e.value)}
                placeholder=""
              />
            </FormField>
            <FormField label="State" required>
              <Input
                value={data.state}
                onChange={(e) => updateField("state", e.target.value)}
              />
            </FormField>
            <FormField label="Zip Code" required>
              <Input
                value={data.zipCode}
                onChange={(e) => updateField("zipCode", e.target.value)}
                placeholder="Zip Code"
              />
            </FormField>
          </div>

          <QuestionField
            label="Is there a preferred method to resubmit (EDI, fax, portal, mail or email)?"
            required
          >
            <RadioGroup gap="md">
              {resubmitOptions.map((option) => (
                <RadioField
                  key={option.id}
                  inputId={`resubmit-${option.id}`}
                  name="resubmit-method"
                  value={option.id}
                  checked={data.resubmitMethod === option.id}
                  label={option.label}
                  onChange={(value) => updateField("resubmitMethod", value as ResubmitMethod)}
                />
              ))}
            </RadioGroup>
          </QuestionField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField label="Fax From" required>
              <Input
                value={data.faxFrom}
                onChange={(e) => updateField("faxFrom", e.target.value)}
              />
            </FormField>
            <FormField
              label="Fax To"
              required
              action={
                <button
                  type="button"
                  onClick={addFaxRow}
                  className="text-body-sm font-normal leading-compact text-brand-500 hover:text-brand-600"
                >
                  Add
                </button>
              }
            >
              <Input
                value={data.faxTo}
                onChange={(e) => updateField("faxTo", e.target.value)}
              />
            </FormField>
          </div>

          {data.faxRows.map((row) => (
            <div key={row.id} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <FormField label="Receiver Name" required>
                <Input
                  value={row.receiverName}
                  onChange={(e) => updateFaxRow(row.id, "receiverName", e.target.value)}
                />
              </FormField>
              <FormField label="Subject" required>
                <Input
                  value={row.subject}
                  onChange={(e) => updateFaxRow(row.id, "subject", e.target.value)}
                />
              </FormField>
            </div>
          ))}

          <FormField
            label="Additional Claim Status Notes"
            required
            action={
              <button
                type="button"
                className="text-body-sm font-normal leading-compact text-brand-500 hover:text-brand-600"
              >
                Generate with <span className="font-semibold">SAVI</span>
              </button>
            }
          >
            <Textarea
              value={data.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              rows={4}
            />
          </FormField>

          <input
            ref={fileInputRef}
            id="gather-info-upload"
            type="file"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              updateField("files", file?.name ?? "No file attached");
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          />
          <label
            htmlFor="gather-info-upload"
            className="flex h-field w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border-tertiary text-body-md font-normal text-brand-500 transition-colors hover:border-brand-500 hover:bg-brand-50/40"
          >
            <UploadSimple size={18} weight="bold" />
            Upload File
          </label>
          {data.files && data.files !== "No file attached" ? (
            <p className="mt-2 truncate text-body-sm leading-body text-ink-muted">{data.files}</p>
          ) : null}

          <button
            type="button"
            className="flex h-field w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border-tertiary text-body-md font-normal text-link transition-colors hover:border-link hover:bg-link-bg/40"
          >
            <Link size={18} weight="bold" />
            Link Documents
          </button>
        </WorkflowStepContent>
      </WorkflowStepScroll>
      <GatherInfoFooter onContinue={onNext} />
    </WorkflowStepShell>
  );
}
