import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { FaxRow, GatherInfoFormData } from "@/types/gatherInfo";

interface GatherInfoFaxFieldsProps {
  data: GatherInfoFormData;
  onFieldChange: <K extends keyof GatherInfoFormData>(field: K, value: GatherInfoFormData[K]) => void;
  onFaxRowsChange: (rows: FaxRow[]) => void;
}

export function GatherInfoFaxFields({
  data,
  onFieldChange,
  onFaxRowsChange,
}: GatherInfoFaxFieldsProps) {
  function addFaxRow() {
    onFaxRowsChange([
      ...data.faxRows,
      { id: crypto.randomUUID(), receiverName: "", subject: "" },
    ]);
  }

  function updateFaxRow(id: string, field: "receiverName" | "subject", value: string) {
    onFaxRowsChange(
      data.faxRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  }

  function generateNotes() {
    const method = data.resubmitMethod.toUpperCase();
    onFieldChange(
      "additionalNotes",
      `Claim was reviewed with ${data.insuranceRepName}. Resubmit by ${method} and follow the payer's timely filing limit of ${data.timelyFilingLimit}.`,
    );
  }

  return (
    <>
      <div className="form-grid form-grid--2">
        <FormField label="Fax From" required htmlFor="fax-from">
          <Input
            id="fax-from"
            required
            value={data.faxFrom}
            onChange={(event) => onFieldChange("faxFrom", event.target.value)}
          />
        </FormField>
        <FormField
          label="Fax To"
          required
          htmlFor="fax-to"
          action={
            <button type="button" onClick={addFaxRow} className="form-field__action">
              Add recipient
            </button>
          }
        >
          <Input
            id="fax-to"
            required
            value={data.faxTo}
            onChange={(event) => onFieldChange("faxTo", event.target.value)}
          />
        </FormField>
      </div>

      {data.faxRows.map((row) => (
        <div key={row.id} className="form-grid form-grid--2">
          <FormField label="Receiver Name" required htmlFor={`receiver-name-${row.id}`}>
            <Input
              id={`receiver-name-${row.id}`}
              required
              value={row.receiverName}
              onChange={(event) => updateFaxRow(row.id, "receiverName", event.target.value)}
            />
          </FormField>
          <FormField label="Subject" required htmlFor={`fax-subject-${row.id}`}>
            <Input
              id={`fax-subject-${row.id}`}
              required
              value={row.subject}
              onChange={(event) => updateFaxRow(row.id, "subject", event.target.value)}
            />
          </FormField>
        </div>
      ))}

      <FormField
        label="Additional Claim Status Notes"
        required
        htmlFor="additional-claim-notes"
        action={
          <button type="button" className="form-field__action" onClick={generateNotes}>
            Generate with <span className="form-field__action-brand">SAVI</span>
          </button>
        }
      >
        <Textarea
          id="additional-claim-notes"
          required
          value={data.additionalNotes}
          onChange={(event) => onFieldChange("additionalNotes", event.target.value)}
          rows={4}
        />
      </FormField>
    </>
  );
}
