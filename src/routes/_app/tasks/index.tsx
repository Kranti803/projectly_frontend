import TasksPage from "@/features/tasks/components/TaskPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TasksPage />;
}
