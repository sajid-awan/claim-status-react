import type { ReactNode } from "react";

import { ArrowRight } from "@/components/icons";
import { PrimaryButton } from "@/components/ui/Button";

interface WorkflowFooterProps {
  onNext?: () => void;
  nextLabel?: string;
  nextIcon?: ReactNode;
  nextIconPosition?: "left" | "right";
  nextDisabled?: boolean;
}

export function WorkflowFooter({
  onNext,
  nextLabel = "Next",
  nextIcon = <ArrowRight size={18} weight="bold" />,
  nextIconPosition = "left",
  nextDisabled,
}: WorkflowFooterProps) {
  return (
    <footer className="workflow-footer">
      <div className="workflow-footer__bar">
        {onNext ? (
          <PrimaryButton
            onClick={onNext}
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
