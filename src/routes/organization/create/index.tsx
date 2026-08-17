import { CreateOrganizationForm } from '@/features/organization/components/CreateOrganization'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/organization/create/')({
  component: CreateOrganizationForm,
})

