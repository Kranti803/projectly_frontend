import { STRENGTH_COLORS, STRENGTH_LABELS } from "@/constants/RegisterData";
import { cn } from "@/lib/utils";
import { getStrength } from "@/utils/get-password-strength";

export function PasswordStrengthBar({ password }: { password: string }) {
  const strength = getStrength(password);
  if (!password) return null;

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < strength ? STRENGTH_COLORS[strength] : "bg-slate-100",
            )}
          />
        ))}
      </div>
      <span className="text-[11px] text-slate-400 whitespace-nowrap">
        {STRENGTH_LABELS[strength]}
      </span>
    </div>
  );
}
