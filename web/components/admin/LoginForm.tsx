"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError("Email atau kata sandi salah, atau akun belum terdaftar.");
      return;
    }
    router.replace("/admin");
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mb-5 w-full rounded-[10px] border border-border bg-white px-3.5 py-3 text-sm text-navy"
          />

          {error && (
            <p className="mb-4 rounded-[10px] bg-[#FBEAE8] px-3.5 py-2.5 text-center text-[13px] font-medium text-[#C0392B]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-[11px] border-none bg-gold p-3.5 text-[15px] font-bold text-gold-on ${
              loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
          >
            {loading ? "Memproses…" : "Masuk"}
          </button>

          <p className="mt-4 rounded-lg bg-bg-soft px-3 py-2.5 text-center text-xs leading-[1.5] text-muted2">
            Gunakan akun admin yang terdaftar di Supabase Auth.
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
