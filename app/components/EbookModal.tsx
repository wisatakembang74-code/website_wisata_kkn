"use client";

import { useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";

interface EbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EbookModal({ isOpen, onClose }: EbookModalProps) {
  const { lang } = useLanguage();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={t(translations.ebook.heading, lang)}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-[95vw] h-[90vh] max-w-6xl flex flex-col rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
        {/* Header Bar */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ backgroundColor: "#2C2A25" }}
        >
          <h3
            className="text-sm font-semibold text-white/90 tracking-wide"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t(translations.ebook.heading, lang)}
          </h3>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            aria-label={t(translations.ebook.close, lang)}
          >
            <span className="hidden sm:inline">
              {t(translations.ebook.close, lang)}
            </span>
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Iframe */}
        <div className="flex-1 bg-neutral-100">
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
    </div>
  );
}
