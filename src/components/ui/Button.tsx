import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as PrimeButton } from "primereact/button";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const baseClasses =
  "inline-flex h-button cursor-pointer items-center justify-center gap-2.5 rounded-lg px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed";

const iconWrapperClass = "flex size-5 shrink-0 items-center justify-center";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600 disabled:border-brand-200 disabled:bg-brand-200",
  secondary:
    "border border-border-tertiary bg-white text-ink hover:bg-surface-page disabled:bg-surface-page disabled:text-ink/40",
  ghost:
    "border border-transparent bg-transparent text-ink-muted hover:bg-surface-page disabled:text-border-secondary",
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
  const iconLeft = icon && iconPosition === "left";
  const iconRight = icon && iconPosition === "right";

  return (
    <PrimeButton
      unstyled
      type={type}
      disabled={disabled}
      pt={{
        root: {
          className: `${baseClasses} ${variantClasses[variant]} ${iconLeft ? "justify-start pl-3" : ""} ${className}`.trim(),
        },
      }}
      {...rest}
    >
      {iconLeft ? <span className={iconWrapperClass}>{icon}</span> : null}
      {children}
      {iconRight ? <span className={iconWrapperClass}>{icon}</span> : null}
    </PrimeButton>
  );
}

export function PrimaryButton(props: Omit<BaseButtonProps, "variant">) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<BaseButtonProps, "variant">) {
  return <Button {...props} variant="secondary" />;
}
