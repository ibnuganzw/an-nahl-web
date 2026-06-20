"use client";

import { useState } from "react";
import Link from "next/link";
import PageHead from "@/components/admin/PageHead";
import AdminModal from "@/components/admin/AdminModal";
import {
  KISAH_CATS,
  isKisahCat,
  useAdminData,
  type Article,
  type KisahCat,
} from "@/components/admin/AdminDataProvider";
import { formatTanggalSingkat } from "@/lib/date-id";

const CAT_BADGE: Record<KisahCat, string> = {
  kisah: "bg-gold-bg text-gold",
  kajian: "bg-[#EAEEF5] text-navy",
};

export default function KisahAdmin() {
  const { articles, loading, removeArticle } = useAdminData();
  const kisah = articles.filter((a) => isKisahCat(a.kategori));
  const [deleting, setDeleting] = useState<Article | null>(null);

  return (
    <>
      <PageHead
        title="Kisah & Kajian"
        desc="Kelola tulisan refleksi dan kajian An-Nahl."
        action={
          <Link
            href="/admin/artikel?kategori=kisah"
            className="cursor-pointer rounded-[10px] bg-navy px-[18px] py-2.5 text-sm font-semibold text-white"
          >
            + Tambah tulisan
          </Link>
        }
      />

      <div className="p-7">
        {loading && <p className="mb-4 text-sm text-muted">Memuat tulisan…</p>}
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-soft text-[12px] font-bold uppercase tracking-[0.04em] text-light">
                <th className="px-5 py-3 font-bold">Judul</th>
                <th className="hidden px-5 py-3 font-bold md:table-cell">Kategori</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="hidden px-5 py-3 font-bold lg:table-cell">Penulis</th>
                <th className="hidden px-5 py-3 font-bold sm:table-cell">Terbit</th>
                <th className="px-5 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kisah.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-light">
                    Belum ada tulisan.
                  </td>
                </tr>
              )}
              {kisah.map((a) => (
                <tr key={a.id} className="border-b border-border align-top last:border-0">
                  <td className="max-w-[360px] px-5 py-4">
                    <div className="font-serif text-[15px] font-semibold leading-snug text-navy">
                      {a.judul}
                    </div>
                    <div className="mt-1 line-clamp-1 text-[13px] text-muted">
                      {a.konten}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] ${
                        CAT_BADGE[a.kategori as KisahCat] ?? "bg-[#EEF0F3] text-muted"
                      }`}
                    >
                      {KISAH_CATS[a.kategori as KisahCat] ?? a.kategori}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] ${
                        a.status === "published"
                          ? "bg-teal-bg text-teal"
                          : "bg-[#EEF0F3] text-light"
                      }`}
                    >
                      {a.status === "published" ? "Terbit" : "Draf"}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted lg:table-cell">
                    {a.penulis}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-light sm:table-cell">
                    {formatTanggalSingkat(a.tanggal_publikasi) || "—"}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/artikel?id=${a.id}`}
                      className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-navy hover:bg-bg-soft"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleting(a)}
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

      {deleting && (
        <AdminModal title="Hapus tulisan?" onClose={() => setDeleting(null)}>
          <p className="m-0 mb-5 text-sm leading-[1.6] text-muted">
            Yakin ingin menghapus{" "}
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
                await removeArticle(deleting.id);
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
