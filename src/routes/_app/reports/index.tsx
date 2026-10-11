import { ReportsPage } from "@/features/reports/components/ReportsPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/reports/")({
  component: ReportsPage,
})