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
  nextIcon = <ArrowRight size={15} />,
  nextIconPosition = "right",
  nextDisabled,
}: WorkflowFooterProps) {
  return (
    <footer className="flex shrink-0 items-center justify-end border-t border-surface-gray-200 bg-white px-3 py-3 sm:px-5 sm:py-3.5">
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
    </footer>
  );
}
