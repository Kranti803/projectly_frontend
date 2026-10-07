"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface ProjectFormValues {
  name: string;
  description: string;
  team: string;
  startDate: string;
  dueDate: string;
  color: string;
}

interface ProjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teams: string[];
  colors: string[];
  onSubmit: (values: ProjectFormValues) => void;
}

export function ProjectFormDialog({
  open,
  onOpenChange,
  teams,
  colors,
  onSubmit,
}: ProjectFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Set up a project and choose which team owns it.
          </DialogDescription>
        </DialogHeader>
        {/* DialogContent unmounts when closed, so the form resets on every open. */}
        <ProjectForm
          teams={teams}
          colors={colors}
          onCancel={() => onOpenChange(false)}
          onSubmit={(values) => {
            onSubmit(values);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

type FormErrors = Partial<Record<keyof ProjectFormValues, string>>;

interface ProjectFormProps {
  teams: string[];
  colors: string[];
  onCancel: () => void;
  onSubmit: (values: ProjectFormValues) => void;
}

function ProjectForm({ teams, colors, onCancel, onSubmit }: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>({
    name: "",
    description: "",
    team: "",
    startDate: "",
    dueDate: "",
    color: colors[0],
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function update<K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Project name is required.";
    if (!values.team) next.team = "Choose a team.";
    if (
      values.startDate &&
      values.dueDate &&
      values.dueDate < values.startDate
    ) {
      next.dueDate = "Due date can't be before the start date.";
    }
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmit({
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="project-name">Project name</Label>
        <Input
          id="project-name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. Website relaunch"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-description">Description</Label>
        <Textarea
          id="project-description"
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What is this project about?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-team">Team</Label>
        <Select
          value={values.team}
          onValueChange={(v) => v !== null && update("team", v)}
        >
          <SelectTrigger id="project-team" aria-invalid={!!errors.team}>
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.team && (
          <p className="text-xs text-destructive">{errors.team}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project-start">Start date</Label>
          <Input
            id="project-start"
            type="date"
            value={values.startDate}
            onChange={(e) => update("startDate", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-due">Due date</Label>
          <Input
            id="project-due"
            type="date"
            value={values.dueDate}
            onChange={(e) => update("dueDate", e.target.value)}
            aria-invalid={!!errors.dueDate}
          />
          {errors.dueDate && (
            <p className="text-xs text-destructive">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => update("color", color)}
              aria-label={`Use color ${color}`}
              aria-pressed={values.color === color}
              className={cn(
                "size-8 rounded-full ring-offset-2 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                values.color === color && "ring-2 ring-foreground",
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <DialogFooter className="pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create project</Button>
      </DialogFooter>
    </form>
  );
}
