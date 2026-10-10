import type { ReactNode } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SettingsSectionProps {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode // usually the Save button
  variant?: "default" | "danger"
}

export function SettingsSection({
  title,
  description,
  children,
  footer,
  variant = "default",
}: SettingsSectionProps) {
  return (
    <Card className={cn(variant === "danger" && "border-destructive/50")}>
      <CardHeader>
        <CardTitle className={cn(variant === "danger" && "text-destructive")}>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="justify-end gap-3 border-t pt-6">{footer}</CardFooter>}
    </Card>
  )
}