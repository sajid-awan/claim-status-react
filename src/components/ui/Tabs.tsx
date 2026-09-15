import { useRef, type KeyboardEvent } from "react";

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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % items.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + items.length) % items.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextItem = items[nextIndex];
    if (!nextItem) return;
    onChange(nextItem.id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div role="tablist" aria-label="Context sections" className={`tabs ${className}`.trim()}>
      {items.map((item, index) => {
        const selected = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`context-tab-${item.id}`}
            aria-controls={`context-panel-${item.id}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            className={selected ? "tabs__button tabs__button--active" : "tabs__button"}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
