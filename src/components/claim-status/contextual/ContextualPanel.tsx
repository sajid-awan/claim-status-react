import { useState } from "react";

import { ContextualNavigation } from "@/components/claim-status/contextual/ContextualNavigation";
import { ContextualContent } from "@/components/claim-status/contextual/ContextualContent";
import { Tabs } from "@/components/ui/Tabs";
import type { ContextualTabId, QuickContextTabId } from "@/types/workflow";

interface ContextualPanelProps {
  activeContext: ContextualTabId;
  onChangeContext: (id: ContextualTabId) => void;
}

const quickTabs: { id: QuickContextTabId; label: string }[] = [
  { id: "claim-action", label: "Claim Action" },
  { id: "submission", label: "Submission" },
  { id: "fax", label: "Fax" },
];

export function ContextualPanel({ activeContext, onChangeContext }: ContextualPanelProps) {
  const [quickTab, setQuickTab] = useState<QuickContextTabId>("claim-action");

  return (
    <section
      aria-label="Claim contextual information"
      className="flex h-full w-full min-w-0 flex-col max-lg:h-auto max-lg:overflow-visible md:flex-1 md:flex-row lg:h-full lg:overflow-hidden"
    >
      <ContextualNavigation activeContext={activeContext} onChange={onChangeContext} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col max-lg:overflow-visible md:border-l md:border-surface-gray-200 md:py-3 md:pl-3 lg:overflow-hidden">
        <div className="mb-2 shrink-0 overflow-x-auto pt-2 max-lg:px-0 md:pt-0">
          <Tabs items={quickTabs} activeId={quickTab} onChange={setQuickTab} />
        </div>

        <ContextualContent quickTab={quickTab} />
      </div>
    </section>
  );
}
