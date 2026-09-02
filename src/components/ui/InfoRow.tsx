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
      className={`info-row ${isLast ? "info-row--last" : "info-row--bordered"} ${
        isWide ? "info-row--wide" : "info-row--half"
      }`.trim()}
    >
      <span className={`info-row__label ${isWide ? "info-row__label--wide" : "info-row__label--half"}`}>
        {label}
      </span>
      <span className={`info-row__value ${isWide ? "info-row__value--wide" : "info-row__value--half"}`}>
        {value}
      </span>
    </div>
  );
}
