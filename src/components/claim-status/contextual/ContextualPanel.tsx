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

const QUICK_TAB_CONTEXTS = new Set<ContextualTabId>(["claim-action", "submission", "fax"]);

function isQuickTabContext(id: ContextualTabId): id is QuickContextTabId {
  return QUICK_TAB_CONTEXTS.has(id);
}

export function ContextualPanel({ activeContext, onChangeContext }: ContextualPanelProps) {
  const showQuickTabs = isQuickTabContext(activeContext);

  return (
    <section
      aria-label="Claim contextual information"
      className="flex h-full w-full min-w-0 flex-col max-lg:h-auto md:flex-1 md:flex-row lg:h-full lg:overflow-hidden"
    >
      <ContextualNavigation activeContext={activeContext} onChange={onChangeContext} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden md:border-l md:border-surface-gray-200 md:py-3 md:pl-3">
        {showQuickTabs ? (
          <div className="mb-2 shrink-0 overflow-x-auto overflow-y-hidden pt-2 md:pt-0">
            <Tabs
              items={quickTabs}
              activeId={activeContext}
              onChange={(id) => onChangeContext(id)}
            />
          </div>
        ) : null}

        <ContextualContent activeContext={activeContext} />
      </div>
    </section>
  );
}
