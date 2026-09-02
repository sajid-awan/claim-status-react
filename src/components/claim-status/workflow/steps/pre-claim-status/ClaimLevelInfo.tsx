import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { InfoTimelineSection } from "@/components/ui/InfoTimeline";
import type { InfoRowData } from "@/types/claim";

interface ClaimLevelInfoProps {
  rows: InfoRowData[];
  loading?: boolean;
  error?: string | null;
}

export function ClaimLevelInfo({ rows, loading = false, error = null }: ClaimLevelInfoProps) {
  return (
    <InfoTimelineSection title="Claim Level Info">
      <InfoCard>
        {loading && <p className="py-4 text-sm text-ink-muted">Loading claim level info…</p>}
        {!loading && error && <p className="py-4 text-sm text-rose-500">{error}</p>}
        {!loading &&
          !error &&
          rows.map((row, index) => (
            <InfoRow
              key={row.label}
              label={row.label}
              value={row.value}
              isLast={index === rows.length - 1}
            />
          ))}
      </InfoCard>
    </InfoTimelineSection>
  );
}
