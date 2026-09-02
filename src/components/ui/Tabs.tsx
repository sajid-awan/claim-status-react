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
          className: `inline-flex h-10 max-w-full items-center overflow-x-auto rounded-lg border border-[rgba(35,31,32,0.03)] bg-[rgba(35,31,32,0.02)] px-[9px] py-[5px] app-scroll ${className}`,
        },
        button: ({ context }: { context: { selected: boolean } }) => ({
          className: `flex h-[30px] min-w-[5.5rem] shrink-0 cursor-pointer items-center justify-center rounded-md border-0 px-2.5 text-sm leading-[14px] transition-colors sm:min-w-[100px] sm:px-3 ${
            context.selected
              ? "bg-brand-500 font-medium text-white"
              : "bg-transparent font-normal text-ink-muted hover:text-ink"
          }`,
        }),
      }}
    />
  );
}
