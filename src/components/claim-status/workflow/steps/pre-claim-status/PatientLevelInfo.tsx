import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { TimelineItem } from "@/components/ui/Timeline";
import type { InfoRowData } from "@/types/claim";

interface PatientLevelInfoProps {
  rows: InfoRowData[];
  loading?: boolean;
  error?: string | null;
}

export function PatientLevelInfo({ rows, loading = false, error = null }: PatientLevelInfoProps) {
  return (
    <TimelineItem variant="info" title="Patient Level Info">
      <InfoCard>
        {loading && <p className="info-card__loading">Loading patient level info…</p>}
        {!loading && error && <p className="info-card__error">{error}</p>}
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
    </TimelineItem>
  );
}
