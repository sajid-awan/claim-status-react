import type { ReactNode } from "react";

interface ContextualCardProps {
  children: ReactNode;
  className?: string;
}

export function ContextualCard({ children, className = "" }: ContextualCardProps) {
  return <div className={`contextual-card ${className}`.trim()}>{children}</div>;
}

export function ContextualCardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`contextual-card__title ${className}`.trim()}>{children}</p>;
}

export function ContextualCardMeta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`contextual-card__meta ${className}`.trim()}>{children}</p>;
}

export function ContextualCardIconButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`contextual-card__icon-btn ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

export function ContextualNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`contextual-note ${className}`.trim()}>{children}</div>;
}
