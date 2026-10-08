import TeamsPage from "@/features/teams/components/TeamsPage"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/teams/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TeamsPage />
}
