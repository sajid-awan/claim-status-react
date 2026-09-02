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
      className={`min-h-[30px] py-2 ${
        isWide ? "grid grid-cols-12 gap-x-5" : "flex items-start"
      } ${isLast ? "" : "border-b border-black/[0.06]"}`}
    >
      <span
        className={`pt-px text-left text-sm font-medium leading-[21px] text-[#726F6D] ${
          isWide ? "col-span-8" : "w-1/2"
        }`}
      >
        {label}
      </span>
      <span
        className={`whitespace-pre-line text-left text-sm font-medium leading-[21px] text-[#231F20] ${
          isWide ? "col-span-4" : "w-1/2"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
