"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuickAddTaskProps {
  onAdd: (title: string) => void
  onCancel: () => void
}

export function QuickAddTask({ onAdd, onCancel }: QuickAddTaskProps) {
  const [title, setTitle] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle("")
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Task title"
        aria-label="New task title"
        className="bg-card"
      />
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={!title.trim()}>
          Add task
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}