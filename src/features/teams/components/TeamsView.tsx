"use client"

import { useState } from "react"
import { Plus, SearchX, UsersRound } from "lucide-react"


import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/common/EmptyState"
import { PageHeader } from "@/components/common/PageHeader"
import { SearchInput } from "@/components/common/SearchInput"
import type { OrgMember } from "@/constants/MembersData"
import { type Project, projectColors } from "@/constants/ProjectData"
import { currentUserId } from "@/constants/TaskData"
import type { Team } from "@/constants/TeamsData"
import { resolveTeamMembers, toAvatarMember, countActiveProjects } from "@/utils/team-utils"
import { useTeamSearch } from "../hooks/useTeamSearch"
import { TeamCard } from "./TeamCard"
import { type TeamFormValues, TeamFormDialog } from "./TeamFormDialog"


interface TeamsViewProps {
  initialTeams: Team[]
  orgMembers: OrgMember[]
  projects: Project[]
}

export function TeamsView({ initialTeams, orgMembers, projects }: TeamsViewProps) {
  const [teams, setTeams] = useState(initialTeams)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { query, setQuery, items } = useTeamSearch(teams)

  // TODO: replace with an API call (POST /teams).
  function handleCreate(values: TeamFormValues) {
    const team: Team = {
      id: `t-${Date.now()}`,
      ...values,
      // The person creating the team starts as its lead.
      memberships: [{ memberId: currentUserId, role: "lead" }],
    }
    setTeams((prev) => [team, ...prev])
  }

  const createButton = (
    <Button onClick={() => setDialogOpen(true)}>
      <Plus className="size-4" />
      Create team
    </Button>
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Teams"
        description="Group people together and give each team its own projects."
        actions={createButton}
      />

      {teams.length === 0 ? (
        <EmptyState
          icon={UsersRound}
          title="No teams yet"
          description="Create your first team to organize people and projects."
          action={createButton}
        />
      ) : (
        <>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search teams"
            ariaLabel="Search teams"
          />

          {items.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No matching teams"
              description="Try a different search."
              action={
                <Button variant="outline" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  members={resolveTeamMembers(team, orgMembers).map((r) => toAvatarMember(r.member))}
                  activeProjectCount={countActiveProjects(team.id, projects)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <TeamFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        colors={projectColors}
        onSubmit={handleCreate}
      />
    </div>
  )
}