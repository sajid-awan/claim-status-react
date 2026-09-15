import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WorkflowProgress } from "@/components/claim-status/workflow/WorkflowProgress";

describe("WorkflowProgress", () => {
  it("identifies the current step for assistive technology", () => {
    render(<WorkflowProgress currentStep="gather-info" completedSteps={new Set(["pre-claim"])} />);

    expect(screen.getByRole("list", { name: "Claim status progress" })).toBeInTheDocument();
    expect(screen.getByText("Gather Info").closest("li")).toHaveAttribute("aria-current", "step");
  });

  it("marks completed, active and pending steps", () => {
    render(<WorkflowProgress currentStep="verify" completedSteps={new Set(["pre-claim", "gather-info"])} />);

    expect(screen.getByText("Gather Info").closest("li")).toHaveAttribute("data-status", "completed");
    expect(screen.getByText("Verify").closest("li")).toHaveAttribute("data-status", "active");
    expect(screen.getByText("Add Detail").closest("li")).toHaveAttribute("data-status", "pending");
  });
});
