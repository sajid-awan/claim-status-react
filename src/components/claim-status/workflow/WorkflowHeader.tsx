import { ArrowLeft, X } from "@/components/icons";

interface WorkflowHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export function WorkflowHeader({ title, onBack, onClose }: WorkflowHeaderProps) {
  return (
    <header className="workflow-header">
      <div className="workflow-header__bar">
        <div className="workflow-header__leading">
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
