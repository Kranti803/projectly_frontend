import { notFound } from "@tanstack/react-router";
import { projects } from "@/constants/ProjectData";
import { getTasksForProject } from "@/constants/TaskData";
import { ProjectHeader } from "./ProjectHeader";
import { KanbanBoard } from "./KanbanBoard";

export default function ProjectDetailPage({ projectId }: { projectId: string }) {
  // TODO: replace with real fetches.
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    throw notFound();
  }

  const tasks = getTasksForProject(project.id);

  return (
    <div className="mx-auto max-w-350 space-y-6">
      <ProjectHeader project={project} />
      <KanbanBoard projectId={project.id} initialTasks={tasks} members={project.members} />
    </div>
  );
}
