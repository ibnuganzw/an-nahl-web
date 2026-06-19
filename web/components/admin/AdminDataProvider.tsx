"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type FikihCat = "kesejahteraan" | "najis" | "penyembelihan" | "lainnya";
export type KisahCat = "kisah" | "kajian";
export type EventType = "kajian" | "workshop" | "mabit" | "baksos";

export type FikihArticle = {
  id: number;
  cat: FikihCat;
  title: string;
  summary: string;
  author: string;
  readTime: string;
  date: string;
};

export type KisahArticle = {
  id: number;
  cat: KisahCat;
  title: string;
  summary: string;
  author: string;
  readTime: string;
  date: string;
};

export type AgendaEvent = {
  id: number;
  type: EventType;
  title: string;
  fullDate: string;
  time: string;
  location: string;
  quota: number;
  filled: number;
  past: boolean;
  desc: string;
};

export type MemberApplication = {
  id: number;
  nama: string;
  nim: string;
  angkatan: string;
  kontak: string;
  motivasi: string;
  date: string;
};

export type Participant = {
  id: number;
  nama: string;
  nim: string;
  angkatan: string;
  kontak: string;
  event: string;
  date: string;
};

export const FIKIH_CATS: Record<FikihCat, string> = {
  kesejahteraan: "Kesejahteraan Hewan",
  najis: "Najis & Medis",
  penyembelihan: "Penyembelihan Halal",
  lainnya: "Lainnya",
};

export const KISAH_CATS: Record<KisahCat, string> = {
  kisah: "Kisah & Refleksi",
  kajian: "Kajian",
};

export const EVENT_TYPES: Record<EventType, string> = {
  kajian: "Kajian Rutin",
  workshop: "Workshop",
  mabit: "Mabit",
  baksos: "Bakti Sosial",
};

const SEED_FIKIH: FikihArticle[] = [
  { id: 1, cat: "kesejahteraan", title: "Kesejahteraan hewan dalam Islam: antara rahmah dan amanah", summary: "Bagaimana prinsip kasih sayang terhadap makhluk hidup menjadi kompas bagi calon dokter hewan.", author: "Tim Fikih An-Nahl", readTime: "6 mnt baca", date: "12 Jun 2026" },
  { id: 2, cat: "najis", title: "Mengenal batas najis mughallazhah dalam penanganan satwa", summary: "Panduan thaharah praktis ketika berhadapan dengan najis berat di ruang klinik.", author: "Tim Fikih An-Nahl", readTime: "5 mnt baca", date: "8 Jun 2026" },
  { id: 3, cat: "penyembelihan", title: "Syarat sah penyembelihan halal & etika tadzkiyah", summary: "Rukun, syarat, dan adab menyembelih yang sering terlewat dalam praktik.", author: "Tim Fikih An-Nahl", readTime: "7 mnt baca", date: "2 Jun 2026" },
  { id: 4, cat: "najis", title: "Hukum kontak dengan air liur hewan saat pemeriksaan", summary: "Tinjauan fikih atas kontak medis dan cara menyucikannya menurut mazhab.", author: "Tim Fikih An-Nahl", readTime: "4 mnt baca", date: "28 Mei 2026" },
];

const SEED_KISAH: KisahArticle[] = [
  { id: 1, cat: "kisah", title: "Sujud di sela jadwal jaga: catatan seorang koass", summary: "Tentang malam-malam panjang di ruang klinik, dan bagaimana lelah berubah menjadi syukur ketika Subuh tiba.", author: "Nadia A., ’22", readTime: "7 mnt baca", date: "14 Jun 2026" },
  { id: 2, cat: "kisah", title: "Hari pertama memegang makhluk yang sekarat", summary: "Tangan yang gemetar mengajarkan satu hal yang tak ada di buku teks: arti amanah.", author: "Rizki F., ’21", readTime: "5 mnt baca", date: "9 Jun 2026" },
  { id: 3, cat: "kajian", title: "Sabar sebagai bekal seorang penuntut ilmu", summary: "Menelusuri makna sabar dalam menuntut ilmu, dari ulama salaf hingga ruang kuliah hari ini.", author: "Tim Kajian An-Nahl", readTime: "6 mnt baca", date: "5 Jun 2026" },
];

const SEED_AGENDA: AgendaEvent[] = [
  { id: 1, type: "kajian", title: "Kajian An-Nahl: Adab Merawat Makhluk Hidup", fullDate: "Jum’at, 27 Juni 2026", time: "16.00 WIB", location: "Mushalla FKH USK", quota: 60, filled: 23, past: false, desc: "Kajian rutin pekanan membahas adab dan tuntunan Islam dalam memperlakukan hewan." },
  { id: 2, type: "workshop", title: "Bedah Fikih: Penyembelihan Halal & Praktiknya", fullDate: "Sabtu, 5 Juli 2026", time: "08.30 WIB", location: "Aula FKH USK", quota: 40, filled: 31, past: false, desc: "Workshop setengah hari mengupas syarat sah penyembelihan, tadzkiyah, serta simulasi praktik." },
  { id: 3, type: "mabit", title: "Mabit & Muhasabah Akhir Semester", fullDate: "Sabtu, 19 Juli 2026", time: "16.00 WIB", location: "Asrama Mahasiswa USK", quota: 50, filled: 12, past: false, desc: "Malam bina iman dan takwa untuk menutup semester: kajian, qiyamul lail, dan muhasabah." },
  { id: 4, type: "baksos", title: "Bakti Sosial & Pengobatan Hewan Gratis", fullDate: "Sabtu, 10 Mei 2026", time: "08.00 WIB", location: "Desa Binaan, Aceh Besar", quota: 80, filled: 80, past: true, desc: "Pengabdian masyarakat: pemeriksaan dan pengobatan hewan ternak gratis sekaligus syiar." },
];

const SEED_MEMBERS: MemberApplication[] = [
  { id: 1, nama: "Aulia Rahman", nim: "2207101010012", angkatan: "2022", kontak: "0812 3456 7890", motivasi: "Ingin belajar Islam yang relevan dengan dunia veteriner.", date: "15 Jun 2026" },
  { id: 2, nama: "Siti Khadijah", nim: "2307101010045", angkatan: "2023", kontak: "0813 2233 4455", motivasi: "Mencari lingkungan yang menjaga semangat ibadah di tengah kuliah.", date: "14 Jun 2026" },
  { id: 3, nama: "Muhammad Fadhil", nim: "2107101010078", angkatan: "2021", kontak: "0852 9988 7766", motivasi: "Ingin aktif di syiar dan bakti sosial pengobatan hewan.", date: "12 Jun 2026" },
];

const SEED_PARTICIPANTS: Participant[] = [
  { id: 1, nama: "Nadia Azzahra", nim: "2207101010099", angkatan: "2022", kontak: "0811 2233 4455", event: "Kajian An-Nahl: Adab Merawat Makhluk Hidup", date: "16 Jun 2026" },
  { id: 2, nama: "Hafizh Maulana", nim: "2007101010003", angkatan: "2020", kontak: "0853 1212 3434", event: "Bedah Fikih: Penyembelihan Halal & Praktiknya", date: "15 Jun 2026" },
];

type AdminData = {
  fikih: FikihArticle[];
  kisah: KisahArticle[];
  agenda: AgendaEvent[];
  members: MemberApplication[];
  participants: Participant[];
  saveFikih: (item: Omit<FikihArticle, "id" | "date"> & { id?: number }) => void;
  removeFikih: (id: number) => void;
  saveKisah: (item: Omit<KisahArticle, "id" | "date"> & { id?: number }) => void;
  removeKisah: (id: number) => void;
  saveAgenda: (item: Omit<AgendaEvent, "id"> & { id?: number }) => void;
  removeAgenda: (id: number) => void;
  removeMember: (id: number) => void;
  removeParticipant: (id: number) => void;
};

const AdminContext = createContext<AdminData | null>(null);

let counter = 1000;
const nextId = () => ++counter;

const todayLabel = () =>
  new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [fikih, setFikih] = useState(SEED_FIKIH);
  const [kisah, setKisah] = useState(SEED_KISAH);
  const [agenda, setAgenda] = useState(SEED_AGENDA);
  const [members, setMembers] = useState(SEED_MEMBERS);
  const [participants, setParticipants] = useState(SEED_PARTICIPANTS);

  function upsert<T extends { id: number }>(
    setList: React.Dispatch<React.SetStateAction<T[]>>,
    item: Partial<T> & { id?: number }
  ) {
    setList((list) => {
      if (item.id != null) {
        return list.map((x) =>
          x.id === item.id ? ({ ...x, ...item } as T) : x
        );
      }
      return [
        { ...item, id: nextId(), date: todayLabel() } as unknown as T,
        ...list,
      ];
    });
  }

  const value: AdminData = {
    fikih,
    kisah,
    agenda,
    members,
    participants,
    saveFikih: (item) => upsert(setFikih, item),
    removeFikih: (id) => setFikih((l) => l.filter((x) => x.id !== id)),
    saveKisah: (item) => upsert(setKisah, item),
    removeKisah: (id) => setKisah((l) => l.filter((x) => x.id !== id)),
    saveAgenda: (item) => upsert(setAgenda, item),
    removeAgenda: (id) => setAgenda((l) => l.filter((x) => x.id !== id)),
    removeMember: (id) => setMembers((l) => l.filter((x) => x.id !== id)),
    removeParticipant: (id) =>
      setParticipants((l) => l.filter((x) => x.id !== id)),
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminContext);
  if (!ctx)
    throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
