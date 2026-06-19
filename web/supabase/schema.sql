-- ============================================================
-- LDF An-Nahl — Skema database Supabase
-- Jalankan di: Supabase Dashboard → SQL Editor → New query → Run
-- Aman dijalankan ulang (idempotent).
-- ============================================================

-- ---------- 1. member_applications (pendaftaran anggota) ----------
create table if not exists public.member_applications (
  id              uuid primary key default gen_random_uuid(),
  nama            text not null,
  nim             text not null,
  angkatan        text not null,
  motivasi        text,
  kontak          text,
  tanggal_daftar  timestamptz not null default now()
);

-- ---------- 2. articles (fikih / kisah / kajian) ----------
create table if not exists public.articles (
  id                 uuid primary key default gen_random_uuid(),
  judul              text not null,
  slug               text not null unique,
  kategori           text not null,
  konten             text,
  gambar_url         text,
  penulis            text,
  tanggal_publikasi  timestamptz,
  status             text not null default 'draft'
                       check (status in ('draft', 'published')),
  created_at         timestamptz not null default now()
);

-- ---------- 3. events (agenda kegiatan) ----------
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  judul       text not null,
  deskripsi   text,
  tanggal     date,
  waktu       text,
  lokasi      text,
  poster_url  text,
  kuota       integer,
  type        text,
  filled      integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------- 4. event_registrations (peserta kegiatan) ----------
create table if not exists public.event_registrations (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid not null references public.events(id) on delete cascade,
  nama        text not null,
  email       text,
  angkatan    text,
  nim         text,
  kontak      text,
  created_at  timestamptz not null default now()
);

create index if not exists idx_event_registrations_event_id
  on public.event_registrations (event_id);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.member_applications  enable row level security;
alter table public.articles              enable row level security;
alter table public.events                enable row level security;
alter table public.event_registrations   enable row level security;

-- ---- member_applications: publik boleh mendaftar (insert),
--      hanya pengguna terautentikasi (admin) yang boleh membaca/menghapus.
drop policy if exists "anon can apply" on public.member_applications;
create policy "anon can apply"
  on public.member_applications for insert
  to anon, authenticated
  with check (true);

drop policy if exists "auth can read applications" on public.member_applications;
create policy "auth can read applications"
  on public.member_applications for select
  to authenticated
  using (true);

drop policy if exists "auth can delete applications" on public.member_applications;
create policy "auth can delete applications"
  on public.member_applications for delete
  to authenticated
  using (true);

-- ---- articles: publik hanya melihat yang sudah 'published';
--      admin (authenticated) bebas mengelola.
drop policy if exists "public reads published articles" on public.articles;
create policy "public reads published articles"
  on public.articles for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "auth manages articles" on public.articles;
create policy "auth manages articles"
  on public.articles for all
  to authenticated
  using (true)
  with check (true);

-- ---- events: publik boleh melihat; admin mengelola.
drop policy if exists "public reads events" on public.events;
create policy "public reads events"
  on public.events for select
  to anon, authenticated
  using (true);

drop policy if exists "auth manages events" on public.events;
create policy "auth manages events"
  on public.events for all
  to authenticated
  using (true)
  with check (true);

-- ---- event_registrations: publik boleh mendaftar;
--      admin membaca & menghapus.
drop policy if exists "anon can register for event" on public.event_registrations;
create policy "anon can register for event"
  on public.event_registrations for insert
  to anon, authenticated
  with check (true);

drop policy if exists "auth reads registrations" on public.event_registrations;
create policy "auth reads registrations"
  on public.event_registrations for select
  to authenticated
  using (true);

drop policy if exists "auth deletes registrations" on public.event_registrations;
create policy "auth deletes registrations"
  on public.event_registrations for delete
  to authenticated
  using (true);
