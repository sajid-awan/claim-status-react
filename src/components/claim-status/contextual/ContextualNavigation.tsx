import {
  Clock,
  FileDoc,
  FileMagnifyingGlass,
  HandHeart,
  Note,
  PhoneCall,
  type Icon,
} from "@/components/icons";
import { IconButton } from "@/components/ui/IconButton";
import type { ContextualNavItem, ContextualTabId } from "@/types/workflow";

const navItems: (ContextualNavItem & { icon: Icon })[] = [
  { id: "claim-action", label: "Claim Action", icon: FileMagnifyingGlass },
  { id: "submission", label: "Submission", icon: Note },
  { id: "fax", label: "Fax", icon: Clock },
  { id: "documents", label: "Documents", icon: FileDoc },
  { id: "users", label: "Users", icon: HandHeart },
  { id: "calls", label: "Calls", icon: PhoneCall },
];

interface ContextualNavigationProps {
  activeContext: ContextualTabId;
  onChange: (id: ContextualTabId) => void;
}

function NavButtons({
  activeContext,
  onChange,
  buttonClassName = "",
  iconSize = 24,
}: {
  activeContext: ContextualTabId;
  onChange: (id: ContextualTabId) => void;
  buttonClassName?: string;
  iconSize?: number;
}) {
  return (
    <>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <IconButton
            key={item.id}
            label={item.label}
            active={item.id === activeContext}
            onClick={() => onChange(item.id)}
            className={buttonClassName}
            icon={<IconComponent size={iconSize} weight="regular" />}
          />
        );
      })}
    </>
  );
}

export function ContextualNavigation({ activeContext, onChange }: ContextualNavigationProps) {
  return (
    <>
      <nav
        aria-label="Claim contextual sections"
        className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-surface-gray-200 px-2 py-1.5 thin-scroll md:hidden"
      >
        <NavButtons
          activeContext={activeContext}
          onChange={onChange}
          buttonClassName="h-9 w-9 shrink-0"
          iconSize={20}
        />
      </nav>

      <nav
        aria-label="Claim contextual sections"
        className="hidden w-12 shrink-0 flex-col items-center gap-2 self-stretch px-1 py-1 md:flex"
      >
        <NavButtons activeContext={activeContext} onChange={onChange} />
      </nav>
    </>
  );
}
