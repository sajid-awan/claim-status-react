import { ContextualNavigation } from "@/components/claim-status/contextual/ContextualNavigation";
import { ContextualContent } from "@/components/claim-status/contextual/ContextualContent";
import { SectionTitle } from "@/components/ui/SectionTitle";
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

const sectionTitles: Partial<Record<ContextualTabId, string>> = {
  documents: "Documents",
  users: "Users",
  calls: "Calls",
};

function isQuickTab(id: ContextualTabId): id is QuickContextTabId {
  return id === "claim-action" || id === "submission" || id === "fax";
}

export function ContextualPanel({ activeContext, onChangeContext }: ContextualPanelProps) {
  const showQuickTabs = isQuickTab(activeContext);
  const sectionTitle = sectionTitles[activeContext];

  return (
    <section
      aria-label="Claim contextual information"
      className="flex h-full w-full min-w-0 flex-col max-lg:h-auto max-lg:overflow-visible md:flex-1 md:flex-row lg:h-full lg:overflow-hidden"
    >
      <ContextualNavigation activeContext={activeContext} onChange={onChangeContext} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden md:border-l md:border-surface-gray-200 md:py-3 md:pl-3">
        <div className="mb-2 shrink-0 pt-2 md:pt-0">
          {showQuickTabs ? (
            <Tabs
              items={quickTabs}
              activeId={activeContext}
              onChange={(id) => onChangeContext(id)}
            />
          ) : sectionTitle ? (
            <SectionTitle title={sectionTitle} className="mb-0 px-1" />
          ) : null}
        </div>

        <ContextualContent activeContext={activeContext} />
      </div>
    </section>
  );
}
