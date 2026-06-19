import type { Metadata } from "next";
import KisahView from "@/components/KisahView";

export const metadata: Metadata = {
  title: "Ruang Kisah & Kajian — LDF An-Nahl FKH USK",
  description:
    "Ruang baca naratif: refleksi slice-of-life mahasiswa FKH berdampingan dengan artikel kajian Islam.",
};

export default function KisahPage() {
  return <KisahView />;
}
