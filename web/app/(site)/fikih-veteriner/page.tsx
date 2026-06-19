import type { Metadata } from "next";
import FikihView from "@/components/FikihView";

export const metadata: Metadata = {
  title: "Pojok Fikih Veteriner — LDF An-Nahl FKH USK",
  description:
    "Rubrik unggulan: tempat ilmu syar'i berjumpa praktik kedokteran hewan — kesejahteraan hewan, fikih najis & medis, penyembelihan halal.",
};

export default function FikihPage() {
  return <FikihView />;
}
