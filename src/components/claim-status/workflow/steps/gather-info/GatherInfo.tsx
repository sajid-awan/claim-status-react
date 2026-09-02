import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { Link, UploadSimple } from "@/components/icons";

import { GatherInfoFooter } from "@/components/claim-status/workflow/steps/gather-info/GatherInfoFooter";
import {
  FormField,
  QuestionField,
  RadioOption,
} from "@/components/claim-status/workflow/steps/gather-info/GatherInfoFields";
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
    <div className="flex min-h-0 flex-1 flex-col max-lg:flex-none">
      <div className="min-h-0 flex-1 overflow-y-auto pb-5 thin-scroll max-lg:flex-none max-lg:overflow-visible lg:overflow-y-auto">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField label="Insurance Rep Name" required>
              <InputText
                value={data.insuranceRepName}
                onChange={(e) => updateField("insuranceRepName", e.target.value)}
                className="gather-field"
              />
            </FormField>
            <FormField label="Select Type">
              <Dropdown
                value={data.selectType}
                options={gatherTypeOptions}
                onChange={(e) => updateField("selectType", e.value)}
                className="gather-dropdown"
              />
            </FormField>
          </div>

          <QuestionField label="Can you please search by patient name, date of service, and billed amount as well?">
            <InputText
              value={data.patientSearch}
              onChange={(e) => updateField("patientSearch", e.target.value)}
              placeholder="Search by patient name, DOS & Billed amount"
              className="gather-field"
            />
          </QuestionField>

          <QuestionField
            label="What is the correct payer ID or submission address to send this claim to?"
            required
          >
            <div className="gather-radio-group">
              <RadioOption
                inputId="payer-id"
                name="payer-submission"
                value="payer-id"
                checked={data.payerSubmissionType === "payer-id"}
                label="Payer ID"
                onChange={(value) => updateField("payerSubmissionType", value as PayerSubmissionType)}
              />
              <RadioOption
                inputId="address"
                name="payer-submission"
                value="address"
                checked={data.payerSubmissionType === "address"}
                label="Address"
                onChange={(value) => updateField("payerSubmissionType", value as PayerSubmissionType)}
              />
            </div>
          </QuestionField>

          <FormField label="Address" required>
            <InputText
              value={data.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Enter address"
              className="gather-field"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-[2fr_1.5fr_1.5fr] min-[1400px]:gap-5">
            <FormField label="City" required>
              <Dropdown
                value={data.city}
                options={gatherCityOptions}
                onChange={(e) => updateField("city", e.value)}
                placeholder=""
                className="gather-dropdown"
              />
            </FormField>
            <FormField label="State" required>
              <InputText
                value={data.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="gather-field"
              />
            </FormField>
            <FormField label="Zip Code" required>
              <InputText
                value={data.zipCode}
                onChange={(e) => updateField("zipCode", e.target.value)}
                placeholder="Zip Code"
                className="gather-field"
              />
            </FormField>
          </div>

          <QuestionField
            label="Is there a preferred method to resubmit (EDI, fax, portal, mail or email)?"
            required
          >
            <div className="gather-radio-group">
              {resubmitOptions.map((option) => (
                <RadioOption
                  key={option.id}
                  inputId={`resubmit-${option.id}`}
                  name="resubmit-method"
                  value={option.id}
                  checked={data.resubmitMethod === option.id}
                  label={option.label}
                  onChange={(value) => updateField("resubmitMethod", value as ResubmitMethod)}
                />
              ))}
            </div>
          </QuestionField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <FormField label="Fax From" required>
              <InputText
                value={data.faxFrom}
                onChange={(e) => updateField("faxFrom", e.target.value)}
                className="gather-field"
              />
            </FormField>
            <FormField
              label="Fax To"
              required
              action={
                <button
                  type="button"
                  onClick={addFaxRow}
                  className="text-[14px] font-normal leading-[14px] text-brand-500 hover:text-brand-600"
                >
                  Add
                </button>
              }
            >
              <InputText
                value={data.faxTo}
                onChange={(e) => updateField("faxTo", e.target.value)}
                className="gather-field"
              />
            </FormField>
          </div>

          {data.faxRows.map((row) => (
            <div key={row.id} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <FormField label="Receiver Name" required>
                <InputText
                  value={row.receiverName}
                  onChange={(e) => updateFaxRow(row.id, "receiverName", e.target.value)}
                  className="gather-field"
                />
              </FormField>
              <FormField label="Subject" required>
                <InputText
                  value={row.subject}
                  onChange={(e) => updateFaxRow(row.id, "subject", e.target.value)}
                  className="gather-field"
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
                className="text-[14px] font-normal leading-[14px] text-brand-500 hover:text-brand-600"
              >
                Generate with <span className="font-semibold">SAVI</span>
              </button>
            }
          >
            <InputTextarea
              value={data.additionalNotes}
              onChange={(e) => updateField("additionalNotes", e.target.value)}
              rows={4}
              className="gather-textarea"
            />
          </FormField>

          <label className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border-tertiary text-[15px] font-normal text-brand-500 transition-colors hover:border-brand-500 hover:bg-brand-50/40">
            <UploadSimple size={18} weight="bold" />
            Upload File
            <input
              type="file"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                updateField("files", file?.name ?? "No file attached");
              }}
            />
          </label>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border-tertiary text-[15px] font-normal text-link transition-colors hover:border-link hover:bg-link-bg/40"
          >
            <Link size={18} weight="bold" />
            Link Documents
          </button>
        </div>
      </div>
      <GatherInfoFooter onContinue={onNext} />
    </div>
  );
}
