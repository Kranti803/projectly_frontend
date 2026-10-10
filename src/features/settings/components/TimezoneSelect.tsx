"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { timezones } from "@/constants/Timezones"

interface TimezoneSelectProps {
  id?: string
  value: string
  onChange: (value: string) => void
}

export function TimezoneSelect({ id, value, onChange }: TimezoneSelectProps) {
  return (
    <Select value={value} onValueChange={(nextValue) => nextValue !== null && onChange(nextValue)}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {timezones.map((tz) => (
          <SelectItem key={tz.value} value={tz.value}>
            {tz.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}