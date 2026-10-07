"use client"

import { useMemo, useState } from "react"
import { arrayMove } from "@dnd-kit/sortable"
import { columns, type Task, type TaskStatus } from "@/constants/TaskData"


const isColumnId = (id: string): id is TaskStatus => columns.some((c) => c.id === id)

// REPLACES the previous version. New: `tasks` is returned and `updateTask` is added.
export function useKanbanBoard(initialTasks: Task[], projectId: string) {
  const [tasks, setTasks] = useState(initialTasks)

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      in_review: [],
      done: [],
    }
    for (const task of tasks) map[task.status].push(task)
    return map
  }, [tasks])

  // Called while a card is dragged over another column or card.
  // Re-homes the card straight away so the column previews the drop.
  function moveOver(activeId: string, overId: string) {
    setTasks((prev) => {
      const active = prev.find((t) => t.id === activeId)
      if (!active) return prev

      const overStatus = isColumnId(overId)
        ? overId
        : prev.find((t) => t.id === overId)?.status
      if (!overStatus || overStatus === active.status) return prev

      const without = prev.filter((t) => t.id !== activeId)
      const moved = { ...active, status: overStatus }
      const overIndex = without.findIndex((t) => t.id === overId)

      // Over a card: insert before it. Over an empty column area: append.
      const insertAt = overIndex === -1 ? without.length : overIndex
      return [...without.slice(0, insertAt), moved, ...without.slice(insertAt)]
    })
  }

  // Called on drop: reorders within a column.
  function reorder(activeId: string, overId: string) {
    if (activeId === overId) return
    setTasks((prev) => {
      const from = prev.findIndex((t) => t.id === activeId)
      const to = prev.findIndex((t) => t.id === overId)
      if (from === -1 || to === -1) return prev
      if (prev[from].status !== prev[to].status) return prev
      return arrayMove(prev, from, to)
    })
  }

  // TODO: replace with an API call (POST /tasks).
  function addTask(status: TaskStatus, title: string) {
    const task: Task = {
      id: `t${Date.now()}`,
      projectId,
      title,
      status,
      priority: "medium",
      labels: [],
    }
    setTasks((prev) => [...prev, task])
  }

  // TODO: replace with an API call (PATCH /tasks/:id).
  function updateTask(id: string, patch: Partial<Task>) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  function findTask(id: string) {
    return tasks.find((t) => t.id === id)
  }

  return { tasks, tasksByStatus, moveOver, reorder, addTask, updateTask, findTask }
}