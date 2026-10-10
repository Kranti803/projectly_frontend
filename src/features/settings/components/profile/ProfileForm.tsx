"use client"

import { useState, type FormEvent } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { UserProfile } from "@/constants/AccountData"
import { SettingsSection } from "../SettingsSection"
import { TimezoneSelect } from "../TimezoneSelect"
import { ImageUpload } from "../ImageUpload"

const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/
const BIO_MAX_LENGTH = 160

interface ProfileValues {
  fullName: string
  username: string
  bio: string
  timezone: string
}

type ProfileErrors = Partial<Record<"fullName" | "username", string>>

export function ProfileForm({ user }: { user: UserProfile }) {
  // `saved` is the last saved version, used to tell whether anything has changed.
  const [saved, setSaved] = useState<ProfileValues>({
    fullName: user.fullName,
    username: user.username,
    bio: user.bio,
    timezone: user.timezone,
  })
  const [values, setValues] = useState<ProfileValues>(saved)
  const [avatarChanged, setAvatarChanged] = useState(false)
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [justSaved, setJustSaved] = useState(false)

  const dirty =
    avatarChanged || (Object.keys(values) as (keyof ProfileValues)[]).some((k) => values[k] !== saved[k])

  function update<K extends keyof ProfileValues>(key: K, value: ProfileValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setJustSaved(false)
  }

  function validate(): ProfileErrors {
    const next: ProfileErrors = {}
    if (!values.fullName.trim()) next.fullName = "Full name is required."
    if (!USERNAME_PATTERN.test(values.username)) {
      next.username = "Use 3 to 20 lowercase letters, numbers or underscores."
    }
    return next
  }

  // TODO: replace with an API call (PATCH /users/me), including the avatar upload.
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const cleaned = { ...values, fullName: values.fullName.trim(), bio: values.bio.trim() }
    setValues(cleaned)
    setSaved(cleaned)
    setAvatarChanged(false)
    setJustSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <SettingsSection
        title="Profile"
        description="How you appear to the people in your organization."
        footer={
          <>
            {justSaved && <p className="text-sm text-muted-foreground">Changes saved.</p>}
            <Button type="submit" disabled={!dirty}>
              Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Photo</Label>
            <ImageUpload
              name={values.fullName || user.fullName}
              initialUrl={user.avatarUrl}
              uploadLabel="Upload new photo"
              onChange={() => {
                setAvatarChanged(true)
                setJustSaved(false)
              }}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full name</Label>
              <Input
                id="profile-name"
                value={values.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                autoComplete="name"
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-username">Username</Label>
              <Input
                id="profile-username"
                value={values.username}
                onChange={(e) => update("username", e.target.value.toLowerCase())}
                autoComplete="username"
                aria-invalid={!!errors.username}
              />
              {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <div className="flex items-center gap-3">
              <Input id="profile-email" value={user.email} readOnly disabled className="flex-1" />
              <Badge
                className={cn(
                  "border-transparent font-medium",
                  user.emailVerified
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                )}
              >
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Your email can't be changed here.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              value={values.bio}
              onChange={(e) => update("bio", e.target.value)}
              maxLength={BIO_MAX_LENGTH}
              rows={3}
              placeholder="A line or two about you"
            />
            <p className="text-right text-xs text-muted-foreground">
              {values.bio.length}/{BIO_MAX_LENGTH}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-timezone">Timezone</Label>
            <TimezoneSelect
              id="profile-timezone"
              value={values.timezone}
              onChange={(v) => update("timezone", v)}
            />
          </div>
        </div>
      </SettingsSection>
    </form>
  )
}