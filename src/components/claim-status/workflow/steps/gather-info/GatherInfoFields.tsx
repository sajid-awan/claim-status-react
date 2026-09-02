import type { ReactNode } from "react";
import { RadioButton } from "primereact/radiobutton";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  action?: ReactNode;
}

export function FormField({ label, required, children, action }: FormFieldProps) {
  return (
    <div>
      <div className={`mb-2 flex items-center gap-2 ${action ? "justify-between" : ""}`}>
        <label className="text-[14px] font-normal leading-[14px] text-ink-muted">
          {label}
          {required && <span className="text-brand-500">*</span>}
        </label>
        {action}
      </div>
      {children}
    </div>
  );
}

interface QuestionFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

export function QuestionField({ label, required, children }: QuestionFieldProps) {
  return (
    <div>
      <p className="mb-2 text-[14px] font-normal leading-[14px] text-ink-muted">
        {label}
        {required && <span className="text-brand-500">*</span>}
      </p>
      {children}
    </div>
  );
}

interface RadioOptionProps {
  inputId: string;
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
}

export function RadioOption({ inputId, name, value, checked, label, onChange }: RadioOptionProps) {
  return (
    <label htmlFor={inputId} className="inline-flex cursor-pointer items-center gap-2">
      <RadioButton
        inputId={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(String(e.value))}
        className="gather-radio"
      />
      <span className="text-[14px] font-normal leading-none text-ink">{label}</span>
    </label>
  );
}
