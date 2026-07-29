import {
  getFeaturedDestinations,
  getFeaturedAccommodations,
  getFeaturedKuliner,
} from "@/app/lib/sheets";
import type { Wisata, Penginapan, Kuliner } from "@/app/types";
import HomeContent from "@/app/components/HomeContent";

/* ---------- Fallback Static Data ---------- */
/* Digunakan saat SPREADSHEET_LINK belum dikonfigurasi */

const fallbackDestinations: Wisata[] = [
  {
    nama_wisata: "Hidden Waterfall",
    deskripsi_id: "Air terjun tersembunyi yang memukau.",
    deskripsi_en: "A stunning hidden waterfall.",
    harga: "Rp 10.000",
    jam_operasional: "08:00 - 17:00",
    link_gmaps: "#",
    link_gambar: "/images/dest-waterfall.png",
    tampil_di_beranda: "Ya",
  },
  {
    nama_wisata: "Rice Terraces",
    deskripsi_id: "Sawah terasering yang indah.",
    deskripsi_en: "Beautiful rice terraces with panoramic views.",
    harga: "Free",
    jam_operasional: "Sepanjang hari",
    link_gmaps: "#",
    link_gambar: "/images/dest-rice-terraces.png",
    tampil_di_beranda: "Ya",
  },
];

const fallbackAccommodations: Penginapan[] = [
  {
    nama_penginapan: "Lumbung Wooden Cabin",
    deskripsi_id: "Kabin kayu tradisional yang nyaman.",
    deskripsi_en: "A cozy traditional wooden cabin.",
    harga: "Rp 450.000 / Malam",
    no_whatsapp: "",
    link_gmaps: "#",
    link_gambar: "/images/stay-cabin.png",
    tampil_di_beranda: "Ya",
  },
  {
    nama_penginapan: "Tropical Garden Suite",
    deskripsi_id: "Suite dengan taman tropis yang indah.",
    deskripsi_en: "A suite with a beautiful tropical garden.",
    harga: "Rp 650.000 / Malam",
    no_whatsapp: "",
    link_gmaps: "#",
    link_gambar: "/images/stay-tropical.png",
    tampil_di_beranda: "Ya",
  },
];

const fallbackKuliner: Kuliner[] = [
  {
    nama_warung: "Warung Mbah Jowo",
    deskripsi_id: "Masakan Jawa autentik yang lezat.",
    deskripsi_en: "Authentic Javanese cuisine.",
    harga: "Rp 15.000 - Rp 30.000",
    jam_operasional: "10:00 - 21:00",
    link_gmaps: "#",
    link_gambar: "/images/food-placeholder.png",
    tampil_di_beranda: "Ya",
  },
];

/* ---------- Page ---------- */

export default async function Home() {
  // Fetch data dari Google Sheets (fallback ke data statis jika belum dikonfigurasi)
  let destinations: Wisata[] = [];
  let accommodations: Penginapan[] = [];
  let kuliner: Kuliner[] = [];

  try {
    destinations = await getFeaturedDestinations();
    accommodations = await getFeaturedAccommodations();
    kuliner = await getFeaturedKuliner();
  } catch (error) {
    console.error("[Home] Gagal fetch data dari Sheets:", error);
  }

  // Gunakan fallback jika data kosong
  if (destinations.length === 0) destinations = fallbackDestinations;
  if (accommodations.length === 0) accommodations = fallbackAccommodations;
  if (kuliner.length === 0) kuliner = fallbackKuliner;

  return (
    <>
      {/* ===== JSON-LD Structured Data (SEO) ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Wisata Kembang Nanggulan",
            "description":
              "Destinasi wisata alam, kuliner otentik, dan penginapan nyaman di Desa Nanggulan, Kulon Progo, Yogyakarta.",
            // TODO: Ganti dengan domain asli setelah deploy
            "url": "https://wisata-nanggulan.vercel.app",
            "touristType": [
              "Nature lover",
              "Cultural tourist",
              "Food tourist",
            ],
            "geo": {
              "@type": "GeoCoordinates",
              // TODO: Ganti dengan koordinat GPS asli Desa Nanggulan
              "latitude": 0,
              "longitude": 0,
            },
            "image": "/images/hero-bg.png",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Wisata Kembang Nanggulan",
            "description":
              "Platform digital resmi Desa Nanggulan. Temukan destinasi wisata alam, kuliner otentik, homestay, dan layanan masyarakat desa.",
            // TODO: Ganti dengan domain asli setelah deploy
            "url": "https://wisata-nanggulan.vercel.app",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Nanggulan",
              "addressRegion": "Kulon Progo",
              "addressCountry": "ID",
            },
            "image": "/images/hero-bg.png",
          }),
        }}
      />

      {/* ===== Page Content (Client Component) ===== */}
      <HomeContent
        destinations={destinations}
        accommodations={accommodations}
        kuliner={kuliner}
      />
    </>
  );
}
