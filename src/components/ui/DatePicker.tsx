import { Calendar, type CalendarProps } from "primereact/calendar";

type FieldSize = "sm" | "md" | "lg";
type FieldVariant = "outline" | "filled" | "ghost";

const sizeClasses: Record<FieldSize, string> = {
  sm: "form-control--sm",
  md: "form-control--md",
  lg: "form-control--lg",
};

export interface DatePickerProps extends Omit<CalendarProps, "size" | "variant"> {
  fieldSize?: FieldSize;
  variant?: FieldVariant;
}

export function DatePicker({ fieldSize = "md", variant = "outline", className = "", ...rest }: DatePickerProps) {
  return (
    <Calendar
      className={`form-datepicker ${sizeClasses[fieldSize]} form-datepicker--${variant} ${className}`.trim()}
      {...rest}
    />
  );
}
