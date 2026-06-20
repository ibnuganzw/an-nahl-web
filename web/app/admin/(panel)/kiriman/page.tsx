"use client";

import { useState } from "react";
import PageHead from "@/components/admin/PageHead";
import AdminModal from "@/components/admin/AdminModal";
import { useAdminData, type Submission } from "@/components/admin/AdminDataProvider";
import { formatTanggalSingkat } from "@/lib/date-id";

export default function KirimanAdmin() {
  const { submissions, loading, approveSubmission, removeSubmission } =
    useAdminData();
  const [reading, setReading] = useState<Submission | null>(null);
  const [deleting, setDeleting] = useState<Submission | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <>
      <PageHead
        title="Kiriman"
        desc="Tulisan yang dikirim pengunjung situs. Tinjau, lalu setujui atau hapus."
      />

      <div className="p-7">
        {loading && <p className="mb-4 text-sm text-muted">Memuat kiriman…</p>}
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-soft text-[12px] font-bold uppercase tracking-[0.04em] text-light">
                <th className="px-5 py-3 font-bold">Judul</th>
                <th className="hidden px-5 py-3 font-bold sm:table-cell">Penulis</th>
                <th className="hidden px-5 py-3 font-bold lg:table-cell">Kontak</th>
                <th className="hidden px-5 py-3 font-bold md:table-cell">Masuk</th>
                <th className="px-5 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-light">
                    Belum ada kiriman masuk.
                  </td>
                </tr>
              )}
              {submissions.map((s) => (
                <tr key={s.id} className="border-b border-border align-top last:border-0">
                  <td className="max-w-[360px] px-5 py-4">
                    <div className="font-serif text-[15px] font-semibold leading-snug text-navy">
                      {s.judul}
                    </div>
                    <div className="mt-1 line-clamp-1 text-[13px] text-muted">
                      {s.konten}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted sm:table-cell">
                    {s.penulis || "—"}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-light lg:table-cell">
                    {s.kontak || "—"}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-light md:table-cell">
                    {formatTanggalSingkat(s.created_at) || "—"}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setReading(s)}
                      className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-navy hover:bg-bg-soft"
                    >
                      Baca
                    </button>
                    <button
                      onClick={() => setDeleting(s)}
                      className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-[#C0392B] hover:bg-[#FBEAE8]"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reading && (
        <AdminModal title={reading.judul} onClose={() => setReading(null)}>
          <div className="mb-3 text-[13px] text-light">
            Oleh <strong className="text-navy">{reading.penulis || "Anonim"}</strong>
            {reading.kontak ? ` · ${reading.kontak}` : ""} ·{" "}
            {formatTanggalSingkat(reading.created_at)}
          </div>
          <div className="mb-5 max-h-[50vh] overflow-y-auto whitespace-pre-wrap rounded-[10px] border border-border bg-bg-soft px-4 py-3.5 text-[14.5px] leading-[1.7] text-body">
            {reading.konten}
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setReading(null)}
              className="cursor-pointer rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted2"
            >
              Tutup
            </button>
            <button
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                await approveSubmission(reading.id);
                setBusy(false);
                setReading(null);
              }}
              className={`rounded-[10px] bg-gold px-5 py-2.5 text-sm font-bold text-gold-on ${
                busy ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              }`}
            >
              {busy ? "Memproses…" : "Setujui → jadi draf"}
            </button>
          </div>
          <p className="mt-3 text-center text-[12px] text-light">
            &ldquo;Setujui&rdquo; menyalin tulisan ini ke artikel sebagai draf (kategori Kisah) untuk kamu poles di editor, lalu menghapusnya dari daftar kiriman.
          </p>
        </AdminModal>
      )}

      {deleting && (
        <AdminModal title="Hapus kiriman?" onClose={() => setDeleting(null)}>
          <p className="m-0 mb-5 text-sm leading-[1.6] text-muted">
            Yakin ingin menghapus kiriman{" "}
            <strong className="text-navy">{deleting.judul}</strong>? Tindakan ini
            tidak bisa dibatalkan.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleting(null)}
              className="cursor-pointer rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted2"
            >
              Batal
            </button>
            <button
              onClick={async () => {
                await removeSubmission(deleting.id);
                setDeleting(null);
              }}
              className="cursor-pointer rounded-[10px] bg-[#C0392B] px-5 py-2.5 text-sm font-bold text-white"
            >
              Hapus
            </button>
          </div>
        </AdminModal>
      )}
    </>
  );
}
