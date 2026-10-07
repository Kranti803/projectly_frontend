"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { columns, statusLabels, type TaskStatus } from "@/constants/TaskData"

interface StatusSelectProps {
  id?: string
  value: TaskStatus
  onChange: (value: TaskStatus) => void
}

export function StatusSelect({ id, value, onChange }: StatusSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as TaskStatus)}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {columns.map((column) => (
          <SelectItem key={column.id} value={column.id}>
            {statusLabels[column.id]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}