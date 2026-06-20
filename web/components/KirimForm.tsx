"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type FormState = {
  judul: string;
  penulis: string;
  kontak: string;
  konten: string;
};

const EMPTY_FORM: FormState = { judul: "", penulis: "", kontak: "", konten: "" };

const inputClass =
  "w-full rounded-[11px] border border-white/[0.14] bg-white px-[15px] py-[13px] text-[14.5px] text-navy";
const labelClass =
  "mb-[7px] block text-[12.5px] font-semibold text-form-label";

export default function KirimForm() {
  const [supabase] = useState(() => createClient());
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (name: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: insertError } = await supabase
      .from("article_submissions")
      .insert({
        judul: form.judul,
        penulis: form.penulis,
        kontak: form.kontak,
        konten: form.konten,
      });
    setLoading(false);
    if (insertError) {
      setError("Maaf, tulisan gagal terkirim. Periksa koneksi lalu coba lagi.");
      return;
    }
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-[#D6E6E1] bg-white px-8 py-11 text-center shadow-[0_20px_50px_rgba(22,49,91,0.10)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-bg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F7E72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mb-3 font-serif text-2xl font-semibold text-navy">
          Jazākallāhu khairan!
        </h2>
        <p className="mb-[26px] text-[15px] leading-[1.65] text-muted">
          Tulisanmu sudah kami terima. Tim redaksi An-Nahl akan membacanya, dan
          bila sesuai akan ditampilkan di situs. Terima kasih sudah berbagi.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/kisah-kajian" className="rounded-[11px] bg-navy px-[22px] py-3 text-sm font-semibold text-white">
            Lihat Kisah & Kajian
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm(EMPTY_FORM);
            }}
            className="cursor-pointer rounded-[11px] border border-[#D8DDE6] bg-bg-soft px-[22px] py-3 text-sm font-semibold text-navy"
          >
            Kirim tulisan lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[22px] bg-navy p-[clamp(26px,4vw,38px)] shadow-[0_20px_50px_rgba(22,49,91,0.18)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(420px 220px at 100% 0%, rgba(197,162,77,0.16), transparent 60%)",
        }}
      />
      <div className="relative">
        <h2 className="mb-1.5 font-serif text-2xl font-semibold text-white">
          Kirim tulisanmu
        </h2>
        <p className="mb-[26px] text-sm text-form-hint">
          Refleksi, kisah, atau kajian. Redaksi akan meninjau sebelum tayang.
        </p>

        <label className={labelClass}>Judul tulisan</label>
        <input
          type="text"
          required
          value={form.judul}
          onChange={update("judul")}
          placeholder="Judul yang menggambarkan isi tulisan"
          className={`${inputClass} mb-[18px]`}
        />

        <div className="flex flex-wrap gap-[14px]">
          <div className="min-w-[150px] flex-[1_1_180px]">
            <label className={labelClass}>Nama penulis</label>
            <input
              type="text"
              required
              value={form.penulis}
              onChange={update("penulis")}
              placeholder="Nama kamu"
              className={`${inputClass} mb-[18px]`}
            />
          </div>
          <div className="min-w-[150px] flex-[1_1_180px]">
            <label className={labelClass}>Kontak (opsional)</label>
            <input
              type="text"
              value={form.kontak}
              onChange={update("kontak")}
              placeholder="WhatsApp / email"
              className={`${inputClass} mb-[18px]`}
            />
          </div>
        </div>

        <label className={labelClass}>Isi tulisan</label>
        <textarea
          required
          value={form.konten}
          onChange={update("konten")}
          rows={12}
          placeholder="Tulis isi lengkapnya di sini…"
          className={`${inputClass} mb-6 resize-y leading-[1.7]`}
        />

        {error && (
          <p className="mb-3.5 rounded-[10px] bg-[#FBEAE8] px-3.5 py-2.5 text-center text-[13px] font-medium text-[#C0392B]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl border-none bg-gold p-[15px] text-[15px] font-bold text-gold-on ${
            loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
        >
          {loading ? "Mengirim…" : "Kirim tulisan"}
        </button>
        <p className="mt-3.5 text-center text-xs text-form-footer">
          Dengan mengirim, kamu mengizinkan An-Nahl menyunting & menayangkan tulisan ini.
        </p>
      </div>
    </form>
  );
}
