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
      className={`ml-auto shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
    />
  );
}

function TreeGuide({ isLast }: { isLast: boolean }) {
  return (
    <img
      src={isLast ? "/assets/icons/tree-l.svg" : "/assets/icons/tree-full.svg"}
      alt=""
      aria-hidden
      className="block h-[34px] w-[17px] shrink-0"
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
    <ul className="flex flex-col pl-2">
      {flatItems.map((child, index) => {
        const isLast = index === flatItems.length - 1;

        return (
          <li key={child.label} className="flex h-[34px] items-center">
            <TreeGuide isLast={isLast} />
            <button
              type="button"
              onClick={() =>
                (child.expandable || child.children?.length) && onToggleLeaf(child.label)
              }
              className={`flex h-[34px] min-w-0 flex-1 cursor-pointer items-center truncate rounded px-2 text-left text-sm font-medium leading-[22.5px] transition-colors ${
                child.active ? "text-brand-500" : "text-ink-muted hover:text-ink"
              }`}
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
          className="fixed inset-0 z-40 bg-black/40 xl:hidden"
        />
      )}

      <nav
        aria-label="Application navigation"
        className={`fixed inset-y-0 left-0 z-50 h-full shrink-0 overflow-y-auto border-r border-black/[0.04] bg-white app-scroll transition-[width,transform] duration-200 ease-in-out xl:static xl:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } xl:block ${
          isCollapsed
            ? "xl:w-[72px] xl:bg-none"
            : "w-[266px] bg-[url('/assets/img.png')] bg-size-[266px_100%] bg-left-top bg-no-repeat xl:w-[266px]"
        }`}
      >
      <div
        className={`relative flex flex-col py-2.5 ${showExpanded ? "gap-[50px] px-3" : "items-center gap-6 px-2"}`}
      >
        <div
          className={`flex w-full items-center ${showExpanded ? "h-10 justify-between" : "flex-col gap-2"}`}
        >
          <img
            src={showExpanded ? "/assets/savi-logo.svg" : "/favicon.svg"}
            alt="SAVi Technology"
            className={
              showExpanded
                ? "h-10 w-20 object-contain object-left"
                : "h-8 w-7 object-contain"
            }
          />
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#fafafa] bg-[#fafafa] p-[9px] xl:flex"
          >
            <img src="/assets/icons/sidebar-toggle.svg" alt="" className="h-[17px] w-[18px]" />
          </button>
        </div>

        <ul className={`flex w-full flex-col ${showExpanded ? "gap-3" : "items-center gap-2"}`}>
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
                  className={`flex h-[34px] w-full cursor-pointer items-center rounded-lg text-sm font-medium leading-[22.5px] transition-colors ${
                    showExpanded ? "gap-2.5 p-2 text-left" : "justify-center px-0"
                  } ${
                    isSectionActive ? "text-brand-500" : "text-ink-muted hover:text-ink"
                  }`}
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
