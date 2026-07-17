const kanbanColumns = {
  todo: [
    { title: "User research synthesis", tag: "Research", color: "bg-fuchsia-100 text-fuchsia-700" },
    { title: "Update landing page copy", tag: "Marketing", color: "bg-rose-100 text-rose-700" },
    { title: "Set up CI/CD pipeline", tag: "Eng", color: "bg-sky-100 text-sky-700" },
  ],
  progress: [
    { title: "Design system tokens", tag: "Design", color: "bg-violet-100 text-violet-700" },
    { title: "API rate limiting", tag: "Eng", color: "bg-sky-100 text-sky-700" },
  ],
  done: [
    { title: "Onboarding flow v2", tag: "Product", color: "bg-emerald-100 text-emerald-700" },
    { title: "Billing integration", tag: "Eng", color: "bg-sky-100 text-sky-700" },
  ],
}

function Avatar({ i }: { i: number }) {
  const hues = ["bg-violet-400", "bg-indigo-400", "bg-purple-400", "bg-blue-400"]
  return (
    <div
      className={`w-7 h-7 rounded-full ${hues[i % hues.length]} border-2 border-white -ml-2 first:ml-0`}
    />
  )
}

interface KanbanCardItem {
  title: string
  tag: string
  color: string
}

function KanbanColumn({
  title,
  count,
  dot,
  items,
  showGhost,
}: {
  title: string
  count: number
  dot: string
  items: KanbanCardItem[]
  showGhost?: boolean
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-3 px-0.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <span className="text-[11px] font-medium text-slate-500">{title}</span>
        <span className="text-[11px] text-slate-300">{count}</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-slate-100 shadow-sm px-3 py-2.5"
          >
            <p className="text-[12px] text-slate-700 leading-snug mb-2">{item.title}</p>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${item.color}`}>
                {item.tag}
              </span>
              <div className="w-4 h-4 rounded-full bg-indigo-200" />
            </div>
          </div>
        ))}
        {showGhost && (
          <div className="h-8 rounded-lg border border-dashed border-slate-200" />
        )}
      </div>
    </div>
  )
}

export function KanbanPreview() {
  return (
    <div className="hidden md:flex md:w-1/2 relative bg-linear-to-br from-indigo-50 via-violet-50 to-indigo-100 items-center justify-center p-10 overflow-hidden">
      {/* grid background */}
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
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-slate-800 text-[15px]">Projectly</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
          Manage projects
          <br />
          with clarity.
        </h1>
        <p className="text-slate-500 text-[15px] mb-8 max-w-sm">
          Bring your team together, track work in real-time, and ship faster than ever.
        </p>

        {/* Kanban board preview */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-200/40 border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-4 px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-[12px] font-medium text-slate-600">Sprint 4</span>
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

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-6">
          <div className="flex">
            {[0, 1, 2, 3].map((i) => (
              <Avatar key={i} i={i} />
            ))}
          </div>
          <span className="text-[13px] text-slate-500">
            <span className="font-medium text-slate-700">4,200+ teams</span> already onboard
          </span>
        </div>
      </div>
    </div>
  )
}
