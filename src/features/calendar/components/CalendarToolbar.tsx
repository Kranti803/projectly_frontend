import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navigate, Views, type ToolbarProps, type View } from "react-big-calendar"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { CalendarEvent } from "@/features/calendar/types/calendar.types"

const viewOptions: { value: View; label: string }[] = [
  { value: Views.MONTH, label: "Month" },
  { value: Views.WEEK, label: "Week" },
  { value: Views.AGENDA, label: "Agenda" },
]

// Replaces react-big-calendar's default toolbar (passed in through `components`).
export function CalendarToolbar({ label, view, onNavigate, onView }: ToolbarProps<CalendarEvent>) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate(Navigate.TODAY)}>
          Today
        </Button>
        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-r-none"
            onClick={() => onNavigate(Navigate.PREVIOUS)}
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-l-none border-l-0"
            onClick={() => onNavigate(Navigate.NEXT)}
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <h2 className="ml-1 text-lg font-semibold tracking-tight" aria-live="polite">
          {label}
        </h2>
      </div>

      <ToggleGroup
        variant="outline"
        value={[view]}
        onValueChange={(values) => {
          const nextView = viewOptions.find((option) => option.value === values[0])?.value
          if (nextView) {
            onView(nextView)
          }
        }}
        aria-label="Calendar view"
      >
        {viewOptions.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} className="px-3 text-sm">
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}