import { InputText, type InputTextProps } from "primereact/inputtext";

type FieldSize = "sm" | "md" | "lg";
type FieldVariant = "outline" | "filled" | "ghost";

const sizeClasses: Record<FieldSize, string> = {
  sm: "h-8 px-2.5 text-body-sm",
  md: "h-field px-3 text-body-md",
  lg: "h-12 px-4 text-body-md",
};

const variantClasses: Record<FieldVariant, string> = {
  outline: "border border-border-tertiary bg-surface-white",
  filled: "border border-transparent bg-surface-gray-100",
  ghost: "border border-transparent bg-transparent",
};

export interface InputProps extends Omit<InputTextProps, "size" | "variant"> {
  fieldSize?: FieldSize;
  variant?: FieldVariant;
}

export function Input({ fieldSize = "md", variant = "outline", className = "", ...rest }: InputProps) {
  return (
    <InputText
      className={`w-full rounded-lg font-normal leading-normal text-ink placeholder:text-placeholder ${sizeClasses[fieldSize]} ${variantClasses[variant]} ${className}`.trim()}
      {...rest}
    />
  );
}
