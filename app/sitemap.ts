import type { MetadataRoute } from "next";

// TODO: Ganti dengan domain asli Anda setelah deploy (misal: https://nanggulan.desa.id)
const SITE_URL = "https://website-wisata-kembang.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
