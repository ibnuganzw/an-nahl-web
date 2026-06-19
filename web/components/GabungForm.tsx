"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type FormState = {
  nama: string;
  nim: string;
  angkatan: string;
  kontak: string;
  motivasi: string;
};

const EMPTY_FORM: FormState = {
  nama: "",
  nim: "",
  angkatan: "",
  kontak: "",
  motivasi: "",
};

const inputClass =
  "w-full rounded-[11px] border border-white/[0.14] bg-white px-[15px] py-[13px] text-[14.5px] text-navy";
const labelClass =
  "mb-[7px] block text-[12.5px] font-semibold text-form-label";

export default function GabungForm() {
  const [supabase] = useState(() => createClient());
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update =
    (name: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("member_applications")
      .insert({
        nama: form.nama,
        nim: form.nim,
        angkatan: form.angkatan,
        kontak: form.kontak,
        motivasi: form.motivasi,
      });

    setLoading(false);

    if (insertError) {
      setError(
        "Maaf, pendaftaran gagal terkirim. Periksa koneksi lalu coba lagi.",
      );
      return;
    }

    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
    setForm(EMPTY_FORM);
  };

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-[#D6E6E1] bg-white px-8 py-11 text-center shadow-[0_20px_50px_rgba(22,49,91,0.10)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-bg">
          <svg
            width="32"
            height="32"
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
        <h2 className="mb-3 font-serif text-2xl font-semibold text-navy">
          Alhamdulillah, terdaftar!
        </h2>
        <p className="mb-[26px] text-[15px] leading-[1.65] text-muted">
          Terima kasih,{" "}
          <strong className="text-navy">{form.nama || "calon anggota"}</strong>.
          Pendaftaranmu sudah kami terima — pengurus akan menghubungimu lewat
          WhatsApp untuk langkah berikutnya. Sampai jumpa di lingkaran An-Nahl.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/agenda"
            className="rounded-[11px] bg-navy px-[22px] py-3 text-sm font-semibold text-white"
          >
            Lihat agenda
          </Link>
          <button
            onClick={resetForm}
            className="cursor-pointer rounded-[11px] border border-[#D8DDE6] bg-bg-soft px-[22px] py-3 text-sm font-semibold text-navy"
          >
            Daftarkan teman
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
          Formulir pendaftaran
        </h2>
        <p className="mb-[26px] text-sm text-form-hint">
          Isi data berikut. Tim kami akan menghubungimu lewat WhatsApp.
        </p>

        <label className={labelClass}>Nama lengkap</label>
        <input
          type="text"
          required
          value={form.nama}
          onChange={update("nama")}
          placeholder="Nama kamu"
          className={`${inputClass} mb-[18px]`}
        />

        <div className="flex flex-wrap gap-[14px]">
          <div className="min-w-[140px] flex-[1_1_150px]">
            <label className={labelClass}>NIM</label>
            <input
              type="text"
              required
              value={form.nim}
              onChange={update("nim")}
              placeholder="22071010xxxxx"
              className={`${inputClass} mb-[18px]`}
            />
          </div>
          <div className="min-w-[120px] flex-[1_1_120px]">
            <label className={labelClass}>Angkatan</label>
            <select
              required
              value={form.angkatan}
              onChange={update("angkatan")}
              className={`${inputClass} mb-[18px]`}
            >
              <option value="">Pilih</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="lain">Lainnya</option>
            </select>
          </div>
        </div>

        <label className={labelClass}>Kontak (WhatsApp)</label>
        <input
          type="text"
          required
          value={form.kontak}
          onChange={update("kontak")}
          placeholder="08xx xxxx xxxx"
          className={`${inputClass} mb-[18px]`}
        />

        <label className={labelClass}>Motivasi bergabung</label>
        <textarea
          required
          value={form.motivasi}
          onChange={update("motivasi")}
          rows={4}
          placeholder="Ceritakan singkat kenapa kamu ingin bergabung…"
          className={`${inputClass} mb-6 resize-y leading-[1.6]`}
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
          {loading ? "Mengirim…" : "Kirim pendaftaran"}
        </button>
        <p className="mt-3.5 text-center text-xs text-form-footer">
          Data hanya digunakan untuk keperluan kaderisasi An-Nahl.
        </p>
      </div>
    </form>
  );
}
