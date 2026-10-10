import { projects } from "@/constants/ProjectData"
import { getAllTasks } from "@/constants/TaskData"
import { CalendarView } from "@/features/calendar/components/CalendarView"

export function CalendarPage() {
  // TODO: replace the mock data with TanStack Query fetches for tasks and projects.
  return <CalendarView initialTasks={getAllTasks()} projects={projects} />
}