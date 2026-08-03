"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();

  const footerLinks = [
    { href: "https://maps.app.goo.gl/bZJ72e858mKAXzQXA", label: t(translations.footer.villageAddress, lang) },
  ];

  const logos = [
    {
      src: "/images/logo-ugm.png",
      alt: "Logo Universitas Gadjah Mada",
    },
    {
      src: "/images/logo_kkn_ugm.png",
      alt: "Logo KKN UGM",
    },
    {
      src: "/images/logo_unit_nanggulan.png",
      alt: "Logo Unit KKN Nanggulan",
    },
  ];

  return (
    <footer
      className="border-t border-stone-200"
      style={{ backgroundColor: "#EDE8DF" }}
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand & Tagline */}
          <div className="space-y-4 md:max-w-md">
            <h3
              className="text-3xl font-bold italic tracking-tight"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "#2C2A25",
              }}
            >
              Wisata Kembang
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#6B665C" }}
            >
              {t(translations.footer.tagline, lang)}
            </p>
          </div>

          {/* Visit Us Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-5 tracking-wide"
              style={{ color: "#2C2A25" }}
            >
              {t(translations.footer.visitUs, lang)}
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "#6B665C" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#2C2A25")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#6B665C")
                      }
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="border-t" style={{ borderColor: "#D5CFC5" }} />
      </div>

      {/* Bottom Bar: Logos + Copyright */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Partner Logos */}
          <div className="flex items-center gap-5">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="relative flex-shrink-0 transition-opacity duration-300 hover:opacity-80"
                style={{ width: 48, height: 48 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="48px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-center md:text-right" style={{ color: "#9B9588" }}>
            &copy; {currentYear} {t(translations.footer.copyright, lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
