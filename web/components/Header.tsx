"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/fikih-veteriner", label: "Fikih Veteriner" },
  { href: "/kisah-kajian", label: "Kisah & Kajian" },
  { href: "/agenda", label: "Agenda" },
  { href: "/tentang", label: "Tentang" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/[0.92] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-4 px-5 py-3">
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
        <nav className="flex flex-wrap items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "font-semibold text-navy"
                    : "font-medium text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/gabung"
          className="inline-flex items-center gap-2 rounded-[10px] bg-gold px-[18px] py-2.5 text-sm font-bold text-gold-on shadow-[0_1px_2px_rgba(20,30,50,0.08)]"
        >
          Gabung
        </Link>
      </div>
    </header>
  );
}
