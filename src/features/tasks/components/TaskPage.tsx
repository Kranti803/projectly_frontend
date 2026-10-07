import { getAllTasks } from "@/constants/TaskData";
import { TasksView } from "./TaskView";
import { projects } from "@/constants/ProjectData";

export default function TasksPage() {
  // TODO: fetch tasks and projects on the server here and pass them down.
  return <TasksView initialTasks={getAllTasks()} projects={projects} />
}