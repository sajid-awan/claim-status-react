import type { ReactNode } from "react";

import { ArrowRight } from "@/components/icons";
import { PrimaryButton } from "@/components/ui/Button";

interface WorkflowFooterProps {
  onNext?: () => void;
  nextLabel?: string;
  nextIcon?: ReactNode;
  nextIconPosition?: "left" | "right";
  nextDisabled?: boolean;
  nextType?: "button" | "submit";
}

export function WorkflowFooter({
  onNext,
  nextLabel = "Next",
  nextIcon = <ArrowRight size={20} weight="bold" />,
  nextIconPosition = "left",
  nextDisabled,
  nextType = "button",
}: WorkflowFooterProps) {
  return (
    <footer className="workflow-footer">
      <div className="workflow-footer__bar">
        {onNext || nextType === "submit" ? (
          <PrimaryButton
            type={nextType}
            onClick={nextType === "button" ? onNext : undefined}
            disabled={nextDisabled}
            icon={nextIcon}
            iconPosition={nextIconPosition}
          >
            {nextLabel}
          </PrimaryButton>
        ) : null}
      </div>
    </footer>
  );
}
