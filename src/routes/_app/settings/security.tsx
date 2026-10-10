import { createFileRoute } from "@tanstack/react-router"

import SecuritySettingsPage from "@/features/settings/components/security/SecuritySettingPage"

export const Route = createFileRoute("/_app/settings/security")({
  component: SecuritySettingsPage,
})
