"use client";

import { useState } from "react";
import PageHead from "@/components/admin/PageHead";
import AdminModal, {
  adminField,
  adminLabel,
} from "@/components/admin/AdminModal";
import {
  KISAH_CATS,
  useAdminData,
  type KisahArticle,
  type KisahCat,
} from "@/components/admin/AdminDataProvider";

const CAT_BADGE: Record<KisahCat, string> = {
  kisah: "bg-gold-bg text-gold",
  kajian: "bg-[#EAEEF5] text-navy",
};

type Draft = Omit<KisahArticle, "id" | "date"> & { id?: number };

const EMPTY: Draft = {
  cat: "kisah",
  title: "",
  summary: "",
  author: "",
  readTime: "5 mnt baca",
};

export default function KisahAdmin() {
  const { kisah, saveKisah, removeKisah } = useAdminData();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [deleting, setDeleting] = useState<KisahArticle | null>(null);

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    saveKisah(draft);
    setDraft(null);
  };

  return (
    <>
      <PageHead
        title="Kisah & Kajian"
        desc="Kelola tulisan refleksi dan kajian An-Nahl."
        action={
          <button
            onClick={() => setDraft({ ...EMPTY })}
            className="cursor-pointer rounded-[10px] bg-navy px-[18px] py-2.5 text-sm font-semibold text-white"
          >
            + Tambah tulisan
          </button>
        }
      />

      <div className="p-7">
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-soft text-[12px] font-bold uppercase tracking-[0.04em] text-light">
                <th className="px-5 py-3 font-bold">Judul</th>
                <th className="hidden px-5 py-3 font-bold md:table-cell">
                  Kategori
                </th>
                <th className="hidden px-5 py-3 font-bold lg:table-cell">
                  Penulis
                </th>
                <th className="hidden px-5 py-3 font-bold sm:table-cell">
                  Tanggal
                </th>
                <th className="px-5 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kisah.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-border last:border-0 align-top"
                >
                  <td className="max-w-[360px] px-5 py-4">
                    <div className="font-serif text-[15px] font-semibold leading-snug text-navy">
                      {a.title}
                    </div>
                    <div className="mt-1 line-clamp-1 text-[13px] text-muted">
                      {a.summary}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] ${CAT_BADGE[a.cat]}`}
                    >
                      {KISAH_CATS[a.cat]}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted lg:table-cell">
                    {a.author}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-light sm:table-cell">
                    {a.date}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() =>
                        setDraft({
                          id: a.id,
                          cat: a.cat,
                          title: a.title,
                          summary: a.summary,
                          author: a.author,
                          readTime: a.readTime,
                        })
                      }
                      className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-navy hover:bg-bg-soft"
                    >
                      Edit
                    </button>
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

      {draft && (
        <AdminModal
          title={draft.id ? "Edit tulisan" : "Tambah tulisan"}
          onClose={() => setDraft(null)}
        >
          <form onSubmit={onSave}>
            <label className={adminLabel}>Judul</label>
            <input
              required
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Judul tulisan"
              className={`${adminField} mb-4`}
            />

            <div className="flex flex-wrap gap-4">
              <div className="min-w-[160px] flex-1">
                <label className={adminLabel}>Kategori</label>
                <select
                  value={draft.cat}
                  onChange={(e) =>
                    setDraft({ ...draft, cat: e.target.value as KisahCat })
                  }
                  className={`${adminField} mb-4`}
                >
                  {(Object.keys(KISAH_CATS) as KisahCat[]).map((k) => (
                    <option key={k} value={k}>
                      {KISAH_CATS[k]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-w-[140px] flex-1">
                <label className={adminLabel}>Estimasi baca</label>
                <input
                  value={draft.readTime}
                  onChange={(e) =>
                    setDraft({ ...draft, readTime: e.target.value })
                  }
                  placeholder="5 mnt baca"
                  className={`${adminField} mb-4`}
                />
              </div>
            </div>

            <label className={adminLabel}>Penulis</label>
            <input
              required
              value={draft.author}
              onChange={(e) => setDraft({ ...draft, author: e.target.value })}
              placeholder="Nama penulis"
              className={`${adminField} mb-4`}
            />

            <label className={adminLabel}>Ringkasan</label>
            <textarea
              required
              value={draft.summary}
              onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
              rows={3}
              placeholder="Ringkasan singkat tulisan…"
              className={`${adminField} mb-5 resize-y leading-[1.6]`}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="cursor-pointer rounded-[10px] border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted2"
              >
                Batal
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-[10px] bg-gold px-5 py-2.5 text-sm font-bold text-gold-on"
              >
                Simpan
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {deleting && (
        <AdminModal title="Hapus tulisan?" onClose={() => setDeleting(null)}>
          <p className="m-0 mb-5 text-sm leading-[1.6] text-muted">
            Yakin ingin menghapus{" "}
            <strong className="text-navy">{deleting.title}</strong>? Tindakan ini
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
              onClick={() => {
                removeKisah(deleting.id);
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
