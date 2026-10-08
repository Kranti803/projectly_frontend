"use client"

import { cn } from "@/lib/utils"

interface ColorPickerProps {
  colors: string[]
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ colors, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          aria-label={`Use color ${color}`}
          aria-pressed={value === color}
          className={cn(
            "size-8 rounded-full ring-offset-2 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === color && "ring-2 ring-foreground"
          )}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}