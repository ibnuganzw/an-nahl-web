import type { Metadata } from "next";
import AgendaView from "@/components/AgendaView";

export const metadata: Metadata = {
  title: "Agenda — LDF An-Nahl FKH USK",
  description:
    "Kajian rutin, workshop, dan kegiatan syiar An-Nahl di lingkungan FKH USK. Lihat jadwal dan daftar kegiatan.",
};

export default function AgendaPage() {
  return <AgendaView />;
}
