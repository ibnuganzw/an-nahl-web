import Image from "next/image";
import Link from "next/link";
import HomeArticles from "@/components/HomeArticles";
import HomeEvents from "@/components/HomeEvents";
import Honeycomb from "@/components/Honeycomb";

const TOPICS = [
  {
    title: "Kesejahteraan Hewan dalam Islam",
    cat: "kesejahteraan",
    desc: (
      <>
        Prinsip <em>rahmah</em> dan amanah terhadap makhluk hidup dalam tuntunan
        syariat.
      </>
    ),
    icon: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    ),
  },
  {
    title: "Fikih Najis & Medis",
    cat: "najis",
    desc: "Hukum najis, thaharah, dan penanganannya dalam konteks praktik klinis hewan.",
    icon: (
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />
    ),
  },
  {
    title: "Penyembelihan Halal",
    cat: "penyembelihan",
    desc: (
      <>
        Syarat sembelihan, <em>tadzkiyah</em>, dan etika menyembelih sesuai
        tuntunan.
      </>
    ),
    icon: (
      <path d="M3 11h18M3 11a4 4 0 0 0 4 4h6M3 11l1.5-5.5A2 2 0 0 1 6.4 4h2.2M21 3l-4 4m0 0-2.5 2.5M17 7l2.5 2.5" />
    ),
  },
];

export default function Beranda() {
  return (
    <div className="bg-white">
      {/* HERO — full-bleed sinematik */}
      <section className="relative isolate overflow-hidden bg-navy-dark text-white">
        <Image
          src="/pengurus.webp"
          alt="Keluarga pengurus LDF An-Nahl FKH USK"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/55 to-navy-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/55 via-transparent to-navy-dark/20" />
        <Honeycomb className="absolute right-0 top-0 h-[300px] w-[360px]" opacity={0.14} fade="top-right" />

        <div className="relative mx-auto flex min-h-[clamp(440px,66vh,580px)] max-w-[1120px] flex-col justify-center px-5 py-14">
          <div className="max-w-[640px]">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 flex-none bg-gold" />
              <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-gold">
                Lembaga Dakwah Fakultas · FKH USK
              </span>
            </div>
            <h1 className="text-[clamp(40px,7.2vw,72px)] font-extrabold leading-[1.04] tracking-[-0.02em]">
              Merawat hewan,
              <br />
              <span className="text-gold">menjaga iman.</span>
            </h1>
            <p className="mt-6 max-w-[540px] text-[clamp(16px,2.3vw,18.5px)] leading-relaxed text-[#DCE4F0]">
              Kami adalah Serdadu Lebah, Bersenjata Dakwah. Sebuah keluarga bagi
              mahasiswa FKH USK untuk melangkah bersama, mempererat ukhuwah, dan
              menebar nilai-nilai Islam di lingkungan kampus.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/gabung"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-[15px] font-bold text-navy-dark shadow-[0_10px_30px_rgba(245,184,46,0.40)] transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Gabung Bersama Kami
              </Link>
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/[0.06] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.14]"
              >
                Jelajahi An-Nahl
              </Link>
            </div>
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-5 right-3 select-none font-arabic text-[clamp(82px,15vw,176px)] leading-none text-gold/10"
        >
          النَّحْل
        </span>
      </section>

      {/* FEATURED: POJOK FIKIH VETERINER */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-[1120px] px-5 pb-16 pt-14">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[620px]">
              <span className="mb-3.5 inline-flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-teal">
                <span className="h-px w-9 flex-none bg-teal" />
                Rubrik Unggulan
              </span>
              <h2 className="mb-3 font-serif text-[clamp(28px,4.5vw,40px)] font-bold leading-[1.12] tracking-[-0.01em] text-navy">
                Pojok Fikih Veteriner
              </h2>
              <p className="m-0 text-base leading-[1.65] text-muted">
                Panduan ringkas memadukan ilmu syar&apos;i dengan praktik
                kedokteran hewan — dari kandang sampai ruang praktik.
              </p>
            </div>
            <Link
              href="/fikih-veteriner"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#D8DDE6] bg-white px-[18px] py-[11px] text-sm font-semibold text-navy transition-colors hover:border-navy"
            >
              Semua topik →
            </Link>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
            {TOPICS.map((topic) => (
              <Link
                key={topic.title}
                href={`/fikih-veteriner?kategori=${topic.cat}`}
                className="block rounded-2xl border border-border bg-white p-[26px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(22,49,91,0.10)]"
              >
                <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-teal-bg">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2F7E72"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {topic.icon}
                  </svg>
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-navy">
                  {topic.title}
                </h3>
                <p className="mb-4 text-[14.5px] leading-[1.6] text-muted">
                  {topic.desc}
                </p>
                <span className="text-[13.5px] font-semibold text-teal">
                  Pelajari →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KISAH & KAJIAN */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-2.5 block text-[12.5px] font-bold uppercase tracking-[0.12em] text-teal">
                Ruang Kisah & Kajian
              </span>
              <h2 className="m-0 font-serif text-[clamp(26px,4vw,36px)] font-bold tracking-[-0.01em] text-navy">
                Tulisan terbaru
              </h2>
            </div>
            <Link
              href="/kisah-kajian"
              className="text-sm font-semibold text-navy"
            >
              Lihat semua →
            </Link>
          </div>

          <HomeArticles />
        </div>
      </section>

      {/* AGENDA */}
      <section className="bg-bg-soft">
        <div className="mx-auto max-w-[1120px] px-5 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-2.5 block text-[12.5px] font-bold uppercase tracking-[0.12em] text-teal">
                Agenda terdekat
              </span>
              <h2 className="m-0 font-serif text-[clamp(26px,4vw,36px)] font-bold tracking-[-0.01em] text-navy">
                Kegiatan mendatang
              </h2>
            </div>
            <Link href="/agenda" className="text-sm font-semibold text-navy">
              Semua agenda →
            </Link>
          </div>

          <HomeEvents />
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-5 pb-8 pt-2">
          <div className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[20px] bg-navy p-[clamp(28px,5vw,48px)]">
            <Honeycomb opacity={0.08} />
            <div className="relative max-w-[560px]">
              <h2 className="mb-2.5 font-serif text-[clamp(24px,3.6vw,32px)] font-bold tracking-[-0.01em] text-white">
                Tumbuh bersama keluarga An-Nahl
              </h2>
              <p className="m-0 text-[15.5px] leading-[1.6] text-footer-text">
                Terbuka bagi seluruh mahasiswa Fakultas Kedokteran Hewan USK yang
                ingin berkembang spiritual dan profesional.
              </p>
            </div>
            <Link
              href="/gabung"
              className="relative inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-[15px] text-[15px] font-bold text-gold-on"
            >
              Gabung sekarang →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
