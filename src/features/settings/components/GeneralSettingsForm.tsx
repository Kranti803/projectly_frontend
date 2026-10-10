"use client"

import { useState, type FormEvent } from "react"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Organization } from "@/constants/OrganizationData"
import { ImageUpload } from "./ImageUpload"
import { SettingsSection } from "./SettingsSection"
import { TimezoneSelect } from "./TimezoneSelect"

const SLUG_PATTERN = /^[a-z0-9-]+$/

interface GeneralSettingsFormProps {
  organization: Organization
}

export function GeneralSettingsForm({ organization }: GeneralSettingsFormProps) {
  // `saved` is the last saved version, used to tell whether anything has changed.
  const [saved, setSaved] = useState({
    name: organization.name,
    slug: organization.slug,
    timezone: organization.timezone,
  })
  const [name, setName] = useState(saved.name)
  const [slug, setSlug] = useState(saved.slug)
  const [timezone, setTimezone] = useState(saved.timezone)
  const [logoChanged, setLogoChanged] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({})
  const [justSaved, setJustSaved] = useState(false)

  const dirty =
    logoChanged || name !== saved.name || slug !== saved.slug || timezone !== saved.timezone

  function edit<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setJustSaved(false)
    }
  }

  function validate() {
    const next: { name?: string; slug?: string } = {}
    if (!name.trim()) next.name = "Organization name is required."
    if (slug.length < 3) next.slug = "The URL must be at least 3 characters."
    else if (!SLUG_PATTERN.test(slug)) next.slug = "Use lowercase letters, numbers and hyphens only."
    return next
  }

  // TODO: replace with an API call (PATCH /organizations/:id), including the logo upload.
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSaved({ name: name.trim(), slug, timezone })
    setName(name.trim())
    setLogoChanged(false)
    setJustSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <SettingsSection
        title="General"
        description="Basic details about your organization."
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
            <Label>Logo</Label>
            <ImageUpload
              name={name || organization.name}
              initialUrl={organization.logoUrl}
              uploadLabel="Upload logo"
              onChange={() => {
                setLogoChanged(true)
                setJustSaved(false)
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="org-name">Organization name</Label>
            <Input
              id="org-name"
              value={name}
              onChange={(e) => {
                edit(setName)(e.target.value)
                setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="org-slug">Organization URL</Label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                projectly.app/
              </span>
              <Input
                id="org-slug"
                value={slug}
                onChange={(e) => {
                  edit(setSlug)(e.target.value.toLowerCase())
                  setErrors((prev) => ({ ...prev, slug: undefined }))
                }}
                className="rounded-l-none"
                aria-invalid={!!errors.slug}
              />
            </div>
            {errors.slug ? (
              <p className="text-xs text-destructive">{errors.slug}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Changing this breaks existing links to your organization.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="org-timezone">Timezone</Label>
            <TimezoneSelect id="org-timezone" value={timezone} onChange={edit(setTimezone)} />
          </div>
        </div>
      </SettingsSection>
    </form>
  )
}