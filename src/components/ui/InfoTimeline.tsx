import type { ReactNode } from "react";

interface InfoTimelineProps {
  children: ReactNode;
}

export function InfoTimeline({ children }: InfoTimelineProps) {
  return (
    <div className="relative pl-[21px] before:absolute before:left-1 before:top-[9px] before:bottom-0 before:w-px before:bg-brand-500 before:content-['']">
      {children}
    </div>
  );
}

interface InfoTimelineSectionProps {
  title: string;
  children: ReactNode;
}

export function InfoTimelineSection({ title, children }: InfoTimelineSectionProps) {
  return (
    <section className="relative pb-1 last:pb-0 before:absolute before:-left-[21px] before:top-1 before:z-[1] before:size-2.5 before:rounded-full before:bg-brand-500 before:content-['']">
      <h3 className="mb-2 text-base font-medium leading-[19px] text-brand-500">{title}:</h3>
      {children}
    </section>
  );
}
