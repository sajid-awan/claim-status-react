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
      <div className={`relative pl-timeline-indent ${className}`.trim()}>
        <span
          aria-hidden
          className="absolute bottom-0 left-1 top-timeline-line-top w-px bg-brand-500"
        />
        {children}
      </div>
    );
  }

  return <ul className={`py-3 sm:py-4 ${className}`.trim()}>{children}</ul>;
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
      <section className={`relative pb-2.5 last:pb-0 ${className}`.trim()}>
        <span
          aria-hidden
          className="absolute -left-timeline-indent top-1 z-step size-2.5 rounded-full bg-brand-500"
        />
        {title ? (
          <h3 className="mb-2 text-base font-medium leading-snug text-brand-500">{title}:</h3>
        ) : null}
        {children}
      </section>
    );
  }

  return (
    <li className={`relative pb-6 pl-6 sm:pl-8 ${className}`.trim()}>
      <span
        aria-hidden
        className="absolute left-timeline-dot-offset top-timeline-dot size-2.5 rounded-full bg-border-primary"
      />
      {!isLast ? (
        <span
          aria-hidden
          className="absolute bottom-0 left-timeline-dot-x top-timeline-connector-top w-px bg-border-primary"
        />
      ) : null}
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
