import {
  Clock,
  FileDoc,
  FileMagnifyingGlass,
  HandHeart,
  Note,
  PhoneCall,
  type Icon,
} from "@/components/icons";
import type { ContextualNavItem } from "@/types/workflow";

export const contextualNavItems: (ContextualNavItem & { icon: Icon })[] = [
  { id: "claim-action", label: "Claim Action", icon: FileMagnifyingGlass },
  { id: "submission", label: "Submission", icon: Note },
  { id: "fax", label: "Fax", icon: Clock },
  { id: "documents", label: "Documents", icon: FileDoc },
  { id: "users", label: "Users", icon: HandHeart },
  { id: "calls", label: "Calls", icon: PhoneCall },
];
