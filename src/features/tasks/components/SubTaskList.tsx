"use client"

import { useState, type FormEvent } from "react"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Subtask } from "@/constants/TaskDetailData"

interface SubtaskListProps {
  subtasks: Subtask[]
  onChange: (subtasks: Subtask[]) => void
}

export function SubtaskList({ subtasks, onChange }: SubtaskListProps) {
  const [title, setTitle] = useState("")
  const doneCount = subtasks.filter((s) => s.done).length
  const percent = subtasks.length === 0 ? 0 : Math.round((doneCount / subtasks.length) * 100)

  function toggle(id: string) {
    onChange(subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s)))
  }

  function remove(id: string) {
    onChange(subtasks.filter((s) => s.id !== id))
  }

  function handleAdd(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onChange([...subtasks, { id: `s${Date.now()}`, title: trimmed, done: false }])
    setTitle("")
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Subtasks</h3>
        {subtasks.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {doneCount}/{subtasks.length} completed
          </span>
        )}
      </div>

      {subtasks.length > 0 && <Progress value={percent} />}

      <ul className="space-y-1">
        {subtasks.map((subtask) => (
          <li key={subtask.id} className="group flex items-center gap-3 rounded-md px-1 py-1">
            <Checkbox
              id={`subtask-${subtask.id}`}
              checked={subtask.done}
              onCheckedChange={() => toggle(subtask.id)}
            />
            <label
              htmlFor={`subtask-${subtask.id}`}
              className={cn(
                "flex-1 cursor-pointer text-sm",
                subtask.done && "text-muted-foreground line-through"
              )}
            >
              {subtask.title}
            </label>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-6 opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
              onClick={() => remove(subtask.id)}
              aria-label={`Remove subtask ${subtask.title}`}
            >
              <X className="size-3.5" />
            </Button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a subtask"
          aria-label="New subtask"
        />
        <Button type="submit" variant="outline" size="icon" disabled={!title.trim()} aria-label="Add subtask">
          <Plus className="size-4" />
        </Button>
      </form>
    </div>
  )
}