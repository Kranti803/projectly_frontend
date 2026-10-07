"use client"

import type { Task } from "@/constants/TaskData"
import { getTaskDetail, type TaskDetailData } from "@/constants/TaskDetailData"
import { useState } from "react"


// Shared by the Kanban board and the Tasks list.
// `tasks` is the host's live task list, so edits made in the panel show up immediately.
export function useTaskPanel(tasks: Task[]) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  // Detail data (description, subtasks, ...) is kept here so it survives closing the panel.
  const [store, setStore] = useState<Record<string, TaskDetailData>>({})

  // selectedId stays set while the panel animates closed, so the content doesn't vanish early.
  const selectedTask = tasks.find((t) => t.id === selectedId) ?? null
  const detail = selectedTask ? (store[selectedTask.id] ?? getTaskDetail(selectedTask.id)) : null

  function openTask(task: Task) {
    setSelectedId(task.id)
    setOpen(true)
  }

  function updateDetail(updater: (current: TaskDetailData) => TaskDetailData) {
    if (!selectedTask) return
    const id = selectedTask.id
    setStore((prev) => ({ ...prev, [id]: updater(prev[id] ?? getTaskDetail(id)) }))
  }

  return { selectedTask, detail, open, onOpenChange: setOpen, openTask, updateDetail }
}