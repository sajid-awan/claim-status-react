import { InfoCard } from "@/components/ui/InfoCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { mockClaimDetailFields } from "@/data/activities";

export function DetailsTab() {
  return (
    <div className="px-4 py-3">
      <InfoCard>
        {mockClaimDetailFields.map((field, index) => (
          <InfoRow
            key={field.label}
            label={field.label}
            value={field.value}
            isLast={index === mockClaimDetailFields.length - 1}
          />
        ))}
      </InfoCard>
    </div>
  );
}
