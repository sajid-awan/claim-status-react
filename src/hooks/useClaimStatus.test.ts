import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { mockClaim } from "@/data/claims";
import { useClaimStatus } from "@/hooks/useClaimStatus";

describe("useClaimStatus", () => {
  it("starts at Gather Info with Pre-Claim completed", () => {
    const { result } = renderHook(() => useClaimStatus(mockClaim));

    expect(result.current.currentStep).toBe("gather-info");
    expect(result.current.completedSteps).toEqual(new Set(["pre-claim"]));
  });

  it("advances the workflow and records the completed step", () => {
    const { result } = renderHook(() => useClaimStatus(mockClaim));

    act(() => result.current.goToNextStep());
    expect(result.current.currentStep).toBe("verify");
    expect(result.current.completedSteps.has("gather-info")).toBe(true);
  });

  it("moves back and clears completion from that point forward", () => {
    const { result } = renderHook(() => useClaimStatus(mockClaim));

    act(() => result.current.goToNextStep());
    act(() => result.current.goToPreviousStep());

    expect(result.current.currentStep).toBe("gather-info");
    expect(result.current.completedSteps).toEqual(new Set(["pre-claim"]));
  });
});
