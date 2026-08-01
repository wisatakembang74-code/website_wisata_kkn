import {
  getFeaturedDestinations,
  getFeaturedAccommodations,
  getFeaturedKuliner,
} from "@/app/lib/sheets";
import type { Wisata, Penginapan, Kuliner } from "@/app/types";
import HomeContent from "@/app/components/HomeContent";

/* ---------- Page ---------- */

export default async function Home() {
  // Fetch data dari Google Sheets
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

  return (
    <>
      {/* ===== JSON-LD Structured Data (SEO) ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: "Wisata Kembang Nanggulan",
            description:
              "Destinasi wisata alam, kuliner otentik, dan penginapan nyaman di Desa Nanggulan, Kulon Progo, Yogyakarta.",
            // TODO: Ganti dengan domain asli setelah deploy
            url: "https://website-wisata-kembang.vercel.app",
            touristType: ["Nature lover", "Cultural tourist", "Food tourist"],
            geo: {
              "@type": "GeoCoordinates",
              // TODO: Ganti dengan koordinat GPS asli Desa Nanggulan
              latitude: 0,
              longitude: 0,
            },
            image: "/images/IMG_5553.png",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Wisata Kembang Nanggulan",
            description:
              "Platform digital resmi Desa Nanggulan. Temukan destinasi wisata alam, kuliner otentik, homestay, dan layanan masyarakat desa.",
            // TODO: Ganti dengan domain asli setelah deploy
            url: "https://website-wisata-kembang.vercel.app",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nanggulan",
              addressRegion: "Kulon Progo",
              addressCountry: "ID",
            },
            image: "/images/IMG_5553.png",
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
