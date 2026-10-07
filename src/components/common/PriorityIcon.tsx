import {
  ChevronDown,
  ChevronUp,
  ChevronsUp,
  Equal,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Priority } from "@/constants/TaskData";

const config: Record<
  Priority,
  { label: string; icon: LucideIcon; className: string }
> = {
  low: { label: "Low", icon: ChevronDown, className: "text-slate-400" },
  medium: { label: "Medium", icon: Equal, className: "text-indigo-500" },
  high: { label: "High", icon: ChevronUp, className: "text-amber-500" },
  urgent: { label: "Urgent", icon: ChevronsUp, className: "text-rose-500" },
};

interface PriorityIconProps {
  priority: Priority;
  className?: string;
}

export function PriorityIcon({ priority, className }: PriorityIconProps) {
  const { label, icon: Icon, className: color } = config[priority];
  return (
    <span title={`${label} priority`} className="inline-flex">
      <Icon
        className={cn("size-4", color, className)}
        aria-label={`${label} priority`}
      />
    </span>
  );
}
