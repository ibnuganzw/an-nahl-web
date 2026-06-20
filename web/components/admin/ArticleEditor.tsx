"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Markdown from "@/components/Markdown";
import { adminField, adminLabel } from "@/components/admin/AdminModal";
import { useAdminData } from "@/components/admin/AdminDataProvider";
import type { ArticleRow } from "@/lib/supabase/types";

const CATS: Record<string, string> = {
  kesejahteraan: "Kesejahteraan Hewan",
  najis: "Najis & Medis",
  penyembelihan: "Penyembelihan Halal",
  lainnya: "Lainnya",
  kisah: "Kisah & Refleksi",
  kajian: "Kajian",
};
const FIKIH = ["kesejahteraan", "najis", "penyembelihan", "lainnya"];
const KISAH = ["kisah", "kajian"];

function makeSlug(judul: string) {
  const base = judul
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "artikel"}-${Date.now().toString(36).slice(-4)}`;
}

function ToolBtn({
  onClick,
  children,
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] font-semibold text-navy hover:bg-bg-soft"
    >
      {children}
    </button>
  );
}

export default function ArticleEditor() {
  const router = useRouter();
  const { refresh } = useAdminData();
  const [supabase] = useState(() => createClient());
  const taRef = useRef<HTMLTextAreaElement>(null);

  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [judul, setJudul] = useState("");
  const [slug, setSlug] = useState("");
  const [kategori, setKategori] = useState("kisah");
  const [penulis, setPenulis] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [gambar, setGambar] = useState("");
  const [konten, setKonten] = useState("");
  const [tanggal, setTanggal] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      await Promise.resolve();
      if (!active) return;
      const params = new URLSearchParams(window.location.search);
      const qid = params.get("id");
      const qkat = params.get("kategori");
      if (!qid) {
        if (qkat && qkat in CATS) setKategori(qkat);
        setLoading(false);
        return;
      }
      setId(qid);
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("id", qid)
        .single();
      if (!active) return;
      if (data) {
        const a = data as ArticleRow;
        setJudul(a.judul);
        setSlug(a.slug);
        setKategori(a.kategori);
        setPenulis(a.penulis ?? "");
        setStatus(a.status);
        setGambar(a.gambar_url ?? "");
        setKonten(a.konten ?? "");
        setTanggal(a.tanggal_publikasi);
      } else if (qkat && qkat in CATS) {
        setKategori(qkat);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [supabase]);

  async function upload(file: File): Promise<string | null> {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("artikel")
      .upload(path, file, { cacheControl: "3600" });
    if (upErr) return null;
    return supabase.storage.from("artikel").getPublicUrl(path).data.publicUrl;
  }

  async function handleHeaderFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setUploading(true);
    setError(null);
    const url = await upload(f);
    setUploading(false);
    if (!url) {
      setError("Upload gambar gagal. Pastikan bucket 'artikel' sudah dibuat.");
      return;
    }
    setGambar(url);
  }

  async function handleInlineFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setUploading(true);
    setError(null);
    const url = await upload(f);
    setUploading(false);
    if (!url) {
      setError("Upload gambar gagal. Pastikan bucket 'artikel' sudah dibuat.");
      return;
    }
    insertAtCursor(`\n\n![Tulis caption gambar di sini](${url})\n\n`);
  }

  function insertAtCursor(text: string) {
    const ta = taRef.current;
    if (!ta) {
      setKonten((k) => k + text);
      return;
    }
    const s = ta.selectionStart;
    const en = ta.selectionEnd;
    setKonten((k) => k.slice(0, s) + text + k.slice(en));
    requestAnimationFrame(() => {
      ta.focus();
      const pos = s + text.length;
      ta.setSelectionRange(pos, pos);
    });
  }

  function surround(before: string, after = before, placeholder = "teks") {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const en = ta.selectionEnd;
    const sel = konten.slice(s, en) || placeholder;
    setKonten((k) => k.slice(0, s) + before + sel + after + k.slice(en));
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      judul,
      slug: slug && slug.length > 0 ? slug : makeSlug(judul),
      kategori,
      penulis,
      status,
      gambar_url: gambar || null,
      konten,
      tanggal_publikasi:
        status === "published"
          ? tanggal ?? new Date().toISOString()
          : tanggal,
    };
    const res = id
      ? await supabase.from("articles").update(payload).eq("id", id)
      : await supabase.from("articles").insert(payload);
    setSaving(false);
    if (res.error) {
      setError("Gagal menyimpan: " + res.error.message);
      return;
    }
    await refresh();
    router.push(KISAH.includes(kategori) ? "/admin/kisah" : "/admin/fikih");
  }

  const backHref = KISAH.includes(kategori) ? "/admin/kisah" : "/admin/fikih";

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted">
        Memuat editor…
      </div>
    );
  }

  return (
    <form onSubmit={save}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-white/95 px-7 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="rounded-md px-2 py-1 text-sm font-semibold text-muted2 hover:text-navy"
          >
            ← Kembali
          </Link>
          <h1 className="m-0 font-serif text-[19px] font-semibold text-navy">
            {id ? "Edit artikel" : "Tulis artikel"}
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="cursor-pointer rounded-[10px] border border-border bg-white px-4 py-2 text-sm font-semibold text-navy"
          >
            {preview ? "Tulis" : "Pratinjau"}
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`rounded-[10px] bg-gold px-5 py-2 text-sm font-bold text-gold-on ${
              saving ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
          >
            {saving ? "Menyimpan…" : "Simpan"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-7 py-7">
        {error && (
          <p className="mb-5 rounded-[10px] bg-[#FBEAE8] px-3.5 py-2.5 text-[13px] font-medium text-[#C0392B]">
            {error}
          </p>
        )}

        <label className={adminLabel}>Judul</label>
        <input
          required
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul artikel"
          className={`${adminField} mb-4 !text-[17px] font-semibold`}
        />

        <div className="flex flex-wrap gap-4">
          <div className="min-w-[180px] flex-1">
            <label className={adminLabel}>Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={`${adminField} mb-4`}
            >
              <optgroup label="Fikih Veteriner">
                {FIKIH.map((k) => (
                  <option key={k} value={k}>
                    {CATS[k]}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Kisah & Kajian">
                {KISAH.map((k) => (
                  <option key={k} value={k}>
                    {CATS[k]}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div className="min-w-[150px] flex-1">
            <label className={adminLabel}>Status</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "draft" | "published")
              }
              className={`${adminField} mb-4`}
            >
              <option value="draft">Draf (belum tampil)</option>
              <option value="published">Terbit (tampil di situs)</option>
            </select>
          </div>
          <div className="min-w-[180px] flex-1">
            <label className={adminLabel}>Penulis</label>
            <input
              value={penulis}
              onChange={(e) => setPenulis(e.target.value)}
              placeholder="Nama penulis"
              className={`${adminField} mb-4`}
            />
          </div>
        </div>

        {/* Header image */}
        <label className={adminLabel}>Gambar header</label>
        <div className="mb-5">
          {gambar ? (
            <div className="relative overflow-hidden rounded-[12px] border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gambar} alt="Header" className="max-h-[260px] w-full object-cover" />
              <button
                type="button"
                onClick={() => setGambar("")}
                className="absolute right-3 top-3 cursor-pointer rounded-md bg-navy-dark/80 px-2.5 py-1 text-xs font-semibold text-white"
              >
                Hapus
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-dashed border-border bg-bg-soft py-8 text-sm font-semibold text-muted2 hover:border-navy">
              {uploading ? "Mengunggah…" : "+ Unggah gambar header"}
              <input
                type="file"
                accept="image/*"
                onChange={handleHeaderFile}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Toolbar */}
        <label className={adminLabel}>Isi artikel</label>
        <div className="flex flex-wrap items-center gap-1 rounded-t-[10px] border border-b-0 border-border bg-bg-soft px-2 py-1.5">
          <ToolBtn title="Sub-judul besar" onClick={() => insertAtCursor("\n## Sub-judul\n")}>
            H2
          </ToolBtn>
          <ToolBtn title="Sub-judul kecil" onClick={() => insertAtCursor("\n### Sub-judul\n")}>
            H3
          </ToolBtn>
          <span className="mx-1 h-5 w-px bg-border" />
          <ToolBtn title="Tebal" onClick={() => surround("**")}>
            <strong>B</strong>
          </ToolBtn>
          <ToolBtn title="Miring" onClick={() => surround("*")}>
            <em>I</em>
          </ToolBtn>
          <ToolBtn title="Kutipan" onClick={() => insertAtCursor("\n> Kutipan\n")}>
            &ldquo; &rdquo;
          </ToolBtn>
          <ToolBtn title="Daftar" onClick={() => insertAtCursor("\n- Poin\n- Poin\n")}>
            • List
          </ToolBtn>
          <span className="mx-1 h-5 w-px bg-border" />
          <label className="cursor-pointer rounded-md px-2.5 py-1.5 text-[13px] font-semibold text-teal hover:bg-teal-bg">
            🖼 Sisipkan gambar
            <input
              type="file"
              accept="image/*"
              onChange={handleInlineFile}
              className="hidden"
            />
          </label>
        </div>

        {preview ? (
          <div className="min-h-[360px] rounded-b-[10px] border border-border bg-white px-6 py-5 text-[17px] leading-[1.8] text-body">
            {konten.trim() ? (
              <Markdown>{konten}</Markdown>
            ) : (
              <p className="italic text-light">Belum ada isi untuk dipratinjau.</p>
            )}
          </div>
        ) : (
          <textarea
            ref={taRef}
            value={konten}
            onChange={(e) => setKonten(e.target.value)}
            rows={18}
            placeholder="Tulis isi artikel di sini. Pakai toolbar di atas untuk heading, tebal, miring, kutipan, dan menyisipkan gambar. Paragraf pertama dipakai sebagai ringkasan."
            className="block w-full resize-y rounded-b-[10px] border border-border bg-white px-4 py-3.5 font-mono text-[14px] leading-[1.7] text-navy"
          />
        )}

        <p className="mt-2.5 text-[12.5px] text-light">
          Tip: caption gambar = teks di dalam{" "}
          <code className="rounded bg-bg-soft px-1">![caption](…)</code>. Klik
          &ldquo;Pratinjau&rdquo; untuk melihat hasil akhir.
        </p>
      </div>
    </form>
  );
}
