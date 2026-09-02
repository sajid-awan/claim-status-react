import type { ReactNode } from "react";

interface StatusTransitionRowProps {
  from: string;
  to: string;
  fromIcon?: ReactNode;
  toIcon?: ReactNode;
}

export function StatusTransitionRow({ from, to, fromIcon, toIcon }: StatusTransitionRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-dot gap-y-1.5">
      <span className="status-pill status-pill--from">
        {fromIcon ?? <span className="size-2 shrink-0 rounded-full bg-ink" aria-hidden="true" />}
        {from}
      </span>
      <span className="text-body-sm font-normal leading-body text-ink/40">to</span>
      <span className="status-pill status-pill--to">
        {toIcon ?? <span className="size-2 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />}
        {to}
      </span>
    </div>
  );
}
