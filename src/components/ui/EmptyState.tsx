interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No data" }: EmptyStateProps) {
  return (
    <div className="flex min-h-[200px] flex-1 items-center justify-center px-4 py-12 text-sm text-ink-muted">
      {message}
    </div>
  );
}
