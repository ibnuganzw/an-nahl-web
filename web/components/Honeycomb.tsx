// Motif sarang lebah (honeycomb) halus — identitas "An-Nahl" (lebah).
// Dipakai sebagai lapisan latar di section gelap, menggantikan radial-gradient generik.

export default function Honeycomb({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15z'/%3E%3Cpath d='M14 0v9.25M27 16.75L14 24.5 1 16.75M14 24.5v15M27 39.75L14 47.25 1 39.75'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundSize: "44px 77px",
      }}
    />
  );
}
