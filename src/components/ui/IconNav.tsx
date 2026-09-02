import type { Icon } from "@/components/icons";
import { IconButton, type IconButtonRadius, type IconButtonSize } from "@/components/ui/IconButton";

export type IconNavLayout = "horizontal" | "vertical" | "responsive";

export interface IconNavItem<T extends string = string> {
  id: T;
  label: string;
  icon: Icon;
}

export interface IconNavProps<T extends string = string> {
  items: IconNavItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  layout?: IconNavLayout;
  buttonSize?: IconButtonSize;
  mobileButtonSize?: IconButtonSize;
  buttonRadius?: IconButtonRadius;
  ariaLabel?: string;
  className?: string;
}

interface IconNavListProps<T extends string> extends IconNavProps<T> {
  buttonSize: IconButtonSize;
  listClassName?: string;
}

function IconNavList<T extends string>({
  items,
  activeId,
  onChange,
  buttonRadius = "md",
  buttonSize,
  ariaLabel = "Navigation",
  listClassName = "",
}: IconNavListProps<T>) {
  const iconSize = buttonSize === "sm" ? 20 : 24;

  return (
    <nav aria-label={ariaLabel} className={listClassName}>
      {items.map((item) => {
        const IconComponent = item.icon;

        return (
          <IconButton
            key={item.id}
            label={item.label}
            active={item.id === activeId}
            size={buttonSize}
            radius={buttonRadius}
            onClick={() => onChange(item.id)}
            icon={<IconComponent size={iconSize} weight="regular" />}
          />
        );
      })}
    </nav>
  );
}

export function IconNav<T extends string>({
  layout = "horizontal",
  buttonSize = "md",
  mobileButtonSize = "sm",
  ...props
}: IconNavProps<T>) {
  if (layout === "responsive") {
    return (
      <>
        <IconNavList
          {...props}
          buttonSize={mobileButtonSize}
          listClassName={`app-scroll icon-nav--horizontal md:hidden`}
        />
        <IconNavList
          {...props}
          buttonSize={buttonSize}
          listClassName="icon-nav--vertical hidden md:flex"
        />
      </>
    );
  }

  const layoutClass = layout === "horizontal" ? "app-scroll icon-nav--horizontal" : "icon-nav--vertical";

  return (
    <IconNavList
      {...props}
      buttonSize={buttonSize}
      listClassName={`${layoutClass} ${props.className ?? ""}`.trim()}
    />
  );
}
