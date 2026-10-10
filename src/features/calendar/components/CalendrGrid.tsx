import { Calendar, Views, type View } from "react-big-calendar"
import withDragAndDropModule, {
  type EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
// Must come after the library CSS so the overrides win.
import "@/features/calendar/calendar.css"

import { CalendarToolbar } from "@/features/calendar/components/CalendarToolbar"
import type { CalendarEvent } from "@/features/calendar/types/calendar.types"
import { cn } from "@/lib/utils"
import { localizer } from "@/lib/localizer"

// Created once, outside the component, so it isn't rebuilt (and remounted) on every render.
// If TypeScript complains about the Calendar argument, cast it:
//   withDragAndDrop<CalendarEvent>(Calendar as React.ComponentType<CalendarProps<CalendarEvent>>)
const withDragAndDrop = (
  withDragAndDropModule as unknown as {
    default: typeof withDragAndDropModule
  }
).default
const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar)

const views = [Views.MONTH, Views.WEEK, Views.AGENDA]

interface CalendarGridProps {
  events: CalendarEvent[]
  date: Date
  view: View
  onNavigate: (date: Date) => void
  onView: (view: View) => void
  onSelectEvent: (event: CalendarEvent) => void
  onEventDrop: (args: EventInteractionArgs<CalendarEvent>) => void
}

// Colour comes from the CSS classes in calendar.css (priority) and fades finished tasks.
function eventPropGetter(event: CalendarEvent) {
  return {
    className: cn(
      `pm-priority-${event.resource.priority}`,
      event.resource.status === "done" && "pm-event-done"
    ),
  }
}

export function CalendarGrid({
  events,
  date,
  view,
  onNavigate,
  onView,
  onSelectEvent,
  onEventDrop,
}: CalendarGridProps) {
  return (
    <div className="h-[calc(100vh-18rem)] min-h-[560px]">
      <DnDCalendar
        localizer={localizer}
        events={events}
        date={date}
        view={view}
        views={views}
        onNavigate={onNavigate}
        onView={onView}
        onSelectEvent={onSelectEvent}
        onEventDrop={onEventDrop}
        eventPropGetter={eventPropGetter}
        components={{ toolbar: CalendarToolbar }}
        tooltipAccessor={(event) => event.title}
        resizable={false}
        popup
      />
    </div>
  )
}