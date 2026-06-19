import Image from "next/image";
import Link from "next/link";

const EXPLORE = [
  { href: "/fikih-veteriner", label: "Fikih Veteriner" },
  { href: "/kisah-kajian", label: "Kisah & Kajian" },
  { href: "/agenda", label: "Agenda" },
  { href: "/tentang", label: "Tentang" },
];

const CONNECT = [
  { href: "#", label: "Instagram" },
  { href: "/gabung", label: "Gabung jadi anggota" },
  { href: "#", label: "Kontak pengurus" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-footer-text">
      <div className="mx-auto max-w-[1120px] px-5 pb-7 pt-13">
        <div className="mb-9 flex flex-wrap justify-between gap-8">
          <div className="max-w-[330px]">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo-annahl.jpg"
                alt="LDF An-Nahl"
                width={46}
                height={46}
                className="h-[46px] w-[46px] rounded-full bg-white object-cover p-px"
              />
              <span className="flex flex-col leading-[1.15]">
                <span className="font-serif text-[17px] font-semibold text-white">
                  LDF An-Nahl
                </span>
                <span className="text-[11px] uppercase tracking-[0.06em] text-footer-sub">
                  FKH USK
                </span>
              </span>
            </div>
            <p className="m-0 text-sm leading-[1.65] text-[#94A0B6]">
              Lembaga Dakwah Fakultas Kedokteran Hewan, Universitas Syiah Kuala.
              Merawat hewan, menjaga iman.
            </p>
          </div>
          <div className="flex flex-wrap gap-14">
            <div>
              <h4 className="m-0 mb-4 text-xs font-bold uppercase tracking-[0.1em] text-footer-sub">
                Jelajahi
              </h4>
              <div className="flex flex-col gap-[11px] text-sm">
                {EXPLORE.map((item) => (
                  <Link key={item.label} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="m-0 mb-4 text-xs font-bold uppercase tracking-[0.1em] text-footer-sub">
                Terhubung
              </h4>
              <div className="flex flex-col gap-[11px] text-sm">
                {CONNECT.map((item) => (
                  <Link key={item.label} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-white/[0.08] pt-[22px] text-[13px] text-footer-sub">
          <span>© 2026 LDF An-Nahl FKH USK. Seluruh hak cipta.</span>
          <span className="font-arabic text-[15px]">
            وَاللَّهُ خَيْرُ الرَّازِقِينَ
          </span>
        </div>
      </div>
    </footer>
  );
}
