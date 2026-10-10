import { format, parse } from "date-fns";
import type { Task } from "@/constants/TaskData"
import type { CalendarEvent } from "@/features/calendar/types/calendar.types";
const DAY_FORMAT = "yyyy-MM-dd"

// Due dates are plain dates. Parsing them as local dates (not new Date("2026-10-12"),
// which is read as UTC) keeps each task on the right day in every timezone.
export function parseDueDate(iso: string) {
  return parse(iso, DAY_FORMAT, new Date())
}

export function toDueDate(date: Date) {
  return format(date, DAY_FORMAT)
}

// Tasks without a due date have nowhere to go on a calendar, so they return null.
export function taskToEvent(task: Task): CalendarEvent | null {
  if (!task.dueDate) return null
  const day = parseDueDate(task.dueDate)
  return { id: task.id, title: task.title, start: day, end: day, allDay: true, resource: task }
}