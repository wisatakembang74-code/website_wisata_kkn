/**
 * Kamus Terjemahan (Dictionary)
 *
 * Semua teks statis website dalam dua bahasa.
 * Jika ada teks yang ingin diubah di masa depan,
 * cukup edit di file ini saja.
 */

const translations = {
  // ===== Navbar =====
  nav: {
    home: { id: "Beranda", en: "Home" },
    destinations: { id: "Destinasi", en: "Destinations" },
    homestays: { id: "Penginapan", en: "Homestays" },
    kuliner: { id: "Kuliner", en: "Kuliner" },
  },

  // ===== Hero Section =====
  hero: {
    heading: {
      id: "Temukan Kehidupan Desa yang Autentik",
      en: "Discover the Authentic Village Life",
    },
    subtitle: {
      id: "Rasakan jiwa Indonesia melalui pemandangan alam yang memukau dan warisan budaya yang kaya.",
      en: "Experience the soul of Indonesia through breathtaking landscapes and rich cultural heritage.",
    },
    cta: { id: "Jelajahi Sekarang", en: "Explore Now" },
  },

  // ===== Heritage Section =====
  heritage: {
    label: { id: "Warisan Kami", en: "Our Heritage" },
    heading1: { id: "Berakar dari Alam,", en: "Rooted in Nature," },
    heading2: {
      id: "Diukir oleh Tradisi.",
      en: "Crafted by Tradition.",
    },
    body1: {
      id: "Menjauh dari hiruk-pikuk kehidupan modern dan benamkan diri Anda dalam irama yang ditentukan oleh matahari dan musim. Desa kami menawarkan suaka di mana pertanian berkelanjutan dan praktik budaya kuno berkembang selaras dengan lingkungan yang masih asri.",
      en: "Step away from the hustle of modern life and immerse yourself in rhythms dictated by the sun and seasons. Our village offers a sanctuary where sustainable agriculture and ancient cultural practices thrive in harmony with the pristine environment.",
    },
    body2: {
      id: "Setiap jalan setapak mengarah ke sebuah cerita, setiap hidangan adalah perayaan hasil panen lokal, dan setiap matahari terbenam di atas sawah terasering mengingatkan kita akan keindahan sederhana dari kehidupan.",
      en: "Every path leads to a story, every meal is a celebration of local harvest, and every sunset over the rice terraces reminds us of the simple beauty of existence.",
    },
    cta: { id: "Baca Kisah Kami", en: "Read Our Story" },
  },

  // ===== Section Headings =====
  sections: {
    destinationsLabel: { id: "Jelajahi", en: "Explore" },
    destinationsHeading: {
      id: "Destinasi Populer",
      en: "Popular Destinations",
    },
    accommodationsLabel: { id: "Penginapan", en: "Accommodation" },
    accommodationsHeading: {
      id: "Pilihan Menginap",
      en: "Where to Stay",
    },
    kulinerLabel: { id: "Kuliner", en: "Kuliner" },
    kulinerHeading: {
      id: "Cicipi Warisan Rasa",
      en: "Taste the Heritage",
    },
    kulinerSubtitle: {
      id: "Nikmati cita rasa autentik desa kami, dimasak dengan bahan-bahan segar dan resep turun-temurun yang telah diwariskan selama berabad-abad.",
      en: "Savor the authentic taste of our village, prepared with fresh ingredients and centuries-old recipes passed down through generations.",
    },
  },

  // ===== Card Buttons =====
  cards: {
    viewDetails: { id: "Lihat Detail", en: "View Details" },
    hideDetails: { id: "Sembunyikan", en: "Hide Details" },
    openMaps: { id: "Lihat di Google Maps", en: "View on Google Maps" },
    bookWhatsApp: {
      id: "Hubungi via WhatsApp",
      en: "Contact via WhatsApp",
    },
    perNight: { id: "/ malam", en: "/ night" },
  },

  // ===== Footer =====
  footer: {
    tagline: {
      id: "Pengalaman desa autentik, wisata berkelanjutan, dan kenangan tak terlupakan.",
      en: "Authentic village experiences, sustainable tourism, and unforgettable memories.",
    },
    copyright: {
      id: "Desa Wisata. Seluruh hak dilindungi.",
      en: "Desa Wisata. All rights reserved.",
    },
    villageAddress: { id: "Alamat Desa", en: "Village Address" },
    contactInfo: { id: "Info Kontak", en: "Contact Info" },
    privacyPolicy: { id: "Kebijakan Privasi", en: "Privacy Policy" },
  },
} as const;

export type Lang = "id" | "en";

/**
 * Helper untuk mengambil teks dari kamus.
 * Contoh penggunaan: t(translations.hero.heading, "id") → "Temukan Kehidupan Desa yang Autentik"
 */
export function t(entry: { id: string; en: string }, lang: Lang): string {
  return entry[lang];
}

/**
 * Helper khusus untuk membuat template pesan WhatsApp yang dinamis.
 */
export function tWaBooking(name: string, lang: Lang): string {
  if (lang === "en") return `Hello ${name}, I would like to book a room.`;
  return `Halo ${name}, saya ingin memesan kamar.`;
}

export default translations;
