import type { Metadata } from "next";
import PanduanContent from "./PanduanContent";

export const metadata: Metadata = {
  title: "Panduan Wisata — Wisata Kembang Nanggulan",
  description:
    "Buku panduan interaktif wisata, budaya, dan kuliner Desa Kembang, Nanggulan, Kulon Progo, Yogyakarta. Jelajahi panduan lengkap dalam format flipbook.",
  openGraph: {
    title: "Panduan Wisata — Wisata Kembang",
    description:
      "Buku panduan interaktif wisata, budaya, dan kuliner Desa Kembang, Nanggulan, Kulon Progo, Yogyakarta.",
    type: "website",
  },
};

export default function PanduanPage() {
  return <PanduanContent />;
}
