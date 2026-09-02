import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as PrimeButton } from "primereact/button";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  ghost: "btn--ghost",
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
          className: `btn ${variantClass[variant]} ${iconLeft ? "btn--icon-left" : ""} ${className}`.trim(),
        },
      }}
      {...rest}
    >
      {iconLeft ? <span className="btn__icon">{icon}</span> : null}
      {children}
      {iconRight ? <span className="btn__icon">{icon}</span> : null}
    </PrimeButton>
  );
}

export function PrimaryButton(props: Omit<BaseButtonProps, "variant">) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<BaseButtonProps, "variant">) {
  return <Button {...props} variant="secondary" />;
}
