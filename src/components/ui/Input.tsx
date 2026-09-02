import { InputText, type InputTextProps } from "primereact/inputtext";

type FieldSize = "sm" | "md" | "lg";
type FieldVariant = "outline" | "filled" | "ghost";

const sizeClass: Record<FieldSize, string> = {
  sm: "form-input--sm",
  md: "form-input--md",
  lg: "form-input--lg",
};

const variantClass: Record<FieldVariant, string> = {
  outline: "form-input--outline",
  filled: "form-input--filled",
  ghost: "form-input--ghost",
};

export interface InputProps extends Omit<InputTextProps, "size" | "variant"> {
  fieldSize?: FieldSize;
  variant?: FieldVariant;
}

export function Input({ fieldSize = "md", variant = "outline", className = "", ...rest }: InputProps) {
  return (
    <InputText
      className={`form-input ${sizeClass[fieldSize]} ${variantClass[variant]} ${className}`.trim()}
      {...rest}
    />
  );
}
