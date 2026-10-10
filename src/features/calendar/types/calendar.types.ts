import type { Task } from "@/constants/TaskData"

// The shape react-big-calendar expects, plus the original task in `resource`.
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay: true
  resource: Task
}