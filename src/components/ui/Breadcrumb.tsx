interface BreadcrumbItem {
  label: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const activeItem = items.find((item) => item.active) ?? items[items.length - 1];

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 overflow-hidden">
      <span className="truncate text-sm font-medium leading-[17px] text-brand-500 sm:hidden">
        {activeItem?.label}
      </span>

      <div className="hidden min-w-0 items-center gap-1 overflow-hidden sm:flex">
        {items.map((item, index) => (
          <span key={item.label} className="flex min-w-0 items-center gap-1">
            {index > 0 && (
              <img
                src="/assets/icons/chevron-right.svg"
                alt=""
                className="h-3.5 w-3.5 shrink-0"
              />
            )}
            <span
              className={`truncate text-sm font-medium leading-[17px] ${
                item.active ? "text-brand-500" : "text-ink/40"
              }`}
            >
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </nav>
  );
}
