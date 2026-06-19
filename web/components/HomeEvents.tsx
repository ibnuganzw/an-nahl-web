"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatTanggal } from "@/lib/date-id";
import type { EventRow } from "@/lib/supabase/types";

const EVENT_CAT: Record<string, { label: string; color: string; bg: string }> = {
  kajian: { label: "Kajian Rutin", color: "text-teal", bg: "bg-teal-bg" },
  workshop: { label: "Workshop", color: "text-gold", bg: "bg-gold-bg" },
  mabit: { label: "Mabit", color: "text-navy", bg: "bg-[#EAEEF5]" },
  baksos: { label: "Bakti Sosial", color: "text-teal", bg: "bg-teal-bg" },
};
const catOf = (t: string | null) =>
  (t && EVENT_CAT[t]) || { label: "Kegiatan", color: "text-teal", bg: "bg-teal-bg" };

export default function HomeEvents() {
  const [supabase] = useState(() => createClient());
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const { data } = await supabase
          .from("events")
          .select("*")
          .gte("tanggal", today)
          .order("tanggal", { ascending: true })
          .limit(2)
          .abortSignal(AbortSignal.timeout(8000));
        if (!active) return;
        setEvents((data ?? []) as EventRow[]);
      } catch {
        /* biarkan kosong jika gagal */
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [supabase]);

  if (loading) {
    return <p className="py-4 text-muted">Memuat agenda…</p>;
  }
  if (events.length === 0) {
    return (
      <p className="py-4 text-muted">Belum ada kegiatan mendatang.</p>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
      {events.map((e) => {
        const d = formatTanggal(e.tanggal);
        const cat = catOf(e.type);
        return (
          <div
            key={e.id}
            className="flex gap-[18px] rounded-2xl border border-border bg-white p-[22px]"
          >
            <div className="w-[72px] flex-none rounded-xl bg-navy px-2 py-3.5 text-center text-white">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-gold">
                {d.month}
              </div>
              <div className="font-serif text-[30px] font-bold leading-none">
                {d.day}
              </div>
              <div className="text-[11px] text-footer-text">{d.weekday}</div>
            </div>
            <div className="min-w-0 flex-1">
              <span
                className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.04em] ${cat.color} ${cat.bg}`}
              >
                {cat.label}
              </span>
              <h3 className="mb-2 mt-3 font-serif text-[19px] font-semibold text-navy">
                {e.judul}
              </h3>
              <p className="m-0 text-[13.5px] text-muted2">
                {e.waktu} · {e.lokasi}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
