import { createFileRoute } from "@tanstack/react-router"

import RolesPage from "@/features/settings/components/RolesPage"

export const Route = createFileRoute("/_app/settings/roles/")({
  component: RolesPage,
})
