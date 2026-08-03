"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";
import EbookModal from "./EbookModal";

export default function EbookBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lang } = useLanguage();

  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="section-label">
              {t(translations.ebook.label, lang)}
            </span>
            <h2 className="section-heading mt-2 italic">
              {t(translations.ebook.heading, lang)}
            </h2>
            <p className="mt-3 text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
              {t(translations.ebook.subtitle, lang)}
            </p>
          </div>

          {/* Banner Card */}
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl cursor-pointer group"
            style={{ backgroundColor: "#EDE8DF" }}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex flex-col items-center gap-6 px-8 py-12 sm:flex-row sm:gap-10 sm:px-12 sm:py-14">
              {/* Book Icon */}
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl shadow-inner transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: "#D5CFC5" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#2C2A25"
                  className="h-10 w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>

              {/* Text Content */}
              <div className="text-center sm:text-left flex-1">
                <h3
                  className="text-xl font-bold italic tracking-tight sm:text-2xl"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    color: "#2C2A25",
                  }}
                >
                  {t(translations.ebook.heading, lang)}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed max-w-md"
                  style={{ color: "#6B665C" }}
                >
                  {t(translations.ebook.subtitle, lang)}
                </p>
              </div>

              {/* CTA Button */}
              <button
                className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition-all duration-200 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                {t(translations.ebook.cta, lang)}
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
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <EbookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
