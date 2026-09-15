import { FormField, QuestionField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { RadioField, RadioGroup } from "@/components/ui/Radio";
import { Select } from "@/components/ui/Select";
import { gatherCityOptions, gatherTypeOptions } from "@/data/gatherInfo";
import type { GatherInfoFormData, PayerSubmissionType, ResubmitMethod } from "@/types/gatherInfo";

interface GatherInfoIdentityFieldsProps {
  data: GatherInfoFormData;
  onFieldChange: <K extends keyof GatherInfoFormData>(field: K, value: GatherInfoFormData[K]) => void;
}

const resubmitOptions = [
  { id: "edi", label: "EDI" },
  { id: "fax", label: "Fax" },
  { id: "portal", label: "Portal" },
  { id: "mail", label: "Mail" },
  { id: "email", label: "Email" },
] as const;

export function GatherInfoIdentityFields({ data, onFieldChange }: GatherInfoIdentityFieldsProps) {
  return (
    <>
      <div className="form-grid form-grid--2">
        <FormField label="Insurance Rep Name" required htmlFor="insurance-rep-name">
          <Input
            id="insurance-rep-name"
            required
            value={data.insuranceRepName}
            onChange={(event) => onFieldChange("insuranceRepName", event.target.value)}
          />
        </FormField>

        <FormField label="Select Type" htmlFor="claim-type">
          <Select
            inputId="claim-type"
            value={data.selectType}
            options={gatherTypeOptions}
            onChange={(event) => onFieldChange("selectType", event.value)}
          />
        </FormField>
      </div>

      <FormField
        label="Search by patient name, date of service, and billed amount"
        htmlFor="patient-search"
      >
        <Input
          id="patient-search"
          value={data.patientSearch}
          onChange={(event) => onFieldChange("patientSearch", event.target.value)}
          placeholder="Patient name, DOS, or billed amount"
        />
      </FormField>

      <QuestionField label="What is the correct payer submission destination?" required>
        <RadioGroup gap="md" aria-label="Payer submission destination">
          <RadioField
            inputId="payer-id"
            name="payer-submission"
            value="payer-id"
            required
            checked={data.payerSubmissionType === "payer-id"}
            label="Payer ID"
            onChange={(value) => onFieldChange("payerSubmissionType", value as PayerSubmissionType)}
          />
          <RadioField
            inputId="address"
            name="payer-submission"
            value="address"
            checked={data.payerSubmissionType === "address"}
            label="Address"
            onChange={(value) => onFieldChange("payerSubmissionType", value as PayerSubmissionType)}
          />
        </RadioGroup>
      </QuestionField>

      <FormField label="Address" required htmlFor="payer-address">
        <Input
          id="payer-address"
          required
          value={data.address}
          onChange={(event) => onFieldChange("address", event.target.value)}
          placeholder="Enter address"
        />
      </FormField>

      <div className="form-grid form-grid--address">
        <FormField label="City" required htmlFor="payer-city">
          <Select
            inputId="payer-city"
            required
            value={data.city}
            options={gatherCityOptions}
            onChange={(event) => onFieldChange("city", event.value)}
          />
        </FormField>
        <FormField label="State" required htmlFor="payer-state">
          <Input
            id="payer-state"
            required
            value={data.state}
            onChange={(event) => onFieldChange("state", event.target.value)}
          />
        </FormField>
        <FormField label="Zip Code" required htmlFor="payer-zip-code">
          <Input
            id="payer-zip-code"
            required
            inputMode="numeric"
            value={data.zipCode}
            onChange={(event) => onFieldChange("zipCode", event.target.value)}
            placeholder="Zip Code"
          />
        </FormField>
      </div>

      <QuestionField label="What is the preferred resubmission method?" required>
        <RadioGroup gap="md" aria-label="Preferred resubmission method">
          {resubmitOptions.map((option, index) => (
            <RadioField
              key={option.id}
              inputId={`resubmit-${option.id}`}
              name="resubmit-method"
              value={option.id}
              required={index === 0}
              checked={data.resubmitMethod === option.id}
              label={option.label}
              onChange={(value) => onFieldChange("resubmitMethod", value as ResubmitMethod)}
            />
          ))}
        </RadioGroup>
      </QuestionField>

      <FormField label="What is the timely filing limit?" required htmlFor="timely-filing-limit">
        <Input
          id="timely-filing-limit"
          required
          value={data.timelyFilingLimit}
          onChange={(event) => onFieldChange("timelyFilingLimit", event.target.value)}
        />
      </FormField>
    </>
  );
}
