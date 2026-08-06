import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wisatakembang.id"),
  title: "Wisata Desa Nanggulan — Jelajahi Keindahan Alam & Kuliner Otentik",
  icons: {
    icon: "/images/logo_unit_nanggulan.png",
    shortcut: "/images/logo_unit_nanggulan.png",
    apple: "/images/logo_unit_nanggulan.png",
  },
  description:
    "Platform digital resmi Desa Nanggulan. Temukan destinasi wisata alam, kuliner otentik, homestay, dan layanan masyarakat desa. Pesan langsung via WhatsApp.",
  keywords: [
    "wisata kembang nanggulan",
    "wisata kulon progo",
    "wisata jogja",
    "kuliner nanggulan",
    "homestay nanggulan",
    "air terjun kedung pedut",
    "wisata kembang jogja",
    "wisata alam yogyakarta",
  ],
  authors: [{ name: "Wisata Kembang Nanggulan" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Wisata Kembang Nanggulan",
    title: "Wisata Kembang Nanggulan — Pesona Alam & Kuliner Tradisional Jogja",
    description:
      "Jelajahi keindahan alam, kuliner otentik, dan penginapan nyaman di Desa Nanggulan, Kulon Progo, Yogyakarta. Pesan langsung via WhatsApp!",
    images: [
      {
        url: "/images/IMG_5553.png",
        width: 1200,
        height: 630,
        alt: "Pemandangan alam Wisata Kembang Nanggulan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisata Kembang Nanggulan — Pesona Alam & Kuliner Tradisional Jogja",
    description:
      "Jelajahi keindahan alam, kuliner otentik, dan penginapan nyaman di Desa Nanggulan, Kulon Progo, Yogyakarta.",
    images: ["/images/IMG_5553.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
