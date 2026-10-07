"use client"

import type { Task } from "@/constants/TaskData"
import { TaskCard } from "@/features/tasks/components/TaskCard"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"



interface SortableTaskCardProps {
  task: Task
  onSelect?: (task: Task) => void
}

export function SortableTaskCard({ task, onSelect }: SortableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="cursor-grab touch-none active:cursor-grabbing"
      onClick={() => onSelect?.(task)}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  )
}