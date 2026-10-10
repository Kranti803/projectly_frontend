import { createFileRoute } from "@tanstack/react-router"

import { EditRolePage } from "@/features/settings/components/EditRolePage"

export const Route = createFileRoute("/_app/settings/roles/$roleId")({
  component: RoleRoute,
})

function RoleRoute() {
  const { roleId } = Route.useParams()
  return <EditRolePage roleId={roleId} />
}
