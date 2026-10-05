import DashboardPage from "@/features/dashboard/components/DashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardPage />;
}
