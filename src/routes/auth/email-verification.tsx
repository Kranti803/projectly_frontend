import { createFileRoute } from "@tanstack/react-router";
import { EmailVerificationPage } from "@/features/auth/components";

export const Route = createFileRoute("/auth/email-verification")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EmailVerificationPage />;
}
