import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client untuk dipakai di Client Components (browser).
 * Membaca kredensial publik dari environment (lihat .env.local).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
