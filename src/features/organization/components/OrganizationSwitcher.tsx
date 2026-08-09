import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Search, Users } from "lucide-react";
import { BrandMark } from "@/components/common/BrandMark";
import { Input } from "@/components/ui/input";

interface Organization {
  id: string;
  name: string;
  role: "Owner" | "Admin" | "Member";
  memberCount: number;
  color: string;
}

// TODO: replace with real data from features/organization/api
const allOrganizations: Organization[] = [
  {
    id: "acme-corp",
    name: "Acme Corp",
    role: "Owner",
    memberCount: 24,
    color: "bg-indigo-600",
  },
  {
    id: "north-star-labs",
    name: "North Star Labs",
    role: "Admin",
    memberCount: 8,
    color: "bg-emerald-600",
  },
  {
    id: "riverside-studio",
    name: "Riverside Studio",
    role: "Member",
    memberCount: 5,
    color: "bg-amber-600",
  },
];

const organizations: Organization[] = allOrganizations.filter(
  (org, index, self) => self.findIndex((o) => o.id === org.id) === index
);

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function OrganizationSwitcher() {
  const [query, setQuery] = useState("");

  const filteredOrgs = useMemo(() => {
    if (!query.trim()) return organizations;
    return organizations.filter((org) =>
      org.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <BrandMark className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">
            Choose an organization
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Select a workspace to continue, or create a new one.
          </p>
        </div>

        {/* Search */}
        {organizations.length > 4 && (
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Find an organization..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 rounded-lg border-slate-200 bg-white pl-9 text-sm shadow-sm"
            />
          </div>
        )}

        {/* Org list */}
        <div className="flex flex-col gap-2">
          {filteredOrgs.map((org) => (
            <Link
              key={org.id}
              to="/dashboard"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white ${org.color}`}
              >
                {getInitials(org.name)}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium text-slate-800">
                  {org.name}
                </p>
                <div className="mt-0.5 flex items-center gap-2.5 text-xs text-slate-400">
                  <span>{org.role}</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {org.memberCount}
                  </span>
                </div>
              </div>
              <div className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 3.5L10.5 8L6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}

          {filteredOrgs.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-400">
              No organizations match "{query}"
            </div>
          )}
        </div>

        {/* Create new org */}
        <Link
          to="/organization/create"
          className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white p-3.5 text-sm font-medium text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Plus className="h-4 w-4" />
          Create organization
        </Link>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            to="/auth/login"
            className="text-xs text-slate-400 hover:text-slate-600 hover:underline"
          >
            Log out and switch account
          </Link>
        </div>
      </div>
    </div>
  );
}