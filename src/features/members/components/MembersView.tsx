"use client"

import { useMemo, useState } from "react"
import { Plus, SearchX } from "lucide-react"

import { EmptyState } from "@/components/common/EmptyState";
import { SimplePagination } from "@/components/common/SimplePagination";

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/PageHeader";
import type { OrgMember, MemberRole } from "@/constants/MembersData";
import { useMemberFilters } from "../hooks/useMemberFilters";
import { type InviteValues, InviteMembersDialog } from "./InviteMembersDialog";
import { ConfirmDialog } from "./ConfirmDialog";
import { MembersToolbar } from "./MembersToolbar";
import { MembersTable } from "./MembersTable";


interface MembersViewProps {
  initialMembers: OrgMember[]
}

export function MembersView({ initialMembers }: MembersViewProps) {
  const [members, setMembers] = useState(initialMembers)
  const [inviteOpen, setInviteOpen] = useState(false)
  // memberToRemove stays set while the dialog animates closed, so its text doesn't vanish early.
  const [memberToRemove, setMemberToRemove] = useState<OrgMember | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { filters, setFilter, resetFilters, hasActiveFilters, items, totalCount, page, setPage, totalPages } =
    useMemberFilters(members)

  const existingEmails = useMemo(() => members.map((m) => m.email.toLowerCase()), [members])
  const pendingCount = members.filter((m) => m.status === "pending").length
  const activeCount = members.length - pendingCount

  // TODO: replace with an API call (POST /invitations).
  function handleInvite({ emails, role }: InviteValues) {
    const invited: OrgMember[] = emails.map((email, i) => ({
      id: `i${Date.now()}-${i}`,
      name: null,
      email,
      role,
      status: "pending",
      joinedAt: null,
    }))
    setMembers((prev) => [...prev, ...invited])
  }

  // TODO: replace with an API call (PATCH /members/:id).
  function handleChangeRole(id: string, role: MemberRole) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
  }

  // TODO: call your API to re-send the invitation email.
  function handleResend(_member: OrgMember) {}

  function requestRemove(member: OrgMember) {
    setMemberToRemove(member)
    setConfirmOpen(true)
  }

  // TODO: replace with an API call (DELETE /members/:id).
  function confirmRemove() {
    if (memberToRemove) {
      setMembers((prev) => prev.filter((m) => m.id !== memberToRemove.id))
    }
    setConfirmOpen(false)
  }

  const isPendingRemoval = memberToRemove?.status === "pending"
  const removeName = memberToRemove?.name ?? memberToRemove?.email ?? "this person"

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Members"
        description={`${activeCount} ${activeCount === 1 ? "member" : "members"}${
          pendingCount > 0 ? `, ${pendingCount} pending ${pendingCount === 1 ? "invite" : "invites"}` : ""
        }`}
        actions={
          <Button onClick={() => setInviteOpen(true)}>
            <Plus className="size-4" />
            Invite member
          </Button>
        }
      />

      <MembersToolbar filters={filters} onFilterChange={setFilter} />

      {totalCount === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No matching members"
          description="Try a different search or clear your filters."
          action={
            hasActiveFilters ? (
              <Button variant="outline" onClick={resetFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <MembersTable
          members={items}
          onChangeRole={handleChangeRole}
          onRemove={requestRemove}
          onResend={handleResend}
        />
      )}

      <SimplePagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <InviteMembersDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        existingEmails={existingEmails}
        onSubmit={handleInvite}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={isPendingRemoval ? "Cancel this invite?" : `Remove ${removeName}?`}
        description={
          isPendingRemoval
            ? `The invite sent to ${removeName} will stop working.`
            : `${removeName} will lose access to this organization and its projects.`
        }
        confirmLabel={isPendingRemoval ? "Cancel invite" : "Remove member"}
        destructive
        onConfirm={confirmRemove}
      />
    </div>
  )
}