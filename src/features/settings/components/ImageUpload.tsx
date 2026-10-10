"use client"

import { useEffect, useRef, useState, type ChangeEvent } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const MAX_SIZE_MB = 2

interface ImageUploadProps {
  name: string // first letter is shown when there's no image
  initialUrl?: string
  uploadLabel?: string
  onChange: (file: File | null) => void // null means the image was removed
}

export function ImageUpload({ name, initialUrl, uploadLabel = "Upload image", onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | undefined>(initialUrl)
  const [error, setError] = useState<string | null>(null)

  // Frees the temporary preview URL when it's replaced or the component unmounts.
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview)
    }
  }, [preview])

  // TODO: upload the file to your storage (S3, Cloudinary, ...) and save the returned URL.
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = "" // lets the same file be picked again
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.")
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_SIZE_MB} MB.`)
      return
    }

    setError(null)
    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  function handleRemove() {
    setError(null)
    setPreview(undefined)
    onChange(null)
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-16">
        <AvatarImage src={preview} alt="" />
        <AvatarFallback className="text-lg">{name[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
            {uploadLabel}
          </Button>
          {preview && (
            <Button type="button" variant="ghost" size="sm" onClick={handleRemove}>
              Remove
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">PNG or JPG, up to {MAX_SIZE_MB} MB.</p>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
        tabIndex={-1}
      />
    </div>
  )
}