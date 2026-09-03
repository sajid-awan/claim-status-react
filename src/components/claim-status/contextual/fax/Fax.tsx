import { Printer } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
import { ContextualNote } from "@/components/ui/ContextualCard";
import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { toneForStatus } from "@/components/ui/badgeTones";
import { SecondaryButton } from "@/components/ui/Button";
import { faxSummary } from "@/data/contextual";

export function Fax() {
  return (
    <ContextualSectionShell>
      <div className="contextual-section">
        <div>
          <div className="contextual-section__header">
            <SectionTitle title="Fax Details" className="mb-0" />
            <StatusBadge label={faxSummary.status} tone={toneForStatus(faxSummary.status)} />
          </div>
          <InfoCard>
            <InfoRow label="Fax Number" value={faxSummary.faxNumber} />
            <InfoRow label="Recipient" value={faxSummary.recipient} />
            <InfoRow label="Sent On" value={faxSummary.sentOn} />
            <InfoRow label="Pages" value={String(faxSummary.pages)} isLast />
          </InfoCard>
        </div>

        <div>
          <SectionTitle title="Cover Note" />
          <ContextualNote>{faxSummary.coverNote}</ContextualNote>
        </div>

        <SecondaryButton icon={<Printer size={20} />} iconPosition="left" className="btn--self-start">
          Resend Fax
        </SecondaryButton>
      </div>
    </ContextualSectionShell>
  );
}
