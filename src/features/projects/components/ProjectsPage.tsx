import { projects } from "@/constants/ProjectData";
import { ProjectsView } from "./ProjectsView";


export default function ProjectsPage() {
  // TODO: fetch projects on the server here and pass them down.
  return <ProjectsView initialProjects={projects} />
}