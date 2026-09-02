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

const sizeLabelClass: Record<BreadcrumbSize, string> = {
  sm: "breadcrumb__label--sm",
  md: "breadcrumb__label--md",
};

const separatorSizeClass: Record<BreadcrumbSize, string> = {
  sm: "breadcrumb__separator--sm",
  md: "breadcrumb__separator--md",
};

const iconSize: Record<BreadcrumbSize, number> = {
  sm: 12,
  md: 14,
};

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
  const labelSizeClass = sizeLabelClass[size];
  const separatorClass = separatorSizeClass[size];

  const listClassName =
    collapse === "none"
      ? "breadcrumb__list breadcrumb__list--visible"
      : "breadcrumb__list breadcrumb__list--responsive";

  const mobileClassName =
    collapse === "none"
      ? "hidden"
      : `breadcrumb__mobile breadcrumb__label ${labelSizeClass}`.trim();

  return (
    <nav
      aria-label={ariaLabel}
      className={`breadcrumb breadcrumb--${variant} ${className}`.trim()}
    >
      {activeItem ? <span className={mobileClassName}>{activeItem.label}</span> : null}

      <ol className={listClassName}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={`${item.label}-${index}`}
              className="breadcrumb__item"
              aria-current={isActive ? "page" : undefined}
            >
              {index > 0 ? (
                <CaretRight
                  size={iconSize[size]}
                  weight="regular"
                  className={`breadcrumb__separator ${separatorClass}`}
                  aria-hidden
                />
              ) : null}

              {!isActive && item.href ? (
                <a
                  href={item.href}
                  className={`breadcrumb__link breadcrumb__label ${labelSizeClass} breadcrumb__label--inactive`}
                >
                  {item.label}
                </a>
              ) : !isActive && item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`breadcrumb__link breadcrumb__label ${labelSizeClass} breadcrumb__label--inactive`}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={`breadcrumb__label ${labelSizeClass} ${
                    isActive ? "breadcrumb__label--active" : "breadcrumb__label--inactive"
                  }`.trim()}
                >
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
