"use client";

import { useState, type CSSProperties } from "react";

type Cat = "kesejahteraan" | "najis" | "penyembelihan" | "lainnya";

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
  kesejahteraan: { label: "Kesejahteraan Hewan", c: "#2F7E72", wash: "#E8F1EF" },
  najis: { label: "Najis & Medis", c: "#16315B", wash: "#EAEEF5" },
  penyembelihan: { label: "Penyembelihan Halal", c: "#C5A24D", wash: "#F6EFDD" },
  lainnya: { label: "Lainnya", c: "#5B6573", wash: "#EEF0F3" },
};

const DARKEN: Record<string, string> = {
  "#2F7E72": "#256258",
  "#16315B": "#0E2545",
  "#C5A24D": "#A8862F",
  "#5B6573": "#414956",
};

const ARTICLES: Article[] = [
  { id: 1, cat: "kesejahteraan", glyph: "ﷺ", title: "Kesejahteraan hewan dalam Islam: antara rahmah dan amanah", summary: "Bagaimana prinsip kasih sayang terhadap makhluk hidup menjadi kompas bagi calon dokter hewan.", readTime: "6 mnt baca", author: "Tim Fikih An-Nahl", date: "12 Jun 2026" },
  { id: 2, cat: "najis", glyph: "ط", title: "Mengenal batas najis mughallazhah dalam penanganan satwa", summary: "Panduan thaharah praktis ketika berhadapan dengan najis berat di ruang klinik.", readTime: "5 mnt baca", author: "Tim Fikih An-Nahl", date: "8 Jun 2026" },
  { id: 3, cat: "penyembelihan", glyph: "ﺫ", title: "Syarat sah penyembelihan halal & etika tadzkiyah", summary: "Rukun, syarat, dan adab menyembelih yang sering terlewat dalam praktik.", readTime: "7 mnt baca", author: "Tim Fikih An-Nahl", date: "2 Jun 2026" },
  { id: 4, cat: "najis", glyph: "ﻡ", title: "Hukum kontak dengan air liur hewan saat pemeriksaan", summary: "Tinjauan fikih atas kontak medis dan cara menyucikannya menurut mazhab.", readTime: "4 mnt baca", author: "Tim Fikih An-Nahl", date: "28 Mei 2026" },
  { id: 5, cat: "kesejahteraan", glyph: "ﺭ", title: "Eutanasia hewan: kapan dibenarkan secara syar’i?", summary: "Menimbang kemaslahatan dan larangan menyiksa dalam keputusan akhir.", readTime: "8 mnt baca", author: "Tim Fikih An-Nahl", date: "21 Mei 2026" },
  { id: 6, cat: "lainnya", glyph: "ﺝ", title: "Adab berinteraksi dengan hewan menurut sunnah Nabi", summary: "Teladan Rasulullah ﷺ dalam memperlakukan hewan ternak dan peliharaan.", readTime: "5 mnt baca", author: "Tim Fikih An-Nahl", date: "15 Mei 2026" },
];

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
  ...(Object.keys(CATS) as Cat[]).map((k) => ({ key: k, label: CATS[k].label })),
];

export default function FikihView() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [filter, setFilter] = useState<"all" | Cat>("all");
  const [selectedId, setSelectedId] = useState(1);

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
  const sel = ARTICLES.find((a) => a.id === selectedId) || ARTICLES[0];
  const related = ARTICLES.filter((a) => a.id !== selectedId).slice(0, 3);

  if (view === "detail") {
    return (
      <div>
        <article className="mx-auto max-w-[760px] px-5 pb-2 pt-8">
          <button
            onClick={goList}
            className="mb-7 inline-flex cursor-pointer items-center gap-[7px] text-sm font-semibold text-muted2"
          >
            ← Kembali ke Pojok Fikih Veteriner
          </button>
          <div>
            <span style={badgeStyle(sel.cat)}>{CATS[sel.cat].label}</span>
          </div>
          <h1 className="my-[18px] mb-5 font-serif text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] tracking-[-0.015em] text-navy">
            {sel.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3.5 border-b border-border pb-7">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-navy font-serif text-base font-semibold text-white">
              {sel.author.charAt(0)}
            </div>
            <div className="flex flex-col leading-[1.3]">
              <span className="text-[14.5px] font-semibold text-navy">
                {sel.author}
              </span>
              <span className="text-[13px] text-light">
                {sel.date} · {sel.readTime}
              </span>
            </div>
          </div>
        </article>

        <div className="mx-auto mt-7 max-w-[900px] px-5">
          <div style={heroStyle(CATS[sel.cat].c)}>
            <span className="font-arabic text-[clamp(40px,8vw,72px)] text-white/90">
              {sel.glyph}
            </span>
          </div>
        </div>

        <article className="mx-auto max-w-[680px] px-5 pb-6 pt-10 text-[18px] leading-[1.8] text-body">
          <p className="mb-6">
            <span className="font-serif text-[17px] font-semibold text-navy">
              {sel.summary}
            </span>
          </p>
          <p className="mb-6">
            Islam menempatkan hewan bukan sekadar objek manfaat, melainkan
            makhluk Allah yang memiliki hak untuk diperlakukan dengan{" "}
            <em>rahmah</em> (kasih sayang) dan <em>ihsan</em> (berbuat baik). Bagi
            mahasiswa kedokteran hewan, prinsip ini bukan teori abstrak — ia
            menjadi bingkai bagi setiap tindakan medis, dari menahan rasa sakit
            hingga menentukan kapan sebuah keputusan diambil demi kemaslahatan
            hewan itu sendiri.
          </p>

          <figure className="my-8 rounded-[0_12px_12px_0] border-l-[3px] border-gold bg-bg-soft px-7 py-6">
            <p
              dir="rtl"
              className="mb-3 text-right font-arabic text-[24px] leading-[1.9] text-navy"
            >
              مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا فَيَأْكُلُ مِنْهُ إِنْسَانٌ أَوْ
              دَابَّةٌ إِلَّا كَانَ لَهُ بِهِ صَدَقَةٌ
            </p>
            <figcaption className="m-0 text-[15px] italic text-muted">
              &ldquo;Tidaklah seorang muslim menanam tanaman, lalu seekor hewan
              memakan darinya, melainkan itu menjadi sedekah baginya.&rdquo; (HR.
              Bukhari)
            </figcaption>
          </figure>

          <h2 className="mb-4 mt-10 font-serif text-[26px] font-semibold tracking-[-0.01em] text-navy">
            Landasan dalam syariat
          </h2>
          <p className="mb-6">
            Para ulama menyimpulkan bahwa menyiksa hewan, membebani di luar
            kemampuannya, atau menelantarkannya termasuk perbuatan yang dilarang.
            Sebaliknya, meringankan penderitaan makhluk hidup bernilai ibadah.
            Dalam konteks klinis, ini berarti penanganan rasa nyeri, kebersihan
            kandang, dan pemenuhan kebutuhan dasar hewan bukan sekadar standar
            profesi — melainkan amanah keagamaan.
          </p>

          <h2 className="mb-4 mt-10 font-serif text-[26px] font-semibold tracking-[-0.01em] text-navy">
            Penerapan di ruang praktik
          </h2>
          <p className="mb-4">
            Beberapa hal yang dapat dijaga seorang calon dokter hewan:
          </p>
          <ul className="mb-6 list-disc pl-[22px]">
            <li className="mb-2.5">
              Memastikan tindakan medis meminimalkan rasa sakit dan stres pada
              hewan.
            </li>
            <li className="mb-2.5">
              Menjaga kebersihan dan <em>thaharah</em> tanpa mengabaikan
              kenyamanan hewan.
            </li>
            <li className="mb-2.5">
              Mengambil keputusan eutanasia hanya atas dasar kemaslahatan, dengan
              pertimbangan syar&apos;i yang matang.
            </li>
          </ul>
          <p className="mb-6">
            Dengan memahami fikih sejak bangku kuliah, mahasiswa FKH dapat
            melangkah ke dunia profesi dengan kompas yang jelas: bahwa merawat
            makhluk hidup dan menjaga keimanan adalah dua hal yang berjalan
            seiring.
          </p>

          <div className="mt-9 border-t border-border pt-6 text-sm italic text-light">
            Catatan: Isi artikel ini adalah contoh ilustratif. Rujukan dalil dan
            kesimpulan fikih sebaiknya ditinjau ulang oleh pembina sebelum
            dipublikasikan.
          </div>
        </article>

        {/* Related */}
        <section className="mt-6 bg-bg-soft">
          <div className="mx-auto max-w-[1120px] px-5 pb-18 pt-14">
            <h2 className="mb-7 font-serif text-[clamp(22px,3.5vw,30px)] font-bold tracking-[-0.01em] text-navy">
              Artikel terkait
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
              {related.map((a) => (
                <button
                  key={a.id}
                  onClick={() => open(a.id)}
                  className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-white text-left"
                >
                  <div style={coverStyle(CATS[a.cat].c, 150)}>
                    <span className="font-arabic text-[28px] text-white/85">
                      {a.glyph}
                    </span>
                  </div>
                  <div className="p-5">
                    <span style={badgeStyle(a.cat)}>{CATS[a.cat].label}</span>
                    <h3 className="mt-3 font-serif text-[17.5px] font-semibold leading-[1.3] text-navy">
                      {a.title}
                    </h3>
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
    <div>
      {/* Rubric intro */}
      <section className="relative overflow-hidden bg-navy">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 360px at 88% -10%, rgba(197,162,77,0.16), transparent 60%), radial-gradient(700px 320px at -5% 110%, rgba(47,126,114,0.20), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1120px] px-5 pb-15 pt-14">
          <span className="mb-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.14em] text-gold">
            ★ Rubrik Unggulan
          </span>
          <h1 className="mb-4 max-w-[680px] font-serif text-[clamp(32px,5.5vw,48px)] font-bold leading-[1.1] tracking-[-0.015em] text-white">
            Pojok Fikih Veteriner
          </h1>
          <p className="m-0 max-w-[600px] text-[clamp(15px,2.2vw,17px)] leading-[1.65] text-footer-text">
            Tempat ilmu syar&apos;i berjumpa praktik kedokteran hewan. Panduan
            ringkas, bersumber, dan dekat dengan keseharian mahasiswa FKH — dari
            kandang hingga ruang praktik.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="mx-auto max-w-[1120px] px-5 pb-20 pt-9">
        <div className="mb-8 flex flex-wrap gap-2.5">
          {FILTER_DEFS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`cursor-pointer rounded-full border px-4 py-[9px] text-[13.5px] font-semibold transition-all ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-[#D8DDE6] bg-white text-muted"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[22px]">
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => open(a.id)}
              className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-white text-left"
            >
              <div style={coverStyle(CATS[a.cat].c, 150)}>
                <span className="font-arabic text-[34px] text-white/85">
                  {a.glyph}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-[22px]">
                <div className="mb-3 flex items-center gap-2.5">
                  <span style={badgeStyle(a.cat)}>{CATS[a.cat].label}</span>
                  <span className="text-[13px] text-light">{a.readTime}</span>
                </div>
                <h3 className="mb-2.5 font-serif text-[19px] font-semibold leading-[1.3] text-navy">
                  {a.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.6] text-muted">
                  {a.summary}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
