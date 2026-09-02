import type { ReactNode } from "react";

export type TimelineVariant = "activity" | "info";

const rootClasses: Record<TimelineVariant, { tag: "ul" | "div"; className: string }> = {
  activity: { tag: "ul", className: "py-3 sm:py-4" },
  info: { tag: "div", className: "info-timeline" },
};

const itemClasses: Record<TimelineVariant, { tag: "li" | "section"; className: string }> = {
  activity: { tag: "li", className: "activity-item" },
  info: { tag: "section", className: "info-timeline__section" },
};

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
}

export function Timeline({ variant, children, className = "" }: TimelineProps) {
  const { tag: Tag, className: variantClassName } = rootClasses[variant];

  return <Tag className={`${variantClassName} ${className}`.trim()}>{children}</Tag>;
}

export function TimelineItem({ variant, children, className = "", title }: TimelineItemProps) {
  const { tag: Tag, className: variantClassName } = itemClasses[variant];

  return (
    <Tag className={`${variantClassName} ${className}`.trim()}>
      {variant === "info" && title ? (
        <h3 className="mb-2 text-base font-medium leading-snug text-brand-500">{title}:</h3>
      ) : null}
      {children}
    </Tag>
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
