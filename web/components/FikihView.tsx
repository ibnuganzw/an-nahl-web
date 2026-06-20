"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase/client";
import { mapArticle, paragraphs, type UiArticle } from "@/lib/articles";
import type { ArticleRow } from "@/lib/supabase/types";

const FIKIH_CATS = ["kesejahteraan", "najis", "penyembelihan", "lainnya"];

const CATS: Record<string, { label: string; c: string; wash: string }> = {
  kesejahteraan: { label: "Kesejahteraan Hewan", c: "#2F7E72", wash: "#E8F1EF" },
  najis: { label: "Najis & Medis", c: "#16315B", wash: "#EAEEF5" },
  penyembelihan: { label: "Penyembelihan Halal", c: "#C5A24D", wash: "#F6EFDD" },
  lainnya: { label: "Lainnya", c: "#5B6573", wash: "#EEF0F3" },
};
const FALLBACK = { label: "Artikel", c: "#5B6573", wash: "#EEF0F3" };
const catMeta = (cat: string) => CATS[cat] ?? FALLBACK;

const GLYPH: Record<string, string> = {
  kesejahteraan: "ﺭ",
  najis: "ط",
  penyembelihan: "ﺫ",
  lainnya: "ﺝ",
};
const glyphFor = (cat: string) => GLYPH[cat] ?? "﷽";

const DARKEN: Record<string, string> = {
  "#2F7E72": "#256258",
  "#16315B": "#0E2545",
  "#C5A24D": "#A8862F",
  "#5B6573": "#414956",
};
const darken = (c: string) => DARKEN[c] || c;

function coverStyle(c: string, h: number): CSSProperties {
  return {
    height: h,
    background: `linear-gradient(135deg,${c}, ${darken(c)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
  };
}

function heroStyle(c: string): CSSProperties {
  return {
    borderRadius: 16,
    height: "clamp(220px,42vw,360px)",
    background: `linear-gradient(135deg,${c}, ${darken(c)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function badgeStyle(cat: string): CSSProperties {
  const k = catMeta(cat);
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
          const target = new URLSearchParams(window.location.search).get("artikel");
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

  // ---------- DETAIL ----------
  if (view === "detail" && sel) {
    const body = paragraphs(sel.body);
    return (
      <div>
        <article className="mx-auto max-w-[760px] px-5 pb-2 pt-8">
          <button
            onClick={goList}
            className="mb-7 inline-flex cursor-pointer items-center gap-[7px] text-sm font-semibold text-muted2"
          >
            ← Kembali ke Pojok Fikih Veteriner
          </button>
          <div>
            <span style={badgeStyle(sel.cat)}>{catMeta(sel.cat).label}</span>
          </div>
          <h1 className="my-[18px] mb-5 font-serif text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] tracking-[-0.015em] text-navy">
            {sel.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3.5 border-b border-border pb-7">
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
        </article>

        <div className="mx-auto mt-7 max-w-[900px] px-5">
          <div style={heroStyle(catMeta(sel.cat).c)}>
            <span className="font-arabic text-[clamp(40px,8vw,72px)] text-white/90">
              {glyphFor(sel.cat)}
            </span>
          </div>
        </div>

        <article className="mx-auto max-w-[680px] px-5 pb-6 pt-10 text-[18px] leading-[1.8] text-body">
          {body.length > 0 ? (
            body.map((p, i) =>
              i === 0 ? (
                <p
                  key={i}
                  className="mb-6 font-serif text-[19px] font-semibold leading-[1.6] text-navy"
                >
                  {p}
                </p>
              ) : (
                <p key={i} className="mb-6">
                  {p}
                </p>
              ),
            )
          ) : (
            <p className="mb-6 italic text-light">Konten belum tersedia.</p>
          )}
        </article>

        {related.length > 0 && (
          <section className="mt-6 bg-bg-soft">
            <div className="mx-auto max-w-[1120px] px-5 pb-18 pt-14">
              <h2 className="mb-7 font-serif text-[clamp(22px,3.5vw,30px)] font-bold tracking-[-0.01em] text-navy">
                Artikel terkait
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
                {related.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => open(a.id)}
                    className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(22,49,91,0.10)]"
                  >
                    <div style={coverStyle(catMeta(a.cat).c, 150)}>
                      <span className="font-arabic text-[28px] text-white/85">
                        {glyphFor(a.cat)}
                      </span>
                    </div>
                    <div className="p-5">
                      <span style={badgeStyle(a.cat)}>{catMeta(a.cat).label}</span>
                      <h3 className="mt-3 font-serif text-[17.5px] font-semibold leading-[1.3] text-navy">
                        {a.title}
                      </h3>
                    </div>
                  </button>
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
      <section className="relative overflow-hidden bg-navy">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 360px at 88% -10%, rgba(197,162,77,0.16), transparent 60%), radial-gradient(700px 320px at -5% 110%, rgba(47,126,114,0.20), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1120px] px-5 pb-15 pt-14">
          <span className="mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-gold">
            ★ Rubrik Unggulan
          </span>
          <h1 className="mb-4 max-w-[680px] font-serif text-[clamp(32px,5.5vw,48px)] font-bold leading-[1.1] tracking-[-0.015em] text-white">
            Pojok Fikih Veteriner
          </h1>
          <p className="m-0 max-w-[600px] text-[clamp(15px,2.2vw,17px)] leading-[1.65] text-footer-text">
            Tempat ilmu syar&apos;i berjumpa praktik kedokteran hewan. Panduan
            ringkas, bersumber, dan dekat dengan keseharian mahasiswa FKH — dari
            kandang hingga ruang praktik.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-9">
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
                    : "border-[#D8DDE6] bg-white text-muted"
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[22px]">
            {filtered.map((a) => (
              <button
                key={a.id}
                onClick={() => open(a.id)}
                className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(22,49,91,0.10)]"
              >
                <div style={coverStyle(catMeta(a.cat).c, 150)}>
                  <span className="font-arabic text-[34px] text-white/85">
                    {glyphFor(a.cat)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-[22px]">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span style={badgeStyle(a.cat)}>{catMeta(a.cat).label}</span>
                    <span className="text-[13px] text-light">{a.readTime}</span>
                  </div>
                  <h3 className="mb-2.5 font-serif text-[19px] font-semibold leading-[1.3] text-navy">
                    {a.title}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
                    {a.summary}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
