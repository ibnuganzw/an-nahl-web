import type { Metadata } from "next";
import Honeycomb from "@/components/Honeycomb";

export const metadata: Metadata = {
  title: "Tentang — LDF An-Nahl FKH USK",
  description:
    "Profil, sejarah, makna nama, dan struktur organisasi Lembaga Dakwah Fakultas An-Nahl FKH USK.",
};

const MISI = [
  "Menyelenggarakan kajian rutin yang memadukan ilmu syar'i dan dunia veteriner.",
  "Membina kader dakwah yang tangguh, tertib, dan bermanfaat seperti lebah.",
  "Menjadi wadah syiar dan pengabdian di lingkungan FKH dan masyarakat.",
];

const TIMELINE = [
  {
    year: "20XX",
    title: "Lingkaran kajian pertama",
    body: "Berawal dari kegelisahan sekelompok mahasiswa FKH USK akan perlunya wadah dakwah yang dekat dengan dunia veteriner.",
    last: false,
  },
  {
    year: "20XX",
    title: "Resmi menjadi UKM FKH USK",
    body: "An-Nahl diakui sebagai unit kegiatan mahasiswa, menaungi kajian rutin, mentoring, dan syiar di lingkungan fakultas.",
    last: false,
  },
  {
    year: "20XX",
    title: "Kegiatan unggulan perdana",
    body: "Penyelenggaraan kajian akbar / mabit perdana yang menandai tumbuhnya An-Nahl sebagai gerakan dakwah fakultas.",
    last: false,
  },
  {
    year: "2026",
    title: "Peluncuran web app An-Nahl",
    body: "An-Nahl melangkah ke ruang digital — portal dakwah, kajian, dan agenda untuk seluruh mahasiswa FKH USK.",
    last: true,
  },
];

const PENGURUS = [
  "Wakil Ketua",
  "Sekretaris",
  "Bendahara",
  "Kadiv Syiar",
  "Kadiv Kaderisasi",
  "Kadiv Kemuslimahan",
  "Kadiv Humas & Media",
];

function PersonIcon({
  size,
  stroke,
}: {
  size: number;
  stroke: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export default function Tentang() {
  return (
    <div className="bg-white">
      {/* 1. PROFIL */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Honeycomb
          className="absolute right-0 top-0 h-[260px] w-[340px]"
          opacity={0.12}
          fade="top-right"
        />
        <div className="relative mx-auto max-w-[1120px] px-5 pb-12 pt-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-9 flex-none bg-gold" />
            <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-gold">
              Tentang Kami
            </span>
          </div>
          <h1 className="mb-4 max-w-[720px] font-serif text-[clamp(30px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.015em]">
            Rumah bertumbuh mahasiswa FKH USK
          </h1>
          <p className="m-0 max-w-[600px] text-[clamp(15px,2.2vw,17.5px)] leading-[1.65] text-[#C5D0E0]">
            Lembaga Dakwah Fakultas (LDF) An-Nahl adalah UKM keislaman di
            Fakultas Kedokteran Hewan Universitas Syiah Kuala — wadah dakwah
            yang dekat dengan keseharian dunia veteriner, tempat mahasiswa
            tumbuh secara spiritual sekaligus profesional.
          </p>
        </div>
      </section>

      {/* VISI-MISI */}
      <section className="mx-auto max-w-[1120px] px-5 pb-2 pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          <div className="relative overflow-hidden rounded-[18px] bg-navy p-8">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(380px 200px at 100% 0%, rgba(197,162,77,0.16), transparent 60%)",
              }}
            />
            <span className="relative mb-3.5 block text-xs font-bold uppercase tracking-[0.12em] text-gold">
              Visi
            </span>
            <p className="relative m-0 font-serif text-[21px] font-medium leading-[1.5] text-white">
              Menjadi rumah dakwah yang membentuk mahasiswa FKH berakhlak mulia,
              berilmu, dan bermanfaat bagi sesama makhluk.
            </p>
            <p className="relative m-0 mt-[18px] text-[13px] italic text-form-footer">
              Contoh — sesuaikan dengan AD/ART resmi.
            </p>
          </div>
          <div className="rounded-[18px] border border-border bg-white p-8">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.12em] text-teal">
              Misi
            </span>
            <div className="flex flex-col gap-3.5">
              {MISI.map((misi, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal-bg text-[13px] font-bold text-teal">
                    {i + 1}
                  </span>
                  <span className="text-[15.5px] leading-[1.55] text-body">
                    {misi}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEJARAH — TIMELINE */}
      <section className="mx-auto max-w-[880px] px-5 pb-2 pt-18">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-[12.5px] font-bold uppercase tracking-[0.14em] text-teal">
            Perjalanan kami
          </span>
          <h2 className="m-0 font-serif text-[clamp(28px,4.5vw,40px)] font-bold tracking-[-0.01em] text-navy">
            Sejarah An-Nahl
          </h2>
        </div>

        <div className="relative pl-2">
          <div
            className="absolute bottom-2 left-[23px] top-2 w-0.5"
            style={{ background: "linear-gradient(#C5A24D, #E6E9EF)" }}
          />
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className={`relative flex gap-6 ${
                item.last ? "pb-0" : "pb-[34px]"
              }`}
            >
              <div
                className={`relative z-[1] flex h-12 w-12 flex-none items-center justify-center rounded-full border-4 border-white font-serif text-[13px] font-bold shadow-[0_0_0_1px_#E6E9EF] ${
                  item.last ? "bg-gold text-gold-on" : "bg-navy text-gold"
                }`}
              >
                {item.last ? "●" : "▸"}
              </div>
              <div className="flex-1 pt-1">
                <div className="mb-1.5 font-serif text-[22px] font-bold text-gold">
                  {item.year}
                </div>
                <h3 className="mb-2 font-serif text-[19px] font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.65] text-muted">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="m-0 mt-10 text-center text-[13px] italic text-[#9AA3B2]">
          Tahun &amp; peristiwa di atas masih contoh — lengkapi dengan data asli
          dari arsip/senior An-Nahl.
        </p>
      </section>

      {/* 3. MAKNA NAMA AN-NAHL */}
      <section className="relative mt-18 overflow-hidden bg-navy">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(720px 340px at 90% 0%, rgba(197,162,77,0.18), transparent 60%), radial-gradient(640px 300px at -5% 100%, rgba(47,126,114,0.18), transparent 55%)",
          }}
        />
        <div className="relative mx-auto flex max-w-[1000px] flex-wrap items-center gap-12 px-5 pb-20 pt-18">
          <div className="mx-auto flex w-[200px] flex-none flex-col items-center text-center">
            <div className="mb-3 font-arabic text-[84px] leading-none text-gold">
              النَّحْل
            </div>
            <div className="text-[13px] uppercase tracking-[0.14em] text-footer-text">
              An-Nahl · Lebah
            </div>
          </div>
          <div className="min-w-[300px] flex-[1_1_360px]">
            <span className="mb-4 inline-block text-[12.5px] font-bold uppercase tracking-[0.14em] text-gold">
              Makna nama
            </span>
            <h2 className="mb-[18px] font-serif text-[clamp(26px,4vw,36px)] font-bold leading-[1.2] tracking-[-0.01em] text-white">
              Mengapa &ldquo;An-Nahl&rdquo;?
            </h2>
            <p className="mb-[18px] text-[16.5px] leading-[1.75] text-form-label">
              Nama <em>An-Nahl</em> — yang berarti &ldquo;lebah&rdquo; —
              diabadikan sebagai salah satu surah dalam Al-Qur&apos;an. Lebah
              dipilih sebagai simbol kerja yang{" "}
              <strong className="font-semibold text-white">
                bermanfaat, tertib, dan menghasilkan kebaikan
              </strong>{" "}
              bagi sekitarnya.
            </p>
            <p className="m-0 text-[16.5px] leading-[1.75] text-form-label">
              Ia hinggap di tempat yang baik, memakan yang baik, dan mengeluarkan
              yang baik pula — madu yang menyembuhkan. Begitulah harapan bagi
              setiap anggota An-Nahl: hadir membawa manfaat, di mana pun ia
              berada.
            </p>
          </div>
        </div>
      </section>

      {/* 4. STRUKTUR ORGANISASI */}
      <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-18">
        <div className="mb-11 text-center">
          <span className="mb-3 inline-block text-[12.5px] font-bold uppercase tracking-[0.14em] text-teal">
            Pengurus
          </span>
          <h2 className="m-0 font-serif text-[clamp(28px,4.5vw,40px)] font-bold tracking-[-0.01em] text-navy">
            Struktur Organisasi
          </h2>
        </div>

        {/* Ketua featured */}
        <div className="mb-8 flex justify-center">
          <div className="w-[240px] rounded-[18px] border border-border bg-white px-6 py-7 text-center shadow-[0_12px_32px_rgba(22,49,91,0.07)]">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#EAEEF5]">
              <PersonIcon size={40} stroke="#16315B" />
            </div>
            <div className="font-serif text-[18px] font-semibold text-navy">
              Nama Pengurus
            </div>
            <div className="mt-[5px] text-[13px] font-semibold uppercase tracking-[0.04em] text-gold">
              Ketua Umum
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[18px]">
          {PENGURUS.map((jabatan) => (
            <div
              key={jabatan}
              className="rounded-2xl border border-border bg-white px-[18px] py-6 text-center"
            >
              <div className="mx-auto mb-3.5 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-bg-soft">
                <PersonIcon size={32} stroke="#8A93A3" />
              </div>
              <div className="font-serif text-base font-semibold text-navy">
                Nama Pengurus
              </div>
              <div className="mt-1 text-xs font-semibold text-muted2">
                {jabatan}
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8C9A8] bg-[#FAF7F0] px-[18px] py-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-bg text-2xl font-light text-gold">
              +
            </div>
            <div className="text-[13.5px] font-semibold leading-[1.4] text-[#A8862F]">
              Bergabung jadi
              <br />
              pengurus berikutnya?
            </div>
          </div>
        </div>

        <p className="m-0 mt-9 text-center text-[13px] italic text-[#9AA3B2]">
          Nama &amp; foto pengurus masih placeholder — lengkapi dengan data
          kepengurusan terkini.
        </p>
      </section>
    </div>
  );
}
