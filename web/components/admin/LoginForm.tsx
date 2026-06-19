"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@annahl.id");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only: autentikasi asli (Supabase) disambung belakangan.
    router.push("/admin");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-5 py-12">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(820px 380px at 88% -10%, rgba(197,162,77,0.18), transparent 60%), radial-gradient(640px 300px at -5% 110%, rgba(47,126,114,0.20), transparent 55%)",
        }}
      />
      <div className="relative w-full max-w-[400px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <Image
            src="/logo-annahl.jpg"
            alt="LDF An-Nahl"
            width={64}
            height={64}
            priority
            className="mb-4 h-16 w-16 rounded-full bg-white object-cover p-px shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          />
          <h1 className="m-0 font-serif text-[26px] font-bold text-white">
            Panel Admin An-Nahl
          </h1>
          <p className="m-0 mt-1.5 text-sm text-footer-text">
            Masuk untuk mengelola konten & pendaftaran.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[18px] border border-white/[0.1] bg-white p-7 shadow-[0_24px_60px_rgba(16,36,63,0.35)]"
        >
          <label className="mb-1.5 block text-[12.5px] font-semibold text-muted2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@annahl.id"
            className="mb-4 w-full rounded-[10px] border border-border bg-white px-3.5 py-3 text-sm text-navy"
          />

          <label className="mb-1.5 block text-[12.5px] font-semibold text-muted2">
            Kata sandi
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mb-5 w-full rounded-[10px] border border-border bg-white px-3.5 py-3 text-sm text-navy"
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-[11px] border-none bg-gold p-3.5 text-[15px] font-bold text-gold-on"
          >
            Masuk
          </button>

          <p className="mt-4 rounded-lg bg-bg-soft px-3 py-2.5 text-center text-xs leading-[1.5] text-muted2">
            Demo UI — klik <strong className="text-navy">Masuk</strong> untuk
            lanjut ke dashboard. Autentikasi Supabase disambung kemudian.
          </p>
        </form>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-[13px] font-medium text-footer-text hover:text-white"
          >
            ← Kembali ke situs
          </Link>
        </div>
      </div>
    </div>
  );
}
