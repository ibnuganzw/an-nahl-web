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
  type AgendaEvent,
  type EventType,
} from "@/components/admin/AdminDataProvider";

const TYPE_BADGE: Record<EventType, string> = {
  kajian: "bg-teal-bg text-teal",
  workshop: "bg-gold-bg text-gold",
  mabit: "bg-[#EAEEF5] text-navy",
  baksos: "bg-teal-bg text-teal",
};

type Draft = Omit<AgendaEvent, "id"> & { id?: number };

const EMPTY: Draft = {
  type: "kajian",
  title: "",
  fullDate: "",
  time: "16.00 WIB",
  location: "Mushalla FKH USK",
  quota: 50,
  filled: 0,
  past: false,
  desc: "",
};

export default function AgendaAdmin() {
  const { agenda, saveAgenda, removeAgenda } = useAdminData();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [deleting, setDeleting] = useState<AgendaEvent | null>(null);

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    saveAgenda(draft);
    setDraft(null);
  };

  return (
    <>
      <PageHead
        title="Agenda"
        desc="Kelola kegiatan, kuota, dan statusnya."
        action={
          <button
            onClick={() => setDraft({ ...EMPTY })}
            className="cursor-pointer rounded-[10px] bg-navy px-[18px] py-2.5 text-sm font-semibold text-white"
          >
            + Tambah kegiatan
          </button>
        }
      />

      <div className="p-7">
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-soft text-[12px] font-bold uppercase tracking-[0.04em] text-light">
                <th className="px-5 py-3 font-bold">Kegiatan</th>
                <th className="hidden px-5 py-3 font-bold md:table-cell">
                  Tipe
                </th>
                <th className="hidden px-5 py-3 font-bold lg:table-cell">
                  Jadwal
                </th>
                <th className="hidden px-5 py-3 font-bold sm:table-cell">
                  Kuota
                </th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {agenda.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-border last:border-0 align-top"
                >
                  <td className="max-w-[320px] px-5 py-4">
                    <div className="font-serif text-[15px] font-semibold leading-snug text-navy">
                      {e.title}
                    </div>
                    <div className="mt-1 text-[13px] text-muted">
                      {e.location}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] ${TYPE_BADGE[e.type]}`}
                    >
                      {EVENT_TYPES[e.type]}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted lg:table-cell">
                    {e.fullDate}
                    <div className="text-[13px] text-light">{e.time}</div>
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-muted sm:table-cell">
                    {e.filled}/{e.quota}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] ${
                        e.past
                          ? "bg-[#EEF0F3] text-light"
                          : "bg-teal-bg text-teal"
                      }`}
                    >
                      {e.past ? "Selesai" : "Akan datang"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setDraft({ ...e })}
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
              ))}
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
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
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
                <label className={adminLabel}>Status</label>
                <select
                  value={draft.past ? "past" : "upcoming"}
                  onChange={(e) =>
                    setDraft({ ...draft, past: e.target.value === "past" })
                  }
                  className={`${adminField} mb-4`}
                >
                  <option value="upcoming">Akan datang</option>
                  <option value="past">Selesai</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="min-w-[180px] flex-[2]">
                <label className={adminLabel}>Tanggal</label>
                <input
                  required
                  value={draft.fullDate}
                  onChange={(e) =>
                    setDraft({ ...draft, fullDate: e.target.value })
                  }
                  placeholder="Jum’at, 27 Juni 2026"
                  className={`${adminField} mb-4`}
                />
              </div>
              <div className="min-w-[120px] flex-1">
                <label className={adminLabel}>Waktu</label>
                <input
                  value={draft.time}
                  onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                  placeholder="16.00 WIB"
                  className={`${adminField} mb-4`}
                />
              </div>
            </div>

            <label className={adminLabel}>Lokasi</label>
            <input
              required
              value={draft.location}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              placeholder="Mushalla FKH USK"
              className={`${adminField} mb-4`}
            />

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
                  value={draft.quota}
                  onChange={(e) =>
                    setDraft({ ...draft, quota: Number(e.target.value) })
                  }
                  className={`${adminField} mb-4`}
                />
              </div>
            </div>

            <label className={adminLabel}>Deskripsi</label>
            <textarea
              value={draft.desc}
              onChange={(e) => setDraft({ ...draft, desc: e.target.value })}
              rows={3}
              placeholder="Deskripsi kegiatan…"
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
        <AdminModal title="Hapus kegiatan?" onClose={() => setDeleting(null)}>
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
                removeAgenda(deleting.id);
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
