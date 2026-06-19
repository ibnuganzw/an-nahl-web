# LDF An-Nahl — FKH USK

Situs web **Lembaga Dakwah Fakultas An-Nahl**, Fakultas Kedokteran Hewan,
Universitas Syiah Kuala — _"Merawat hewan, menjaga iman."_

Aplikasi ini terdiri dari **situs publik** (profil lembaga, rubrik fikih
veteriner, kisah & kajian, agenda kegiatan, dan pendaftaran anggota) serta
**dashboard admin** untuk mengelola konten dan melihat data pendaftaran.

> **Status:** tahap UI. Seluruh halaman dan alur sudah berfungsi dengan data
> contoh (_mock_) di sisi klien. Form dan autentikasi belum tersambung ke
> backend — titik integrasi **Supabase** sudah disiapkan di lapisan data dan
> form untuk dikerjakan berikutnya.

## Teknologi

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — token desain dipusatkan di `app/globals.css`
- Font: Lora (serif), Plus Jakarta Sans (sans), Amiri (Arab)

## Menjalankan secara lokal

Butuh Node.js 20+.

```bash
npm install      # pasang dependensi
npm run dev      # server pengembangan di http://localhost:3000
```

Perintah lain:

```bash
npm run build    # build produksi
npm run start    # jalankan hasil build
npm run lint     # ESLint
```

## Struktur

```
app/
  (site)/              Situs publik (memakai Header + Footer bersama)
    page.tsx           Beranda
    fikih-veteriner/   Pojok Fikih Veteriner (daftar + detail + filter)
    kisah-kajian/      Ruang Kisah & Kajian
    agenda/            Agenda kegiatan + form pendaftaran
    gabung/            Form gabung anggota
    tentang/           Tentang lembaga
  admin/
    login/             Halaman masuk admin
    (panel)/           Dashboard (sidebar) — ringkasan & CRUD
      page.tsx         Ringkasan
      fikih/           CRUD Artikel Fikih
      kisah/           CRUD Kisah & Kajian
      agenda/          CRUD Agenda
      pendaftaran/     Data pendaftar (lihat saja)
  layout.tsx           Root layout (html, font, global styles)
  globals.css          Token warna/font + base styles

components/
  Header, Footer, GabungForm, FikihView, KisahView, AgendaView
  admin/               AdminDataProvider, Sidebar, AdminModal, PageHead, LoginForm
```

Pemisahan layout memakai **route group**: halaman publik berada di grup
`(site)` yang membawa Header/Footer, sedangkan area `/admin` punya tampilannya
sendiri (sidebar) tanpa chrome publik. Data admin dikelola di memori melalui
`AdminDataProvider` (React Context) sehingga operasi tambah/ubah/hapus
tercermin lintas halaman selama sesi berjalan.

## Catatan integrasi (berikutnya)

- **Autentikasi admin** — `components/admin/LoginForm.tsx` saat ini hanya
  mengarahkan ke dashboard; sambungkan ke Supabase Auth.
- **Data konten & pendaftaran** — ganti data contoh di
  `components/admin/AdminDataProvider.tsx` dan form publik dengan kueri Supabase.
