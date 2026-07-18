import ForgotPasswordPage from '@/features/auth/components/forgot-password/ForgotPasswordPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ForgotPasswordPage />
}
