import { redirect } from "@tanstack/react-router";

export default function SettingsPage() {
  throw redirect({ to: "/settings/general" })
}