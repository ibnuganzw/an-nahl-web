import Image from "next/image";
import Link from "next/link";
import HomeArticles from "@/components/HomeArticles";
import HomeEvents from "@/components/HomeEvents";

const TOPICS = [
  {
    title: "Kesejahteraan Hewan dalam Islam",
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
    desc: "Hukum najis, thaharah, dan penanganannya dalam konteks praktik klinis hewan.",
    icon: (
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />
    ),
  },
  {
    title: "Penyembelihan Halal",
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-bg-soft">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 380px at 85% -10%, rgba(47,126,114,0.10), transparent 60%), radial-gradient(700px 320px at 0% 110%, rgba(22,49,91,0.07), transparent 55%)",
          }}
        />
        <div className="relative mx-auto flex max-w-[1120px] flex-wrap items-center gap-10 px-5 pb-18 pt-16">
          <div className="min-w-[300px] flex-[1_1_380px]">
            <span className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-[12.5px] font-semibold tracking-[0.04em] text-teal">
              <span className="inline-block h-[7px] w-[7px] rounded-full bg-teal" />
              Dakwah khas Fakultas Kedokteran Hewan
            </span>
            <h1 className="mb-[18px] font-serif text-[clamp(34px,6vw,54px)] font-bold leading-[1.08] tracking-[-0.015em] text-navy">
              Merawat hewan,
              <br />
              <span className="text-gold">menjaga iman.</span>
            </h1>
            <p className="mb-[30px] max-w-[520px] text-[clamp(16px,2.4vw,18px)] leading-[1.65] text-muted">
              Ruang dakwah bagi mahasiswa FKH USK — tempat syariat Islam dan
              dunia kedokteran hewan bertemu. Tumbuh secara spiritual sekaligus
              profesional.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/kisah-kajian"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(22,49,91,0.20)]"
              >
                Baca Kajian →
              </Link>
              <Link
                href="/agenda"
                className="inline-flex items-center gap-2 rounded-xl border border-[#D8DDE6] bg-white px-6 py-3.5 text-[15px] font-semibold text-navy"
              >
                Lihat Agenda
              </Link>
            </div>
          </div>
          <div className="flex min-w-[240px] flex-[0_1_320px] justify-center">
            <div className="relative flex h-[300px] w-[300px] items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#EDEFF3] bg-white shadow-[0_24px_60px_rgba(22,49,91,0.14)]" />
              <div className="absolute inset-[18px] rounded-full border border-dashed border-[#D8DDE6]" />
              <Image
                src="/logo-annahl.jpg"
                alt="Logo LDF An-Nahl"
                width={200}
                height={200}
                priority
                className="relative h-[200px] w-[200px] rounded-full object-cover"
              />
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap font-arabic text-[20px] text-navy opacity-55">
                النَّحْل
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: POJOK FIKIH VETERINER */}
      <section className="relative overflow-hidden bg-navy">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 360px at 90% 0%, rgba(197,162,77,0.14), transparent 60%), radial-gradient(700px 320px at -5% 100%, rgba(47,126,114,0.18), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1120px] px-5 pb-20 pt-18">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[620px]">
              <span className="mb-3.5 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-gold">
                ★ Rubrik Unggulan
              </span>
              <h2 className="mb-3 font-serif text-[clamp(28px,4.5vw,40px)] font-bold leading-[1.12] tracking-[-0.01em] text-white">
                Pojok Fikih Veteriner
              </h2>
              <p className="m-0 text-base leading-[1.65] text-footer-text">
                Panduan ringkas memadukan ilmu syar&apos;i dengan praktik
                kedokteran hewan — dari kandang sampai ruang praktik.
              </p>
            </div>
            <Link
              href="/fikih-veteriner"
              className="inline-flex items-center gap-2 rounded-[10px] border border-white/[0.18] bg-white/[0.06] px-[18px] py-[11px] text-sm font-semibold text-white"
            >
              Semua topik →
            </Link>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
            {TOPICS.map((topic) => (
              <Link
                key={topic.title}
                href="/fikih-veteriner"
                className="block rounded-2xl border border-white/[0.10] bg-[#1C3C6B] p-[26px]"
              >
                <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-teal/[0.22]">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5DBBA9"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {topic.icon}
                  </svg>
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-white">
                  {topic.title}
                </h3>
                <p className="mb-4 text-[14.5px] leading-[1.6] text-[#A9B4C8]">
                  {topic.desc}
                </p>
                <span className="text-[13.5px] font-semibold text-gold">
                  Pelajari →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KISAH & KAJIAN */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-18">
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
        <div className="mx-auto max-w-[1120px] px-5 py-18">
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
        <div className="mx-auto max-w-[1120px] px-5 pb-16 pt-2">
          <div className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[20px] bg-navy p-[clamp(28px,5vw,48px)]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(500px 220px at 100% 0%, rgba(197,162,77,0.16), transparent 60%)",
              }}
            />
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
