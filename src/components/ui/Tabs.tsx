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
          className: `contextual-tabs app-scroll ${className}`.trim(),
        },
        button: ({ context }: { context: { selected: boolean } }) => ({
          className: context.selected
            ? "contextual-tabs__button contextual-tabs__button--active"
            : "contextual-tabs__button contextual-tabs__button--inactive",
        }),
      }}
    />
  );
}
