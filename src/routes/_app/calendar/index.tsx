import { createFileRoute } from "@tanstack/react-router"

import { CalendarPage } from "@/features/calendar/components/CalendarPage"

// Keep the path string your existing route file already uses if it differs.
export const Route = createFileRoute("/_app/calendar/")({
  component: CalendarPage,
})