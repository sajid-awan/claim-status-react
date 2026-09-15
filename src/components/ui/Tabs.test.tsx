import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "@/components/ui/Tabs";

const items = [
  { id: "activity", label: "Activity" },
  { id: "details", label: "Details" },
  { id: "history", label: "History" },
] as const;

function TabsHarness() {
  const [activeId, setActiveId] = useState<(typeof items)[number]["id"]>("activity");
  return <Tabs items={[...items]} activeId={activeId} onChange={setActiveId} />;
}

describe("Tabs", () => {
  it("exposes the selected tab and switches on click", async () => {
    const user = userEvent.setup();
    render(<TabsHarness />);

    expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("tab", { name: "Details" }));
    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute("aria-selected", "true");
  });

  it("supports arrow, Home and End keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<TabsHarness />);

    const activity = screen.getByRole("tab", { name: "Activity" });
    activity.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Details" })).toHaveFocus();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "History" })).toHaveFocus();

    await user.keyboard("{Home}");
    expect(activity).toHaveFocus();
  });

  it("calls onChange with the selected id", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs items={[...items]} activeId="activity" onChange={onChange} />);

    await user.click(screen.getByRole("tab", { name: "History" }));
    expect(onChange).toHaveBeenCalledWith("history");
  });
});
