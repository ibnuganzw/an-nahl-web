import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client untuk Client Components (browser).
 * Singleton + persistSession (localStorage) supaya sesi login bertahan
 * antar kunjungan/refresh — admin tidak perlu login ulang terus.
 */
let client: SupabaseClient | undefined;

export function createClient() {
  if (!client) {
    client = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storageKey: "annahl-auth",
        },
      },
    );
  }
  return client;
}
