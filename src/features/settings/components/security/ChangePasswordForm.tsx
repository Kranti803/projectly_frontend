"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MIN_PASSWORD_LENGTH } from "@/utils/passwordLength"
import { SettingsSection } from "../SettingsSection"
import { PasswordInput } from "./PasswordInput"
import { PasswordStrengthMeter } from "./PasswordStrengthMeter"

interface PasswordValues {
  current: string
  next: string
  confirm: string
}

type PasswordErrors = Partial<Record<keyof PasswordValues, string>>

const emptyValues: PasswordValues = { current: "", next: "", confirm: "" }

export function ChangePasswordForm() {
  const [values, setValues] = useState<PasswordValues>(emptyValues)
  const [errors, setErrors] = useState<PasswordErrors>({})
  const [justSaved, setJustSaved] = useState(false)

  function update(key: keyof PasswordValues, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setJustSaved(false)
  }

  function validate(): PasswordErrors {
    const found: PasswordErrors = {}
    if (!values.current) found.current = "Enter your current password."
    if (values.next.length < MIN_PASSWORD_LENGTH) {
      found.next = `Use at least ${MIN_PASSWORD_LENGTH} characters.`
    } else if (values.next === values.current) {
      found.next = "Your new password must be different from the current one."
    }
    if (values.confirm !== values.next) found.confirm = "Passwords don't match."
    return found
  }

  // TODO: call POST /auth/change-password. If the API says the current password is wrong,
  // show it with: setErrors({ current: "That password is incorrect." })
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setValues(emptyValues)
    setJustSaved(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <SettingsSection
        title="Change password"
        description="Use a long, unique password that you don't use anywhere else."
        footer={
          <>
            {justSaved && <p className="text-sm text-muted-foreground">Password updated.</p>}
            <Button type="submit">Update password</Button>
          </>
        }
      >
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current password</Label>
            <PasswordInput
              id="current-password"
              value={values.current}
              onChange={(e) => update("current", e.target.value)}
              autoComplete="current-password"
              aria-invalid={!!errors.current}
            />
            {errors.current && <p className="text-xs text-destructive">{errors.current}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <PasswordInput
              id="new-password"
              value={values.next}
              onChange={(e) => update("next", e.target.value)}
              autoComplete="new-password"
              aria-invalid={!!errors.next}
            />
            <PasswordStrengthMeter password={values.next} />
            {errors.next && <p className="text-xs text-destructive">{errors.next}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <PasswordInput
              id="confirm-password"
              value={values.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              autoComplete="new-password"
              aria-invalid={!!errors.confirm}
            />
            {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
          </div>
        </div>
      </SettingsSection>
    </form>
  )
}