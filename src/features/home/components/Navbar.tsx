import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/common/BrandMark";
import { Link } from "@tanstack/react-router";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <BrandMark className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-800 text-[15px]">
            Projectly
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 ">
          <Link
            className="text-[13.5px] font-medium bg-accent p-2 rounded-md "
            to="/auth/login"
          >
            Log in
          </Link>
          <Link
            to="/auth/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-[13.5px] font-medium p-2 rounded-md text-white transition"
          >
            Start Free Trial
          </Link>
        </div>

        <button
          className="md:hidden text-slate-600"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 px-6 py-4 flex flex-col gap-4 bg-white">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-slate-600"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link to="/auth/login" className="text-[13.5px] font-medium text-slate-600" >
              Log in
            </Link>
            <Link
              to="/auth/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-[13.5px] font-medium p-2 rounded-md text-white transition"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
