import { Card } from "@/components/ui/card";
import { AvatarStack } from "./AvatarStack";
import { ActivityIcon } from "@/features/auth/components/SocialIcons";
import { PROJECT_PROGRESS, RECENT_ACTIVITY } from "@/constants/ProgressData";

export function ProgressPreviewCard() {
  return (
    <Card className="p-4 rounded-2xl shadow-xl shadow-indigo-200/40 border-slate-100 gap-4">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-[12px] font-medium text-slate-600">
            {PROJECT_PROGRESS.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <AvatarStack count={PROJECT_PROGRESS.members} size="w-6 h-6" />
          <span className="text-[11px] text-slate-400">
            +{PROJECT_PROGRESS.extraMembers}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {PROJECT_PROGRESS.tasks.map((task) => (
          <div key={task.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-slate-600">{task.label}</span>
              <span className="text-[11px] text-slate-400">
                {task.percent}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${task.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-3 flex flex-col gap-2.5">
        {RECENT_ACTIVITY.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <ActivityIcon type={item.icon} className="text-indigo-400" />
              <span className="text-[12px]">{item.text}</span>
            </div>
            <span className="text-[11px] text-slate-300 whitespace-nowrap">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
