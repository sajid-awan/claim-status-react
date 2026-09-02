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
    <footer className="px-4">
      <div className="flex shrink-0 items-center justify-end border-t border-surface-gray-200 bg-surface-white px-3 py-3 max-lg:px-3 sm:py-3.5 lg:px-0 lg:pr-3 lg:py-3.5">
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
