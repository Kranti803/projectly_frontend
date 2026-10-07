import { AvatarStack } from "@/components/common/AvatarStack";
import type { Comment as TaskComment } from "@/constants/TaskDetailData";
import { formatRelativeTime } from "@/utils/format";


export function CommentItem({ comment }: { comment: TaskComment }) {
  return (
    <li className="flex gap-3">
      <AvatarStack members={[comment.author]} size="w-8 h-8" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>
        <p className="mt-0.5 whitespace-pre-wrap text-sm">{comment.body}</p>
      </div>
    </li>
  )
}