import TeamDetailPage from '@/features/teams/components/TeamDetailPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/teams/$teamId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { teamId } = Route.useParams()

  return <TeamDetailPage teamId={teamId} />
}
