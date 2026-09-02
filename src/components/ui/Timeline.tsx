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
      <div className={`relative pl-[1.3125rem] ${className}`.trim()}>
        <span
          aria-hidden
          className="absolute bottom-0 left-1 top-[0.5625rem] w-px bg-brand-500"
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
          className="absolute -left-[1.3125rem] top-1 z-[1] size-2.5 rounded-full bg-brand-500"
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
        className="absolute left-[calc(0.4375rem-0.3125rem)] top-[10px] size-2.5 rounded-full bg-border-primary"
      />
      {!isLast ? (
        <span
          aria-hidden
          className="absolute bottom-0 left-[0.4375rem] top-[calc(10px+0.625rem+10px)] w-px bg-border-primary"
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
