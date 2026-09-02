import type { ReactNode } from "react";

export type TimelineVariant = "activity" | "info";

export interface TimelineProps {
  variant: TimelineVariant;
  children: ReactNode;
  className?: string;
}

export interface TimelineItemProps {
  variant: TimelineVariant;
  children: ReactNode;
  className?: string;
  title?: string;
  isLast?: boolean;
}

export function Timeline({ variant, children, className = "" }: TimelineProps) {
  if (variant === "info") {
    return (
      <div className={`timeline--info ${className}`.trim()}>
        <span aria-hidden className="timeline--info-line" />
        {children}
      </div>
    );
  }

  return <ul className={`timeline--activity ${className}`.trim()}>{children}</ul>;
}

export function TimelineItem({
  variant,
  children,
  className = "",
  title,
  isLast = false,
}: TimelineItemProps) {
  if (variant === "info") {
    return (
      <section className={`timeline-item--info mb-3 ${className}`.trim()}>
        <span aria-hidden className="timeline-item--info-dot" />
        {title ? <h3 className="timeline-item--info-title">{title}:</h3> : null}
        {children}
      </section>
    );
  }

  return (
    <li className={`timeline-item--activity ${className}`.trim()}>
      <span aria-hidden className="timeline-item--activity-dot" />
      {!isLast ? <span aria-hidden className="timeline-item--activity-connector" /> : null}
      {children}
    </li>
  );
}

export function ActivityTimeline({ children, className }: Omit<TimelineProps, "variant">) {
  return (
    <Timeline variant="activity" className={className}>
      {children}
    </Timeline>
  );
}

export function InfoTimelineRoot({ children, className }: Omit<TimelineProps, "variant">) {
  return (
    <Timeline variant="info" className={className}>
      {children}
    </Timeline>
  );
}
