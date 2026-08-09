import { createFileRoute } from "@tanstack/react-router";
import { OrganizationSwitcher } from "@/features/organization/components/OrganizationSwitcher";

export const Route = createFileRoute("/organization/select-organization/")({
  component: OrganizationSwitcher,
});