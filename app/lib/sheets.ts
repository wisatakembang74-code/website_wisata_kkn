import Papa from "papaparse";
import type { Wisata, Penginapan, Kuliner } from "@/app/types";

/* ========================================
   Google Sheets CSV Fetcher
   ======================================== */

const SPREADSHEET_ID = process.env.SPREADSHEET_LINK;

/**
 * Mengunduh satu tab/sheet dari Google Sheets dalam format CSV,
 * lalu mem-parsing-nya menjadi array of objects.
 */
async function fetchSheet<T>(sheetName: string): Promise<T[]> {
  if (!SPREADSHEET_ID) {
    console.warn(
      "[sheets] SPREADSHEET_LINK belum diatur di .env.local — menggunakan data kosong.",
    );
    return [];
  }

  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&cb=${Date.now()}`;

  const res = await fetch(url, {
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    next: process.env.NODE_ENV === "development" ? undefined : { tags: ["sheets"] },
  });

  if (!res.ok) {
    console.error(`[sheets] Gagal fetch sheet "${sheetName}": ${res.status}`);
    return [];
  }

  const csvText = await res.text();
  const { data } = Papa.parse<T>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => {
      const h = header.trim().toLowerCase();
      // Menormalkan header yang mungkin ditulis "tampil_di_beranda (Ya/Tidak)" atau ada spasi/enter
      if (h.includes("tampil_di_beranda")) return "tampil_di_beranda";
      if (h.includes("no_whatsapp")) return "no_whatsapp";
      return header.trim();
    },
  });

  if (data.length === 0) {
    console.warn(`[sheets] Data dari tab "${sheetName}" kosong.`);
  } else {
    // Debug log to see the parsed headers from the first row
    if (sheetName === "Wisata") {
      console.log("[DEBUG sheets] Parsed Row 0:", data[0]);
    }
  }

  return data;
}

/* ---------- Public API: Wisata ---------- */

/**
 * Mengambil semua data wisata dari tab "Wisata".
 * Filter hanya berdasarkan tampil_di_beranda.
 */
export async function getWisata(): Promise<Wisata[]> {
  const rows = await fetchSheet<Wisata>("Wisata");
  return rows.filter((r) => r.tampil_di_beranda?.trim() === "Ya");
}

/**
 * Alias — mengambil wisata yang tampil di beranda.
 */
export async function getFeaturedDestinations(): Promise<Wisata[]> {
  return getWisata();
}

/* ---------- Public API: Penginapan ---------- */

/**
 * Mengambil semua data penginapan dari tab "Penginapan".
 */
export async function getPenginapan(): Promise<Penginapan[]> {
  const rows = await fetchSheet<Penginapan>("Penginapan");
  return rows.filter((r) => r.tampil_di_beranda?.trim() === "Ya");
}

/**
 * Alias — mengambil penginapan yang tampil di beranda.
 */
export async function getFeaturedAccommodations(): Promise<Penginapan[]> {
  return getPenginapan();
}

/* ---------- Public API: Kuliner ---------- */

/**
 * Mengambil semua data kuliner dari tab "Kuliner".
 */
export async function getKuliner(): Promise<Kuliner[]> {
  const rows = await fetchSheet<Kuliner>("Kuliner");
  return rows.filter((r) => r.tampil_di_beranda?.trim() === "Ya");
}

/**
 * Alias — mengambil kuliner yang tampil di beranda.
 */
export async function getFeaturedKuliner(): Promise<Kuliner[]> {
  return getKuliner();
}
