import { PaperPlaneTilt } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { ContextualCard, ContextualCardMeta, ContextualCardTitle } from "@/components/ui/ContextualCard";
import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { toneForStatus } from "@/components/ui/badgeTones";
import { submissionAttempts, submissionSummary } from "@/data/contextual";

export function Submission() {
  return (
    <ContextualSectionShell>
      <div className="contextual-section">
        <div>
          <div className="contextual-section__header">
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
          <ul className="contextual-list">
            {submissionAttempts.map((attempt) => (
              <li key={attempt.id}>
                <ContextualCard>
                  <div className="contextual-card-row">
                    <PaperPlaneTilt size={14} className="submission-icon" />
                    <div>
                      <ContextualCardTitle>{attempt.method}</ContextualCardTitle>
                      <ContextualCardMeta>
                        {attempt.date} &middot; {attempt.confirmationNumber}
                      </ContextualCardMeta>
                    </div>
                  </div>
                  <StatusBadge label={attempt.status} tone={toneForStatus(attempt.status)} />
                </ContextualCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContextualSectionShell>
  );
}
