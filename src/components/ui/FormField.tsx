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
      <div className={`mb-2 flex items-center gap-2 ${action ? "justify-between" : ""}`}>
        <label htmlFor={htmlFor} className="text-body-sm font-normal leading-compact text-ink-muted">
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
  className?: string;
}

export function QuestionField({ label, required, children, className = "" }: QuestionFieldProps) {
  return (
    <div className={className}>
      <p className="mb-2 text-body-sm font-normal leading-compact text-ink-muted">
        {label}
        {required && <span className="text-brand-500">*</span>}
      </p>
      {children}
    </div>
  );
}
