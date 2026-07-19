import { Check } from "lucide-react";

interface ChecklistItemProps {
  label: string;
  met: boolean;
}

export function ChecklistItem({ label, met }: ChecklistItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          met ? "bg-emerald-500" : "bg-slate-200"
        }`}
      >
        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
      </span>
      <span className={`text-[13px] ${met ? "text-slate-700" : "text-slate-400"}`}>{label}</span>
    </div>
  );
}