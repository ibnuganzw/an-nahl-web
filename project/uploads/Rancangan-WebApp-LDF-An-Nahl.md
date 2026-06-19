# Rancangan Web App — LDF An-Nahl FKH USK

*Dokumen perencanaan untuk pengembangan mandiri (solo, sambil belajar coding)*

---

## 1. Visi Produk

Portal dua sisi untuk LDF An-Nahl: **publik** (dakwah & agenda terbuka untuk mahasiswa FKH) dan **internal** (pengurus mengelola konten & kegiatan).

Pembeda utama dari LDF fakultas lain: **persimpangan syariat Islam × kedokteran hewan**. Ini bukan portal dakwah generik — ini portal dakwah *khas FKH*.

**Prinsip kerja:** mulai kecil, jalan dulu, baru tumbuh. Hindari fitur ambisius di awal (bot WA, e-sertifikat otomatis, portal mentoring) karena akan bikin proyek mangkrak buat developer solo pemula.

---

## 2. Sejarah Organisasi *(DRAF CONTOH — wajib diganti dengan data asli)*

> ⚠️ Semua isi di bawah ini hanyalah **placeholder ilustratif**. Ganti tahun, nama, dan peristiwa dengan data sebenarnya dari arsip/senior An-Nahl sebelum dipublikasikan.

### Narasi (untuk halaman "Tentang → Sejarah")

> Lembaga Dakwah Fakultas (LDF) An-Nahl lahir dari kegelisahan sekelompok mahasiswa Fakultas Kedokteran Hewan Universitas Syiah Kuala yang merasa perlu adanya wadah dakwah yang dekat dengan keseharian dunia veteriner. Nama *An-Nahl* — yang berarti "lebah" — dipilih sebagai simbol kerja yang bermanfaat, tertib, dan menghasilkan kebaikan bagi sekitarnya, sebagaimana diisyaratkan dalam Al-Qur'an Surah An-Nahl.
>
> Berawal dari lingkaran kajian kecil [tahun berdiri], An-Nahl perlahan tumbuh menjadi UKM yang menaungi kegiatan kajian rutin, mentoring, dan syiar di lingkungan FKH USK. Sepanjang perjalanannya, An-Nahl konsisten mengusung gagasan bahwa merawat makhluk hidup dan menjaga keimanan adalah dua hal yang berjalan seiring.
>
> Hingga kini, An-Nahl terus berupaya menjadi rumah bagi mahasiswa FKH untuk bertumbuh secara spiritual sekaligus profesional.

*(Ganti seluruh paragraf di atas. Pertanyaan untuk diisi: kapan tepatnya berdiri? siapa penggagasnya? apa peristiwa awal yang penting? dari mana asal nama An-Nahl menurut versi resmi organisasi?)*

### Lini Masa (contoh — ganti isinya)

| Tahun | Peristiwa |
|-------|-----------|
| 20XX | Berdirinya LDF An-Nahl / lingkaran kajian pertama |
| 20XX | Resmi diakui sebagai UKM di lingkungan FKH USK |
| 20XX | Program/kegiatan unggulan pertama (mis. kajian akbar, mabit perdana) |
| 20XX | Tonggak penting lainnya |
| 2026 | Peluncuran web app An-Nahl |

### Data untuk dilengkapi
- Tahun & latar belakang berdirinya
- Asal-usul & makna nama "An-Nahl" versi resmi
- Pendiri / angkatan penggagas
- Visi-misi resmi (kutip persis dari AD/ART)
- Daftar ketua umum per periode (opsional, bagus untuk arsip)
- Foto dokumentasi awal (untuk ilustrasi halaman)

---

## 3. Fitur per Fase

### Fase 1 — MVP (target jadi & online)
Fokus: bangun eksistensi digital + jadi sarana belajar coding.

| Fitur | Keterangan |
|-------|------------|
| Beranda | Hero, sorotan Fikih Veteriner, kajian terbaru, agenda terdekat, CTA gabung |
| **Pojok Fikih Veteriner** | Rubrik unggulan: kesejahteraan hewan dalam Islam, fikih najis & medis, penyembelihan halal |
| Ruang Kisah & Kajian | Blog naratif (slice-of-life mahasiswa FKH) + artikel kajian, filter kategori |
| Agenda | Daftar kegiatan + detail event + form pendaftaran sederhana |
| Tentang | Profil UKM, **sejarah organisasi**, struktur, visi-misi |
| Gabung | Form pendaftaran calon anggota |
| Login Admin | Dashboard + CRUD artikel & agenda |

### Fase 2 — Ekspansi Internal *(setelah nyaman coding)*
- Portal Mentoring (Halaqah): kelompok mentoring, presensi, silabus
- User roles diperluas (tambah peran Mentor/Murabbi)
- Dokumentasi kegiatan

### Fase 3 — Otomatisasi *(jangka panjang)*
- Pengingat jadwal via email/WhatsApp
- E-sertifikat otomatis
- Katalog donasi & progress bar penggalangan dana

---

## 4. Hak Akses Pengguna

**Fase 1 — cukup 2 peran (jangan over-engineer):**

| Peran | Hak akses |
|-------|-----------|
| Admin | Kelola semua konten, agenda, dan user |
| Editor | Publikasi artikel & buat agenda |
| Pengunjung (tanpa login) | Baca artikel, lihat agenda, daftar kajian/gabung |

**Fase 2 — baru tambahkan:** Mentor/Murabbi (kelola mentoring) dan Anggota terdaftar (akses grup mentoring).

---

## 5. Stack Teknis

Dipilih karena: free tier cukup untuk UKM, dokumentasi melimpah, dan **sangat ramah dibantu AI** (cocok dengan caramu kerja).

| Bagian | Pilihan | Alasan |
|--------|---------|--------|
| Framework | Next.js (React) | Frontend + backend jadi satu, dok melimpah |
| Styling | Tailwind CSS | Cepat, tanpa file CSS terpisah |
| Database + Auth + Storage | Supabase | Semua dalam satu tempat, tanpa setup server |
| Hosting | Vercel | Gratis, deploy tinggal connect GitHub |
| Version control | GitHub | Wajib — backup + portofolio sekalian |

---

## 6. Struktur Data Awal (Supabase)

**Tabel `articles`** — untuk Fikih Veteriner & Kisah/Kajian
- id, judul, slug, kategori (fikih_veteriner / kisah / kajian), konten, gambar_url, penulis, tanggal_publikasi, status (draft/publish)

**Tabel `events`** — agenda
- id, judul, deskripsi, tanggal, waktu, lokasi, poster_url, kuota

**Tabel `event_registrations`** — pendaftar kajian
- id, event_id, nama, email/wa, angkatan

**Tabel `member_applications`** — calon anggota
- id, nama, nim, angkatan, motivasi, kontak, tanggal_daftar

---

## 7. Roadmap Belajar (realistis, waktu terbatas)

| Periode | Target | Yang dipelajari |
|---------|--------|-----------------|
| Minggu 1–2 | Setup + halaman statis (Beranda, Tentang) | Struktur Next.js, komponen React, Tailwind |
| Minggu 3–4 | Koneksi Supabase, tampilkan artikel & agenda | Database, fetch data, routing dinamis |
| Minggu 5–6 | Login admin + CRUD artikel/agenda | Auth, form, mutasi data |
| Minggu 7+ | Form pendaftaran, polish desain, deploy | Validasi form, deployment Vercel |

---

## 8. Catatan untuk Diri Sendiri

- **Satu fitur selesai dulu, baru lanjut.** Jangan kerjakan semua paralel.
- Manfaatkan AI untuk: setup project, debug error, jelaskan konsep yang asing, generate komponen.
- Aset visual (logo, ilustrasi) bisa pakai alur yang sudah kamu kuasai: generate di GPT Image → bersihkan background → pakai.
- Simpan ambisi Fase 2–3. Tahan diri. MVP yang *online* jauh lebih berharga daripada rencana megah yang tak pernah jadi.
