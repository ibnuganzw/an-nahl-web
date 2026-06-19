"use client";

import { useState } from "react";
import PageHead from "@/components/admin/PageHead";
import AdminModal, {
  adminField,
  adminLabel,
} from "@/components/admin/AdminModal";
import {
  EVENT_TYPES,
  useAdminData,
  type EventItem,
  type EventDraft,
  type EventType,
} from "@/components/admin/AdminDataProvider";
import { formatTanggal } from "@/lib/date-id";

const TYPE_BADGE: Record<EventType, string> = {
  kajian: "bg-teal-bg text-teal",
  workshop: "bg-gold-bg text-gold",
  mabit: "bg-[#EAEEF5] text-navy",
  baksos: "bg-teal-bg text-teal",
};

const EMPTY: EventDraft = {
  judul: "",
  deskripsi: "",
  tanggal: "",
  waktu: "16.00 WIB",
  lokasi: "Mushalla FKH USK",
  kuota: 50,
  type: "kajian",
  filled: 0,
};

export default function AgendaAdmin() {
  const { events, loading, saveEvent, removeEvent } = useAdminData();
  const [draft, setDraft] = useState<EventDraft | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setFormError(null);
    try {
      await saveEvent(draft);
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
        title="Agenda"
        desc="Kelola kegiatan, jadwal, dan kuotanya."
        action={
          <button
            onClick={() => {
              setFormError(null);
              setDraft({ ...EMPTY });
            }}
            className="cursor-pointer rounded-[10px] bg-navy px-[18px] py-2.5 text-sm font-semibold text-white"
          >
            + Tambah kegiatan
          </button>
        }
      />

      <div className="p-7">
        {loading && <p className="mb-4 text-sm text-muted">Memuat agenda…</p>}
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-soft text-[12px] font-bold uppercase tracking-[0.04em] text-light">
                <th className="px-5 py-3 font-bold">Kegiatan</th>
                <th className="hidden px-5 py-3 font-bold md:table-cell">Tipe</th>
                <th className="hidden px-5 py-3 font-bold lg:table-cell">Jadwal</th>
                <th className="hidden px-5 py-3 font-bold sm:table-cell">Kuota</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-light">
                    Belum ada kegiatan.
                  </td>
                </tr>
              )}
              {events.map((e) => {
                const d = formatTanggal(e.tanggal);
                return (
                  <tr key={e.id} className="border-b border-border align-top last:border-0">
                    <td className="max-w-[320px] px-5 py-4">
                      <div className="font-serif text-[15px] font-semibold leading-snug text-navy">
                        {e.judul}
                      </div>
                      <div className="mt-1 text-[13px] text-muted">{e.lokasi}</div>
                    </td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] ${TYPE_BADGE[e.type]}`}
                      >
                        {EVENT_TYPES[e.type]}
                      </span>
                    </td>
                    <td className="hidden px-5 py-4 text-sm text-muted lg:table-cell">
                      {d.full}
                      <div className="text-[13px] text-light">{e.waktu}</div>
                    </td>
                    <td className="hidden px-5 py-4 text-sm text-muted sm:table-cell">
                      {e.filled}/{e.kuota}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] ${
                          d.past ? "bg-[#EEF0F3] text-light" : "bg-teal-bg text-teal"
                        }`}
                      >
                        {d.past ? "Selesai" : "Akan datang"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setFormError(null);
                          setDraft({ ...e });
                        }}
                        className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-navy hover:bg-bg-soft"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleting(e)}
                        className="cursor-pointer rounded-md px-2 py-1 text-[13px] font-semibold text-[#C0392B] hover:bg-[#FBEAE8]"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {draft && (
        <AdminModal
          title={draft.id ? "Edit kegiatan" : "Tambah kegiatan"}
          onClose={() => setDraft(null)}
        >
          <form onSubmit={onSave}>
            <label className={adminLabel}>Judul kegiatan</label>
            <input
              required
              value={draft.judul}
              onChange={(e) => setDraft({ ...draft, judul: e.target.value })}
              placeholder="Judul kegiatan"
              className={`${adminField} mb-4`}
            />

            <div className="flex flex-wrap gap-4">
              <div className="min-w-[150px] flex-1">
                <label className={adminLabel}>Tipe</label>
                <select
                  value={draft.type}
                  onChange={(e) =>
                    setDraft({ ...draft, type: e.target.value as EventType })
                  }
                  className={`${adminField} mb-4`}
                >
                  {(Object.keys(EVENT_TYPES) as EventType[]).map((k) => (
                    <option key={k} value={k}>
                      {EVENT_TYPES[k]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-w-[150px] flex-1">
                <label className={adminLabel}>Tanggal</label>
                <input
                  type="date"
                  required
                  value={draft.tanggal ?? ""}
                  onChange={(e) => setDraft({ ...draft, tanggal: e.target.value })}
                  className={`${adminField} mb-4`}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="min-w-[150px] flex-1">
                <label className={adminLabel}>Waktu</label>
                <input
                  value={draft.waktu}
                  onChange={(e) => setDraft({ ...draft, waktu: e.target.value })}
                  placeholder="16.00 WIB"
                  className={`${adminField} mb-4`}
                />
              </div>
              <div className="min-w-[180px] flex-[2]">
                <label className={adminLabel}>Lokasi</label>
                <input
                  required
                  value={draft.lokasi}
                  onChange={(e) => setDraft({ ...draft, lokasi: e.target.value })}
                  placeholder="Mushalla FKH USK"
                  className={`${adminField} mb-4`}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="min-w-[120px] flex-1">
                <label className={adminLabel}>Terisi</label>
                <input
                  type="number"
                  min={0}
                  value={draft.filled}
                  onChange={(e) =>
                    setDraft({ ...draft, filled: Number(e.target.value) })
                  }
                  className={`${adminField} mb-4`}
                />
              </div>
              <div className="min-w-[120px] flex-1">
                <label className={adminLabel}>Kuota</label>
                <input
                  type="number"
                  min={1}
                  value={draft.kuota}
                  onChange={(e) =>
                    setDraft({ ...draft, kuota: Number(e.target.value) })
                  }
                  className={`${adminField} mb-4`}
                />
              </div>
            </div>

            <label className={adminLabel}>Deskripsi</label>
            <textarea
              value={draft.deskripsi}
              onChange={(e) => setDraft({ ...draft, deskripsi: e.target.value })}
              rows={3}
              placeholder="Deskripsi kegiatan…"
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
        <AdminModal title="Hapus kegiatan?" onClose={() => setDeleting(null)}>
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
                await removeEvent(deleting.id);
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
