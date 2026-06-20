"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase/client";
import { mapArticle, type UiArticle } from "@/lib/articles";
import type { ArticleRow } from "@/lib/supabase/types";
import Honeycomb from "@/components/Honeycomb";
import Markdown from "@/components/Markdown";

const FIKIH_CATS = ["kesejahteraan", "najis", "penyembelihan", "lainnya"];

const CATS: Record<string, { label: string; c: string; wash: string }> = {
  kesejahteraan: { label: "Kesejahteraan Hewan", c: "#2F7E72", wash: "#E8F1EF" },
  najis: { label: "Najis & Medis", c: "#16315B", wash: "#EAEEF5" },
  penyembelihan: { label: "Penyembelihan Halal", c: "#C5A24D", wash: "#F6EFDD" },
  lainnya: { label: "Lainnya", c: "#5B6573", wash: "#EEF0F3" },
};
const FALLBACK = { label: "Artikel", c: "#5B6573", wash: "#EEF0F3" };
const catMeta = (cat: string) => CATS[cat] ?? FALLBACK;

function badgeStyle(cat: string): CSSProperties {
  const k = catMeta(cat);
  return {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: k.c,
    background: k.wash,
    padding: "4px 11px",
    borderRadius: 999,
  };
}

const FILTER_DEFS = [
  { key: "all", label: "Semua" },
  ...FIKIH_CATS.map((k) => ({ key: k, label: CATS[k].label })),
];

export default function FikihView() {
  const [supabase] = useState(() => createClient());
  const [articles, setArticles] = useState<UiArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<"list" | "detail">("list");
  const [filter, setFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .in("kategori", FIKIH_CATS)
          .order("tanggal_publikasi", { ascending: false })
          .abortSignal(AbortSignal.timeout(8000));
        if (active) {
          const mapped = (data ?? []).map((r) => mapArticle(r as ArticleRow));
          setArticles(mapped);
          const params = new URLSearchParams(window.location.search);
          const cat = params.get("kategori");
          if (cat && FIKIH_CATS.includes(cat)) setFilter(cat);
          const target = params.get("artikel");
          if (target && mapped.some((a) => a.id === target)) {
            setSelectedId(target);
            setView("detail");
          }
        }
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

  const open = (id: string) => {
    setSelectedId(id);
    setView("detail");
    window.scrollTo(0, 0);
  };
  const goList = () => {
    setView("list");
    window.scrollTo(0, 0);
  };

  const filtered =
    filter === "all" ? articles : articles.filter((a) => a.cat === filter);
  const sel = articles.find((a) => a.id === selectedId) ?? null;
  const related = articles.filter((a) => a.id !== selectedId).slice(0, 3);

  // Kartu artikel editorial — aksen warna kategori, tanpa cover gradient.
  const ArticleCard = ({ a }: { a: UiArticle }) => (
    <button
      onClick={() => open(a.id)}
      style={{ borderTop: `3px solid ${catMeta(a.cat).c}` }}
      className="flex cursor-pointer flex-col rounded-[14px] border border-border border-t-[3px] bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(22,49,91,0.10)]"
    >
      {a.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={a.image}
          alt={a.title}
          className="mb-4 h-[160px] w-full rounded-[10px] object-cover"
        />
      )}
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span style={badgeStyle(a.cat)}>{catMeta(a.cat).label}</span>
        <span className="text-[12.5px] text-light">{a.readTime}</span>
      </div>
      <h3 className="mb-2 font-serif text-[19px] font-semibold leading-[1.3] text-navy">
        {a.title}
      </h3>
      <p className="m-0 text-[14.5px] leading-[1.6] text-muted">{a.summary}</p>
    </button>
  );

  // ---------- DETAIL ----------
  if (view === "detail" && sel) {
    return (
      <div>
        <div className="mx-auto max-w-[1120px] px-5 pt-8">
          <button
            onClick={goList}
            className="inline-flex cursor-pointer items-center gap-[7px] text-sm font-semibold text-muted2 hover:text-navy"
          >
            ← Kembali ke Pojok Fikih Veteriner
          </button>
        </div>
        <article className="mx-auto max-w-[720px] px-5 pb-2 pt-7">
          <span style={badgeStyle(sel.cat)}>{catMeta(sel.cat).label}</span>
          <h1 className="mb-5 mt-[18px] font-serif text-[clamp(28px,5vw,44px)] font-bold leading-[1.12] tracking-[-0.015em] text-navy">
            {sel.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3.5 pb-7">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-navy font-serif text-base font-semibold text-white">
              {sel.author.charAt(0)}
            </div>
            <div className="flex flex-col leading-[1.3]">
              <span className="text-[14.5px] font-semibold text-navy">
                {sel.author}
              </span>
              <span className="text-[13px] text-light">
                {sel.date} · {sel.readTime}
              </span>
            </div>
          </div>
          <div
            className="h-[3px] w-full rounded-full"
            style={{ background: catMeta(sel.cat).c }}
          />
        </article>

        {sel.image && (
          <div className="mx-auto mt-7 max-w-[860px] px-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sel.image}
              alt={sel.title}
              className="w-full rounded-[16px] border border-border"
            />
          </div>
        )}

        <article className="mx-auto max-w-[680px] px-5 pb-6 pt-9 text-[18px] leading-[1.8] text-body">
          {sel.body.trim() ? (
            <Markdown>{sel.body}</Markdown>
          ) : (
            <p className="mb-6 italic text-light">Konten belum tersedia.</p>
          )}
        </article>

        {related.length > 0 && (
          <section className="mt-6 bg-bg-soft">
            <div className="mx-auto max-w-[1120px] px-5 pb-16 pt-12">
              <h2 className="mb-7 font-serif text-[clamp(22px,3.5vw,28px)] font-bold tracking-[-0.01em] text-navy">
                Artikel terkait
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
                {related.map((a) => (
                  <ArticleCard key={a.id} a={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // ---------- LIST ----------
  return (
    <div>
      {/* Intro band */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Honeycomb
          className="absolute right-0 top-0 h-[240px] w-[320px]"
          opacity={0.12}
          fade="top-right"
        />
        <div className="relative mx-auto max-w-[1120px] px-5 pb-12 pt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-9 flex-none bg-gold" />
            <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-gold">
              Rubrik Unggulan
            </span>
          </div>
          <h1 className="mb-4 max-w-[680px] font-serif text-[clamp(30px,5vw,46px)] font-bold leading-[1.08] tracking-[-0.015em]">
            Pojok Fikih Veteriner
          </h1>
          <p className="m-0 max-w-[600px] text-[clamp(15px,2.2vw,17px)] leading-[1.65] text-[#C5D0E0]">
            Tempat ilmu syar&apos;i berjumpa praktik kedokteran hewan — panduan
            ringkas, bersumber, dan dekat dengan keseharian mahasiswa FKH.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="mx-auto max-w-[1120px] px-5 pb-16 pt-9">
        <div className="mb-8 flex flex-wrap gap-2.5">
          {FILTER_DEFS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`cursor-pointer rounded-full border px-4 py-[9px] text-[13.5px] font-semibold transition-all ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-[#D8DDE6] bg-white text-muted hover:border-navy"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="py-10 text-muted">Memuat artikel…</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-border bg-bg-soft px-6 py-14 text-center">
            <p className="m-0 text-[15px] text-muted">
              Belum ada artikel pada kategori ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[18px]">
            {filtered.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
