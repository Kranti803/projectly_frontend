"use client";

import type { TeamMembership } from "@/constants/TeamsData";
import { useState } from "react";

export function useTeamMembers(initial: TeamMembership[]) {
  const [memberships, setMemberships] = useState(initial);

  // TODO: replace with an API call (POST /teams/:id/members).
  function addMembers(memberIds: string[]) {
    setMemberships((prev) => {
      const existing = new Set(prev.map((m) => m.memberId));
      const added: TeamMembership[] = memberIds
        .filter((id) => !existing.has(id))
        .map((memberId) => ({ memberId, role: "member" }));
      return [...prev, ...added];
    });
  }

  // TODO: replace with an API call (DELETE /teams/:id/members/:memberId).
  function removeMember(memberId: string) {
    setMemberships((prev) => prev.filter((m) => m.memberId !== memberId));
  }

  return { memberships, addMembers, removeMember };
}
