import { ArrowLeft, X } from "@/components/icons";

interface WorkflowHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export function WorkflowHeader({ title, onBack, onClose }: WorkflowHeaderProps) {
  return (
    <header className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-[#D5D7DA] px-2 py-2 pr-3 max-lg:px-2 lg:px-0 lg:pr-3">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={onBack}
          className="flex size-6 shrink-0 items-center justify-center text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={24} weight="regular" className="size-6 shrink-0" />
        </button>
        <h2 className="truncate text-lg font-medium leading-6 text-ink sm:text-[20px]">{title}</h2>
      </div>
      <button
        type="button"
        aria-label="Close claim status"
        onClick={onClose}
        className="flex size-6 shrink-0 items-center justify-center text-ink-muted hover:text-ink"
      >
        <X size={24} weight="regular" className="size-6 shrink-0" />
      </button>
    </header>
  );
}
