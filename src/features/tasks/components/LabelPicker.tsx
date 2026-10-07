"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { TaskLabel } from "@/constants/TaskData"
import { LabelChip } from "@/components/common/LabelChip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface LabelPickerProps {
  selected: TaskLabel[]
  available: TaskLabel[]
  onChange: (labels: TaskLabel[]) => void
}

export function LabelPicker({ selected, available, onChange }: LabelPickerProps) {
  const isSelected = (label: TaskLabel) => selected.some((l) => l.id === label.id)

  function toggle(label: TaskLabel) {
    onChange(isSelected(label) ? selected.filter((l) => l.id !== label.id) : [...selected, label])
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {selected.map((label) => (
        <LabelChip key={label.id} label={label} />
      ))}

      <Popover>
        <PopoverTrigger>
          <Button variant="outline" size="sm" className="h-6 gap-1 px-2 text-xs">
            <Plus className="size-3" />
            {selected.length === 0 ? "Add label" : "Edit"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-52 space-y-1 p-2">
          {available.map((label) => (
            <label
              key={label.id}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
            >
              <Checkbox checked={isSelected(label)} onCheckedChange={() => toggle(label)} />
              <LabelChip label={label} />
            </label>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}