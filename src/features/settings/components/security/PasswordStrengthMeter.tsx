import { cn } from "@/lib/utils"
import { getPasswordStrength } from "@/utils/passwordLength"

const barColors = ["", "bg-rose-500", "bg-amber-500", "bg-emerald-400", "bg-emerald-600"]

export function PasswordStrengthMeter({ password }: { password: string }) {
  const { score, label } = getPasswordStrength(password)
  if (score === 0) return null

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5" aria-hidden>
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className={cn("h-1.5 flex-1 rounded-full bg-muted", segment <= score && barColors[score])}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        Password strength: {label}
      </p>
    </div>
  )
}