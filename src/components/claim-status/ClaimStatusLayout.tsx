import { useState, type ReactNode } from "react";
import { SidebarSimple, X } from "@/components/icons";

interface ClaimStatusLayoutProps {
  contextual: ReactNode;
  workflow: ReactNode;
}

export function ClaimStatusLayout({ contextual, workflow }: ClaimStatusLayoutProps) {
  const [isContextualOpen, setIsContextualOpen] = useState(false);

  return (
    <div className="claim-status-layout">
      <button
        type="button"
        onClick={() => setIsContextualOpen(true)}
        aria-label="Open claim details"
        className="claim-status-layout__open-btn"
      >
        <SidebarSimple size={16} weight="regular" />
      </button>

      <div className="claim-status-layout__workflow">{workflow}</div>

      <div className="claim-status-layout__divider-h" aria-hidden />

      <div
        className={`claim-status-layout__contextual ${
          isContextualOpen ? "claim-status-layout__contextual--open" : ""
        }`.trim()}
      >
        <div className="claim-status-layout__contextual-inner">{contextual}</div>
        <button
          type="button"
          onClick={() => setIsContextualOpen(false)}
          aria-label="Close claim details"
          className="claim-status-layout__close-btn"
        >
          <X size={16} />
        </button>
      </div>

      <div className="claim-status-layout__divider-v" aria-hidden />
    </div>
  );
}
