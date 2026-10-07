"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Member } from "@/constants/ProjectData"
import type { Comment as TaskComment } from "@/constants/TaskDetailData"
import { CommentItem } from "./CommentItem"
import { AvatarStack } from "@/components/common/AvatarStack"

interface CommentThreadProps {
  comments: TaskComment[]
  currentUser: Member
  onChange: (comments: TaskComment[]) => void
}

export function CommentThread({ comments, currentUser, onChange }: CommentThreadProps) {
  const [body, setBody] = useState("")

  // TODO: POST the comment to your API and use the saved comment it returns.
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = body.trim()
    if (!trimmed) return
    onChange([
      ...comments,
      {
        id: `c${Date.now()}`,
        author: currentUser,
        body: trimmed,
        createdAt: new Date().toISOString(),
      },
    ])
    setBody("")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">
        Comments{comments.length > 0 && ` (${comments.length})`}
      </h3>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No comments yet. Start the conversation.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <AvatarStack members={[currentUser]} size="w-8 h-8" />
        <div className="flex-1 space-y-2">
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment"
            rows={2}
            aria-label="New comment"
          />
          <Button type="submit" size="sm" disabled={!body.trim()}>
            Comment
          </Button>
        </div>
      </form>
    </div>
  )
}