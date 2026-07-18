import { createFileRoute } from "@tanstack/react-router"
import { KanbanPreview } from "../features/auth/components/KanbanPreview"
import { RegisterForm } from "../features/auth/components/RegisterForm"


export const Route = createFileRoute("/register")({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex bg-white">
      <KanbanPreview />
      <RegisterForm />
    </div>
  )
}