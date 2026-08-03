/**
 * Unit Tests — sheets.ts
 *
 * Menguji logika pengambilan data dari Google Sheets (CSV)
 * dan pemfilteran berdasarkan kolom tampil_di_beranda.
 *
 * Semua network request di-mock agar test berjalan tanpa internet.
 */

import {
  getWisata,
  getPenginapan,
  getKuliner,
  getFeaturedDestinations,
  getFeaturedAccommodations,
  getFeaturedKuliner,
} from "@/app/lib/sheets";

/* ============================================================
   Mock global fetch
   ============================================================ */

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

/* ============================================================
   Helper: generate CSV string
   ============================================================ */

function makeCSV(headers: string[], rows: string[][]): string {
  const headerLine = headers.map((h) => `"${h}"`).join(",");
  const dataLines = rows.map((row) => row.map((cell) => `"${cell}"`).join(","));
  return [headerLine, ...dataLines].join("\n");
}

/* ============================================================
   Test Suite: fetchSheet — Basic behavior
   ============================================================ */

describe("fetchSheet — CSV fetching and parsing", () => {
  it("returns an empty array when SPREADSHEET_LINK is not set", async () => {
    const original = process.env.SPREADSHEET_LINK;
    delete process.env.SPREADSHEET_LINK;

    // Reset module cache so sheets.ts re-reads process.env.SPREADSHEET_LINK
    jest.resetModules();
    const { getWisata: getWisataFresh } = await import("@/app/lib/sheets");

    const result = await getWisataFresh();

    expect(result).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();

    // Restore
    process.env.SPREADSHEET_LINK = original;
  });

  it("returns an empty array when fetch fails (HTTP 500)", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const result = await getWisata();

    expect(result).toEqual([]);
  });

  it("returns an empty array when fetch fails (HTTP 404)", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await getKuliner();

    expect(result).toEqual([]);
  });
});

/* ============================================================
   Test Suite: getWisata — Filtering & header normalization
   ============================================================ */

describe("getWisata — Wisata data", () => {
  it("returns only rows where tampil_di_beranda is 'Ya'", async () => {
    const csv = makeCSV(
      [
        "nama_wisata",
        "deskripsi_id",
        "deskripsi_en",
        "harga",
        "jam_operasional",
        "link_gmaps",
        "link_gambar",
        "link_instagram",
        "tampil_di_beranda",
      ],
      [
        ["Air Terjun Kedung Pedut", "Deskripsi ID", "Desc EN", "25000", "08:00-17:00", "https://maps.google.com/1", "https://drive.google.com/file/d/abc123", "@wisata1", "Ya"],
        ["Bukit Menoreh", "Deskripsi ID 2", "Desc EN 2", "FREE", "08:00-18:00", "https://maps.google.com/2", "https://drive.google.com/file/d/def456", "", "Tidak"],
        ["Goa Kiskendo", "Deskripsi ID 3", "Desc EN 3", "15000", "09:00-16:00", "https://maps.google.com/3", "https://drive.google.com/file/d/ghi789", "@wisata3", "Ya"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getWisata();

    expect(result).toHaveLength(2);
    expect(result[0].nama_wisata).toBe("Air Terjun Kedung Pedut");
    expect(result[1].nama_wisata).toBe("Goa Kiskendo");
  });

  it("returns empty array when all rows have tampil_di_beranda = 'Tidak'", async () => {
    const csv = makeCSV(
      [
        "nama_wisata",
        "deskripsi_id",
        "deskripsi_en",
        "harga",
        "jam_operasional",
        "link_gmaps",
        "link_gambar",
        "link_instagram",
        "tampil_di_beranda",
      ],
      [
        ["Wisata A", "Desc", "Desc EN", "10000", "08:00", "https://maps.google.com", "https://drive.google.com/file/d/xxx", "", "Tidak"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getWisata();

    expect(result).toEqual([]);
  });

  it("getFeaturedDestinations is an alias for getWisata", async () => {
    const csv = makeCSV(
      [
        "nama_wisata",
        "deskripsi_id",
        "deskripsi_en",
        "harga",
        "jam_operasional",
        "link_gmaps",
        "link_gambar",
        "link_instagram",
        "tampil_di_beranda",
      ],
      [
        ["Test Wisata", "Desc", "Desc EN", "FREE", "08:00", "https://maps.google.com", "https://drive.google.com/file/d/abc", "", "Ya"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getFeaturedDestinations();

    expect(result).toHaveLength(1);
    expect(result[0].nama_wisata).toBe("Test Wisata");
  });
});

/* ============================================================
   Test Suite: getPenginapan — Filtering
   ============================================================ */

describe("getPenginapan — Penginapan data", () => {
  it("returns only rows with tampil_di_beranda = 'Ya'", async () => {
    const csv = makeCSV(
      [
        "nama_penginapan",
        "deskripsi_id",
        "deskripsi_en",
        "harga",
        "no_whatsapp",
        "link_gmaps",
        "link_gambar",
        "link_instagram",
        "tampil_di_beranda",
      ],
      [
        ["Homestay Kembang", "Desc ID", "Desc EN", "150000", "08123456", "https://maps.google.com/1", "https://drive.google.com/file/d/abc", "@homestay", "Ya"],
        ["Villa Hidden", "Desc ID 2", "Desc EN 2", "300000", "08987654", "https://maps.google.com/2", "https://drive.google.com/file/d/def", "", "Tidak"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getPenginapan();

    expect(result).toHaveLength(1);
    expect(result[0].nama_penginapan).toBe("Homestay Kembang");
  });

  it("getFeaturedAccommodations is an alias for getPenginapan", async () => {
    const csv = makeCSV(
      [
        "nama_penginapan",
        "deskripsi_id",
        "deskripsi_en",
        "harga",
        "no_whatsapp",
        "link_gmaps",
        "link_gambar",
        "link_instagram",
        "tampil_di_beranda",
      ],
      [
        ["Test Penginapan", "Desc", "Desc EN", "200000", "08111", "https://maps.google.com", "https://drive.google.com/file/d/xyz", "", "Ya"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getFeaturedAccommodations();

    expect(result).toHaveLength(1);
    expect(result[0].nama_penginapan).toBe("Test Penginapan");
  });
});

/* ============================================================
   Test Suite: getKuliner — Filtering
   ============================================================ */

describe("getKuliner — Kuliner data", () => {
  it("returns only rows with tampil_di_beranda = 'Ya'", async () => {
    const csv = makeCSV(
      [
        "nama_warung",
        "deskripsi_id",
        "deskripsi_en",
        "harga",
        "jam_operasional",
        "link_gmaps",
        "link_gambar",
        "link_instagram",
        "tampil_di_beranda",
      ],
      [
        ["Warung Bu Darmi", "Desc ID", "Desc EN", "15000", "10:00-20:00", "https://maps.google.com/1", "https://drive.google.com/file/d/abc", "@budarmi", "Ya"],
        ["Warung Pak Joko", "Desc ID 2", "Desc EN 2", "20000", "11:00-21:00", "https://maps.google.com/2", "https://drive.google.com/file/d/def", "", "Tidak"],
        ["Kedai Kopi Menoreh", "Desc ID 3", "Desc EN 3", "25000", "09:00-22:00", "https://maps.google.com/3", "https://drive.google.com/file/d/ghi", "@kopi", "Ya"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getKuliner();

    expect(result).toHaveLength(2);
    expect(result[0].nama_warung).toBe("Warung Bu Darmi");
    expect(result[1].nama_warung).toBe("Kedai Kopi Menoreh");
  });

  it("getFeaturedKuliner is an alias for getKuliner", async () => {
    const csv = makeCSV(
      [
        "nama_warung",
        "deskripsi_id",
        "deskripsi_en",
        "harga",
        "jam_operasional",
        "link_gmaps",
        "link_gambar",
        "link_instagram",
        "tampil_di_beranda",
      ],
      [
        ["Test Kuliner", "Desc", "Desc EN", "10000", "10:00", "https://maps.google.com", "https://drive.google.com/file/d/xyz", "", "Ya"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getFeaturedKuliner();

    expect(result).toHaveLength(1);
    expect(result[0].nama_warung).toBe("Test Kuliner");
  });
});

/* ============================================================
   Test Suite: Header normalization
   ============================================================ */

describe("Header normalization", () => {
  it("normalizes messy headers like 'Nama_Wisata' to 'nama_wisata'", async () => {
    // Simulate headers with inconsistent casing/whitespace from Google Sheets
    const csv = makeCSV(
      [
        "Nama_Wisata",
        "Deskripsi_ID",
        "Deskripsi_EN",
        "Harga",
        "Jam_Operasional",
        "Link_Gmaps",
        "Link_Gambar",
        "Link_Instagram",
        "Tampil_di_Beranda",
      ],
      [
        ["Air Terjun Test", "Deskripsi", "Description", "FREE", "08:00-17:00", "https://maps.google.com", "https://drive.google.com/file/d/abc", "@test", "Ya"],
      ]
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => csv,
    });

    const result = await getWisata();

    expect(result).toHaveLength(1);
    expect(result[0].nama_wisata).toBe("Air Terjun Test");
    expect(result[0].tampil_di_beranda).toBe("Ya");
  });
});
