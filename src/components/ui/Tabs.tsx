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

export function Tabs<T extends string>({ items, activeId, onChange, className = "" }: TabsProps<T>) {
  return (
    <div role="tablist" aria-label="Context sections" className={`tabs ${className}`.trim()}>
      {items.map((item) => {
        const selected = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={selected ? "tabs__button tabs__button--active" : "tabs__button"}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
