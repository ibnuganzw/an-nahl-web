"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase/client";
import { mapArticle, paragraphs, type UiArticle } from "@/lib/articles";
import type { ArticleRow } from "@/lib/supabase/types";

const KISAH_CATS = ["kisah", "kajian"];

const CATS: Record<string, { label: string; c: string; wash: string }> = {
  kisah: { label: "Kisah & Refleksi", c: "#C5A24D", wash: "#F6EFDD" },
  kajian: { label: "Kajian", c: "#16315B", wash: "#EAEEF5" },
};
const FALLBACK = { label: "Tulisan", c: "#5B6573", wash: "#EEF0F3" };
const catMeta = (cat: string) => CATS[cat] ?? FALLBACK;

const GLYPH: Record<string, string> = { kisah: "ص", kajian: "ن" };
const glyphFor = (cat: string) => GLYPH[cat] ?? "ق";

const DARKEN: Record<string, string> = {
  "#C5A24D": "#A8862F",
  "#16315B": "#0E2545",
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

function featuredCoverStyle(c: string): CSSProperties {
  return {
    flex: "1 1 300px",
    minWidth: 260,
    minHeight: 240,
    background: `linear-gradient(135deg,${c}, ${darken(c)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  { key: "kisah", label: "Kisah & Refleksi" },
  { key: "kajian", label: "Kajian" },
];

export default function KisahView() {
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
          .in("kategori", KISAH_CATS)
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
  const featured = articles.find((a) => a.cat === "kisah") ?? articles[0] ?? null;
  const showFeatured =
    !!featured && (filter === "all" || filter === "kisah");
  const grid = filtered.filter(
    (a) => !(showFeatured && featured && a.id === featured.id),
  );
  const sel = articles.find((a) => a.id === selectedId) ?? null;
  const related = articles.filter((a) => a.id !== selectedId).slice(0, 3);

  // ---------- DETAIL ----------
  if (view === "detail" && sel) {
    const body = paragraphs(sel.body);
    return (
      <div>
        <article className="mx-auto max-w-[720px] px-5 pb-2 pt-8">
          <button
            onClick={goList}
            className="mb-7 inline-flex cursor-pointer items-center gap-[7px] text-sm font-semibold text-muted2"
          >
            ← Kembali ke Kisah &amp; Kajian
          </button>
          <div>
            <span style={badgeStyle(sel.cat)}>{catMeta(sel.cat).label}</span>
          </div>
          <h1 className="mb-[22px] mt-[18px] font-serif text-[clamp(28px,5vw,44px)] font-bold leading-[1.15] tracking-[-0.015em] text-navy">
            {sel.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3.5 border-b border-border pb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-serif text-[17px] font-semibold text-white">
              {sel.author.charAt(0)}
            </div>
            <div className="flex flex-col leading-[1.35]">
              <span className="text-[15px] font-semibold text-navy">
                {sel.author}
              </span>
              <span className="text-[13px] text-light">
                {sel.date} · {catMeta(sel.cat).label} · {sel.readTime}
              </span>
            </div>
          </div>
        </article>

        <div className="mx-auto mt-7 max-w-[880px] px-5">
          <div style={heroStyle(catMeta(sel.cat).c)}>
            <span className="font-arabic text-[clamp(40px,8vw,72px)] text-white/90">
              {glyphFor(sel.cat)}
            </span>
          </div>
        </div>

        <article className="mx-auto max-w-[680px] px-5 pb-6 pt-10 text-[19px] leading-[1.85] tracking-[0.002em] text-body">
          {body.length > 0 ? (
            body.map((p, i) =>
              i === 0 ? (
                <p
                  key={i}
                  className="mb-[26px] font-serif text-[21px] font-medium leading-[1.7] text-navy"
                >
                  {p}
                </p>
              ) : (
                <p key={i} className="mb-[26px]">
                  {p}
                </p>
              ),
            )
          ) : (
            <p className="mb-[26px] italic text-light">Konten belum tersedia.</p>
          )}
        </article>

        {related.length > 0 && (
          <section className="mt-6 bg-[#FBF8F2]">
            <div className="mx-auto max-w-[1120px] px-5 pb-18 pt-14">
              <h2 className="mb-7 font-serif text-[clamp(22px,3.5vw,30px)] font-bold tracking-[-0.01em] text-navy">
                Bacaan lain
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
                {related.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => open(a.id)}
                    className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#ECE6D8] bg-white text-left"
                  >
                    <div style={coverStyle(catMeta(a.cat).c, 156)}>
                      <span className="font-arabic text-[26px] text-white/85">
                        {glyphFor(a.cat)}
                      </span>
                    </div>
                    <div className="p-5">
                      <span style={badgeStyle(a.cat)}>{catMeta(a.cat).label}</span>
                      <h3 className="mb-1.5 mt-3 font-serif text-[17.5px] font-semibold leading-[1.3] text-navy">
                        {a.title}
                      </h3>
                      <span className="text-[13px] text-light">
                        {a.author} · {a.readTime}
                      </span>
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
    <div className="bg-[#FBF8F2]">
      <section className="mx-auto max-w-[1120px] px-5 pb-2 pt-14">
        <span className="mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-gold">
          Ruang baca An-Nahl
        </span>
        <h1 className="mb-4 max-w-[680px] font-serif text-[clamp(32px,5.5vw,48px)] font-bold leading-[1.1] tracking-[-0.015em] text-navy">
          Kisah &amp; Kajian
        </h1>
        <p className="m-0 max-w-[620px] text-[clamp(15px,2.2vw,17px)] leading-[1.7] text-muted">
          Catatan hati mahasiswa FKH — refleksi di sela praktikum, penelitian, dan
          ruang jaga — berdampingan dengan kajian Islam yang menemani perjalanan.
          Tempat berhenti sejenak, lalu melangkah lagi.
        </p>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 pt-7">
        <div className="flex flex-wrap gap-2.5">
          {FILTER_DEFS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`cursor-pointer rounded-full border px-4 py-[9px] text-[13.5px] font-semibold transition-all ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-[#E3DCCB] bg-white text-muted"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {loading ? (
        <section className="mx-auto max-w-[1120px] px-5 py-16 text-muted">
          Memuat tulisan…
        </section>
      ) : filtered.length === 0 ? (
        <section className="mx-auto max-w-[1120px] px-5 py-16">
          <div className="rounded-[18px] border border-dashed border-[#E3DCCB] bg-white px-6 py-14 text-center">
            <p className="m-0 text-[15px] text-muted">
              Belum ada tulisan pada kategori ini.
            </p>
          </div>
        </section>
      ) : (
        <>
          {showFeatured && featured && (
            <section className="mx-auto max-w-[1120px] px-5 pt-7">
              <button
                onClick={() => open(featured.id)}
                className="flex w-full cursor-pointer flex-wrap overflow-hidden rounded-[20px] border border-[#ECE6D8] bg-white text-left shadow-[0_14px_40px_rgba(22,49,91,0.06)]"
              >
                <div style={featuredCoverStyle(catMeta(featured.cat).c)}>
                  <span className="font-arabic text-[64px] text-white/90">
                    {glyphFor(featured.cat)}
                  </span>
                </div>
                <div className="flex min-w-[280px] flex-[1_1_320px] flex-col justify-center p-[clamp(24px,4vw,40px)]">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gold">
                      Sorotan
                    </span>
                    <span style={badgeStyle(featured.cat)}>
                      {catMeta(featured.cat).label}
                    </span>
                  </div>
                  <h2 className="mb-3.5 font-serif text-[clamp(24px,3.4vw,32px)] font-bold leading-[1.2] tracking-[-0.01em] text-navy">
                    {featured.title}
                  </h2>
                  <p className="mb-[22px] text-base leading-[1.65] text-muted">
                    {featured.summary}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-navy font-serif text-[15px] font-semibold text-white">
                      {featured.author.charAt(0)}
                    </div>
                    <div className="flex flex-col leading-[1.3]">
                      <span className="text-sm font-semibold text-navy">
                        {featured.author}
                      </span>
                      <span className="text-[13px] text-light">
                        {featured.date} · {featured.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </section>
          )}

          <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-8">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[22px]">
              {grid.map((a) => (
                <button
                  key={a.id}
                  onClick={() => open(a.id)}
                  className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#ECE6D8] bg-white text-left"
                >
                  <div style={coverStyle(catMeta(a.cat).c, 156)}>
                    <span className="font-arabic text-[32px] text-white/85">
                      {glyphFor(a.cat)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-[22px]">
                    <span style={badgeStyle(a.cat)}>{catMeta(a.cat).label}</span>
                    <h3 className="mb-2.5 mt-3 font-serif text-[19px] font-semibold leading-[1.3] text-navy">
                      {a.title}
                    </h3>
                    <p className="mb-[18px] text-[14.5px] leading-[1.6] text-muted">
                      {a.summary}
                    </p>
                    <div className="mt-auto flex items-center gap-[9px] text-[13px] text-light">
                      <span className="font-semibold text-muted2">
                        {a.author}
                      </span>
                      <span>·</span>
                      <span>{a.readTime}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
