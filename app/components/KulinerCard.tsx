"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Kuliner } from "@/app/types";
import { getValidImg, formatInstagramUrl, formatExternalUrl } from "@/app/lib/utils";
import translations, { t, type Lang } from "@/app/lib/translations";

export default function KulinerCard({ item, lang }: { item: Kuliner; lang: Lang }) {
  const gmapsUrl = formatExternalUrl(item.link_gmaps);
  const instagramUrl = formatInstagramUrl(item.link_instagram);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasDescText = lang === "id"
    ? item.deskripsi_id && item.deskripsi_id !== "(kosong)" && item.deskripsi_id !== "-"
    : item.deskripsi_en && item.deskripsi_en !== "(kosong)" && item.deskripsi_en !== "-";
  const hasJam = item.jam_operasional && item.jam_operasional !== "(kosong)" && item.jam_operasional !== "-";
  const hasDesc = hasDescText || hasJam || !!instagramUrl;

  return (
    <div className="w-[85vw] sm:w-[360px] shrink-0 snap-center group bg-[#FDFBF7] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-[#E8E4DB]">
      {/* Image with Title Overlay */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={getValidImg(item.link_gambar, "/images/food-placeholder.png")}
          alt={item.nama_warung || "Gambar Kuliner"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 text-white text-2xl font-semibold drop-shadow-md">
          {item.nama_warung}
        </div>
        {item.harga && item.harga !== "(kosong)" && item.harga !== "-" && (
          <div className="absolute top-4 right-4 backdrop-blur-md bg-white/70 px-3 py-1 rounded-2xl text-neutral-900 text-xs font-bold tracking-wider uppercase shadow-sm">
            {item.harga}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Toggle Detail Button */}
        {hasDesc && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors mb-4 cursor-pointer"
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
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {hasDescText && (
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {lang === "id" ? item.deskripsi_id : item.deskripsi_en}
                </p>
              )}
              {hasJam && (
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>{item.jam_operasional}</span>
                </div>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors mb-4"
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

        <div className="flex-grow" />

        {/* Action Buttons */}
        <div className="mt-4">
          {gmapsUrl && (
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center w-full items-center gap-2 px-5 py-3 border-2 border-[#E8E4DB] text-neutral-700 rounded-xl font-medium hover:bg-[#E8E4DB] transition-colors"
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
