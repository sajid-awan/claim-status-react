import { VerifyFooter } from "@/components/claim-status/workflow/steps/verify/VerifyFooter";
import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { getVerifyRows } from "@/data/gatherInfo";
import type { GatherInfoFormData } from "@/types/gatherInfo";

interface VerifyProps {
  data: GatherInfoFormData;
  onNext: () => void;
}

export function Verify({ data, onNext }: VerifyProps) {
  const rows = getVerifyRows(data);

  return (
    <div className="flex min-h-0 flex-1 flex-col max-lg:flex-none">
      <div className="min-h-0 flex-1 overflow-y-auto thin-scroll max-lg:flex-none max-lg:overflow-visible lg:overflow-y-auto">
        <InfoCard>
          {rows.map((row, index) => (
            <InfoRow
              key={row.label}
              label={row.label}
              value={row.value}
              columnLayout="wide"
              isLast={index === rows.length - 1}
            />
          ))}
        </InfoCard>
      </div>
      <VerifyFooter onNext={onNext} />
    </div>
  );
}
