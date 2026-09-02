import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  action?: ReactNode;
  htmlFor?: string;
  className?: string;
}

export function FormField({ label, required, children, action, htmlFor, className = "" }: FormFieldProps) {
  return (
    <div className={className}>
      <div className={`form-field__header ${action ? "form-field__header--action" : ""}`.trim()}>
        <label htmlFor={htmlFor} className="form-field__label">
          {label}
          {required ? <span className="form-field__required">*</span> : null}
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
  className?: string;
}

export function QuestionField({ label, required, children, className = "" }: QuestionFieldProps) {
  return (
    <div className={className}>
      <p className="form-field__label mb-2">
        {label}
        {required ? <span className="form-field__required">*</span> : null}
      </p>
      {children}
    </div>
  );
}
