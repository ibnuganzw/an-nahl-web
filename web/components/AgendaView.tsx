"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatTanggal } from "@/lib/date-id";
import type { EventRow } from "@/lib/supabase/types";

type EventType = "kajian" | "workshop" | "mabit" | "baksos";

type EventItem = {
  id: string;
  type: EventType;
  past: boolean;
  month: string;
  day: string;
  weekday: string;
  fullDate: string;
  time: string;
  location: string;
  quota: number;
  filled: number;
  title: string;
  desc: string;
};

const TYPES: Record<EventType, { label: string; c: string; wash: string }> = {
  kajian: { label: "Kajian Rutin", c: "#2F7E72", wash: "#E8F1EF" },
  workshop: { label: "Workshop", c: "#C5A24D", wash: "#F6EFDD" },
  mabit: { label: "Mabit", c: "#16315B", wash: "#EAEEF5" },
  baksos: { label: "Bakti Sosial", c: "#2F7E72", wash: "#E8F1EF" },
};

function typeOf(t: string | null): EventType {
  return t && t in TYPES ? (t as EventType) : "kajian";
}

function mapEvent(row: EventRow): EventItem {
  const d = formatTanggal(row.tanggal);
  return {
    id: row.id,
    type: typeOf(row.type),
    past: d.past,
    month: d.month,
    day: d.day,
    weekday: d.weekday,
    fullDate: d.full,
    time: row.waktu ?? "—",
    location: row.lokasi ?? "—",
    quota: row.kuota ?? 0,
    filled: row.filled ?? 0,
    title: row.judul,
    desc: row.deskripsi ?? "",
  };
}

function badgeStyle(type: EventType): CSSProperties {
  const k = TYPES[type];
  return {
    display: "inline-block",
    fontSize: "11.5px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: k.c,
    background: k.wash,
    padding: "4px 11px",
    borderRadius: 999,
  };
}

function posterStyle(e: EventItem): CSSProperties {
  const k = TYPES[e.type];
  const second = e.type === "workshop" ? "#A8862F" : "#0E2545";
  return {
    position: "relative",
    borderRadius: 20,
    minHeight: "clamp(220px,34vw,300px)",
    padding: "clamp(24px,4vw,40px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    background: `linear-gradient(150deg,${k.c}, ${second})`,
    overflow: "hidden",
  };
}

function quotaBarStyle(e: EventItem): CSSProperties {
  const pct = e.quota ? Math.round((e.filled / e.quota) * 100) : 0;
  return {
    height: "100%",
    width: `${Math.min(pct, 100)}%`,
    background: pct >= 100 ? "#C2C8D2" : TYPES[e.type].c,
    borderRadius: 999,
  };
}

const EMPTY_FORM = { nama: "", nim: "", angkatan: "", kontak: "" };
const inputClass =
  "w-full rounded-[10px] border border-white/[0.14] bg-white px-3.5 py-3 text-sm text-navy";
const labelClass = "mb-[7px] block text-[12.5px] font-semibold text-form-label";

export default function AgendaView() {
  const [supabase] = useState(() => createClient());
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await supabase
          .from("events")
          .select("*")
          .order("tanggal", { ascending: true })
          .abortSignal(AbortSignal.timeout(8000));
        if (active) setEvents((data ?? []).map((r) => mapEvent(r as EventRow)));
      } catch {
        /* biarkan kosong jika gagal */
      } finally {
        if (active) setLoadingEvents(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [supabase]);

  const open = (id: string) => {
    setSelectedId(id);
    setSubmitted(false);
    setError(null);
    setForm(EMPTY_FORM);
    setView("detail");
    window.scrollTo(0, 0);
  };
  const goList = () => {
    setView("list");
    window.scrollTo(0, 0);
  };
  const update =
    (name: keyof typeof EMPTY_FORM) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [name]: e.target.value }));

  const upcoming = events.filter((e) => !e.past);
  const past = events.filter((e) => e.past);
  const sel = events.find((e) => e.id === selectedId) ?? null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sel) return;
    setSending(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("event_registrations")
      .insert({
        event_id: sel.id,
        nama: form.nama,
        nim: form.nim,
        angkatan: form.angkatan,
        kontak: form.kontak,
      });

    setSending(false);
    if (insertError) {
      setError("Maaf, pendaftaran gagal terkirim. Coba lagi sebentar lagi.");
      return;
    }
    setSubmitted(true);
  };

  // ---------- DETAIL ----------
  if (view === "detail" && sel) {
    return (
      <div className="bg-[#FBFBFC]">
        <div className="mx-auto max-w-[1040px] px-5 pb-20 pt-7">
          <button
            onClick={goList}
            className="mb-6 inline-flex cursor-pointer items-center gap-[7px] text-sm font-semibold text-muted2"
          >
            ← Kembali ke Agenda
          </button>

          <div style={posterStyle(sel)}>
            {sel.past && (
              <span className="absolute right-[18px] top-[18px] rounded-full bg-black/35 px-[13px] py-1.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-white">
                Selesai
              </span>
            )}
            <span className="inline-block self-start rounded-full bg-white/[0.18] px-[13px] py-[5px] text-[11.5px] font-bold uppercase tracking-[0.06em] text-white">
              {TYPES[sel.type].label}
            </span>
            <h1 className="mt-3.5 max-w-[680px] font-serif text-[clamp(26px,4.5vw,40px)] font-bold leading-[1.15] tracking-[-0.01em] text-white">
              {sel.title}
            </h1>
          </div>

          <div className="mt-7 flex flex-wrap items-start gap-6">
            <div className="min-w-[300px] flex-[1_1_380px]">
              <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
                <div className="rounded-[14px] border border-border bg-white p-4">
                  <div className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.08em] text-light">
                    Tanggal
                  </div>
                  <div className="text-[15px] font-semibold text-navy">
                    {sel.fullDate}
                  </div>
                </div>
                <div className="rounded-[14px] border border-border bg-white p-4">
                  <div className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.08em] text-light">
                    Waktu
                  </div>
                  <div className="text-[15px] font-semibold text-navy">
                    {sel.time}
                  </div>
                </div>
                <div className="rounded-[14px] border border-border bg-white p-4">
                  <div className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.08em] text-light">
                    Lokasi
                  </div>
                  <div className="text-[15px] font-semibold text-navy">
                    {sel.location}
                  </div>
                </div>
                <div className="rounded-[14px] border border-border bg-white p-4">
                  <div className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.08em] text-light">
                    Kuota
                  </div>
                  <div className="text-[15px] font-semibold text-navy">
                    {sel.filled} / {sel.quota} peserta
                  </div>
                  <div className="mt-[9px] h-1.5 overflow-hidden rounded-full bg-[#EDEFF3]">
                    <div style={quotaBarStyle(sel)} />
                  </div>
                </div>
              </div>

              <h2 className="mb-3.5 font-serif text-[22px] font-semibold tracking-[-0.01em] text-navy">
                Tentang kegiatan
              </h2>
              <p className="mb-[18px] text-base leading-[1.75] text-body">
                {sel.desc}
              </p>
              <p className="m-0 text-base leading-[1.75] text-body">
                Kegiatan ini terbuka untuk seluruh mahasiswa Fakultas Kedokteran
                Hewan USK, baik anggota maupun non-anggota An-Nahl. Mohon hadir 10
                menit sebelum acara dimulai. Tautan grup koordinasi akan dikirim
                setelah pendaftaran.
              </p>
            </div>

            <div className="sticky top-20 min-w-[290px] flex-[1_1_320px]">
              {!submitted ? (
                <form
                  onSubmit={handleRegister}
                  className="rounded-[18px] bg-navy p-[26px]"
                >
                  <h3 className="mb-[5px] font-serif text-xl font-semibold text-white">
                    Daftar kegiatan
                  </h3>
                  <p className="mb-5 text-[13.5px] text-footer-text">
                    Isi data singkat berikut untuk mengamankan tempatmu.
                  </p>

                  <label className={labelClass}>Nama lengkap</label>
                  <input
                    type="text"
                    required
                    value={form.nama}
                    onChange={update("nama")}
                    placeholder="Nama kamu"
                    className={`${inputClass} mb-4`}
                  />

                  <label className={labelClass}>NIM</label>
                  <input
                    type="text"
                    required
                    value={form.nim}
                    onChange={update("nim")}
                    placeholder="Contoh: 2207101010001"
                    className={`${inputClass} mb-4`}
                  />

                  <label className={labelClass}>Angkatan</label>
                  <select
                    required
                    value={form.angkatan}
                    onChange={update("angkatan")}
                    className={`${inputClass} mb-4`}
                  >
                    <option value="">Pilih angkatan</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="lain">Lainnya</option>
                  </select>

                  <label className={labelClass}>Kontak (WhatsApp)</label>
                  <input
                    type="text"
                    required
                    value={form.kontak}
                    onChange={update("kontak")}
                    placeholder="08xx xxxx xxxx"
                    className={`${inputClass} mb-[22px]`}
                  />

                  {error && (
                    <p className="mb-3.5 rounded-[10px] bg-[#FBEAE8] px-3.5 py-2.5 text-center text-[13px] font-medium text-[#C0392B]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className={`w-full rounded-[11px] border-none bg-gold p-3.5 text-[15px] font-bold text-gold-on ${
                      sending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                    }`}
                  >
                    {sending ? "Mengirim…" : "Kirim pendaftaran"}
                  </button>
                  <p className="mt-3.5 text-center text-xs text-form-footer">
                    Data hanya digunakan untuk keperluan kegiatan An-Nahl.
                  </p>
                </form>
              ) : (
                <div className="rounded-[18px] border border-[#D6E6E1] bg-white px-[26px] py-[30px] text-center">
                  <div className="mx-auto mb-[18px] flex h-14 w-14 items-center justify-center rounded-full bg-teal-bg">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2F7E72"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mb-2.5 font-serif text-[21px] font-semibold text-navy">
                    Pendaftaran terkirim
                  </h3>
                  <p className="mb-5 text-[14.5px] leading-[1.6] text-muted">
                    Terima kasih,{" "}
                    <strong className="text-navy">
                      {form.nama || "peserta"}
                    </strong>
                    . Tempatmu sudah kami catat — info lanjutan akan dikirim via
                    WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm(EMPTY_FORM);
                    }}
                    className="cursor-pointer rounded-[10px] border border-[#D8DDE6] bg-bg-soft px-5 py-[11px] text-sm font-semibold text-navy"
                  >
                    Daftar lagi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- LIST ----------
  return (
    <div>
      <section className="mx-auto max-w-[1120px] px-5 pb-2 pt-14">
        <span className="mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-teal">
          Kegiatan An-Nahl
        </span>
        <h1 className="mb-4 font-serif text-[clamp(32px,5.5vw,48px)] font-bold leading-[1.1] tracking-[-0.015em] text-navy">
          Agenda
        </h1>
        <p className="m-0 max-w-[600px] text-[clamp(15px,2.2vw,17px)] leading-[1.7] text-muted">
          Kajian rutin, workshop, dan kegiatan syiar di lingkungan FKH USK.
          Terbuka untuk seluruh mahasiswa — daftar dan ikut bertumbuh bersama.
        </p>
      </section>

      {loadingEvents ? (
        <section className="mx-auto max-w-[1120px] px-5 py-16 text-muted">
          Memuat agenda…
        </section>
      ) : events.length === 0 ? (
        <section className="mx-auto max-w-[1120px] px-5 py-16">
          <div className="rounded-[18px] border border-dashed border-border bg-bg-soft px-6 py-14 text-center">
            <p className="m-0 text-[15px] text-muted">
              Belum ada agenda yang dijadwalkan. Pantau terus halaman ini, ya.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Upcoming */}
          <section className="mx-auto max-w-[1120px] px-5 pt-9">
            <div className="mb-[22px] flex items-center gap-3">
              <span className="inline-block h-[9px] w-[9px] rounded-full bg-teal" />
              <h2 className="m-0 font-serif text-[22px] font-bold text-navy">
                Akan datang
              </h2>
            </div>
            {upcoming.length === 0 ? (
              <p className="text-[15px] text-muted">
                Belum ada kegiatan mendatang saat ini.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {upcoming.map((e) => (
                  <div
                    key={e.id}
                    className="flex flex-wrap items-start gap-5 rounded-[18px] border border-border bg-white p-[22px]"
                  >
                    <div className="w-20 flex-none rounded-[14px] bg-navy px-2 py-4 text-center text-white">
                      <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-gold">
                        {e.month}
                      </div>
                      <div className="font-serif text-[34px] font-bold leading-none">
                        {e.day}
                      </div>
                      <div className="text-[11px] text-footer-text">
                        {e.weekday}
                      </div>
                    </div>
                    <div className="min-w-[240px] flex-[1_1_260px]">
                      <span style={badgeStyle(e.type)}>
                        {TYPES[e.type].label}
                      </span>
                      <h3 className="mb-2.5 mt-3 font-serif text-xl font-semibold leading-[1.3] text-navy">
                        {e.title}
                      </h3>
                      <div className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-muted2">
                        <span className="inline-flex items-center gap-1.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="flex-none text-teal"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                          </svg>
                          {e.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="flex-none text-teal"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {e.location}
                        </span>
                      </div>
                      <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
                        {e.desc}
                      </p>
                    </div>
                    <div className="flex flex-none items-center">
                      <button
                        onClick={() => open(e.id)}
                        className="inline-flex cursor-pointer items-center gap-[7px] whitespace-nowrap rounded-[10px] bg-gold px-[22px] py-3 text-sm font-bold text-gold-on"
                      >
                        Daftar →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past */}
          {past.length > 0 && (
            <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-11">
              <div className="mb-[22px] flex items-center gap-3">
                <span className="inline-block h-[9px] w-[9px] rounded-full bg-[#C2C8D2]" />
                <h2 className="m-0 font-serif text-[22px] font-bold text-light">
                  Sudah berlalu
                </h2>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                {past.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => open(e.id)}
                    className="flex cursor-pointer items-start gap-4 rounded-2xl border border-[#ECEEF2] bg-[#F8F9FB] p-[18px] text-left opacity-85"
                  >
                    <div className="w-16 flex-none rounded-xl bg-[#E7EAEF] px-1.5 py-3 text-center text-light">
                      <div className="text-[10.5px] font-bold uppercase tracking-[0.06em]">
                        {e.month}
                      </div>
                      <div className="font-serif text-[26px] font-bold leading-none text-muted">
                        {e.day}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="mb-[9px] inline-block rounded-full bg-[#E7EAEF] px-[9px] py-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] text-light">
                        Selesai · {TYPES[e.type].label}
                      </span>
                      <h3 className="mb-1.5 font-serif text-[17px] font-semibold leading-[1.3] text-muted">
                        {e.title}
                      </h3>
                      <span className="text-[13px] text-[#9AA3B2]">
                        {e.location}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
