import type { ArticleRow } from "./supabase/types";
import { formatTanggalSingkat } from "./date-id";

export type UiArticle = {
  id: string;
  cat: string;
  title: string;
  summary: string;
  body: string;
  readTime: string;
  author: string;
  date: string;
};

export function deriveSummary(konten: string | null): string {
  if (!konten) return "";
  const first = konten.split(/\n+/)[0].trim();
  return first.length <= 150 ? first : `${first.slice(0, 147).trimEnd()}…`;
}

export function deriveReadTime(konten: string | null): string {
  const words = (konten ?? "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} mnt baca`;
}

export function mapArticle(row: ArticleRow): UiArticle {
  return {
    id: row.id,
    cat: row.kategori,
    title: row.judul,
    summary: deriveSummary(row.konten),
    body: row.konten ?? "",
    readTime: deriveReadTime(row.konten),
    author: row.penulis ?? "Tim An-Nahl",
    date: formatTanggalSingkat(row.tanggal_publikasi),
  };
}

/** Pecah konten menjadi paragraf untuk dirender. */
export function paragraphs(body: string): string[] {
  return body
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}
