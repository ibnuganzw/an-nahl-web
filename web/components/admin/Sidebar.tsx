"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminData } from "@/components/admin/AdminDataProvider";

const NAV = [
  {
    href: "/admin",
    label: "Ringkasan",
    icon: <path d="M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-6H3z" />,
  },
  {
    href: "/admin/fikih",
    label: "Artikel Fikih",
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
  },
  {
    href: "/admin/kisah",
    label: "Kisah & Kajian",
    icon: (
      <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </>
    ),
  },
  {
    href: "/admin/kiriman",
    label: "Kiriman",
    icon: (
      <>
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </>
    ),
  },
  {
    href: "/admin/agenda",
    label: "Agenda",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    href: "/admin/pendaftaran",
    label: "Pendaftaran",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAdminData();

  return (
    <aside className="sticky top-0 flex h-screen w-[244px] flex-none flex-col bg-navy-dark text-footer-text">
      <div className="flex items-center gap-3 px-5 py-5">
        <Image
          src="/logo-annahl.jpg"
          alt="LDF An-Nahl"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full bg-white object-cover p-px"
        />
        <span className="flex flex-col leading-[1.15]">
          <span className="font-serif text-[15px] font-semibold text-white">
            An-Nahl Admin
          </span>
          <span className="text-[11px] uppercase tracking-[0.06em] text-footer-sub">
            FKH USK
          </span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-gold text-gold-on"
                  : "text-footer-text hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <button
          onClick={signOut}
          className="flex w-full cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-footer-text hover:bg-white/[0.06] hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Keluar
        </button>
      </div>
    </aside>
  );
}
