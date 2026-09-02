import { InputTextarea, type InputTextareaProps } from "primereact/inputtextarea";

type FieldSize = "sm" | "md" | "lg";
type FieldVariant = "outline" | "filled" | "ghost";

const sizeClass: Record<FieldSize, string> = {
  sm: "form-textarea--sm",
  md: "form-textarea--md",
  lg: "form-textarea--lg",
};

const variantClass: Record<FieldVariant, string> = {
  outline: "form-input--outline",
  filled: "form-input--filled",
  ghost: "form-input--ghost",
};

export interface TextareaProps extends Omit<InputTextareaProps, "size" | "variant"> {
  fieldSize?: FieldSize;
  variant?: FieldVariant;
}

export function Textarea({ fieldSize = "md", variant = "outline", className = "", ...rest }: TextareaProps) {
  return (
    <InputTextarea
      className={`form-input form-textarea ${sizeClass[fieldSize]} ${variantClass[variant]} ${className}`.trim()}
      {...rest}
    />
  );
}
