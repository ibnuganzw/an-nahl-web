// Motif sarang lebah (honeycomb) halus — identitas "An-Nahl" (lebah).
// Default menutup penuh (inset-0); bisa ditempatkan di pojok lewat `className`,
// dan `fade` memberi mask radial agar memudar ke arah dalam.

const HEX_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15z'/%3E%3Cpath d='M14 0v9.25M27 16.75L14 24.5 1 16.75M14 24.5v15M27 39.75L14 47.25 1 39.75'/%3E%3C/g%3E%3C/svg%3E\")";

export default function Honeycomb({
  className = "absolute inset-0",
  opacity = 0.06,
  fade,
}: {
  className?: string;
  opacity?: number;
  fade?: "top-right" | "top-left";
}) {
  const mask =
    fade === "top-right"
      ? "radial-gradient(120% 120% at 100% 0%, #000 30%, transparent 72%)"
      : fade === "top-left"
        ? "radial-gradient(120% 120% at 0% 0%, #000 30%, transparent 72%)"
        : undefined;
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: HEX_SVG,
        backgroundSize: "44px 77px",
        ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
      }}
    />
  );
}
