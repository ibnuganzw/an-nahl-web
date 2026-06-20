import type { Metadata } from "next";
import KirimForm from "@/components/KirimForm";

export const metadata: Metadata = {
  title: "Kirim Tulisan — LDF An-Nahl FKH USK",
  description:
    "Kirim refleksi, kisah, atau kajianmu untuk ditayangkan di ruang Kisah & Kajian An-Nahl. Redaksi akan meninjau sebelum tayang.",
};

export default function KirimPage() {
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
        <div className="min-w-[300px] flex-[1_1_360px] pt-1.5">
          <span className="mb-[18px] inline-flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.2em] text-teal">
            <span className="h-px w-9 flex-none bg-teal" />
            Ruang kontributor
          </span>
          <h1 className="mb-[18px] font-serif text-[clamp(32px,5.5vw,50px)] font-bold leading-[1.1] tracking-[-0.015em] text-navy">
            Bagikan tulisanmu
          </h1>
          <p className="mb-8 max-w-[480px] text-[clamp(16px,2.3vw,18px)] leading-[1.7] text-muted">
            Punya refleksi perjalanan kuliah, kisah yang menggugah, atau kajian
            yang ingin kamu bagi? Kirim ke sini. Redaksi An-Nahl akan
            membacanya, menyuntingnya bila perlu, lalu menayangkannya di ruang
            Kisah &amp; Kajian.
          </p>
          <figure className="m-0 rounded-[14px] border border-border bg-white px-6 py-5">
            <p
              dir="rtl"
              className="mb-2 text-right font-arabic text-[21px] leading-[1.8] text-navy"
            >
              فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ
            </p>
            <figcaption className="m-0 text-[13.5px] italic text-muted2">
              &ldquo;Maka nikmat Tuhanmu yang manakah yang kamu dustakan?&rdquo;
              (QS. Ar-Rahman: 13)
            </figcaption>
          </figure>
        </div>

        <div className="min-w-[300px] flex-[1_1_400px]">
          <KirimForm />
        </div>
      </div>
    </div>
  );
}
