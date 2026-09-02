import { CaretRight } from "@/components/icons";

export type BreadcrumbVariant = "brand" | "neutral";
export type BreadcrumbSize = "sm" | "md";
export type BreadcrumbCollapse = "responsive" | "none";

export interface BreadcrumbItem {
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  collapse?: BreadcrumbCollapse;
  className?: string;
  ariaLabel?: string;
}

const sizeClasses: Record<
  BreadcrumbSize,
  { label: string; separator: string; iconSize: number }
> = {
  sm: {
    label: "truncate text-xs font-medium leading-tight",
    separator: "size-3 shrink-0 text-ink-subtle",
    iconSize: 12,
  },
  md: {
    label: "truncate text-sm font-medium leading-tight",
    separator: "size-3.5 shrink-0 text-ink-subtle",
    iconSize: 14,
  },
};

const variantClasses: Record<
  BreadcrumbVariant,
  { active: string; inactive: string; mobile: string }
> = {
  brand: {
    active: "text-brand-500",
    inactive: "text-ink/40 hover:text-ink",
    mobile: "text-brand-500",
  },
  neutral: {
    active: "text-ink",
    inactive: "text-ink-muted hover:text-ink",
    mobile: "text-ink",
  },
};

const linkReset = "border-0 bg-transparent p-0 cursor-pointer text-left transition-colors";

function resolveActiveIndex(items: BreadcrumbItem[]) {
  const explicitIndex = items.findIndex((item) => item.active);
  return explicitIndex >= 0 ? explicitIndex : items.length - 1;
}

export function Breadcrumb({
  items,
  variant = "brand",
  size = "md",
  collapse = "responsive",
  className = "",
  ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  const activeIndex = resolveActiveIndex(items);
  const activeItem = items[activeIndex];
  const colors = variantClasses[variant];
  const sizing = sizeClasses[size];

  const labelClassName = sizing.label;
  const inactiveClassName = colors.inactive;
  const activeClassName = `${labelClassName} ${colors.active}`;

  const listClassName =
    collapse === "none"
      ? "flex min-w-0 list-none items-center gap-1 overflow-hidden p-0"
      : "hidden min-w-0 list-none items-center gap-1 overflow-hidden p-0 sm:flex";

  const mobileClassName =
    collapse === "none"
      ? "hidden"
      : `min-w-0 truncate sm:hidden ${labelClassName} ${colors.mobile}`;

  return (
    <nav aria-label={ariaLabel} className={`flex min-w-0 items-center overflow-hidden ${className}`.trim()}>
      {activeItem ? <span className={mobileClassName}>{activeItem.label}</span> : null}

      <ol className={listClassName}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-1"
              aria-current={isActive ? "page" : undefined}
            >
              {index > 0 ? (
                <CaretRight
                  size={sizing.iconSize}
                  weight="regular"
                  className={sizing.separator}
                  aria-hidden
                />
              ) : null}

              {!isActive && item.href ? (
                <a href={item.href} className={`${labelClassName} ${inactiveClassName} ${linkReset}`}>
                  {item.label}
                </a>
              ) : !isActive && item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`${labelClassName} ${inactiveClassName} ${linkReset}`}
                >
                  {item.label}
                </button>
              ) : (
                <span className={isActive ? activeClassName : `${labelClassName} ${inactiveClassName}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
