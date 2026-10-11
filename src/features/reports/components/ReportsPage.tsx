import { projects } from "@/constants/ProjectData"
import { getAllTasks } from "@/constants/TaskData"
import { ReportsView } from "./ReportsView"

export function ReportsPage() {
  // TODO: replace the mock data with a TanStack Query call to the reports endpoints.
  return <ReportsView tasks={getAllTasks()} projects={projects} />
}