import { kanbanColumns } from "@/constants/RegisterData";
import { AvatarStack } from "../shared/AvatarStack";
import { KanbanColumn } from "./KanbanColumn";
import { BrandMark } from "../shared/SocialIcons";

export function KanbanPreview() {
  return (
    <div className="hidden md:flex md:w-1/2 relative bg-linear-to-br from-indigo-50 via-violet-50 to-indigo-100 items-center justify-center p-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#e0e0f8 1px, transparent 1px), linear-gradient(90deg, #e0e0f8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-14">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <BrandMark className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-800 text-[15px]">
            Projectly
          </span>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
          Manage projects
          <br />
          with clarity.
        </h1>
        <p className="text-slate-500 text-[15px] mb-8 max-w-sm">
          Bring your team together, track work in real-time, and ship faster
          than ever.
        </p>

        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-200/40 border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-4 px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-[12px] font-medium text-slate-600">
                Sprint 4
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded-full bg-slate-100" />
              <div className="w-4 h-4 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="flex gap-3">
            <KanbanColumn
              title="To Do"
              count={3}
              dot="bg-slate-300"
              items={kanbanColumns.todo}
            />
            <KanbanColumn
              title="In Progress"
              count={2}
              dot="bg-indigo-400"
              items={kanbanColumns.progress}
              showGhost
            />
            <KanbanColumn
              title="Done"
              count={2}
              dot="bg-emerald-400"
              items={kanbanColumns.done}
              showGhost
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <AvatarStack count={4} />
          <span className="text-[13px] text-slate-500">
            <span className="font-medium text-slate-700">4,200+ teams</span>{" "}
            already onboard
          </span>
        </div>
      </div>
    </div>
  );
}
