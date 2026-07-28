export function getValidImg(src?: string | null, fallback: string = ""): string {
  if (!src) return fallback;
  const s = src.trim();
  if (s === "(kosong)" || s === "-") return fallback;

  // Auto-convert Google Drive sharing links to direct image links
  if (s.includes("drive.google.com/file/d/")) {
    const match = s.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      // Use Google Drive UC API for direct image embedding
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  } else if (s.includes("drive.google.com/open?id=")) {
    // Format generated natively by Google Forms file upload
    const match = s.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  if (s.startsWith("/")) {
    return s;
  }
  
  // Hanya izinkan domain drive.google.com karena Next.js akan crash 
  // jika menerima domain yang tidak terdaftar di next.config.ts
  if (s.startsWith("http") && s.includes("drive.google.com")) {
    return s;
  }
  
  return fallback;
}

/**
 * Mengubah input Instagram (username atau URL) menjadi URL lengkap.
 * Contoh:
 *   "pokdarwis_kembang"        → "https://instagram.com/pokdarwis_kembang"
 *   "@pokdarwis_kembang"       → "https://instagram.com/pokdarwis_kembang"
 *   "https://instagram.com/x"  → "https://instagram.com/x"  (tidak diubah)
 *
 * Mengembalikan null jika input kosong / tidak valid.
 */
export function formatInstagramUrl(input?: string | null): string | null {
  if (!input) return null;
  const s = input.trim();
  if (s === "" || s === "(kosong)" || s === "-") return null;

  // Already a full URL
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  // Strip leading @ if present
  const username = s.startsWith("@") ? s.substring(1) : s;
  return `https://instagram.com/${username}`;
}
