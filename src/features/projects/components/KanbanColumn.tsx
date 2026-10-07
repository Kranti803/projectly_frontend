"use client"

import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus } from "@/constants/TaskData"
import { SortableTaskCard } from "./SortableTaskCard"
import { QuickAddTask } from "./QuickAddTask"

interface KanbanColumnProps {
  id: TaskStatus
  title: string
  tasks: Task[]
  onAddTask: (status: TaskStatus, title: string) => void
  onSelectTask?: (task: Task) => void
}

export function KanbanColumn({ id, title, tasks, onAddTask, onSelectTask }: KanbanColumnProps) {
  const [adding, setAdding] = useState(false)
  // Registers the column itself as a drop target, so empty columns accept cards.
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <section
      aria-label={title}
      className="flex w-72 shrink-0 flex-col rounded-xl bg-muted/70 p-3"
    >
      <header className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{title}</h2>
          <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => setAdding(true)}
          aria-label={`Add task to ${title}`}
        >
          <Plus className="size-4" />
        </Button>
      </header>

      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-30 flex-1 flex-col gap-2 rounded-lg transition-colors",
          isOver && "bg-primary/5"
        )}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} onSelect={onSelectTask} />
          ))}
        </SortableContext>

        {adding && (
          <QuickAddTask
            onAdd={(taskTitle) => onAddTask(id, taskTitle)}
            onCancel={() => setAdding(false)}
          />
        )}
      </div>
    </section>
  )
}