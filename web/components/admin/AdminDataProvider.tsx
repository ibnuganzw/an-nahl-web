"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type {
  ArticleRow,
  ArticleSubmissionRow,
  EventRow,
  MemberApplicationRow,
  EventRegistrationRow,
} from "@/lib/supabase/types";

export type FikihCat = "kesejahteraan" | "najis" | "penyembelihan" | "lainnya";
export type KisahCat = "kisah" | "kajian";
export type EventType = "kajian" | "workshop" | "mabit" | "baksos";

export const FIKIH_CATS: Record<FikihCat, string> = {
  kesejahteraan: "Kesejahteraan Hewan",
  najis: "Najis & Medis",
  penyembelihan: "Penyembelihan Halal",
  lainnya: "Lainnya",
};
export const KISAH_CATS: Record<KisahCat, string> = {
  kisah: "Kisah & Refleksi",
  kajian: "Kajian",
};
export const EVENT_TYPES: Record<EventType, string> = {
  kajian: "Kajian Rutin",
  workshop: "Workshop",
  mabit: "Mabit",
  baksos: "Bakti Sosial",
};

export const isFikihCat = (k: string): k is FikihCat => k in FIKIH_CATS;
export const isKisahCat = (k: string): k is KisahCat => k in KISAH_CATS;

export type Article = {
  id: string;
  judul: string;
  slug: string;
  kategori: string;
  konten: string;
  penulis: string;
  status: "draft" | "published";
  tanggal_publikasi: string | null;
};

export type EventItem = {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string | null;
  waktu: string;
  lokasi: string;
  kuota: number;
  type: EventType;
  filled: number;
};

export type Member = {
  id: string;
  nama: string;
  nim: string;
  angkatan: string;
  kontak: string;
  motivasi: string;
  tanggal_daftar: string;
};

export type Registration = {
  id: string;
  event_id: string;
  nama: string;
  nim: string;
  angkatan: string;
  kontak: string;
  email: string;
  created_at: string;
};

export type Submission = {
  id: string;
  judul: string;
  penulis: string;
  kontak: string;
  konten: string;
  created_at: string;
};

export type ArticleDraft = Omit<Article, "id"> & { id?: string };
export type EventDraft = Omit<EventItem, "id"> & { id?: string };

type AdminData = {
  loading: boolean;
  error: string | null;
  articles: Article[];
  events: EventItem[];
  members: Member[];
  registrations: Registration[];
  submissions: Submission[];
  refresh: () => Promise<void>;
  approveSubmission: (id: string) => Promise<void>;
  removeSubmission: (id: string) => Promise<void>;
  saveArticle: (d: ArticleDraft) => Promise<void>;
  removeArticle: (id: string) => Promise<void>;
  saveEvent: (d: EventDraft) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
  removeRegistration: (id: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminContext = createContext<AdminData | null>(null);

const mapArticle = (r: ArticleRow): Article => ({
  id: r.id,
  judul: r.judul,
  slug: r.slug,
  kategori: r.kategori,
  konten: r.konten ?? "",
  penulis: r.penulis ?? "",
  status: r.status,
  tanggal_publikasi: r.tanggal_publikasi,
});

const mapEvent = (r: EventRow): EventItem => ({
  id: r.id,
  judul: r.judul,
  deskripsi: r.deskripsi ?? "",
  tanggal: r.tanggal,
  waktu: r.waktu ?? "",
  lokasi: r.lokasi ?? "",
  kuota: r.kuota ?? 0,
  type: (r.type as EventType) ?? "kajian",
  filled: r.filled ?? 0,
});

const mapMember = (r: MemberApplicationRow): Member => ({
  id: r.id,
  nama: r.nama,
  nim: r.nim,
  angkatan: r.angkatan,
  kontak: r.kontak ?? "",
  motivasi: r.motivasi ?? "",
  tanggal_daftar: r.tanggal_daftar,
});

const mapRegistration = (r: EventRegistrationRow): Registration => ({
  id: r.id,
  event_id: r.event_id,
  nama: r.nama,
  nim: r.nim ?? "",
  angkatan: r.angkatan ?? "",
  kontak: r.kontak ?? "",
  email: r.email ?? "",
  created_at: r.created_at,
});

const mapSubmission = (r: ArticleSubmissionRow): Submission => ({
  id: r.id,
  judul: r.judul,
  penulis: r.penulis ?? "",
  kontak: r.kontak ?? "",
  konten: r.konten ?? "",
  created_at: r.created_at,
});

function makeSlug(judul: string) {
  const base = judul
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "artikel"}-${Date.now().toString(36).slice(-4)}`;
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [a, e, m, r, s] = await Promise.all([
        supabase.from("articles").select("*").order("tanggal_publikasi", { ascending: false, nullsFirst: false }),
        supabase.from("events").select("*").order("tanggal", { ascending: true }),
        supabase.from("member_applications").select("*").order("tanggal_daftar", { ascending: false }),
        supabase.from("event_registrations").select("*").order("created_at", { ascending: false }),
        supabase.from("article_submissions").select("*").order("created_at", { ascending: false }),
      ]);
      setArticles((a.data ?? []).map((row) => mapArticle(row as ArticleRow)));
      setEvents((e.data ?? []).map((row) => mapEvent(row as EventRow)));
      setMembers((m.data ?? []).map((row) => mapMember(row as MemberApplicationRow)));
      setRegistrations((r.data ?? []).map((row) => mapRegistration(row as EventRegistrationRow)));
      setSubmissions((s.data ?? []).map((row) => mapSubmission(row as ArticleSubmissionRow)));
      const firstErr = a.error || e.error || m.error || r.error || s.error;
      if (firstErr) setError(firstErr.message);
    } catch {
      setError("Gagal memuat data dari server.");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!active) return;
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setAuthed(true);
      refresh();
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.replace("/admin/login");
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase, router, refresh]);

  const saveArticle = async (d: ArticleDraft) => {
    const payload = {
      judul: d.judul,
      slug: d.slug && d.slug.length > 0 ? d.slug : makeSlug(d.judul),
      kategori: d.kategori,
      konten: d.konten,
      penulis: d.penulis,
      status: d.status,
      tanggal_publikasi:
        d.status === "published"
          ? d.tanggal_publikasi ?? new Date().toISOString()
          : d.tanggal_publikasi,
    };
    const res = d.id
      ? await supabase.from("articles").update(payload).eq("id", d.id)
      : await supabase.from("articles").insert(payload);
    if (res.error) throw new Error(res.error.message);
    await refresh();
  };

  const saveEvent = async (d: EventDraft) => {
    const payload = {
      judul: d.judul,
      deskripsi: d.deskripsi,
      tanggal: d.tanggal && d.tanggal.length > 0 ? d.tanggal : null,
      waktu: d.waktu,
      lokasi: d.lokasi,
      kuota: d.kuota,
      type: d.type,
      filled: d.filled,
    };
    const res = d.id
      ? await supabase.from("events").update(payload).eq("id", d.id)
      : await supabase.from("events").insert(payload);
    if (res.error) throw new Error(res.error.message);
    await refresh();
  };

  const removeRow = async (table: string, id: string) => {
    const res = await supabase.from(table).delete().eq("id", id);
    if (res.error) {
      setError(res.error.message);
      return;
    }
    await refresh();
  };

  const approveSubmission = async (id: string) => {
    const sub = submissions.find((x) => x.id === id);
    if (!sub) return;
    const ins = await supabase.from("articles").insert({
      judul: sub.judul,
      slug: makeSlug(sub.judul),
      kategori: "kisah",
      konten: sub.konten,
      penulis: sub.penulis,
      status: "draft",
      tanggal_publikasi: null,
    });
    if (ins.error) {
      setError(ins.error.message);
      return;
    }
    await supabase.from("article_submissions").delete().eq("id", id);
    await refresh();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-soft text-muted">
        Memeriksa sesi…
      </div>
    );
  }
  if (!authed) return null;

  const value: AdminData = {
    loading,
    error,
    articles,
    events,
    members,
    registrations,
    submissions,
    refresh,
    approveSubmission,
    removeSubmission: (id) => removeRow("article_submissions", id),
    saveArticle,
    removeArticle: (id) => removeRow("articles", id),
    saveEvent,
    removeEvent: (id) => removeRow("events", id),
    removeMember: (id) => removeRow("member_applications", id),
    removeRegistration: (id) => removeRow("event_registrations", id),
    signOut,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminContext);
  if (!ctx)
    throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
