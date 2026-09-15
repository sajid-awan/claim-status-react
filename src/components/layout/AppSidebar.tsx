import { useState } from "react";

import { SidebarNavigation } from "@/components/layout/SidebarNavigation";
import type { NavItem } from "@/data/navigation";

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AppSidebar({ mobileOpen = false, onMobileClose }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState("Claim Management");
  const [expandedLeaves, setExpandedLeaves] = useState<Set<string>>(new Set(["Claims"]));
  const showExpanded = !isCollapsed || mobileOpen;

  function toggleLeaf(label: string) {
    setExpandedLeaves((previous) => {
      const next = new Set(previous);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function handleSectionClick(item: NavItem) {
    if (isCollapsed && !mobileOpen) {
      setIsCollapsed(false);
      if (item.expandable) setExpandedSection(item.label);
      return;
    }

    if (item.expandable) {
      setExpandedSection(expandedSection === item.label ? "" : item.label);
    }
  }

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onMobileClose}
          className="app-sidebar__overlay"
        />
      ) : null}

      <nav
        aria-label="Application navigation"
        className={`app-scroll app-sidebar ${
          mobileOpen ? "app-sidebar--open" : "app-sidebar--closed-mobile"
        } ${isCollapsed && !mobileOpen ? "app-sidebar--collapsed" : "app-sidebar--expanded"}`.trim()}
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
              className={showExpanded ? "app-sidebar__logo--expanded" : "app-sidebar__logo--collapsed"}
            />
            <button
              type="button"
              onClick={() => setIsCollapsed((previous) => !previous)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed}
              className="app-sidebar__toggle"
            >
              <img src="/assets/icons/sidebar-toggle.svg" alt="" className="app-sidebar__toggle-icon" />
            </button>
          </div>

          <SidebarNavigation
            showExpanded={showExpanded}
            expandedSection={expandedSection}
            expandedLeaves={expandedLeaves}
            onSectionClick={handleSectionClick}
            onToggleLeaf={toggleLeaf}
          />
        </div>
      </nav>
    </>
  );
}
