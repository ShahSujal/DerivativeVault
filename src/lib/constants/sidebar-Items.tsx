import {
  DraftingCompass,
  Flame,
  Skull,
  Zap,
} from "lucide-react";
export const sideBarItems = [
  {
    icon: <Zap className="h-4 w-4" />,
    label: "Dashboard",
    link: "/dashboard",
  },
  // { icon: <BarChart2 className="h-4 w-4" />, label: "Statistics", link: "/statistics" },
  { icon: <Flame className="h-4 w-4" />, label: "Mint", link: "/mint" },
  {
    icon: <DraftingCompass className="h-4 w-4" />,
    label: "Exercise",
    link: "/exercise",
  },
  {
    icon: <Skull className="h-4 w-4" />,
    label: "Position List",
    link: "/positionlist",
  },
];
