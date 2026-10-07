// Formats an ISO date (e.g. "2026-11-30") as "Nov 30, 2026".
// UTC avoids server/client timezone mismatches during hydration.
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}