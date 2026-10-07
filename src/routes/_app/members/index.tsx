import MembersPage from "@/features/members/components/MembersPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/members/")({
  component: MembersPage,
})
