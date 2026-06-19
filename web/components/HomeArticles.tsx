"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { mapArticle, type UiArticle } from "@/lib/articles";
import type { ArticleRow } from "@/lib/supabase/types";

const COVERS = [
  { bg: "linear-gradient(135deg,#1C3C6B,#16315B)", op: "rgba(255,255,255,0.25)" },
  { bg: "linear-gradient(135deg,#2F7E72,#256258)", op: "rgba(255,255,255,0.25)" },
  { bg: "linear-gradient(135deg,#C5A24D,#A8862F)", op: "rgba(255,255,255,0.30)" },
];

function homeCat(kategori: string) {
  if (kategori === "kisah")
    return { label: "Kisah", color: "text-gold", bg: "bg-gold-bg", href: "/kisah-kajian" };
  if (kategori === "kajian")
    return { label: "Kajian", color: "text-teal", bg: "bg-teal-bg", href: "/kisah-kajian" };
  return { label: "Fikih", color: "text-teal", bg: "bg-teal-bg", href: "/fikih-veteriner" };
}

export default function HomeArticles() {
  const [supabase] = useState(() => createClient());
  const [articles, setArticles] = useState<UiArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .order("tanggal_publikasi", { ascending: false })
          .limit(3)
          .abortSignal(AbortSignal.timeout(8000));
        if (!active) return;
        setArticles((data ?? []).map((r) => mapArticle(r as ArticleRow)));
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
    return <p className="py-4 text-muted">Memuat tulisan…</p>;
  }
  if (articles.length === 0) {
    return (
      <p className="py-4 text-muted">Belum ada tulisan untuk ditampilkan.</p>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
      {articles.map((a, i) => {
        const meta = homeCat(a.cat);
        const cover = COVERS[i % COVERS.length];
        return (
          <Link
            key={a.id}
            href={`${meta.href}?artikel=${a.id}`}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
          >
            <div
              className="flex h-[150px] items-end p-4"
              style={{ background: cover.bg }}
            >
              <span
                className="font-serif text-[42px] font-bold"
                style={{ color: cover.op }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-[22px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.04em] ${meta.color} ${meta.bg}`}
                >
                  {meta.label}
                </span>
                <span className="text-[13px] text-light">{a.readTime}</span>
              </div>
              <h3 className="m-0 font-serif text-[19px] font-semibold leading-[1.3] text-navy">
                {a.title}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
