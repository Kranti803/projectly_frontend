import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/projects/$projectId")({
  component: RouteComponent,
  notFoundComponent: () => (
    <div className="rounded-xl border border-dashed p-8 text-center">
      <h1 className="text-lg font-semibold">Project not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The project you are looking for does not exist.
      </p>
    </div>
  ),
});

function RouteComponent() {
  const { projectId } = Route.useParams();

  return <ProjectDetailPage projectId={projectId} />;
}
