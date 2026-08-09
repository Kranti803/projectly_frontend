import { createFileRoute } from "@tanstack/react-router";

const DashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">This is the main dashboard page</h1>
    </div>
  );
};

export const Route = createFileRoute("/_app/dashboard/")({
  component: DashboardPage,
});
