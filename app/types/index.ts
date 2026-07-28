/* ========================================
   Type Definitions — Google Sheets CMS
   ======================================== */

/** Sheet 1: Wisata */
export interface Wisata {
  nama_wisata: string;
  deskripsi_id: string;
  deskripsi_en: string;
  harga: string;
  jam_operasional: string;
  link_gmaps: string;
  link_gambar: string;
  link_instagram?: string;
  tampil_di_beranda: "Ya" | "Tidak";
}

/** Sheet 2: Penginapan */
export interface Penginapan {
  nama_penginapan: string;
  deskripsi_id: string;
  deskripsi_en: string;
  harga: string;
  no_whatsapp: string;
  link_gmaps: string;
  link_gambar: string;
  link_instagram?: string;
  tampil_di_beranda: "Ya" | "Tidak";
}

/** Sheet 3: Kuliner */
export interface Kuliner {
  nama_warung: string;
  deskripsi_id: string;
  deskripsi_en: string;
  harga: string;
  jam_operasional: string;
  link_gmaps: string;
  link_gambar: string;
  link_instagram?: string;
  tampil_di_beranda: "Ya" | "Tidak";
}

