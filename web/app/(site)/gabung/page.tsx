import type { Metadata } from "next";
import GabungForm from "@/components/GabungForm";

export const metadata: Metadata = {
  title: "Gabung — LDF An-Nahl FKH USK",
  description:
    "Pendaftaran anggota LDF An-Nahl. Terbuka bagi seluruh mahasiswa Fakultas Kedokteran Hewan USK yang ingin bertumbuh — spiritual sekaligus profesional.",
};

const BENEFITS = [
  {
    tone: "teal" as const,
    title: "Kajian rutin & lingkaran ilmu",
    body: "Belajar Islam yang relevan dengan dunia veteriner, tiap pekan.",
    icon: (
      <path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2M21 18V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2" />
    ),
  },
  {
    tone: "gold" as const,
    title: "Mentoring (halaqah) pekanan",
    body: "Kelompok kecil yang menemani perjalananmu, ditemani mentor.",
    icon: (
      <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM3 21a6 6 0 0 1 12 0M16 11a4 4 0 0 1 5 4" />
    ),
  },
  {
    tone: "teal" as const,
    title: "Syiar & bakti sosial",
    body: "Pengabdian nyata — termasuk pengobatan hewan gratis di masyarakat.",
    icon: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    ),
  },
];

export default function GabungPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 88% -10%, rgba(47,126,114,0.08), transparent 60%), radial-gradient(700px 320px at 0% 110%, rgba(22,49,91,0.06), transparent 55%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1120px] flex-wrap items-start gap-11 px-5 pb-20 pt-14">
        {/* LEFT: invitation */}
        <div className="min-w-[300px] flex-[1_1_380px] pt-1.5">
          <span className="mb-[18px] inline-flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-teal">
            <span className="h-px w-9 flex-none bg-teal" />
            Pendaftaran anggota
          </span>
          <h1 className="mb-[18px] font-serif text-[clamp(32px,5.5vw,50px)] font-bold leading-[1.1] tracking-[-0.015em] text-navy">
            Gabung keluarga An-Nahl
          </h1>
          <p className="mb-8 max-w-[480px] text-[clamp(16px,2.3vw,18px)] leading-[1.7] text-muted">
            Terbuka bagi seluruh mahasiswa Fakultas Kedokteran Hewan USK yang
            ingin bertumbuh — spiritual sekaligus profesional. Tak perlu &ldquo;sudah
            alim&rdquo; dulu; cukup niat untuk belajar bersama.
          </p>

          <div className="mb-9 flex flex-col gap-4">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3.5">
                <span
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-[11px] ${
                    benefit.tone === "teal"
                      ? "bg-teal-bg text-teal"
                      : "bg-gold-bg text-gold"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {benefit.icon}
                  </svg>
                </span>
                <div>
                  <div className="mb-[3px] font-serif text-[16.5px] font-semibold text-navy">
                    {benefit.title}
                  </div>
                  <div className="text-sm leading-[1.55] text-muted2">
                    {benefit.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <figure className="m-0 rounded-[14px] border border-border bg-white px-6 py-5">
            <p
              dir="rtl"
              className="mb-2 text-right font-arabic text-[21px] leading-[1.8] text-navy"
            >
              وَأَوْحَىٰ رَبُّكَ إِلَى النَّحْلِ
            </p>
            <figcaption className="m-0 text-[13.5px] italic text-muted2">
              &ldquo;Dan Tuhanmu mengilhamkan kepada lebah…&rdquo; (QS. An-Nahl:
              68)
            </figcaption>
          </figure>
        </div>

        {/* RIGHT: form */}
        <div id="daftar" className="min-w-[300px] flex-[1_1_380px]">
          <GabungForm />
        </div>
      </div>
    </div>
  );
}
