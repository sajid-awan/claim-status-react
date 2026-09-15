import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RadioField, RadioGroup } from "@/components/ui/Radio";

describe("Radio controls", () => {
  it("associates the visible label and emits the selected value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup aria-label="Delivery method">
        <RadioField
          inputId="delivery-fax"
          name="delivery"
          label="Fax"
          value="fax"
          onChange={onChange}
        />
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "Fax" }));
    expect(onChange).toHaveBeenCalledWith("fax");
  });

  it("prevents interaction when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioField
        inputId="disabled-option"
        name="delivery"
        label="Disabled option"
        value="disabled"
        disabled
        onChange={onChange}
      />,
    );

    await user.click(screen.getByText("Disabled option"));
    expect(screen.getByRole("radio", { name: "Disabled option" })).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });
});
