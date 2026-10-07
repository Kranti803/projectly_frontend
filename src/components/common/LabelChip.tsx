import type { LabelColor, TaskLabel } from "@/constants/TaskData"
import { cn } from "@/lib/utils"

const colors: Record<LabelColor, string> = {
  indigo: "bg-indigo-100 text-indigo-700",
  sky: "bg-sky-100 text-sky-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  violet: "bg-violet-100 text-violet-700",
}

export function LabelChip({ label }: { label: TaskLabel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium",
        colors[label.color]
      )}
    >
      {label.name}
    </span>
  )
}