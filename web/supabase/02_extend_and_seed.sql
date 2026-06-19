-- ============================================================
-- LDF An-Nahl — Migrasi kolom tambahan + data contoh
-- Jalankan SETELAH schema.sql, di SQL Editor. Aman diulang.
-- ============================================================

-- ---------- Kolom tambahan agar cocok dengan UI ----------
alter table public.events
  add column if not exists type   text,
  add column if not exists filled integer not null default 0;

alter table public.event_registrations
  add column if not exists nim    text,
  add column if not exists kontak text;

-- ============================================================
-- SEED (opsional) — agar halaman publik tidak kosong.
-- Hapus blok ini jika tidak ingin data contoh.
-- ============================================================

-- ---- events ----
insert into public.events (judul, deskripsi, tanggal, waktu, lokasi, kuota, type, filled)
select * from (values
  ('Kajian An-Nahl: Adab Merawat Makhluk Hidup', 'Kajian rutin pekanan membahas adab dan tuntunan Islam dalam memperlakukan hewan, dikaitkan dengan praktik kedokteran hewan sehari-hari.', date '2026-06-27', '16.00 WIB', 'Mushalla FKH USK', 60, 'kajian', 23),
  ('Bedah Fikih: Penyembelihan Halal & Praktiknya', 'Workshop setengah hari mengupas syarat sah penyembelihan, tadzkiyah, serta simulasi praktik yang sesuai tuntunan syariat.', date '2026-07-05', '08.30 WIB', 'Aula FKH USK', 40, 'workshop', 31),
  ('Mabit & Muhasabah Akhir Semester', 'Malam bina iman dan takwa untuk menutup semester: kajian, qiyamul lail, dan muhasabah bersama keluarga An-Nahl.', date '2026-07-19', '16.00 WIB', 'Asrama Mahasiswa USK', 50, 'mabit', 12),
  ('Kajian An-Nahl: Ikhlas dalam Belajar', 'Kajian tentang meluruskan niat dalam menuntut ilmu, agar setiap lembar catatan kuliah bernilai ibadah.', date '2026-05-24', '16.00 WIB', 'Mushalla FKH USK', 60, 'kajian', 54),
  ('Bakti Sosial & Pengobatan Hewan Gratis', 'Pengabdian masyarakat: pemeriksaan dan pengobatan hewan ternak gratis sekaligus syiar di desa binaan.', date '2026-05-10', '08.00 WIB', 'Desa Binaan, Aceh Besar', 80, 'baksos', 80)
) as v
where not exists (select 1 from public.events);

-- ---- articles (Fikih + Kisah/Kajian), status published ----
insert into public.articles (judul, slug, kategori, konten, penulis, tanggal_publikasi, status)
select * from (values
  ('Kesejahteraan hewan dalam Islam: antara rahmah dan amanah', 'kesejahteraan-hewan-dalam-islam', 'kesejahteraan', 'Islam menempatkan kasih sayang terhadap makhluk hidup sebagai bagian dari iman. Bagi calon dokter hewan, prinsip rahmah dan amanah menjadi kompas dalam setiap tindakan medis.', 'Tim Fikih An-Nahl', timestamptz '2026-06-12 09:00+07', 'published'),
  ('Mengenal batas najis mughallazhah dalam penanganan satwa', 'batas-najis-mughallazhah-satwa', 'najis', 'Panduan thaharah praktis ketika berhadapan dengan najis berat di ruang klinik, lengkap dengan cara menyucikannya menurut mazhab.', 'Tim Fikih An-Nahl', timestamptz '2026-06-08 09:00+07', 'published'),
  ('Syarat sah penyembelihan halal & etika tadzkiyah', 'syarat-sah-penyembelihan-halal', 'penyembelihan', 'Rukun, syarat, dan adab menyembelih yang sering terlewat dalam praktik. Memastikan setiap tahap sesuai tuntunan syariat.', 'Tim Fikih An-Nahl', timestamptz '2026-06-02 09:00+07', 'published'),
  ('Hukum kontak dengan air liur hewan saat pemeriksaan', 'hukum-kontak-air-liur-hewan', 'najis', 'Tinjauan fikih atas kontak medis dengan air liur hewan dan cara menyucikannya menurut pandangan para ulama.', 'Tim Fikih An-Nahl', timestamptz '2026-05-28 09:00+07', 'published'),
  ('Sujud di sela jadwal jaga: catatan seorang koass', 'sujud-di-sela-jadwal-jaga', 'kisah', 'Tentang malam-malam panjang di ruang klinik, dan bagaimana lelah berubah menjadi syukur ketika Subuh tiba.', 'Nadia A., ’22', timestamptz '2026-06-14 09:00+07', 'published'),
  ('Hari pertama memegang makhluk yang sekarat', 'hari-pertama-makhluk-sekarat', 'kisah', 'Tangan yang gemetar mengajarkan satu hal yang tak ada di buku teks: arti amanah terhadap nyawa makhluk.', 'Rizki F., ’21', timestamptz '2026-06-09 09:00+07', 'published'),
  ('Sabar sebagai bekal seorang penuntut ilmu', 'sabar-bekal-penuntut-ilmu', 'kajian', 'Menelusuri makna sabar dalam menuntut ilmu, dari ulama salaf hingga ruang kuliah hari ini.', 'Tim Kajian An-Nahl', timestamptz '2026-06-05 09:00+07', 'published')
) as v
where not exists (select 1 from public.articles);
