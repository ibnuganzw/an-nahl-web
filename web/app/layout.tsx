import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans, Amiri } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LDF An-Nahl FKH USK",
  description:
    "Lembaga Dakwah Fakultas An-Nahl, Fakultas Kedokteran Hewan, Universitas Syiah Kuala. Merawat hewan, menjaga iman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${lora.variable} ${jakarta.variable} ${amiri.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
