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

  if (s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://")) {
    return s;
  }
  
  return fallback;
}
