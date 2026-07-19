import { ResetPasswordPage } from '@/features/auth/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/reset-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ResetPasswordPage />
}
