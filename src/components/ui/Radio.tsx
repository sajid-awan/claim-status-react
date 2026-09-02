import type { InputHTMLAttributes, ReactNode } from "react";

export type RadioSize = "sm" | "md" | "lg";
export type RadioVariant = "primary" | "secondary" | "success";

const circleSizeClasses: Record<RadioSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

const dotSizeClasses: Record<RadioSize, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

const gapClasses: Record<RadioSize, string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

const labelSizeClasses: Record<RadioSize, string> = {
  sm: "text-xs leading-4",
  md: "text-body-sm leading-compact",
  lg: "text-body-md leading-body",
};

const variantCircleClasses: Record<RadioVariant, string> = {
  primary: "border-border-tertiary peer-checked:border-2 peer-checked:border-brand-500",
  secondary: "border-border-secondary peer-checked:border-2 peer-checked:border-ink-muted",
  success: "border-border-tertiary peer-checked:border-2 peer-checked:border-success",
};

const variantDotClasses: Record<RadioVariant, string> = {
  primary: "bg-brand-500",
  secondary: "bg-ink-muted",
  success: "bg-success",
};

const variantFocusRingClasses: Record<RadioVariant, string> = {
  primary: "peer-focus-visible:ring-brand-200",
  secondary: "peer-focus-visible:ring-surface-gray-200",
  success: "peer-focus-visible:ring-success-light",
};

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  fieldSize?: RadioSize;
  variant?: RadioVariant;
  onChange?: (value: string) => void;
}

export function Radio({
  fieldSize = "md",
  variant = "primary",
  className = "",
  disabled,
  onChange,
  value,
  ...rest
}: RadioProps) {
  return (
    <span className={`relative inline-flex shrink-0 ${className}`.trim()}>
      <input
        type="radio"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="peer sr-only"
        {...rest}
      />
      <span
        aria-hidden
        className={`flex items-center justify-center rounded-full border bg-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ${circleSizeClasses[fieldSize]} ${variantCircleClasses[variant]} ${variantFocusRingClasses[variant]}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity peer-checked:opacity-100 ${dotSizeClasses[fieldSize]} ${variantDotClasses[variant]}`}
      />
    </span>
  );
}

export interface RadioFieldProps extends RadioProps {
  label: string;
  inputId: string;
}

export function RadioField({
  label,
  inputId,
  fieldSize = "md",
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: RadioFieldProps) {
  return (
    <label
      htmlFor={inputId}
      className={`inline-flex cursor-pointer items-center ${gapClasses[fieldSize]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`.trim()}
    >
      <Radio
        id={inputId}
        fieldSize={fieldSize}
        variant={variant}
        disabled={disabled}
        {...rest}
      />
      <span className={`font-normal text-ink ${labelSizeClasses[fieldSize]}`}>{label}</span>
    </label>
  );
}

type RadioGroupGap = "sm" | "md" | "lg";

export interface RadioGroupProps {
  children: ReactNode;
  layout?: "horizontal" | "vertical";
  gap?: RadioGroupGap;
  className?: string;
  "aria-label"?: string;
}

const groupGapClasses: Record<RadioGroupGap, string> = {
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-6",
};

export function RadioGroup({
  children,
  layout = "horizontal",
  gap = "md",
  className = "",
  "aria-label": ariaLabel,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`${layout === "horizontal" ? "flex flex-wrap items-center" : "flex flex-col items-start"} ${groupGapClasses[gap]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
