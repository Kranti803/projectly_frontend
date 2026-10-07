import { formatDate } from "@/lib/formatDate"

// "Just now", "5m ago", "3h ago", "2d ago", then a plain date after a week.
export function formatRelativeTime(iso: string, now = Date.now()) {
  const minutes = Math.floor(Math.max(0, now - new Date(iso).getTime()) / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return formatDate(iso)
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}