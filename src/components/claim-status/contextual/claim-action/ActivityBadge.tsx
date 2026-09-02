import { ArrowsClockwise, CloudCheck, UserCircleDashed, type Icon } from "@/components/icons";

import { Chip, type ChipRadius, type ChipSize, type ChipTone } from "@/components/ui/Chip";
import type { ActivitySource } from "@/types/claim";

interface ActivityBadgeProps {
  source: ActivitySource;
  size?: ChipSize;
  radius?: ChipRadius;
  className?: string;
}

const activitySourceConfig: Record<
  ActivitySource,
  { tone: ChipTone; icon: Icon; iconClassName?: string }
> = {
  User: { tone: "green", icon: UserCircleDashed, iconClassName: "text-success" },
  "Host Sync": { tone: "blue", icon: CloudCheck },
  System: { tone: "gray", icon: ArrowsClockwise },
};

export function ActivityBadge({
  source,
  size = "md",
  radius = "full",
  className = "",
}: ActivityBadgeProps) {
  const { tone, icon: IconComponent, iconClassName = "" } = activitySourceConfig[source];

  return (
    <Chip
      label={source}
      tone={tone}
      size={size}
      radius={radius}
      className={className}
      icon={
        <IconComponent
          size={16}
          weight="regular"
          className={`shrink-0 ${iconClassName}`.trim()}
        />
      }
    />
  );
}
