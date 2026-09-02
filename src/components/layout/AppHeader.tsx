import { Bell, ChatCircleText } from "@/components/icons";

const headerIconClass = "text-ink";

interface AppHeaderProps {
  onOpenSidebar?: () => void;
}

export function AppHeader({ onOpenSidebar }: AppHeaderProps) {
  return (
    <header className="flex h-header w-full min-w-0 shrink-0 items-center gap-2 overflow-hidden border-b border-border-hairline bg-white px-3 sm:gap-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2 xl:hidden">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-surface-body bg-surface-body"
        >
          <img src="/assets/icons/sidebar-toggle.svg" alt="" className="h-toggle-icon w-toggle-icon" />
        </button>
        <img
          src="/assets/savi-logo.svg"
          alt="SAVi Technology"
          className="h-7 max-w-[4.5rem] shrink object-contain object-left sm:h-8 sm:max-w-[5rem]"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 md:gap-5">
        <button
          type="button"
          aria-label="Messages"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-surface-body bg-surface-body"
        >
          <ChatCircleText className={headerIconClass} size={18} weight="regular" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-surface-body bg-surface-body"
        >
          <Bell className={headerIconClass} size={18} weight="regular" />
        </button>
        <div className="hidden min-w-0 flex-col gap-[0.4375rem] sm:flex md:w-[6.4375rem]">
          <p className="truncate text-base leading-4 text-ink">Hassan, Sajid</p>
          <p className="truncate text-body-sm leading-compact text-ink/40">User</p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-body-sm leading-6 text-white sm:h-10 sm:w-10 sm:text-base">
          SH
        </div>
      </div>
    </header>
  );
}
