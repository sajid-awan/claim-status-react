import { useState } from "react";

import {
  Books,
  CaretDown,
  ClockCountdown,
  Files,
  Headset,
  ListNumbers,
  Printer,
  SlidersHorizontal,
  SquaresFour,
  Ticket,
  TreeView,
  UserGear,
  UserRectangle,
  type Icon,
} from "@/components/icons";

interface NavLeaf {
  label: string;
  active?: boolean;
  expandable?: boolean;
  children?: NavLeaf[];
}

interface NavItem {
  label: string;
  icon: Icon;
  expandable?: boolean;
  active?: boolean;
  children?: NavLeaf[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: SquaresFour },
  { label: "Patient Management", icon: UserRectangle },
  { label: "System Management", icon: SlidersHorizontal },
  { label: "Profile Management", icon: UserGear },
  { label: "Job Management", icon: ClockCountdown },
  { label: "Task Management", icon: ListNumbers },
  {
    label: "Claim Management",
    icon: Files,
    expandable: true,
    active: true,
    children: [
      { label: "Dashboard" },
      { label: "Rules", expandable: true },
      { label: "Unmapped Rule Opportunity" },
      {
        label: "Claims",
        active: true,
        children: [
          { label: "All Claims" },
          { label: "Host Sync Claims" },
          { label: "Pre-Processed Tasks" },
        ],
      },
    ],
  },
  { label: "Coding Management", icon: TreeView },
  { label: "Ticket Management", icon: Ticket },
  { label: "Fax Management", icon: Printer },
  { label: "Customer Service", icon: Headset },
  { label: "SAVi IQ", icon: Books },
];

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

function flattenNavLeaves(
  items: NavLeaf[],
  expandedLeaves: Set<string>,
): NavLeaf[] {
  const result: NavLeaf[] = [];

  for (const item of items) {
    result.push(item);
    if (item.children?.length && expandedLeaves.has(item.label)) {
      result.push(...item.children);
    }
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
      {flatItems.map((child, index) => {
        const isLast = index === flatItems.length - 1;

        return (
          <li key={child.label} className="app-sidebar__subtree-item">
            <TreeGuide isLast={isLast} />
            <button
              type="button"
              onClick={() =>
                (child.expandable || child.children?.length) && onToggleLeaf(child.label)
              }
              className={`app-sidebar__leaf-btn ${
                child.active ? "app-sidebar__leaf-btn--active" : "app-sidebar__leaf-btn--idle"
              }`.trim()}
            >
              <span className="truncate">{child.label}</span>
              {child.expandable && (
                <NavChevron expanded={expandedLeaves.has(child.label)} />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AppSidebar({ mobileOpen = false, onMobileClose }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const showExpanded = !isCollapsed || mobileOpen;
  const [expanded, setExpanded] = useState<string>("Claim Management");
  const [expandedLeaves, setExpandedLeaves] = useState<Set<string>>(new Set(["Claims"]));

  const toggleLeaf = (label: string) => {
    setExpandedLeaves((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleSectionClick = (item: NavItem) => {
    if (isCollapsed && !mobileOpen) {
      setIsCollapsed(false);
      if (item.expandable) setExpanded(item.label);
      return;
    }

    if (item.expandable) {
      setExpanded(expanded === item.label ? "" : item.label);
    }
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onMobileClose}
          className="app-sidebar__overlay"
        />
      )}

      <nav
        aria-label="Application navigation"
        className={`app-scroll app-sidebar ${
          mobileOpen ? "app-sidebar--open" : "app-sidebar--closed-mobile"
        } ${isCollapsed ? "app-sidebar--collapsed" : "app-sidebar--expanded"}`.trim()}
      >
        <div
          className={`app-sidebar__inner ${
            showExpanded ? "app-sidebar__inner--expanded" : "app-sidebar__inner--collapsed"
          }`.trim()}
        >
          <div
            className={`app-sidebar__brand-row ${
              showExpanded ? "app-sidebar__brand-row--expanded" : "app-sidebar__brand-row--collapsed"
            }`.trim()}
          >
            <img
              src={showExpanded ? "/assets/savi-logo.svg" : "/favicon.svg"}
              alt="SAVi Technology"
              className={
                showExpanded ? "app-sidebar__logo--expanded" : "app-sidebar__logo--collapsed"
              }
            />
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed}
              className="app-sidebar__toggle"
            >
              <img src="/assets/icons/sidebar-toggle.svg" alt="" className="app-sidebar__toggle-icon" />
            </button>
          </div>

          <ul
            className={`app-sidebar__list ${
              showExpanded ? "app-sidebar__list--expanded" : "app-sidebar__list--collapsed"
            }`.trim()}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expanded === item.label;
              const isSectionActive = item.active || item.children?.some((c) => c.active);

              return (
                <li key={item.label} className={showExpanded ? undefined : "w-full"}>
                  <button
                    type="button"
                    onClick={() => handleSectionClick(item)}
                    title={showExpanded ? undefined : item.label}
                    aria-label={item.label}
                    className={`app-sidebar__item-btn ${
                      showExpanded ? "app-sidebar__item-btn--expanded" : "app-sidebar__item-btn--collapsed"
                    } ${
                      isSectionActive ? "app-sidebar__item-btn--active" : "app-sidebar__item-btn--idle"
                    }`.trim()}
                  >
                    <Icon size={18} weight="regular" className="shrink-0" />
                    {showExpanded && (
                      <>
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        <NavChevron expanded={Boolean(item.expandable && isExpanded)} />
                      </>
                    )}
                  </button>

                  {showExpanded && item.expandable && isExpanded && item.children && (
                    <NavSubTree
                      items={item.children}
                      expandedLeaves={expandedLeaves}
                      onToggleLeaf={toggleLeaf}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
