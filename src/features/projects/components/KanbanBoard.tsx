"use client"

import { useState } from "react"
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { columns, type Task } from "@/constants/TaskData"
import type { Member } from "@/constants/ProjectData"
import { useKanbanBoard } from "../hooks/useKanbanBoard"
import { useTaskPanel } from "@/features/tasks/hooks/useTaskPannel"
import { labelCatalog } from "@/constants/TaskDetailData"
import { TaskCard } from "@/features/tasks/components/TaskCard"
import { TaskDetailSheet } from "@/features/tasks/components/TaskDetailSheet"
import { KanbanColumn } from "./KanbanColumn"



// REPLACES the previous version. New props: projectId and members.
// The onSelectTask prop is gone because the board now opens the panel itself.
interface KanbanBoardProps {
  projectId: string
  initialTasks: Task[]
  members: Member[] // who can be assigned (the project's members)
}

export function KanbanBoard({ projectId, initialTasks, members }: KanbanBoardProps) {
  const { tasks, tasksByStatus, moveOver, reorder, addTask, updateTask, findTask } = useKanbanBoard(
    initialTasks,
    projectId
  )
  const panel = useTaskPanel(tasks)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // A small distance threshold lets plain clicks open a task instead of starting a drag.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragStart(event: DragStartEvent) {
    setActiveTask(findTask(String(event.active.id)) ?? null)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return
    moveOver(String(active.id), String(over.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return
    reorder(String(active.id), String(over.id))
  }

  return (
    <>
      <DndContext
        id="kanban-board" // stable id avoids dnd-kit hydration warnings in Next.js
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)}
      >
        <div className="flex items-start gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasksByStatus[column.id]}
              onAddTask={addTask}
              onSelectTask={panel.openTask}
            />
          ))}
        </div>

        <DragOverlay>{activeTask ? <TaskCard task={activeTask} isOverlay /> : null}</DragOverlay>
      </DndContext>

      <TaskDetailSheet
        open={panel.open}
        onOpenChange={panel.onOpenChange}
        task={panel.selectedTask}
        detail={panel.detail}
        members={members}
        labels={labelCatalog}
        onUpdateTask={updateTask}
        onDetailChange={panel.updateDetail}
      />
    </>
  )
}