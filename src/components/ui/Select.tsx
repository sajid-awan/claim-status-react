import { Dropdown, type DropdownProps } from "primereact/dropdown";

type FieldSize = "sm" | "md" | "lg";
type FieldVariant = "outline" | "filled" | "ghost";

const sizeClasses: Record<FieldSize, string> = {
  sm: "form-control--sm",
  md: "form-control--md",
  lg: "form-control--lg",
};

export interface SelectProps extends Omit<DropdownProps, "size" | "variant"> {
  fieldSize?: FieldSize;
  variant?: FieldVariant;
}

export function Select({ fieldSize = "md", variant = "outline", className = "", ...rest }: SelectProps) {
  return (
    <Dropdown
      className={`form-select ${sizeClasses[fieldSize]} form-select--${variant} ${className}`.trim()}
      {...rest}
    />
  );
}
