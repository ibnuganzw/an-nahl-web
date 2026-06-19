"use client";

import { useState } from "react";
import PageHead from "@/components/admin/PageHead";
import AdminModal, {
  adminField,
  adminLabel,
} from "@/components/admin/AdminModal";
import {
  KISAH_CATS,
  isKisahCat,
  useAdminData,
  type Article,
  type ArticleDraft,
  type KisahCat,
} from "@/components/admin/AdminDataProvider";
import { formatTanggalSingkat } from "@/lib/date-id";

const CAT_BADGE: Record<KisahCat, string> = {
  kisah: "bg-gold-bg text-gold",
  kajian: "bg-[#EAEEF5] text-navy",
};

const EMPTY: ArticleDraft = {
  judul: "",
  slug: "",
  kategori: "kisah",
  konten: "",
  penulis: "",
  status: "draft",
  tanggal_publikasi: null,
};

export default function KisahAdmin() {
  const { articles, loading, saveArticle, removeArticle } = useAdminData();
  const kisah = articles.filter((a) => isKisahCat(a.kategori));

  const [draft, setDraft] = useState<ArticleDraft | null>(null);
  const [deleting, setDeleting] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setFormError(null);
    try {
      await saveArticle(draft);
      setDraft(null);
    } catch {
      setFormError("Gagal menyimpan. Pastikan kamu login sebagai admin.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHead
        title="Kisah & Kajian"
        desc="Kelola tulisan refleksi dan kajian An-Nahl."
        action={
          <button
            onClick={() => {
              setFormError(null);
              setDraft({ ...EMPTY });
            }}
            className="cursor-pointer rounded-[10px] bg-navy px-[18px] py-2.5 text-sm font-semibold text-white"
          >
            + Tambah tulisan
          </button>
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
                    <button
                      onClick={() => {
                        setFormError(null);
                        setDraft({ ...a });
                      }}
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
              value={draft.judul}
              onChange={(e) => setDraft({ ...draft, judul: e.target.value })}
              placeholder="Judul tulisan"
              className={`${adminField} mb-4`}
            />

            <div className="flex flex-wrap gap-4">
              <div className="min-w-[160px] flex-1">
                <label className={adminLabel}>Kategori</label>
                <select
                  value={isKisahCat(draft.kategori) ? draft.kategori : "kisah"}
                  onChange={(e) => setDraft({ ...draft, kategori: e.target.value })}
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
                <label className={adminLabel}>Status</label>
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft({ ...draft, status: e.target.value as Article["status"] })
                  }
                  className={`${adminField} mb-4`}
                >
                  <option value="draft">Draf (belum tampil)</option>
                  <option value="published">Terbit (tampil di situs)</option>
                </select>
              </div>
            </div>

            <label className={adminLabel}>Penulis</label>
            <input
              required
              value={draft.penulis}
              onChange={(e) => setDraft({ ...draft, penulis: e.target.value })}
              placeholder="Nama penulis"
              className={`${adminField} mb-4`}
            />

            <label className={adminLabel}>Isi tulisan</label>
            <textarea
              required
              value={draft.konten}
              onChange={(e) => setDraft({ ...draft, konten: e.target.value })}
              rows={7}
              placeholder="Tulis isi tulisan di sini. Paragraf pertama dipakai sebagai ringkasan di situs."
              className={`${adminField} mb-5 resize-y leading-[1.6]`}
            />

            {formError && (
              <p className="mb-4 rounded-[10px] bg-[#FBEAE8] px-3.5 py-2.5 text-center text-[13px] font-medium text-[#C0392B]">
                {formError}
              </p>
            )}

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
                disabled={saving}
                className={`rounded-[10px] bg-gold px-5 py-2.5 text-sm font-bold text-gold-on ${
                  saving ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
              >
                {saving ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          </form>
        </AdminModal>
      )}

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
