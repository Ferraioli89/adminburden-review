"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { SessionSwitcher } from "@/components/auth/session-switcher";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/framework", label: "Framework" },
  { href: "/submit", label: "Submit" },
  { href: "/admin", label: "Admin" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-marino/10 bg-fondo/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:px-8 xl:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-marino/70">
              Academic platform
            </span>
            <span className="font-serif text-xl text-tinta">Administrative Burden Review</span>
          </Link>

          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-marino text-white"
                      : "bg-white/70 text-marino hover:bg-white hover:text-tinta"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="xl:min-w-[22rem]">
          <SessionSwitcher compact />
        </div>
      </div>
    </header>
  );
}
