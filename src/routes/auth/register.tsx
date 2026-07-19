import { KanbanPreview, RegisterForm } from "@/features/auth/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex bg-white">
      <KanbanPreview />
      <RegisterForm />
    </div>
  );
}
