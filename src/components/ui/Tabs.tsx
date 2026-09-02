interface TabItem<T extends string> {
  id: T;
  label: string;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
}

const tabTrackClasses =
  "inline-flex h-10 max-w-full items-center gap-0.5 overflow-x-auto overflow-y-hidden rounded-lg border border-tab-track-border bg-tab-track-bg px-tab-x py-tab-y";

const tabButtonBaseClasses =
  "flex h-row-sm min-w-tab-min shrink-0 cursor-pointer items-center justify-center rounded-md border-0 px-2.5 text-sm leading-compact transition-colors sm:min-w-tab-min-md sm:px-3";

export function Tabs<T extends string>({ items, activeId, onChange, className = "" }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label="Context sections" className={`${tabTrackClasses} ${className}`.trim()}>
      {items.map((item) => {
        const selected = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={
              selected
                ? `${tabButtonBaseClasses} bg-brand-500 font-medium text-white`
                : `${tabButtonBaseClasses} bg-transparent font-normal text-ink-muted hover:text-ink`
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
