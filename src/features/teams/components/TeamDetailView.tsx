"use client"

import { useMemo, useState } from "react"
import { UserPlus, UsersRound } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/common/EmptyState"
import type { OrgMember } from "@/constants/MembersData"
import { type Project, projectColors } from "@/constants/ProjectData"
import type { Team } from "@/constants/TeamsData"
import { ConfirmDialog } from "@/features/members/components/ConfirmDialog"
import { resolveTeamMembers } from "@/utils/team-utils"
import { useTeamMembers } from "../hooks/useTeamMembers"
import { AddTeamMembersDialog } from "./AddTeamMembersDialog"
import { type TeamFormValues, TeamFormDialog } from "./TeamFormDialog"
import { TeamHeader } from "./TeamHeader"
import { TeamMembersTable } from "./TeamMembersTable"
import { TeamProjectsGrid } from "./TeamProjectsGrid"


interface TeamDetailViewProps {
  initialTeam: Team
  orgMembers: OrgMember[]
  projects: Project[] // already filtered to this team
}

export function TeamDetailView({ initialTeam, orgMembers, projects }: TeamDetailViewProps) {
  const [details, setDetails] = useState({
    name: initialTeam.name,
    description: initialTeam.description,
    color: initialTeam.color,
  })
  const { memberships, addMembers, removeMember } = useTeamMembers(initialTeam.memberships)

  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  // memberToRemove stays set while the dialog animates closed, so its text doesn't vanish early.
  const [memberToRemove, setMemberToRemove] = useState<OrgMember | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const teamMembers = useMemo(
    () => resolveTeamMembers({ ...initialTeam, memberships }, orgMembers),
    [initialTeam, memberships, orgMembers]
  )

  // Only active org members who aren't on the team yet can be added.
  const candidates = useMemo(() => {
    const onTeam = new Set(memberships.map((m) => m.memberId))
    return orgMembers.filter((m) => m.status === "active" && !onTeam.has(m.id))
  }, [memberships, orgMembers])

  // TODO: replace with an API call (PATCH /teams/:id).
  function handleEdit(values: TeamFormValues) {
    setDetails(values)
  }

  function requestRemove(member: OrgMember) {
    setMemberToRemove(member)
    setConfirmOpen(true)
  }

  function confirmRemove() {
    if (memberToRemove) removeMember(memberToRemove.id)
    setConfirmOpen(false)
  }

  const removeName = memberToRemove?.name ?? memberToRemove?.email ?? "this person"

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <TeamHeader
        team={details}
        onEdit={() => setEditOpen(true)}
        onAddMember={() => setAddOpen(true)}
      />

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Members ({teamMembers.length})</TabsTrigger>
          <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4">
          {teamMembers.length === 0 ? (
            <EmptyState
              icon={UsersRound}
              title="No members yet"
              description="Add people from your organization to this team."
              action={
                <Button onClick={() => setAddOpen(true)}>
                  <UserPlus className="size-4" />
                  Add member
                </Button>
              }
            />
          ) : (
            <TeamMembersTable members={teamMembers} onRemove={requestRemove} />
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <TeamProjectsGrid projects={projects} />
        </TabsContent>
      </Tabs>

      <TeamFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        colors={projectColors}
        team={{ ...initialTeam, ...details, memberships }}
        onSubmit={handleEdit}
      />

      <AddTeamMembersDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        candidates={candidates}
        onSubmit={addMembers}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Remove ${removeName} from ${details.name}?`}
        description="They stay in the organization but lose access to this team's projects."
        confirmLabel="Remove from team"
        destructive
        onConfirm={confirmRemove}
      />
    </div>
  )
}