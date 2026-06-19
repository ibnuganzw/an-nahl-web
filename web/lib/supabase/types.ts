// Tipe baris (row) tabel Supabase — dipakai bersama oleh situs publik & admin.

export type ArticleRow = {
  id: string;
  judul: string;
  slug: string;
  kategori: string;
  konten: string | null;
  gambar_url: string | null;
  penulis: string | null;
  tanggal_publikasi: string | null;
  status: "draft" | "published";
  created_at: string;
};

export type EventRow = {
  id: string;
  judul: string;
  deskripsi: string | null;
  tanggal: string | null; // "YYYY-MM-DD"
  waktu: string | null;
  lokasi: string | null;
  poster_url: string | null;
  kuota: number | null;
  type: string | null;
  filled: number;
  created_at: string;
};

export type MemberApplicationRow = {
  id: string;
  nama: string;
  nim: string;
  angkatan: string;
  motivasi: string | null;
  kontak: string | null;
  tanggal_daftar: string;
};

export type EventRegistrationRow = {
  id: string;
  event_id: string;
  nama: string;
  email: string | null;
  angkatan: string | null;
  nim: string | null;
  kontak: string | null;
  created_at: string;
};
