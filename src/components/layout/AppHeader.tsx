import { Bell, ChatCircleText } from "@/components/icons";

interface AppHeaderProps {
  onOpenSidebar?: () => void;
}

export function AppHeader({ onOpenSidebar }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__leading">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="header-icon-btn"
        >
          <img src="/assets/icons/sidebar-toggle.svg" alt="" className="app-header__toggle-icon" />
        </button>
        <img src="/assets/savi-logo.svg" alt="SAVi Technology" className="app-header__logo" />
      </div>

      <div className="app-header__actions">
        <button type="button" aria-label="Messages" className="header-icon-btn">
          <ChatCircleText className="app-header__action-icon" size={18} weight="regular" />
        </button>
        <button type="button" aria-label="Notifications" className="header-icon-btn">
          <Bell className="app-header__action-icon" size={18} weight="regular" />
        </button>
        <div className="app-header__user-block">
          <p className="app-header__user-name">Hassan, Sajid</p>
          <p className="app-header__user-role">User</p>
        </div>
        <div className="app-header__avatar">SH</div>
      </div>
    </header>
  );
}
