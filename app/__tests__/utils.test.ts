/**
 * Unit Tests — utils.ts
 *
 * Menguji fungsi-fungsi utilitas:
 * - getValidImg: konversi Google Drive link → thumbnail URL
 * - formatInstagramUrl: username/URL → full Instagram URL
 * - formatExternalUrl: tambahkan https:// jika perlu
 */

import { getValidImg, formatInstagramUrl, formatExternalUrl } from "@/app/lib/utils";

/* ============================================================
   Test Suite: getValidImg
   ============================================================ */

describe("getValidImg", () => {
  it("returns fallback for null/undefined input", () => {
    expect(getValidImg(null, "/fallback.png")).toBe("/fallback.png");
    expect(getValidImg(undefined, "/fallback.png")).toBe("/fallback.png");
  });

  it("returns fallback for empty string", () => {
    expect(getValidImg("", "/fallback.png")).toBe("/fallback.png");
  });

  it("returns fallback for '(kosong)' or '-'", () => {
    expect(getValidImg("(kosong)", "/fallback.png")).toBe("/fallback.png");
    expect(getValidImg("-", "/fallback.png")).toBe("/fallback.png");
  });

  it("converts Google Drive /file/d/ link to thumbnail URL", () => {
    const input = "https://drive.google.com/file/d/abc123xyz/view?usp=sharing";
    const result = getValidImg(input);

    expect(result).toBe("https://drive.google.com/thumbnail?id=abc123xyz&sz=w1000");
  });

  it("converts Google Drive open?id= link to thumbnail URL", () => {
    const input = "https://drive.google.com/open?id=def456uvw";
    const result = getValidImg(input);

    expect(result).toBe("https://drive.google.com/thumbnail?id=def456uvw&sz=w1000");
  });

  it("returns local path starting with /", () => {
    expect(getValidImg("/images/test.png")).toBe("/images/test.png");
  });

  it("returns fallback for non-drive external URLs", () => {
    expect(getValidImg("https://example.com/image.png", "/fb.png")).toBe("/fb.png");
  });

  it("returns drive.google.com URLs that are already thumbnail links", () => {
    const input = "https://drive.google.com/thumbnail?id=abc&sz=w500";
    expect(getValidImg(input)).toBe(input);
  });
});

/* ============================================================
   Test Suite: formatInstagramUrl
   ============================================================ */

describe("formatInstagramUrl", () => {
  it("returns null for null/undefined/empty input", () => {
    expect(formatInstagramUrl(null)).toBeNull();
    expect(formatInstagramUrl(undefined)).toBeNull();
    expect(formatInstagramUrl("")).toBeNull();
  });

  it("returns null for '(kosong)' or '-'", () => {
    expect(formatInstagramUrl("(kosong)")).toBeNull();
    expect(formatInstagramUrl("-")).toBeNull();
  });

  it("returns full URL if already a URL", () => {
    expect(formatInstagramUrl("https://instagram.com/wisata")).toBe(
      "https://instagram.com/wisata"
    );
  });

  it("converts username to full Instagram URL", () => {
    expect(formatInstagramUrl("pokdarwis_kembang")).toBe(
      "https://instagram.com/pokdarwis_kembang"
    );
  });

  it("strips @ prefix and converts to full URL", () => {
    expect(formatInstagramUrl("@pokdarwis_kembang")).toBe(
      "https://instagram.com/pokdarwis_kembang"
    );
  });
});

/* ============================================================
   Test Suite: formatExternalUrl
   ============================================================ */

describe("formatExternalUrl", () => {
  it("returns null for null/undefined/empty input", () => {
    expect(formatExternalUrl(null)).toBeNull();
    expect(formatExternalUrl(undefined)).toBeNull();
    expect(formatExternalUrl("")).toBeNull();
  });

  it("returns null for '(kosong)', '-', '#'", () => {
    expect(formatExternalUrl("(kosong)")).toBeNull();
    expect(formatExternalUrl("-")).toBeNull();
    expect(formatExternalUrl("#")).toBeNull();
  });

  it("returns URL as-is if it starts with http:// or https://", () => {
    expect(formatExternalUrl("https://maps.google.com/abc")).toBe(
      "https://maps.google.com/abc"
    );
    expect(formatExternalUrl("http://example.com")).toBe("http://example.com");
  });

  it("adds https:// prefix when missing", () => {
    expect(formatExternalUrl("maps.google.com/abc")).toBe(
      "https://maps.google.com/abc"
    );
  });
});
