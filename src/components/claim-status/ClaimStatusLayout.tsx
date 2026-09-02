import { useEffect, type ReactNode } from "react";
import { X } from "@/components/icons";

interface ClaimStatusLayoutProps {
  contextual: ReactNode;
  workflow: ReactNode;
  isContextualOpen: boolean;
  onContextualOpenChange: (open: boolean) => void;
}

export function ClaimStatusLayout({
  contextual,
  workflow,
  isContextualOpen,
  onContextualOpenChange,
}: ClaimStatusLayoutProps) {
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isContextualOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isContextualOpen]);

  return (
    <div className="claim-status-layout">
      <div
        className={`claim-status-layout__contextual ${
          isContextualOpen ? "claim-status-layout__contextual--open" : ""
        }`.trim()}
      >
        <div className="claim-status-layout__contextual-inner">{contextual}</div>
        <button
          type="button"
          onClick={() => onContextualOpenChange(false)}
          aria-label="Close claim details"
          className="claim-status-layout__close-btn"
        >
          <X size={16} />
        </button>
      </div>

      <div className="claim-status-layout__divider-v" aria-hidden />

      <div className="claim-status-layout__workflow">{workflow}</div>

      <div className="claim-status-layout__divider-h" aria-hidden />
    </div>
  );
}
