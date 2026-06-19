"use client";

import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import {
  EVENT_TYPES,
  isFikihCat,
  useAdminData,
} from "@/components/admin/AdminDataProvider";
import { formatTanggal, formatTanggalSingkat } from "@/lib/date-id";

export default function AdminOverview() {
  const { loading, articles, events, members, registrations } = useAdminData();

  const fikihCount = articles.filter((a) => isFikihCat(a.kategori)).length;
  const kisahCount = articles.length - fikihCount;
  const upcoming = events.filter((e) => !formatTanggal(e.tanggal).past);

  const stats = [
    { label: "Artikel Fikih", value: fikihCount, href: "/admin/fikih", tone: "navy" },
    { label: "Kisah & Kajian", value: kisahCount, href: "/admin/kisah", tone: "gold" },
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
        {loading && (
          <p className="mb-4 text-sm text-muted">Memuat data dari Supabase…</p>
        )}

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
              {members.length === 0 && (
                <div className="px-5 py-4 text-sm text-light">
                  Belum ada pendaftar.
                </div>
              )}
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
                      Angkatan {m.angkatan} ·{" "}
                      {formatTanggalSingkat(m.tanggal_daftar)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              {upcoming.length === 0 && (
                <div className="px-5 py-4 text-sm text-light">
                  Belum ada kegiatan mendatang.
                </div>
              )}
              {upcoming.map((e) => (
                <div
                  key={e.id}
                  className="border-b border-border px-5 py-3 last:border-0"
                >
                  <div className="mb-1 text-sm font-semibold text-navy">
                    {e.judul}
                  </div>
                  <div className="text-xs text-light">
                    {EVENT_TYPES[e.type]} · {formatTanggal(e.tanggal).full} ·{" "}
                    {e.filled}/{e.kuota} peserta
                  </div>
                </div>
              ))}
              {registrations.length > 0 && (
                <div className="px-5 py-3 text-xs text-muted2">
                  Total {registrations.length} peserta kegiatan terdaftar.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
