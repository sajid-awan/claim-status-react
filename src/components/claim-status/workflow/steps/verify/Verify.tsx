import { VerifyFooter } from "@/components/claim-status/workflow/steps/verify/VerifyFooter";
import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { WorkflowStepContent, WorkflowStepScroll, WorkflowStepShell } from "@/components/ui/WorkflowStepShell";
import { getVerifyRows } from "@/data/gatherInfo";
import type { GatherInfoFormData } from "@/types/gatherInfo";

interface VerifyProps {
  data: GatherInfoFormData;
  onNext: () => void;
}

export function Verify({ data, onNext }: VerifyProps) {
  const rows = getVerifyRows(data);

  return (
    <WorkflowStepShell>
      <WorkflowStepScroll>
        <WorkflowStepContent>
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
        </WorkflowStepContent>
      </WorkflowStepScroll>
      <VerifyFooter onNext={onNext} />
    </WorkflowStepShell>
  );
}
