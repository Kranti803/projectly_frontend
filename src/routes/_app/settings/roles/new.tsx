import { createFileRoute } from "@tanstack/react-router"

import NewRolePage from "@/features/settings/components/NewRolePage"

export const Route = createFileRoute("/_app/settings/roles/new")({
  component: NewRolePage,
})
