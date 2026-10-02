"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, profile } from "@/data/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/80 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {profile.shortName}
          <span className="text-vermilion">.</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.95rem] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="story-link px-0.5">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 h-[2px] w-6 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-[2px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-6 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-ink/80 bg-paper md:hidden"
      >
        <ul className="px-5 py-3">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-ink/15 last:border-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-2xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
