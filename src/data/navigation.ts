import {
  Books,
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

export interface NavLeaf {
  label: string;
  active?: boolean;
  expandable?: boolean;
  children?: NavLeaf[];
}

export interface NavItem {
  label: string;
  icon: Icon;
  expandable?: boolean;
  active?: boolean;
  children?: NavLeaf[];
}

export const appNavigationItems: NavItem[] = [
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
