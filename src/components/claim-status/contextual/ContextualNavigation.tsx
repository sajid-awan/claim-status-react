import { IconNav } from "@/components/ui/IconNav";
import type { IconButtonRadius } from "@/components/ui/IconButton";
import { contextualNavItems } from "@/data/contextualNav";
import type { ContextualTabId } from "@/types/workflow";

interface ContextualNavigationProps {
  activeContext: ContextualTabId;
  onChange: (id: ContextualTabId) => void;
  buttonRadius?: IconButtonRadius;
}

export function ContextualNavigation({
  activeContext,
  onChange,
  buttonRadius = "md",
}: ContextualNavigationProps) {
  return (
    <IconNav
      items={contextualNavItems}
      activeId={activeContext}
      onChange={onChange}
      layout="responsive"
      buttonRadius={buttonRadius}
      ariaLabel="Claim contextual sections"
    />
  );
}
