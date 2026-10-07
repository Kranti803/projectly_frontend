"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DueDateFieldProps {
  id?: string
  value?: string // ISO date, e.g. "2026-11-30"
  onChange: (value: string | undefined) => void
}

export function DueDateField({ id, value, onChange }: DueDateFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        id={id}
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          onClick={() => onChange(undefined)}
          aria-label="Clear due date"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}