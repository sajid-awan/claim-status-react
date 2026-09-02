import { InputTextarea, type InputTextareaProps } from "primereact/inputtextarea";

type FieldSize = "sm" | "md" | "lg";
type FieldVariant = "outline" | "filled" | "ghost";

const sizeClasses: Record<FieldSize, string> = {
  sm: "px-2.5 py-2 text-body-sm",
  md: "px-3 py-2.5 text-body-md",
  lg: "px-4 py-3 text-body-md",
};

const variantClasses: Record<FieldVariant, string> = {
  outline: "border border-border-tertiary bg-surface-white",
  filled: "border border-transparent bg-surface-gray-100",
  ghost: "border border-transparent bg-transparent",
};

export interface TextareaProps extends Omit<InputTextareaProps, "size" | "variant"> {
  fieldSize?: FieldSize;
  variant?: FieldVariant;
}

export function Textarea({ fieldSize = "md", variant = "outline", className = "", ...rest }: TextareaProps) {
  return (
    <InputTextarea
      className={`w-full rounded-lg font-normal leading-normal text-ink placeholder:text-placeholder ${sizeClasses[fieldSize]} ${variantClasses[variant]} ${className}`.trim()}
      {...rest}
    />
  );
}
