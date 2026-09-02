import type { InputHTMLAttributes, ReactNode } from "react";

export type RadioSize = "sm" | "md" | "lg";
export type RadioVariant = "primary" | "secondary" | "success";

const circleSizeClass: Record<RadioSize, string> = {
  sm: "radio__circle--sm",
  md: "radio__circle--md",
  lg: "radio__circle--lg",
};

const dotSizeClass: Record<RadioSize, string> = {
  sm: "radio__dot--sm",
  md: "radio__dot--md",
  lg: "radio__dot--lg",
};

const fieldSizeClass: Record<RadioSize, string> = {
  sm: "radio-field--sm",
  md: "radio-field--md",
  lg: "radio-field--lg",
};

const labelSizeClass: Record<RadioSize, string> = {
  sm: "radio-field__label--sm",
  md: "radio-field__label--md",
  lg: "radio-field__label--lg",
};

const variantCircleClass: Record<RadioVariant, string> = {
  primary: "radio__circle--primary",
  secondary: "radio__circle--secondary",
  success: "radio__circle--success",
};

const variantDotClass: Record<RadioVariant, string> = {
  primary: "radio__dot--primary",
  secondary: "radio__dot--secondary",
  success: "radio__dot--success",
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
    <span className={`radio ${className}`.trim()}>
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
        className={`radio__circle ${circleSizeClass[fieldSize]} ${variantCircleClass[variant]}`}
      />
      <span
        aria-hidden
        className={`radio__dot ${dotSizeClass[fieldSize]} ${variantDotClass[variant]}`}
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
      className={`radio-field ${fieldSizeClass[fieldSize]} ${
        disabled ? "radio-field--disabled" : ""
      } ${className}`.trim()}
    >
      <Radio
        id={inputId}
        fieldSize={fieldSize}
        variant={variant}
        disabled={disabled}
        {...rest}
      />
      <span className={`radio-field__label ${labelSizeClass[fieldSize]}`}>{label}</span>
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

const groupGapClass: Record<RadioGroupGap, string> = {
  sm: "radio-group--gap-sm",
  md: "radio-group--gap-md",
  lg: "radio-group--gap-lg",
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
      className={`radio-group ${
        layout === "horizontal" ? "radio-group--horizontal" : "radio-group--vertical"
      } ${groupGapClass[gap]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
