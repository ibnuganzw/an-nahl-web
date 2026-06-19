"use client";

import { useState, type CSSProperties } from "react";

type Cat = "kisah" | "kajian";

type Article = {
  id: number;
  cat: Cat;
  glyph: string;
  title: string;
  summary: string;
  readTime: string;
  author: string;
  date: string;
};

const CATS: Record<Cat, { label: string; c: string; wash: string }> = {
  kisah: { label: "Kisah & Refleksi", c: "#C5A24D", wash: "#F6EFDD" },
  kajian: { label: "Kajian", c: "#16315B", wash: "#EAEEF5" },
};

const DARKEN: Record<string, string> = {
  "#C5A24D": "#A8862F",
  "#16315B": "#0E2545",
};

const ARTICLES: Article[] = [
  { id: 0, cat: "kisah", glyph: "ص", title: "Sujud di sela jadwal jaga: catatan seorang koass", summary: "Tentang malam-malam panjang di ruang klinik, dan bagaimana lelah berubah menjadi syukur ketika Subuh tiba.", readTime: "7 mnt baca", author: "Nadia A., ’22", date: "14 Jun 2026" },
  { id: 1, cat: "kisah", glyph: "ق", title: "Hari pertama memegang makhluk yang sekarat", summary: "Tangan yang gemetar mengajarkan satu hal yang tak ada di buku teks: arti amanah.", readTime: "5 mnt baca", author: "Rizki F., ’21", date: "9 Jun 2026" },
  { id: 2, cat: "kajian", glyph: "ص", title: "Sabar sebagai bekal seorang penuntut ilmu", summary: "Menelusuri makna sabar dalam menuntut ilmu, dari ulama salaf hingga ruang kuliah hari ini.", readTime: "6 mnt baca", author: "Tim Kajian An-Nahl", date: "5 Jun 2026" },
  { id: 3, cat: "kisah", glyph: "م", title: "Antara laporan praktikum dan panggilan Maghrib", summary: "Kisah memilih: menyelesaikan deadline, atau menjawab adzan yang berkumandang.", readTime: "4 mnt baca", author: "Salsabila, ’23", date: "30 Mei 2026" },
  { id: 4, cat: "kajian", glyph: "ن", title: "Meluruskan niat dalam menuntut ilmu dunia", summary: "Bisakah belajar anatomi dan farmakologi menjadi ibadah? Sebuah tinjauan ringkas.", readTime: "6 mnt baca", author: "Tim Kajian An-Nahl", date: "24 Mei 2026" },
  { id: 5, cat: "kisah", glyph: "ت", title: "Ketika penelitian gagal, dan tawakal diuji", summary: "Data yang tak sesuai hipotesis, dan pelajaran tentang berserah setelah berusaha.", readTime: "5 mnt baca", author: "Hafizh M., ’20", date: "18 Mei 2026" },
  { id: 6, cat: "kajian", glyph: "ع", title: "Adab murid kepada guru dalam tradisi Islam", summary: "Warisan adab yang membuat ilmu menjadi berkah, bukan sekadar informasi.", readTime: "7 mnt baca", author: "Tim Kajian An-Nahl", date: "11 Mei 2026" },
];

const FEATURED_ID = 0;
const darken = (c: string) => DARKEN[c] || c;

function coverStyle(c: string, h: number): CSSProperties {
  return {
    height: h,
    background: `linear-gradient(135deg,${c}, ${darken(c)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
  };
}

function featuredCoverStyle(c: string): CSSProperties {
  return {
    flex: "1 1 300px",
    minWidth: 260,
    minHeight: 240,
    background: `linear-gradient(135deg,${c}, ${darken(c)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function heroStyle(c: string): CSSProperties {
  return {
    borderRadius: 16,
    height: "clamp(220px,42vw,360px)",
    background: `linear-gradient(135deg,${c}, ${darken(c)})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function badgeStyle(cat: Cat): CSSProperties {
  const k = CATS[cat];
  return {
    display: "inline-block",
    fontSize: "11.5px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: k.c,
    background: k.wash,
    padding: "4px 11px",
    borderRadius: 999,
  };
}

const FILTER_DEFS: { key: "all" | Cat; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "kisah", label: "Kisah & Refleksi" },
  { key: "kajian", label: "Kajian" },
];

export default function KisahView() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [filter, setFilter] = useState<"all" | Cat>("all");
  const [selectedId, setSelectedId] = useState(0);

  const open = (id: number) => {
    setSelectedId(id);
    setView("detail");
    window.scrollTo(0, 0);
  };
  const goList = () => {
    setView("list");
    window.scrollTo(0, 0);
  };

  const filtered =
    filter === "all" ? ARTICLES : ARTICLES.filter((a) => a.cat === filter);
  const showFeatured = filter === "all" || filter === "kisah";
  const grid = filtered.filter((a) => !(showFeatured && a.id === FEATURED_ID));
  const featured = ARTICLES[FEATURED_ID];
  const sel = ARTICLES.find((a) => a.id === selectedId) || ARTICLES[0];
  const related = ARTICLES.filter((a) => a.id !== selectedId).slice(0, 3);

  if (view === "detail") {
    return (
      <div>
        <article className="mx-auto max-w-[720px] px-5 pb-2 pt-8">
          <button
            onClick={goList}
            className="mb-7 inline-flex cursor-pointer items-center gap-[7px] text-sm font-semibold text-muted2"
          >
            ← Kembali ke Kisah &amp; Kajian
          </button>
          <div>
            <span style={badgeStyle(sel.cat)}>{CATS[sel.cat].label}</span>
          </div>
          <h1 className="mb-[22px] mt-[18px] font-serif text-[clamp(28px,5vw,44px)] font-bold leading-[1.15] tracking-[-0.015em] text-navy">
            {sel.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3.5 border-b border-border pb-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-serif text-[17px] font-semibold text-white">
              {sel.author.charAt(0)}
            </div>
            <div className="flex flex-col leading-[1.35]">
              <span className="text-[15px] font-semibold text-navy">
                {sel.author}
              </span>
              <span className="text-[13px] text-light">
                {sel.date} · {CATS[sel.cat].label} · {sel.readTime}
              </span>
            </div>
          </div>
        </article>

        <div className="mx-auto mt-7 max-w-[880px] px-5">
          <div style={heroStyle(CATS[sel.cat].c)}>
            <span className="font-arabic text-[clamp(40px,8vw,72px)] text-white/90">
              {sel.glyph}
            </span>
          </div>
        </div>

        <article className="mx-auto max-w-[680px] px-5 pb-6 pt-10 text-[19px] leading-[1.85] tracking-[0.002em] text-body">
          <p className="mb-[26px] font-serif text-[21px] font-medium leading-[1.7] text-navy">
            {sel.summary}
          </p>
          <p className="mb-[26px]">
            Pukul tiga dini hari, lampu ruang jaga klinik hewan masih menyala. Di
            kandang pojok, seekor kucing pasca-operasi belum juga tenang. Aku
            duduk di bangku kayu yang dingin, lelah menggantung di pelupuk mata,
            sambil menimbang: berapa lama lagi hingga Subuh?
          </p>
          <p className="mb-[26px]">
            Ada momen-momen kecil dalam kuliah kedokteran hewan yang tidak pernah
            masuk silabus. Ia datang diam-diam — di sela laporan praktikum yang
            menumpuk, di tengah bau formalin laboratorium, atau saat tangan
            gemetar pertama kali memegang makhluk yang kesakitan. Di situlah,
            anehnya, hati justru paling sering bicara tentang Tuhan.
          </p>

          <figure className="my-[34px] border-l-[3px] border-gold py-2 pl-[26px]">
            <p className="m-0 font-serif text-[23px] font-medium italic leading-[1.5] text-navy">
              &ldquo;Merawat yang lemah ternyata mengajariku arti sabar lebih
              dalam daripada buku mana pun.&rdquo;
            </p>
          </figure>

          <p className="mb-[26px]">
            Aku teringat sebuah nasihat: bahwa setiap kebaikan kepada makhluk
            bernyawa dicatat sebagai sedekah. Maka malam-malam panjang ini, dengan
            segala letihnya, barangkali bukan sekadar tugas akademik. Ia bisa jadi
            ladang — bila niatnya kujaga.
          </p>

          <h2 className="mb-4 mt-[42px] font-serif text-[27px] font-semibold tracking-[-0.01em] text-navy">
            Belajar berhenti sejenak
          </h2>
          <p className="mb-[26px]">
            Adzan Subuh akhirnya berkumandang dari mushalla fakultas. Aku
            menitipkan kucing itu pada teman jaga, lalu berwudhu dengan air dingin
            yang menyadarkan. Dalam sujud yang singkat itu, lelah seperti dilipat
            dan disimpan — diganti sesuatu yang lebih ringan, yang sulit kunamai
            selain: cukup.
          </p>
          <p className="mb-[26px]">
            Mungkin inilah yang ingin diajarkan oleh perjalanan di FKH — bahwa
            merawat hewan dan menjaga iman bukan dua jalan yang berpisah, melainkan
            satu jalan yang sama, ditempuh pelan-pelan, satu malam jaga demi satu
            malam jaga.
          </p>

          <div className="mt-9 border-t border-border pt-6 text-sm italic text-light">
            Catatan: Kisah ini adalah contoh ilustratif untuk keperluan desain.
            Ganti dengan tulisan asli anggota An-Nahl sebelum dipublikasikan.
          </div>
        </article>

        {/* Related */}
        <section className="mt-6 bg-[#FBF8F2]">
          <div className="mx-auto max-w-[1120px] px-5 pb-18 pt-14">
            <h2 className="mb-7 font-serif text-[clamp(22px,3.5vw,30px)] font-bold tracking-[-0.01em] text-navy">
              Bacaan lain
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
              {related.map((a) => (
                <button
                  key={a.id}
                  onClick={() => open(a.id)}
                  className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#ECE6D8] bg-white text-left"
                >
                  <div style={coverStyle(CATS[a.cat].c, 156)}>
                    <span className="font-arabic text-[26px] text-white/85">
                      {a.glyph}
                    </span>
                  </div>
                  <div className="p-5">
                    <span style={badgeStyle(a.cat)}>{CATS[a.cat].label}</span>
                    <h3 className="mb-1.5 mt-3 font-serif text-[17.5px] font-semibold leading-[1.3] text-navy">
                      {a.title}
                    </h3>
                    <span className="text-[13px] text-light">
                      {a.author} · {a.readTime}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF8F2]">
      {/* Intro */}
      <section className="mx-auto max-w-[1120px] px-5 pb-2 pt-14">
        <span className="mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-gold">
          Ruang baca An-Nahl
        </span>
        <h1 className="mb-4 max-w-[680px] font-serif text-[clamp(32px,5.5vw,48px)] font-bold leading-[1.1] tracking-[-0.015em] text-navy">
          Kisah &amp; Kajian
        </h1>
        <p className="m-0 max-w-[620px] text-[clamp(15px,2.2vw,17px)] leading-[1.7] text-muted">
          Catatan hati mahasiswa FKH — refleksi di sela praktikum, penelitian, dan
          ruang jaga — berdampingan dengan kajian Islam yang menemani perjalanan.
          Tempat berhenti sejenak, lalu melangkah lagi.
        </p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1120px] px-5 pt-7">
        <div className="flex flex-wrap gap-2.5">
          {FILTER_DEFS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`cursor-pointer rounded-full border px-4 py-[9px] text-[13.5px] font-semibold transition-all ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-[#E3DCCB] bg-white text-muted"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {showFeatured && (
        <section className="mx-auto max-w-[1120px] px-5 pt-7">
          <button
            onClick={() => open(featured.id)}
            className="flex w-full cursor-pointer flex-wrap overflow-hidden rounded-[20px] border border-[#ECE6D8] bg-white text-left shadow-[0_14px_40px_rgba(22,49,91,0.06)]"
          >
            <div style={featuredCoverStyle(CATS[featured.cat].c)}>
              <span className="font-arabic text-[64px] text-white/90">
                {featured.glyph}
              </span>
            </div>
            <div className="flex min-w-[280px] flex-[1_1_320px] flex-col justify-center p-[clamp(24px,4vw,40px)]">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gold">
                  Sorotan
                </span>
                <span style={badgeStyle(featured.cat)}>
                  {CATS[featured.cat].label}
                </span>
              </div>
              <h2 className="mb-3.5 font-serif text-[clamp(24px,3.4vw,32px)] font-bold leading-[1.2] tracking-[-0.01em] text-navy">
                {featured.title}
              </h2>
              <p className="mb-[22px] text-base leading-[1.65] text-muted">
                {featured.summary}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-navy font-serif text-[15px] font-semibold text-white">
                  {featured.author.charAt(0)}
                </div>
                <div className="flex flex-col leading-[1.3]">
                  <span className="text-sm font-semibold text-navy">
                    {featured.author}
                  </span>
                  <span className="text-[13px] text-light">
                    {featured.date} · {featured.readTime}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* Grid */}
      <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[22px]">
          {grid.map((a) => (
            <button
              key={a.id}
              onClick={() => open(a.id)}
              className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#ECE6D8] bg-white text-left"
            >
              <div style={coverStyle(CATS[a.cat].c, 156)}>
                <span className="font-arabic text-[32px] text-white/85">
                  {a.glyph}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-[22px]">
                <span style={badgeStyle(a.cat)}>{CATS[a.cat].label}</span>
                <h3 className="mb-2.5 mt-3 font-serif text-[19px] font-semibold leading-[1.3] text-navy">
                  {a.title}
                </h3>
                <p className="mb-[18px] text-[14.5px] leading-[1.6] text-muted">
                  {a.summary}
                </p>
                <div className="mt-auto flex items-center gap-[9px] text-[13px] text-light">
                  <span className="font-semibold text-muted2">{a.author}</span>
                  <span>·</span>
                  <span>{a.readTime}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
