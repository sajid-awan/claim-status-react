import { useRef, useState } from "react";

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

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.tif,.tiff";

function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `"${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}

export function GatherInfo({ data, onChange, onNext }: GatherInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  function updateField<K extends keyof GatherInfoFormData>(field: K, value: GatherInfoFormData[K]) {
    onChange({ ...data, [field]: value });
  }

  function handleUploadChange(file: File | undefined) {
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    setUploadError(null);
    updateField("files", file.name);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleLinkDocumentsChange(fileList: FileList | null) {
    if (!fileList?.length) return;

    const nextLinked = [...data.linkedDocuments];
    let error: string | null = null;

    for (const file of Array.from(fileList)) {
      const validationError = validateFile(file);
      if (validationError) {
        error = validationError;
        break;
      }
      if (!nextLinked.includes(file.name)) {
        nextLinked.push(file.name);
      }
    }

    if (error) {
      setUploadError(error);
    } else {
      setUploadError(null);
      updateField("linkedDocuments", nextLinked);
    }

    if (linkInputRef.current) linkInputRef.current.value = "";
  }

  function removeLinkedDocument(name: string) {
    updateField(
      "linkedDocuments",
      data.linkedDocuments.filter((doc) => doc !== name),
    );
  }

  function clearUpload() {
    setUploadError(null);
    updateField("files", "No file attached");
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  const hasUploadedFile = data.files !== "No file attached";

  return (
    <WorkflowStepShell>
      <WorkflowStepScroll className="pb-5">
        <WorkflowStepContent className="workflow-step-content--spaced">
          <div className="form-grid form-grid--2">
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

          <div className="form-grid form-grid--address">
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

          <div className="form-grid form-grid--2">
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
                <button type="button" onClick={addFaxRow} className="form-field__action">
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
            <div key={row.id} className="form-grid form-grid--2">
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
              <button type="button" className="form-field__action">
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

          <FormField label="Attachments">
            <div className="upload-stack">
              <input
                ref={fileInputRef}
                id="gather-info-upload"
                type="file"
                accept={ACCEPTED_FILE_TYPES}
                className="sr-only"
                onChange={(e) => handleUploadChange(e.target.files?.[0])}
              />
              <label htmlFor="gather-info-upload" className="upload-zone">
                <UploadSimple size={18} weight="bold" />
                Upload File
              </label>

              <input
                ref={linkInputRef}
                id="gather-info-link"
                type="file"
                accept={ACCEPTED_FILE_TYPES}
                multiple
                className="sr-only"
                onChange={(e) => handleLinkDocumentsChange(e.target.files)}
              />
              <label htmlFor="gather-info-link" className="upload-zone upload-zone--link">
                <Link size={18} weight="bold" />
                Link Documents
              </label>
            </div>

            {uploadError ? <p className="upload-error">{uploadError}</p> : null}

            {hasUploadedFile ? (
              <ul className="upload-list">
                <li className="upload-list__item">
                  <span className="upload-list__name">{data.files}</span>
                  <button type="button" onClick={clearUpload} className="upload-list__remove">
                    Remove
                  </button>
                </li>
              </ul>
            ) : null}

            {data.linkedDocuments.length > 0 ? (
              <ul className="upload-list">
                {data.linkedDocuments.map((name) => (
                  <li key={name} className="upload-list__item">
                    <span className="upload-list__name">{name}</span>
                    <button
                      type="button"
                      onClick={() => removeLinkedDocument(name)}
                      className="upload-list__remove"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </FormField>
        </WorkflowStepContent>
      </WorkflowStepScroll>
      <GatherInfoFooter onContinue={onNext} />
    </WorkflowStepShell>
  );
}
