"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/fikih-veteriner", label: "Fikih Veteriner" },
  { href: "/kisah-kajian", label: "Kisah & Kajian" },
  { href: "/agenda", label: "Agenda" },
  { href: "/tentang", label: "Tentang" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/[0.92] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1120px] items-center gap-4 px-5 py-3">
        <Link href="/" className="mr-auto flex items-center gap-3">
          <Image
            src="/logo-annahl.jpg"
            alt="LDF An-Nahl"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full object-cover shadow-[0_0_0_1px_#E6E9EF]"
          />
          <span className="flex flex-col leading-[1.1]">
            <span className="font-serif text-[17px] font-semibold tracking-[-0.01em] text-navy">
              LDF An-Nahl
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-light">
              FKH USK
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(link.href)
                  ? "font-semibold text-navy"
                  : "font-medium text-muted hover:text-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/gabung"
          className="hidden items-center gap-2 rounded-[10px] bg-gold px-[18px] py-2.5 text-sm font-bold text-gold-on shadow-[0_1px_2px_rgba(20,30,50,0.08)] transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Gabung
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-navy hover:bg-bg-soft md:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="mx-auto flex max-w-[1120px] flex-col gap-1 px-5 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-[15px] ${
                  isActive(link.href)
                    ? "bg-bg-soft font-semibold text-navy"
                    : "font-medium text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/gabung"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-gold px-[18px] py-3 text-sm font-bold text-gold-on"
            >
              Gabung
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
