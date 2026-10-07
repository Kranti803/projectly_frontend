"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  allLabel: string // text for the "no filter" option, e.g. "All statuses"
  ariaLabel: string
  className?: string
}

export function FilterSelect({
  value,
  onChange,
  options,
  allLabel,
  ariaLabel,
  className = "w-37.5",
}: FilterSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue !== null) onChange(nextValue)
      }}
    >
      <SelectTrigger className={className} aria-label={ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}