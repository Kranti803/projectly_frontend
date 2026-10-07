import { Badge } from "@/components/ui/badge"
import { statusLabels, type TaskStatus } from "@/constants/TaskData"
import { cn } from "@/lib/utils"

const styles: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  in_progress: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
  in_review: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  done: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge className={cn("border-transparent font-medium", styles[status])}>
      {statusLabels[status]}
    </Badge>
  )
}