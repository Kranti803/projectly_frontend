import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Task } from "@/constants/TaskData"
import { LabelChip } from "@/components/common/LabelChip"
import { PriorityIcon } from "@/components/common/PriorityIcon"
import { formatDate } from "@/lib/formatDate"
import { AvatarStack } from "@/components/common/AvatarStack"

interface TaskCardProps {
  task: Task
  isDragging?: boolean
  isOverlay?: boolean
}

// Purely visual. Drag behavior lives in SortableTaskCard.
export function TaskCard({ task, isDragging, isOverlay }: TaskCardProps) {
  return (
    <div
      className={cn(
        "space-y-3 rounded-lg border bg-card p-3 shadow-sm",
        isDragging && "opacity-40",
        isOverlay && "rotate-2 shadow-lg"
      )}
    >
      <p className="text-sm font-medium leading-snug">{task.title}</p>

      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {task.labels.map((label) => (
            <LabelChip key={label.id} label={label} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PriorityIcon priority={task.priority} />
          {task.dueDate && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        {task.assignee && <AvatarStack members={[task.assignee]} size="w-6 h-6" />}
      </div>
    </div>
  )
}