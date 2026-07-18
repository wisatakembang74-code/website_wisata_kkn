"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Wisata } from "@/app/types";
import { getValidImg } from "@/app/lib/utils";
import translations, { t, type Lang } from "@/app/lib/translations";

function isValidLink(val?: string | null): boolean {
  if (!val) return false;
  const s = val.trim();
  if (s === "" || s === "(kosong)" || s === "-" || s === "#") return false;
  return s.startsWith("http://") || s.startsWith("https://");
}

export default function DestinationCard({ dest, lang }: { dest: Wisata; lang: Lang }) {
  const hasGmaps = isValidLink(dest.link_gmaps);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasDesc = lang === "id"
    ? dest.deskripsi_id && dest.deskripsi_id !== "(kosong)" && dest.deskripsi_id !== "-"
    : dest.deskripsi_en && dest.deskripsi_en !== "(kosong)" && dest.deskripsi_en !== "-";
  const hasJam = dest.jam_operasional && dest.jam_operasional !== "(kosong)" && dest.jam_operasional !== "-";
  const hasDetails = hasDesc || hasJam;

  return (
    <div className="w-[85vw] sm:w-[360px] shrink-0 snap-center group bg-[#FDFBF7] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-[#E8E4DB]">
      {/* Image with Title Overlay & Price Badge */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={getValidImg(dest.link_gambar, "/images/dest-waterfall.png")}
          alt={dest.nama_wisata || "Gambar Wisata"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Title inside image */}
        <div className="absolute bottom-4 left-6 text-white text-2xl font-semibold drop-shadow-md">
          {dest.nama_wisata}
        </div>
        {/* Glassmorphism Price Badge — Top Right */}
        {dest.harga && dest.harga !== "(kosong)" && dest.harga !== "-" && (
          <div className="absolute top-4 right-4 backdrop-blur-md bg-white/70 px-3 py-1 rounded-2xl text-neutral-900 text-xs font-bold tracking-wider uppercase shadow-sm">
            {dest.harga}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
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
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {lang === "id" ? dest.deskripsi_id : dest.deskripsi_en}
                </p>
              )}
              {hasJam && (
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>{dest.jam_operasional}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Explore / Maps Button — Always Visible */}
        {hasGmaps ? (
          <a
            href={dest.link_gmaps}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 border border-[#E8E4DB] text-neutral-700 rounded-xl font-medium hover:bg-[#E8E4DB] transition-colors text-center block"
          >
            {t(translations.cards.openMaps, lang)}
          </a>
        ) : (
          <div className="w-full py-3 border border-[#E8E4DB] text-neutral-700 rounded-xl font-medium text-center">
            {lang === "id" ? "Jelajahi" : "Explore"}
          </div>
        )}
      </div>
    </div>
  );
}
