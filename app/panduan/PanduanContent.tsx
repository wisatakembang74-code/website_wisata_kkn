"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";

export default function PanduanContent() {
  const { lang } = useLanguage();

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
        </div>

        {/* E-Book Iframe */}
        <div
          className="w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-200 aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10]"
        >
          <iframe
            src="https://heyzine.com/flip-book/410b7ad435.html"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={t(translations.ebook.heading, lang)}
          />
        </div>
      </div>
    </main>
  );
}
