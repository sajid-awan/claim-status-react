import { describe, expect, it } from "vitest";

import { defaultGatherInfoData, getVerifyRows } from "@/data/gatherInfo";

describe("getVerifyRows", () => {
  it("maps stored option values to user-facing labels", () => {
    const rows = getVerifyRows(defaultGatherInfoData);

    expect(rows).toContainEqual({ label: "Selected Type", value: "Not On File" });
    expect(rows).toContainEqual({
      label: "Is there a preferred method to resubmit (EDI, fax, portal, mail or email)?",
      value: "EDI",
    });
  });

  it("uses an em dash for missing required review values", () => {
    const rows = getVerifyRows({ ...defaultGatherInfoData, address: "", state: "" });

    expect(rows).toContainEqual({ label: "Address", value: "—" });
    expect(rows).toContainEqual({ label: "State", value: "—" });
  });

  it("combines an uploaded filename with linked documents", () => {
    const rows = getVerifyRows({
      ...defaultGatherInfoData,
      files: "appeal.pdf",
      linkedDocuments: ["EOB.pdf", "claim-form.pdf"],
    });

    expect(rows).toContainEqual({
      label: "Files",
      value: "appeal.pdf, EOB.pdf, claim-form.pdf",
    });
  });
});
