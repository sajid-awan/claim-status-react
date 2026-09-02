import type { ReactNode } from "react";

interface StatusTransitionRowProps {
  from: string;
  to: string;
  fromIcon?: ReactNode;
  toIcon?: ReactNode;
}

export function StatusTransitionRow({ from, to, fromIcon, toIcon }: StatusTransitionRowProps) {
  const fromGap = fromIcon ? "gap-0.5" : "gap-1";
  const toGap = toIcon ? "gap-0.5" : "gap-1";

  return (
    <div className="flex flex-wrap items-center gap-x-[3.5px] gap-y-1.5">
      <span
        className={`inline-flex h-7 items-center ${fromGap} rounded-full border border-surface-gray-100 bg-surface-gray-100 py-[7px] pl-[9px] pr-[9px] font-sans text-sm font-medium leading-[14px] text-ink`}
      >
        {fromIcon ?? <span className="size-2 shrink-0 rounded-full bg-ink" aria-hidden="true" />}
        {from}
      </span>
      <span className="font-sans text-sm font-normal leading-[21px] text-ink/40">to</span>
      <span
        className={`inline-flex h-7 items-center ${toGap} rounded-full border border-surface-cream bg-surface-cream py-[7px] pl-[9px] pr-[9px] font-sans text-sm font-medium leading-[14px] text-brand-500`}
      >
        {toIcon ?? <span className="size-2 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />}
        {to}
      </span>
    </div>
  );
}
