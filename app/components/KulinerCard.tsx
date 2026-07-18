"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Kuliner } from "@/app/types";
import { getValidImg } from "@/app/lib/utils";
import translations, { t, type Lang } from "@/app/lib/translations";

function isValidLink(val?: string | null): boolean {
  if (!val) return false;
  const s = val.trim();
  if (s === "" || s === "(kosong)" || s === "-" || s === "#") return false;
  return s.startsWith("http://") || s.startsWith("https://");
}

export default function KulinerCard({ item, lang }: { item: Kuliner; lang: Lang }) {
  const hasGmaps = isValidLink(item.link_gmaps);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasDesc = lang === "id"
    ? item.deskripsi_id && item.deskripsi_id !== "(kosong)" && item.deskripsi_id !== "-"
    : item.deskripsi_en && item.deskripsi_en !== "(kosong)" && item.deskripsi_en !== "-";
  const hasJam = item.jam_operasional && item.jam_operasional !== "(kosong)" && item.jam_operasional !== "-";
  const hasDetails = hasDesc || hasJam;

  return (
    <div className="w-[85vw] sm:w-[360px] shrink-0 snap-center group bg-[#FDFBF7] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-[#E8E4DB]">
      {/* Image with Price Badge */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={getValidImg(item.link_gambar, "/images/food-placeholder.png")}
          alt={item.nama_warung || "Gambar Kuliner"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Glassmorphism Price Badge — Top Right */}
        {item.harga && item.harga !== "(kosong)" && item.harga !== "-" && (
          <div className="absolute top-6 right-6 backdrop-blur-md bg-white/70 px-4 py-2 rounded-2xl rounded-tr-sm text-neutral-900 text-xs font-bold tracking-wider uppercase shadow-lg">
            {item.harga}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
          {item.nama_warung}
        </h3>

        {/* Toggle Detail Button */}
        {hasDetails && (
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
              {hasDesc && (
                <p className="text-neutral-600 leading-relaxed mb-4 text-lg">
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Action Buttons — Always Visible */}
        <div className="flex flex-col gap-3 mt-auto">
          {hasGmaps && (
            <a
              href={item.link_gmaps}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 border-2 border-[#E8E4DB] text-neutral-700 rounded-[1.5rem] font-semibold hover:bg-[#E8E4DB] transition-colors text-center inline-flex items-center justify-center gap-2"
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
