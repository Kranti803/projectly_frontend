import { UserRound } from "lucide-react"

import { EmptyState } from "@/components/common/EmptyState"
import { PageHeader } from "@/components/common/PageHeader"

export default function MembersPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 py-2">
      <PageHeader
        title="Members"
        description="Manage the people who collaborate across your projects."
      />
      <EmptyState
        icon={UserRound}
        title="No members to display"
        description="Member management will be available here once your workspace members are connected."
      />
    </div>
  )
}
