interface InfoRowProps {
  label: string;
  value: string;
  isLast?: boolean;
  columnLayout?: "half" | "wide";
}

export function InfoRow({
  label,
  value,
  isLast = false,
  columnLayout = "half",
}: InfoRowProps) {
  const isWide = columnLayout === "wide";

  return (
    <div
      className={`min-h-[var(--height-row-sm)] py-2 ${
        isWide ? "grid grid-cols-12 gap-x-5" : "flex items-start"
      } ${isLast ? "" : "border-b border-border-subtle"}`}
    >
      <span
        className={`pt-px text-left text-body-sm font-medium leading-body text-ink-muted ${
          isWide ? "col-span-8" : "w-1/2"
        }`}
      >
        {label}
      </span>
      <span
        className={`whitespace-pre-line text-left text-body-sm font-medium leading-body text-ink ${
          isWide ? "col-span-4" : "w-1/2"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
