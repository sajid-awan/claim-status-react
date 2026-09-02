export {
  ActivityTimeline,
  InfoTimelineRoot,
  Timeline,
  TimelineItem,
  type TimelineItemProps,
  type TimelineProps,
  type TimelineVariant,
} from "@/components/ui/Timeline";

import { InfoTimelineRoot, TimelineItem } from "@/components/ui/Timeline";
import type { ReactNode } from "react";

interface InfoTimelineProps {
  children: ReactNode;
}

interface InfoTimelineSectionProps {
  title: string;
  children: ReactNode;
}

/** @deprecated Prefer `<Timeline variant="info">` */
export function InfoTimeline({ children }: InfoTimelineProps) {
  return <InfoTimelineRoot>{children}</InfoTimelineRoot>;
}

/** @deprecated Prefer `<TimelineItem variant="info" title="...">` */
export function InfoTimelineSection({ title, children }: InfoTimelineSectionProps) {
  return (
    <TimelineItem variant="info" title={title}>
      {children}
    </TimelineItem>
  );
}
