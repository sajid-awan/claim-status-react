import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as PrimeButton } from "primereact/button";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-white border border-brand-500 hover:bg-brand-600 hover:border-brand-600 disabled:bg-brand-200 disabled:border-brand-200",
  secondary:
    "bg-white text-ink border border-border-tertiary hover:bg-surface-page disabled:text-ink/40 disabled:bg-surface-page",
  ghost:
    "bg-transparent text-ink-muted border border-transparent hover:bg-surface-page disabled:text-border-secondary",
};

export function Button({
  children,
  variant = "secondary",
  icon,
  iconPosition = "left",
  className = "",
  disabled,
  type = "button",
  ...rest
}: BaseButtonProps) {
  return (
    <PrimeButton
      unstyled
      type={type}
      disabled={disabled}
      pt={{
        root: {
          className: `inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`,
        },
      }}
      {...rest}
    >
      {icon && iconPosition === "left" && <span className="flex items-center">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="flex items-center">{icon}</span>}
    </PrimeButton>
  );
}

export function PrimaryButton(props: Omit<BaseButtonProps, "variant">) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<BaseButtonProps, "variant">) {
  return <Button {...props} variant="secondary" />;
}
