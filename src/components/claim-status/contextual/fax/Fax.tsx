import { Printer } from "@/components/icons";

import { ContextualSectionShell } from "@/components/claim-status/contextual/ContextualSectionShell";
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
      <div className="flex flex-col gap-5 px-4 py-4">
        <div>
          <div className="mb-2.5 flex items-center justify-between">
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
          <p className="contextual-note">{faxSummary.coverNote}</p>
        </div>

        <SecondaryButton icon={<Printer size={18} />} iconPosition="left" className="self-start">
          Resend Fax
        </SecondaryButton>
      </div>
    </ContextualSectionShell>
  );
}
