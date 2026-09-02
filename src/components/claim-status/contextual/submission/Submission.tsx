import { PaperPlaneTilt } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { toneForStatus } from "@/components/ui/badgeTones";
import { submissionAttempts, submissionSummary } from "@/data/contextual";

export function Submission() {
  return (
    <ContextualSectionShell>
      <div className="flex flex-col gap-5 px-4 py-4">
        <div>
          <div className="mb-2.5 flex items-center justify-between">
            <SectionTitle title="Submission Summary" className="mb-0" />
            <StatusBadge label={submissionSummary.status} tone={toneForStatus(submissionSummary.status)} />
          </div>
          <InfoCard>
            <InfoRow label="Submission Method" value={submissionSummary.method} />
            <InfoRow label="Clearinghouse" value={submissionSummary.clearinghouse} />
            <InfoRow label="Batch ID" value={submissionSummary.batchId} />
            <InfoRow label="Submitted On" value={submissionSummary.submittedOn} isLast />
          </InfoCard>
        </div>

        <div>
          <SectionTitle title="Submission Attempts" />
          <ul className="flex flex-col gap-2">
            {submissionAttempts.map((attempt) => (
              <li key={attempt.id} className="contextual-card">
                <div className="flex items-center gap-2.5">
                  <PaperPlaneTilt size={14} className="text-ink-muted" />
                  <div>
                    <p className="contextual-card__title">{attempt.method}</p>
                    <p className="contextual-card__meta">
                      {attempt.date} &middot; {attempt.confirmationNumber}
                    </p>
                  </div>
                </div>
                <StatusBadge label={attempt.status} tone={toneForStatus(attempt.status)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContextualSectionShell>
  );
}
