import { createFileRoute } from "@tanstack/react-router"

import GeneralSettingsPage from "@/features/settings/components/GeneralSettingsPage"

export const Route = createFileRoute("/_app/settings/general")({
  component: GeneralSettingsPage,
})
