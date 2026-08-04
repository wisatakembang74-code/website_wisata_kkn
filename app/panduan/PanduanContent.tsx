"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";

export default function PanduanContent() {
  const { lang } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors duration-200 hover:text-primary-600 mb-8"
        >
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          {t(translations.ebook.backHome, lang)}
        </Link>

        {/* Heading */}
        <div className="text-center mb-10">
          <span className="section-label">
            {t(translations.ebook.label, lang)}
          </span>
          <h1
            className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold italic tracking-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              color: "#2C2A25",
            }}
          >
            {t(translations.ebook.heading, lang)}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            {t(translations.ebook.subtitle, lang)}
          </p>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="mt-6 inline-flex md:hidden items-center gap-2 rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            {lang === "en" ? "Read Fullscreen" : "Baca Layar Penuh"}
          </button>
        </div>

        {/* E-Book Container */}
        <div
          className={
            isFullscreen
              ? "fixed inset-0 z-[100] w-screen h-screen bg-black"
              : "w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-200 aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10]"
          }
        >
          {/* Close Button (Only visible in fullscreen) */}
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
              aria-label="Close Fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <iframe
            src="https://heyzine.com/flip-book/410b7ad435.html"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={t(translations.ebook.heading, lang)}
            className={isFullscreen ? "w-full h-full" : ""}
          />
        </div>
      </div>
    </main>
  );
}
