"use client";

import Image from "next/image";
import Link from "next/link";
import DestinationCard from "@/app/components/DestinationCard";
import AccommodationCard from "@/app/components/AccommodationCard";
import KulinerCard from "@/app/components/KulinerCard";
import type { Wisata, Penginapan, Kuliner } from "@/app/types";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";

interface HomeContentProps {
  destinations: Wisata[];
  accommodations: Penginapan[];
  kuliner: Kuliner[];
}

export default function HomeContent({
  destinations,
  accommodations,
  kuliner,
}: HomeContentProps) {
  const { lang } = useLanguage();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-[85vh] min-h-[540px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/IMG_5553.png"
          alt="Pemandangan Wisata Kembang"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-white leading-tight tracking-tight italic drop-shadow-2xl text-center">
            {t(translations.hero.heading, lang)}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            {t(translations.hero.subtitle, lang)}
          </p>
          <div className="mt-8">
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              {t(translations.hero.cta, lang)}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== OUR HERITAGE ===== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/IMG_5322.png"
                alt="Keindahan Wisata Kembang"
                fill
                className="object-cover"
                quality={85}
              />
            </div>

            {/* Text */}
            <div className="space-y-5">
              <span className="section-label">
                {t(translations.heritage.label, lang)}
              </span>
              <h2 className="section-heading font-serif !leading-snug italic">
                {t(translations.heritage.heading1, lang)}{" "}
                <br className="hidden sm:block" />
                {t(translations.heritage.heading2, lang)}
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-neutral-500">
                <p>{t(translations.heritage.body1, lang)}</p>
                <p>{t(translations.heritage.body2, lang)}</p>
              </div>
              <Link
                href="/#destinations"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 hover:text-primary-600 transition-colors group"
              >
                {t(translations.heritage.cta, lang)}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section id="destinations" className="py-20 sm:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="section-label">
              {t(translations.sections.destinationsLabel, lang)}
            </span>
            <h2 className="section-heading mt-2 italic">
              {t(translations.sections.destinationsHeading, lang)}
            </h2>
          </div>

          {/* Cards */}
          {destinations.length > 0 ? (
            <div className="flex overflow-x-auto gap-7 pb-8 px-5 sm:px-8 snap-x snap-mandatory hide-scrollbar -mx-5 sm:-mx-8">
              {destinations.map((dest, idx) => (
                <DestinationCard key={idx} dest={dest} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-neutral-200 rounded-2xl">
              <p className="text-neutral-400 text-sm">
                {t(translations.sections.emptyState, lang)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== WHERE TO STAY ===== */}
      <section id="accommodations" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="section-label">
              {t(translations.sections.accommodationsLabel, lang)}
            </span>
            <h2 className="section-heading mt-2 italic">
              {t(translations.sections.accommodationsHeading, lang)}
            </h2>
          </div>

          {/* Cards */}
          {accommodations.length > 0 ? (
            <div className="flex overflow-x-auto gap-7 pb-8 px-5 sm:px-8 snap-x snap-mandatory hide-scrollbar -mx-5 sm:-mx-8">
              {accommodations.map((stay, idx) => (
                <AccommodationCard key={idx} stay={stay} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-neutral-200 rounded-2xl">
              <p className="text-neutral-400 text-sm">
                {t(translations.sections.emptyState, lang)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== TASTE THE HERITAGE (KULINER) ===== */}
      <section id="kuliner" className="py-20 sm:py-28 bg-surface">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="section-label">
              {t(translations.sections.kulinerLabel, lang)}
            </span>
            <h2 className="section-heading mt-2 italic">
              {t(translations.sections.kulinerHeading, lang)}
            </h2>
            <p className="mt-3 text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
              {t(translations.sections.kulinerSubtitle, lang)}
            </p>
          </div>

          {/* Cards */}
          {kuliner.length > 0 ? (
            <div className="flex overflow-x-auto gap-7 pb-8 px-5 sm:px-8 snap-x snap-mandatory hide-scrollbar -mx-5 sm:-mx-8">
              {kuliner.map((item, idx) => (
                <KulinerCard key={idx} item={item} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-neutral-200 rounded-2xl">
              <p className="text-neutral-400 text-sm">
                {t(translations.sections.emptyState, lang)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== LOKASI PETA (GOOGLE MY MAPS) ===== */}
      <section id="peta" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="section-label">
              {t(translations.sections.mapsLabel, lang)}
            </span>
            <h2 className="section-heading mt-2 italic">
              {t(translations.sections.mapsHeading, lang)}
            </h2>
            <p className="mt-3 text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
              {t(translations.sections.mapsSubtitle, lang)}
            </p>
          </div>

          {/* Map Iframe */}
          <div className="w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden border border-neutral-200 shadow-lg">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=18poJ0mLBx2Bo2QAcwVkABkvqlSzT1HY"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Peta Wisata Kembang Nanggulan"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
