"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShieldCheck } from "lucide-react";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-neutral-900"
        >
          Auto<span className="text-emerald-700">Vault</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-neutral-600">
          <Link
            href="/"
            className={`flex items-center gap-1.5 transition hover:text-neutral-900 ${
              pathname === "/"
                ? "border-b-2 border-emerald-600 pb-0.5 text-neutral-900"
                : ""
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            Inventory
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-white transition hover:bg-neutral-700"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
