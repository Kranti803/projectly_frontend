import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  ImageUp,
  Loader2,
  Users,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/common/BrandMark";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createOrganizationSchema,
  industryOptions,
  teamSizeOptions,
  type CreateOrganizationFormValues,
} from "@/features/organization/schemas/create-organization.schema";
import { useDebounce } from "@/hooks/use-debouce";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// TODO: replace with a real API call to check slug availability
async function checkSlugAvailability(slug: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const takenSlugs = ["acme", "test", "admin", "projectly"];
  return !takenSlugs.includes(slug);
}

type SlugStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export function CreateOrganizationForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
  const [slugEditedManually, setSlugEditedManually] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: { name: "", slug: "", industry: "" },
  });

  const name = watch("name");
  const slug = watch("slug");
  const debouncedSlug = useDebounce(slug, 500);

  // Auto-generate slug from name until the user edits it directly
  useEffect(() => {
    if (!slugEditedManually) {
      setValue("slug", slugify(name || ""), { shouldValidate: true });
    }
  }, [name, slugEditedManually, setValue]);

  // Check availability whenever the debounced slug changes
  useEffect(() => {
    if (!debouncedSlug || debouncedSlug.length < 3) {
      setSlugStatus("idle");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(debouncedSlug)) {
      setSlugStatus("invalid");
      return;
    }

    let cancelled = false;
    setSlugStatus("checking");

    checkSlugAvailability(debouncedSlug).then((isAvailable) => {
      if (!cancelled) setSlugStatus(isAvailable ? "available" : "taken");
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedSlug]);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(values: CreateOrganizationFormValues) {
    // TODO: wire up to features/organization/api
    console.log("Creating organization:", values);
    await navigate({ to: "/dashboard" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-lg rounded-2xl border-slate-100 shadow-sm">
        <CardContent className="p-8">
          {/* Brand */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <BrandMark className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-800">
              Projectly
            </span>
          </div>

          {/* Stepper */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-indigo-600">
                  Your account
                </span>
              </div>
              <div className="h-px w-16 bg-indigo-200" />
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  2
                </div>
                <span className="text-sm font-medium text-indigo-600">
                  Your workspace
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400">Step 2 of 2</span>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-semibold text-slate-900">
            Set up your workspace
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tell us about your organization. You can always change this
            later.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* Logo + Org name */}
            <div className="flex gap-4">
              <div>
                <Label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Logo
                </Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                {logoPreview ? (
                  <div className="relative h-14 w-14">
                    <img
                      src={logoPreview}
                      alt="Organization logo preview"
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-slate-900"
                      aria-label="Remove logo"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="logo-upload"
                    className="flex h-14 w-14 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100"
                  >
                    <ImageUp className="h-4 w-4" />
                    <span className="text-[10px] font-medium">Upload</span>
                  </label>
                )}
              </div>

              <div className="flex-1">
                <Label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Organization Name
                </Label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="name"
                    placeholder="Acme Inc."
                    className="h-11 rounded-lg border-slate-200 pl-9 text-sm"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Slug */}
            <div>
              <Label
                htmlFor="slug"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Organization URL
              </Label>
              <div className="flex h-11 items-stretch overflow-hidden rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500">
                <span className="flex items-center bg-slate-50 px-3 text-sm text-slate-400">
                  projectly.app/
                </span>
                <input
                  id="slug"
                  placeholder="acme-inc"
                  className="flex-1 border-0 bg-white px-2 text-sm text-slate-800 outline-none placeholder:text-slate-300"
                  {...register("slug", {
                    onChange: () => setSlugEditedManually(true),
                  })}
                />
                <div className="flex items-center px-3">
                  {slugStatus === "checking" && (
                    <Loader2 className="h-4 w-4 animate-spin text-slate-300" />
                  )}
                  {slugStatus === "available" && (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <Check className="h-3.5 w-3.5" /> Available
                    </span>
                  )}
                  {slugStatus === "taken" && (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                      <X className="h-3.5 w-3.5" /> Taken
                    </span>
                  )}
                </div>
              </div>
              {errors.slug ? (
                <p className="mt-1 text-xs text-red-500">
                  {errors.slug.message}
                </p>
              ) : (
                <p className="mt-1 text-xs text-slate-400">
                  Your workspace will be accessible at{" "}
                  <span className="font-medium text-slate-600">
                    projectly.app/{slug || "your-slug"}
                  </span>
                </p>
              )}
            </div>

            {/* Team size */}
            <div>
              <Label
                htmlFor="teamSize"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Team Size
              </Label>
              <Controller
                name="teamSize"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="teamSize"
                      className="h-11 w-full rounded-lg border-slate-200 text-sm [&>span]:flex [&>span]:items-center [&>span]:gap-2"
                    >
                      <Users className="h-4 w-4 shrink-0 text-slate-400" />
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamSizeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.teamSize && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.teamSize.message}
                </p>
              )}
            </div>

            {/* Industry (optional) */}
            <div>
              <Label
                htmlFor="industry"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                Industry
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                  Optional
                </span>
              </Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="industry"
                      className="h-11 w-full rounded-lg border-slate-200 text-sm [&>span]:flex [&>span]:items-center [&>span]:gap-2"
                    >
                      <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || slugStatus === "taken"}
              className="h-11 w-full rounded-lg bg-indigo-600 text-sm font-medium hover:bg-indigo-700"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Create Organization
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Want to join an existing workspace?{" "}
              <Link
                to="/organization"
                className="font-medium text-indigo-600 hover:underline"
              >
                Request access
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}