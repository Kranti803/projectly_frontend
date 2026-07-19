import { kanbanColumns } from "@/constants/RegisterData";
import { KanbanColumn } from "@/components/common/KanbanColumn";

export function KanbanPreviewWidget() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl shadow-indigo-200/40 border border-slate-100 p-5">
      {/* Board header */}
      <div className="flex items-center justify-between mb-5 px-0.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-[13px] font-semibold text-slate-700">
            Sprint 4
          </span>
          <span className="text-[11px] text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 ml-1">
            7 tasks
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-amber-400/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-3 gap-4">
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
  );
}
