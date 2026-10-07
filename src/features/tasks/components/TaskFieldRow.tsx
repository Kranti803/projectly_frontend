import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"

interface TaskFieldRowProps {
  label: string
  htmlFor?: string
  children: ReactNode
}

export function TaskFieldRow({ label, htmlFor, children }: TaskFieldRowProps) {
  return (
    <div className="grid grid-cols-[100px_1fr] items-center gap-3">
      <Label htmlFor={htmlFor} className="text-sm font-normal text-muted-foreground">
        {label}
      </Label>
      <div className="min-w-0">{children}</div>
    </div>
  )
}