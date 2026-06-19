// Helper format tanggal ke bahasa Indonesia dari string "YYYY-MM-DD".

const dt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("id-ID", opts);

function parse(tanggal: string | null): Date | null {
  if (!tanggal) return null;
  const d = new Date(`${tanggal}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatTanggal(tanggal: string | null) {
  const d = parse(tanggal);
  if (!d) {
    return { month: "—", day: "--", weekday: "", full: "Tanggal menyusul", past: false };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    month: dt({ month: "short" }).format(d),
    day: String(d.getDate()).padStart(2, "0"),
    weekday: dt({ weekday: "long" }).format(d),
    full: dt({
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d),
    past: d < today,
  };
}

export function formatTanggalSingkat(iso: string | null) {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  return dt({ day: "numeric", month: "short", year: "numeric" }).format(d);
}
