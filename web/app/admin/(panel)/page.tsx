"use client";

import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import {
  EVENT_TYPES,
  useAdminData,
} from "@/components/admin/AdminDataProvider";

export default function AdminOverview() {
  const { fikih, kisah, agenda, members, participants } = useAdminData();

  const upcoming = agenda.filter((e) => !e.past);

  const stats = [
    { label: "Artikel Fikih", value: fikih.length, href: "/admin/fikih", tone: "navy" },
    { label: "Kisah & Kajian", value: kisah.length, href: "/admin/kisah", tone: "gold" },
    { label: "Agenda mendatang", value: upcoming.length, href: "/admin/agenda", tone: "teal" },
    { label: "Pendaftar anggota", value: members.length, href: "/admin/pendaftaran", tone: "navy" },
  ];

  return (
    <>
      <PageHead
        title="Ringkasan"
        desc="Selamat datang kembali. Berikut gambaran singkat aktivitas An-Nahl."
      />

      <div className="p-7">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-[0_10px_30px_rgba(22,49,91,0.08)]"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    s.tone === "navy"
                      ? "bg-navy"
                      : s.tone === "gold"
                        ? "bg-gold"
                        : "bg-teal"
                  }`}
                />
                <span className="text-[13px] font-medium text-muted">
                  {s.label}
                </span>
              </div>
              <div className="font-serif text-[36px] font-bold leading-none text-navy">
                {s.value}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {/* Pendaftar terbaru */}
          <div className="rounded-2xl border border-border bg-white">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="m-0 font-serif text-[17px] font-semibold text-navy">
                Pendaftar terbaru
              </h2>
              <Link
                href="/admin/pendaftaran"
                className="text-[13px] font-semibold text-teal"
              >
                Lihat semua →
              </Link>
            </div>
            <div className="flex flex-col">
              {members.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-0"
                >
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-navy font-serif text-sm font-semibold text-white">
                    {m.nama.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-navy">
                      {m.nama}
                    </div>
                    <div className="text-xs text-light">
                      Angkatan {m.angkatan} · {m.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda akan datang */}
          <div className="rounded-2xl border border-border bg-white">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="m-0 font-serif text-[17px] font-semibold text-navy">
                Agenda akan datang
              </h2>
              <Link
                href="/admin/agenda"
                className="text-[13px] font-semibold text-teal"
              >
                Kelola →
              </Link>
            </div>
            <div className="flex flex-col">
              {upcoming.map((e) => (
                <div
                  key={e.id}
                  className="border-b border-border px-5 py-3 last:border-0"
                >
                  <div className="mb-1 text-sm font-semibold text-navy">
                    {e.title}
                  </div>
                  <div className="text-xs text-light">
                    {EVENT_TYPES[e.type]} · {e.fullDate} · {e.filled}/{e.quota}{" "}
                    peserta
                  </div>
                </div>
              ))}
              {participants.length > 0 && (
                <div className="px-5 py-3 text-xs text-muted2">
                  Total {participants.length} peserta kegiatan terdaftar.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
