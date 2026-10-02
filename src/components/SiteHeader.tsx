"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, profile } from "@/data/site";

const SPY_IDS = ["journey", "field-notes", "research", "selected", "certifications", "contact"];

const NAV_SPY = new Set(nav.map((n) => hashOf(n.href)).filter(Boolean) as string[]);

function hashOf(href: string) {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i + 1);
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [spy, setSpy] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const id of SPY_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line) current = id;
      }
      if (atBottom && document.getElementById("contact")) current = "contact";
      setSpy(current && NAV_SPY.has(current) ? current : null);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const isCurrent = (href: string) => {
    const hash = hashOf(href);
    if (hash) return pathname === "/" && spy === hash;
    return pathname === href;
  };

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
                <Link
                  href={item.href}
                  className="nav-link px-0.5"
                  aria-current={isCurrent(item.href) ? "true" : undefined}
                >
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
                className="nav-link-mobile block py-3 font-display text-2xl"
                aria-current={isCurrent(item.href) ? "true" : undefined}
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
