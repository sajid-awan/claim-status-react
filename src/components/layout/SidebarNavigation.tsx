import { CaretDown } from "@/components/icons";
import { appNavigationItems, type NavItem, type NavLeaf } from "@/data/navigation";

interface SidebarNavigationProps {
  showExpanded: boolean;
  expandedSection: string;
  expandedLeaves: Set<string>;
  onSectionClick: (item: NavItem) => void;
  onToggleLeaf: (label: string) => void;
}

function NavChevron({ expanded }: { expanded: boolean }) {
  return (
    <CaretDown
      size={18}
      weight="regular"
      aria-hidden
      className={`nav-chevron ${expanded ? "nav-chevron--expanded" : ""}`.trim()}
    />
  );
}

function TreeGuide({ isLast }: { isLast: boolean }) {
  return (
    <img
      src={isLast ? "/assets/icons/tree-l.svg" : "/assets/icons/tree-full.svg"}
      alt=""
      aria-hidden
      className="app-sidebar__tree-guide"
    />
  );
}

function flattenNavLeaves(items: NavLeaf[], expandedLeaves: Set<string>): NavLeaf[] {
  const result: NavLeaf[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children?.length && expandedLeaves.has(item.label)) result.push(...item.children);
  }
  return result;
}

function NavSubTree({
  items,
  expandedLeaves,
  onToggleLeaf,
}: {
  items: NavLeaf[];
  expandedLeaves: Set<string>;
  onToggleLeaf: (label: string) => void;
}) {
  const flatItems = flattenNavLeaves(items, expandedLeaves);

  return (
    <ul className="app-sidebar__subtree">
      {flatItems.map((child, index) => (
        <li key={child.label} className="app-sidebar__subtree-item">
          <TreeGuide isLast={index === flatItems.length - 1} />
          <button
            type="button"
            onClick={() =>
              (child.expandable || child.children?.length) && onToggleLeaf(child.label)
            }
            aria-expanded={child.expandable ? expandedLeaves.has(child.label) : undefined}
            aria-current={child.active ? "page" : undefined}
            className={`app-sidebar__leaf-btn ${
              child.active ? "app-sidebar__leaf-btn--active" : "app-sidebar__leaf-btn--idle"
            }`.trim()}
          >
            <span className="app-sidebar__label">{child.label}</span>
            {child.expandable ? (
              <NavChevron expanded={expandedLeaves.has(child.label)} />
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function SidebarNavigation({
  showExpanded,
  expandedSection,
  expandedLeaves,
  onSectionClick,
  onToggleLeaf,
}: SidebarNavigationProps) {
  return (
    <ul
      className={`app-sidebar__list ${
        showExpanded ? "app-sidebar__list--expanded" : "app-sidebar__list--collapsed"
      }`.trim()}
    >
      {appNavigationItems.map((item) => {
        const Icon = item.icon;
        const isExpanded = expandedSection === item.label;
        const isActive = item.active || item.children?.some((child) => child.active);

        return (
          <li
            key={item.label}
            className={showExpanded ? undefined : "app-sidebar__item--collapsed"}
          >
            <button
              type="button"
              onClick={() => onSectionClick(item)}
              title={showExpanded ? undefined : item.label}
              aria-label={item.label}
              aria-expanded={item.expandable ? isExpanded : undefined}
              aria-current={item.active ? "page" : undefined}
              className={`app-sidebar__item-btn ${
                showExpanded ? "app-sidebar__item-btn--expanded" : "app-sidebar__item-btn--collapsed"
              } ${isActive ? "app-sidebar__item-btn--active" : "app-sidebar__item-btn--idle"}`.trim()}
            >
              <Icon size={18} weight="regular" className="app-sidebar__item-icon" />
              {showExpanded ? (
                <>
                  <span className="app-sidebar__label app-sidebar__label--grow">{item.label}</span>
                  <NavChevron expanded={Boolean(item.expandable && isExpanded)} />
                </>
              ) : null}
            </button>

            {showExpanded && item.expandable && isExpanded && item.children ? (
              <NavSubTree
                items={item.children}
                expandedLeaves={expandedLeaves}
                onToggleLeaf={onToggleLeaf}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
