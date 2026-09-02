import {
  FileDoc,
  FileMagnifyingGlass,
  HandHeart,
  PhoneCall,
  PaperPlaneTilt,
  Printer,
  type Icon,
} from "@/components/icons";
import type { ContextualNavItem } from "@/types/workflow";

export const contextualNavItems: (ContextualNavItem & { icon: Icon })[] = [
  { id: "claim-action", label: "Claim Action", icon: FileMagnifyingGlass },
  { id: "submission", label: "Submission", icon: PaperPlaneTilt },
  { id: "fax", label: "Fax", icon: Printer },
  { id: "documents", label: "Documents", icon: FileDoc },
  { id: "users", label: "Users", icon: HandHeart },
  { id: "calls", label: "Calls", icon: PhoneCall },
];
