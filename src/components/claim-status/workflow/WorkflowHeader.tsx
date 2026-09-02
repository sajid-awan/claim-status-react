import { ArrowLeft, List, X } from "@/components/icons";

interface WorkflowHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
  onOpenContext?: () => void;
}

export function WorkflowHeader({ title, onBack, onClose, onOpenContext }: WorkflowHeaderProps) {
  return (
    <header className="workflow-header">
      <div className="workflow-header__bar">
        <div className="workflow-header__leading">
          {onOpenContext ? (
            <button
              type="button"
              aria-label="Open claim history"
              onClick={onOpenContext}
              className="workflow-header__context-btn"
            >
              <List size={20} weight="regular" />
            </button>
          ) : null}
          <button type="button" aria-label="Go back" onClick={onBack} className="workflow-header__icon-btn">
            <ArrowLeft size={24} weight="regular" className="workflow-header__icon" />
          </button>
          <h2 className="workflow-header__title">{title}</h2>
        </div>
        <button
          type="button"
          aria-label="Close claim status"
          onClick={onClose}
          className="workflow-header__icon-btn"
        >
          <X size={24} weight="regular" className="workflow-header__icon" />
        </button>
      </div>
    </header>
  );
}
