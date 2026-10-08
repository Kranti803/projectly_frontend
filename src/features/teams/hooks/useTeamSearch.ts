"use client"

import type { Team } from "@/constants/TeamsData"
import { useMemo, useState } from "react"


export function useTeamSearch(teams: Team[]) {
  const [query, setQuery] = useState("")

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return teams
    return teams.filter((t) => `${t.name} ${t.description}`.toLowerCase().includes(q))
  }, [teams, query])

  return { query, setQuery, items }
}