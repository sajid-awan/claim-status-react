import { Tabs } from "@/components/ui/Tabs";

export type ClaimActionTabId = "activity" | "details" | "history";

interface ClaimActionTabsProps {
  activeTab: ClaimActionTabId;
  onChange: (tab: ClaimActionTabId) => void;
}

const tabs: { id: ClaimActionTabId; label: string }[] = [
  { id: "activity", label: "Activity" },
  { id: "details", label: "Details" },
  { id: "history", label: "History" },
];

export function ClaimActionTabs({ activeTab, onChange }: ClaimActionTabsProps) {
  return <Tabs items={tabs} activeId={activeTab} onChange={onChange} />;
}
