"use client"

import { useRef, type ChangeEvent } from "react"
import { FileText, ImageIcon, Paperclip, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Attachment } from "@/constants/TaskDetailData"
import { formatFileSize } from "@/utils/format"

interface AttachmentListProps {
  attachments: Attachment[]
  onChange: (attachments: Attachment[]) => void
}

export function AttachmentList({ attachments, onChange }: AttachmentListProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // TODO: upload each file to your storage and save the returned URL.
  // For now only the file's name, size and type are kept in memory.
  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    const added: Attachment[] = files.map((file, i) => ({
      id: `a${Date.now()}-${i}`,
      name: file.name,
      size: file.size,
      type: file.type,
    }))
    onChange([...attachments, ...added])
    e.target.value = "" // lets the same file be picked again
  }

  function remove(id: string) {
    onChange(attachments.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Attachments</h3>
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          <Paperclip className="size-4" />
          Upload
        </Button>
        <input ref={inputRef} type="file" multiple className="sr-only" onChange={handleFiles} tabIndex={-1} />
      </div>

      {attachments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No attachments yet.</p>
      ) : (
        <ul className="space-y-2">
          {attachments.map((attachment) => {
            const Icon = attachment.type.startsWith("image/") ? ImageIcon : FileText
            return (
              <li
                key={attachment.id}
                className="group flex items-center gap-3 rounded-lg border bg-card px-3 py-2"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{attachment.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
                  onClick={() => remove(attachment.id)}
                  aria-label={`Remove ${attachment.name}`}
                >
                  <X className="size-4" />
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}