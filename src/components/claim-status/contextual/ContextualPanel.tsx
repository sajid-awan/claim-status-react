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
    <section aria-label="Claim contextual information" className="contextual-panel">
      <ContextualNavigation activeContext={activeContext} onChange={onChangeContext} />

      <div className="contextual-panel__body">
        {showQuickTabs ? (
          <div className="contextual-panel__tabs">
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
