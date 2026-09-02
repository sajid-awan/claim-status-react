import type { ReactNode } from "react";

interface ContextualCardProps {
  children: ReactNode;
  className?: string;
}

export function ContextualCard({ children, className = "" }: ContextualCardProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-md border border-surface-gray-200 bg-surface-white px-3 py-2.5 shadow-card ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function ContextualCardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`truncate text-body-sm font-medium text-ink ${className}`.trim()}>{children}</p>
  );
}

export function ContextualCardMeta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs text-ink-muted ${className}`.trim()}>{children}</p>;
}

export function ContextualCardIconButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-gray-100 hover:text-ink ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ContextualNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-md border border-surface-gray-200 bg-surface-white p-3 text-body-sm text-ink-muted shadow-card ${className}`.trim()}
    >
      {children}
    </div>
  );
}
