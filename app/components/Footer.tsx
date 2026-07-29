"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();

  const footerLinks = [
    { href: "#", label: t(translations.footer.villageAddress, lang) },
    { href: "#", label: t(translations.footer.contactInfo, lang) },
    { href: "#", label: t(translations.footer.privacyPolicy, lang) },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Wisata Kembang
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
              {t(translations.footer.tagline, lang)}
            </p>
          </div>

          {/* Links */}
          <div>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors duration-200 hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex items-end md:justify-end">
            <p className="text-xs text-neutral-600">
              &copy; {currentYear} {t(translations.footer.copyright, lang)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
