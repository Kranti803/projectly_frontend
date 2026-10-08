import { cn } from "@/lib/utils"

interface TeamIconProps {
  name: string
  color: string
  size?: "md" | "lg"
}

export function TeamIcon({ name, color, size = "md" }: TeamIconProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg font-semibold text-white",
        size === "lg" ? "size-12 text-lg" : "size-10 text-base"
      )}
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {name[0]?.toUpperCase()}
    </span>
  )
}