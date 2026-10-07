import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { isOverdue } from "@/utils/isOverDue"
import type { Task } from "@/constants/TaskData"
import type { Project } from "@/constants/ProjectData"
import { formatDate } from "@/lib/formatDate"
import { StatusBadge } from "./StatusBadge"
import { LabelChip } from "@/components/common/LabelChip"
import { PriorityIcon } from "@/components/common/PriorityIcon"
import { AvatarStack } from "@/components/common/AvatarStack"

interface TaskTableRowProps {
  task: Task
  project?: Pick<Project, "name" | "color">
  onSelect?: (task: Task) => void
}

export function TaskTableRow({ task, project, onSelect }: TaskTableRowProps) {
  const overdue = isOverdue(task)

  return (
    <TableRow className="cursor-pointer" onClick={() => onSelect?.(task)}>
      <TableCell className="max-w-[320px]">
        {/* The button makes the row keyboard accessible; its click bubbles to the row. */}
        <button type="button" className="block text-left font-medium hover:underline">
          {task.title}
        </button>
        {task.labels.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {task.labels.map((label) => (
              <LabelChip key={label.id} label={label} />
            ))}
          </div>
        )}
      </TableCell>

      <TableCell>
        {project ? (
          <span className="flex items-center gap-2 text-sm">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: project.color }}
              aria-hidden
            />
            {project.name}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Unknown</span>
        )}
      </TableCell>

      <TableCell>
        <StatusBadge status={task.status} />
      </TableCell>

      <TableCell>
        <span className="flex items-center gap-1.5 text-sm capitalize">
          <PriorityIcon priority={task.priority} />
          {task.priority}
        </span>
      </TableCell>

      <TableCell>
        {task.assignee ? (
          <span className="flex items-center gap-2 text-sm">
            <AvatarStack members={[task.assignee]} size="w-6 h-6" />
            {task.assignee.name}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Unassigned</span>
        )}
      </TableCell>

      <TableCell
        className={cn("whitespace-nowrap text-sm", overdue ? "font-medium text-rose-600" : "text-muted-foreground")}
      >
        {task.dueDate ? formatDate(task.dueDate) : "No due date"}
      </TableCell>
    </TableRow>
  )
}