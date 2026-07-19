interface KanbanCardItem {
  title: string;
  tag: string;
  color: string;
}
export function KanbanColumn({
  title,
  count,
  dot,
  items,
  showGhost,
}: {
  title: string;
  count: number;
  dot: string;
  items: KanbanCardItem[];
  showGhost?: boolean;
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
            <p className="text-[12px] text-slate-700 leading-snug mb-2">
              {item.title}
            </p>
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${item.color}`}
              >
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
  );
}
