"use client";

import { useState } from "react";
import PageHead from "@/components/admin/PageHead";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import { formatTanggalSingkat } from "@/lib/date-id";

type Tab = "anggota" | "peserta";

export default function PendaftaranAdmin() {
  const {
    loading,
    members,
    registrations,
    events,
    removeMember,
    removeRegistration,
  } = useAdminData();
  const [tab, setTab] = useState<Tab>("anggota");

  const eventName = (id: string) =>
    events.find((e) => e.id === id)?.judul ?? "(kegiatan dihapus)";

  return (
    <>
      <PageHead
        title="Pendaftaran"
        desc="Data calon anggota dan peserta kegiatan yang masuk."
      />

      <div className="p-7">
        <div className="mb-5 inline-flex gap-1 rounded-[11px] border border-border bg-white p-1">
          <button
            onClick={() => setTab("anggota")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "anggota" ? "bg-navy text-white" : "text-muted hover:text-navy"
            }`}
          >
            Anggota (Gabung)
            <span className="ml-2 text-xs opacity-80">{members.length}</span>
          </button>
          <button
            onClick={() => setTab("peserta")}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "peserta" ? "bg-navy text-white" : "text-muted hover:text-navy"
            }`}
          >
            Peserta Kegiatan
            <span className="ml-2 text-xs opacity-80">{registrations.length}</span>
          </button>
        </div>

        {loading && <p className="mb-4 text-sm text-muted">Memuat data…</p>}

        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-soft text-[12px] font-bold uppercase tracking-[0.04em] text-light">
                <th className="px-5 py-3 font-bold">Nama</th>
                <th className="hidden px-5 py-3 font-bold md:table-cell">NIM</th>
                <th className="hidden px-5 py-3 font-bold lg:table-cell">Angkatan</th>
                <th className="hidden px-5 py-3 font-bold sm:table-cell">Kontak</th>
                <th className="px-5 py-3 font-bold">
                  {tab === "anggota" ? "Motivasi" : "Kegiatan"}
                </th>
                <th className="px-5 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tab === "anggota" ? (
                <>
                  {members.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-sm text-light">
                        Belum ada pendaftar anggota.
                      </td>
                    </tr>
                  )}
                  {members.map((m) => (
                    <tr key={m.id} className="border-b border-border align-top last:border-0">
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-navy">{m.nama}</div>
                        <div className="text-xs text-light">
                          {formatTanggalSingkat(m.tanggal_daftar)}
                        </div>
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-muted md:table-cell">
                        {m.nim}
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-muted lg:table-cell">
                        {m.angkatan}
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-muted sm:table-cell">
                        {m.kontak}
                      </td>
                      <td className="max-w-[280px] px-5 py-4 text-[13px] leading-[1.5] text-muted">
                        {m.motivasi}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => removeMember(m.id)}
                          className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-[#C0392B] hover:bg-[#FBEAE8]"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {registrations.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-sm text-light">
                        Belum ada peserta kegiatan.
                      </td>
                    </tr>
                  )}
                  {registrations.map((p) => (
                    <tr key={p.id} className="border-b border-border align-top last:border-0">
                      <td className="px-5 py-4">
                        <div className="text-sm font-semibold text-navy">{p.nama}</div>
                        <div className="text-xs text-light">
                          {formatTanggalSingkat(p.created_at)}
                        </div>
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-muted md:table-cell">
                        {p.nim}
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-muted lg:table-cell">
                        {p.angkatan}
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-muted sm:table-cell">
                        {p.kontak}
                      </td>
                      <td className="max-w-[280px] px-5 py-4 text-[13px] leading-[1.5] text-navy">
                        {eventName(p.event_id)}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => removeRegistration(p.id)}
                          className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-[#C0392B] hover:bg-[#FBEAE8]"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
