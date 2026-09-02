import type { ReactNode } from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

export function IconButton({
  icon,
  label,
  active = false,
  className = "",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
        active
          ? "border-brand-500 bg-brand-500 text-white hover:bg-brand-600 [&_svg]:text-white"
          : "border-transparent bg-surface-page text-ink-muted hover:bg-surface-page hover:text-ink"
      } ${className}`}
      {...rest}
    >
      <span className="flex h-6 w-6 items-center justify-center [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </span>
    </button>
  );
}
