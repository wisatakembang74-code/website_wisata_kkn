"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Penginapan } from "@/app/types";
import { getValidImg, formatInstagramUrl, formatExternalUrl } from "@/app/lib/utils";
import translations, { t, tWaBooking, type Lang } from "@/app/lib/translations";

function getValidWa(val?: string | null): string | null {
  if (!val) return null;
  const s = val.trim();
  if (s === "" || s === "(kosong)" || s === "-") return null;
  let formatted = s;
  if (formatted.startsWith("0")) {
    formatted = "62" + formatted.substring(1);
  } else if (!formatted.startsWith("62") && !formatted.startsWith("+62")) {
    formatted = "62" + formatted;
  }
  formatted = formatted.replace(/\D/g, "");
  return formatted;
}

export default function AccommodationCard({ stay, lang }: { stay: Penginapan; lang: Lang }) {
  const gmapsUrl = formatExternalUrl(stay.link_gmaps);
  const instagramUrl = formatInstagramUrl(stay.link_instagram);
  const validWa = getValidWa(stay.no_whatsapp);
  const waLink = validWa
    ? `https://wa.me/${validWa}?text=${encodeURIComponent(
        tWaBooking(stay.nama_penginapan, lang)
      )}`
    : null;
  const [isExpanded, setIsExpanded] = useState(false);

  const hasDescText = lang === "id"
    ? stay.deskripsi_id && stay.deskripsi_id !== "(kosong)" && stay.deskripsi_id !== "-"
    : stay.deskripsi_en && stay.deskripsi_en !== "(kosong)" && stay.deskripsi_en !== "-";
  const hasDesc = hasDescText || !!instagramUrl;

  return (
    <div className="w-[85vw] md:w-[720px] shrink-0 snap-center group bg-[#FDFBF7] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row border border-[#E8E4DB]">
      {/* Image — Left side on desktop */}
      <div className="md:w-2/5 relative h-72 md:h-auto overflow-hidden">
        <Image
          src={getValidImg(stay.link_gambar, "/images/stay-cabin.png")}
          alt={stay.nama_penginapan || "Gambar Penginapan"}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content — Right side on desktop */}
      <div className="p-8 md:w-3/5 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-neutral-900">
          {stay.nama_penginapan}
        </h3>

        {/* Harga */}
        {stay.harga && stay.harga !== "(kosong)" && stay.harga !== "-" && (
          <p className="text-emerald-700 font-semibold text-xl mt-2">
            {stay.harga}{" "}
            <span className="text-neutral-500 text-base font-normal italic">
              {t(translations.cards.perNight, lang)}
            </span>
          </p>
        )}

        {/* Toggle Detail Button */}
        {hasDesc && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors mt-4 cursor-pointer"
          >
            <span>{isExpanded ? t(translations.cards.hideDetails, lang) : t(translations.cards.viewDetails, lang)}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </motion.svg>
          </button>
        )}

        {/* Expandable Details */}
        <AnimatePresence>
          {isExpanded && hasDesc && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {hasDescText && (
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  {lang === "id" ? stay.deskripsi_id : stay.deskripsi_en}
                </p>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors mt-4"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  {t(translations.cards.openInstagram, lang)}
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons — Always Visible */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* WhatsApp Button */}
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#1fba59] transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1112 20z" />
              </svg>
              {t(translations.cards.bookWhatsApp, lang)}
            </a>
          )}

          {/* Google Maps Button */}
          {gmapsUrl && (
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border-2 border-[#E8E4DB] text-neutral-700 rounded-xl font-medium hover:bg-[#E8E4DB] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {t(translations.cards.openMaps, lang)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
