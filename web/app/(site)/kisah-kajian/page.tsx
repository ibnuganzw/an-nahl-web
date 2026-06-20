import type { Metadata } from "next";
import Link from "next/link";
import KisahView from "@/components/KisahView";

export const metadata: Metadata = {
  title: "Ruang Kisah & Kajian — LDF An-Nahl FKH USK",
  description:
    "Ruang baca naratif: refleksi slice-of-life mahasiswa FKH berdampingan dengan artikel kajian Islam.",
};

export default function KisahPage() {
  return (
    <>
      <KisahView />
      <div className="mx-auto max-w-[1120px] px-5 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[18px] border border-[#ECE6D8] bg-gold-bg px-7 py-6">
          <div>
            <h2 className="mb-1 font-serif text-[20px] font-semibold text-navy">
              Punya tulisan untuk dibagi?
            </h2>
            <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
              Kirim refleksi, kisah, atau kajianmu — redaksi akan meninjau lalu menayangkannya.
            </p>
          </div>
          <Link
            href="/kirim"
            className="rounded-[11px] bg-navy px-[22px] py-3 text-sm font-semibold text-white"
          >
            Kirim tulisan →
          </Link>
        </div>
      </div>
    </>
  );
}

