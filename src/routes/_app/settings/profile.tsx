import { createFileRoute } from "@tanstack/react-router"

import ProfileSettingsPage from "@/features/settings/components/profile/ProfileSettingPage"

export const Route = createFileRoute("/_app/settings/profile")({
  component: ProfileSettingsPage,
})
