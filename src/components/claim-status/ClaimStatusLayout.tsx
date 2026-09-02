import { useState, type ReactNode } from "react";
import { SidebarSimple, X } from "@/components/icons";

interface ClaimStatusLayoutProps {
  contextual: ReactNode;
  workflow: ReactNode;
}

export function ClaimStatusLayout({ contextual, workflow }: ClaimStatusLayoutProps) {
  const [isContextualOpen, setIsContextualOpen] = useState(false);

  return (
    <div className="relative flex flex-col max-lg:gap-4 md:gap-0 lg:min-h-0 lg:flex-1 lg:flex-row lg:gap-0 lg:overflow-hidden">
      <button
        type="button"
        onClick={() => setIsContextualOpen(true)}
        aria-label="Open claim details"
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-surface-gray-200 bg-surface-white text-ink-muted md:hidden"
      >
        <SidebarSimple size={16} weight="regular" />
      </button>

      <div className="order-1 flex min-w-0 flex-col max-lg:overflow-visible max-lg:px-2 lg:order-3 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:px-0">
        {workflow}
      </div>

      <div
        className="order-2 mx-4 hidden h-px shrink-0 bg-surface-gray-200 md:block lg:hidden"
        aria-hidden
      />

      <div
        className={`order-3 hidden min-w-0 max-lg:px-4 md:flex md:flex-col lg:order-1 lg:h-full lg:min-h-0 lg:w-[var(--width-contextual)] lg:flex-none lg:overflow-hidden lg:px-0 ${
          isContextualOpen ? "flex max-md:absolute max-md:inset-0 max-md:z-40 max-md:flex-col max-md:bg-surface-white" : ""
        }`}
      >
        <div className="min-h-0 min-w-0 flex-1 pt-10 max-lg:overflow-visible md:pt-0 lg:overflow-hidden">
          {contextual}
        </div>
        <button
          type="button"
          onClick={() => setIsContextualOpen(false)}
          aria-label="Close claim details"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-white text-ink-muted md:hidden"
        >
          <X size={16} />
        </button>
      </div>

      <div
        className="order-4 hidden w-px shrink-0 self-stretch bg-surface-gray-200 lg:order-2 lg:block"
        aria-hidden
      />
    </div>
  );
}
