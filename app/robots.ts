import type { MetadataRoute } from "next";

// TODO: Ganti dengan domain asli Anda setelah deploy (misal: https://nanggulan.desa.id)
const SITE_URL = "https://website-wisata-kembang.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
