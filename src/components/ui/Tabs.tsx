import { SelectButton } from "primereact/selectbutton";

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
  "app-scroll inline-flex h-10 max-w-full items-center overflow-x-auto overflow-y-hidden rounded-lg border border-[var(--color-tab-track-border)] bg-[var(--color-tab-track-bg)] px-[var(--spacing-tab-x)] py-[var(--spacing-tab-y)]";

const tabButtonBaseClasses =
  "flex h-[var(--height-row-sm)] min-w-[5.5rem] shrink-0 items-center justify-center rounded-md border-0 px-2.5 text-sm leading-compact transition-colors sm:min-w-[6.25rem] sm:px-3";

export function Tabs<T extends string>({ items, activeId, onChange, className = "" }: TabsProps<T>) {
  const options = items.map((item) => ({ label: item.label, value: item.id }));

  return (
    <SelectButton
      unstyled
      value={activeId}
      options={options}
      optionLabel="label"
      optionValue="value"
      onChange={(event) => {
        if (event.value) onChange(event.value as T);
      }}
      pt={{
        root: {
          className: `${tabTrackClasses} ${className}`.trim(),
        },
        button: ({ context }: { context: { selected: boolean } }) => ({
          className: context.selected
            ? `${tabButtonBaseClasses} bg-brand-500 font-medium text-white`
            : `${tabButtonBaseClasses} bg-transparent font-normal text-ink-muted hover:text-ink`,
        }),
      }}
    />
  );
}
