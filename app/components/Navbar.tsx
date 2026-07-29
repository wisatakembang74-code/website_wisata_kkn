"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import translations, { t } from "@/app/lib/translations";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const { lang, toggleLang } = useLanguage();

  const navLinks = [
    { href: "/", label: t(translations.nav.home, lang) },
    { href: "/#destinations", label: t(translations.nav.destinations, lang) },
    { href: "/#accommodations", label: t(translations.nav.homestays, lang) },
    { href: "/#kuliner", label: t(translations.nav.kuliner, lang) },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // 1. If at the very top, it's Home
      if (window.scrollY < 100) {
        setActiveSection("/");
        return;
      }

      // 2. If at the very bottom of the page, force highlight the last section (Kuliner)
      // This fixes the issue where short sections at the bottom don't trigger the highlight
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 100) {
        setActiveSection("/#kuliner");
        return;
      }

      // 3. Otherwise, find which section is currently in view
      const sections = ["destinations", "accommodations", "kuliner"];
      let currentSection = "/";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // A section is active if:
          // A. Its top is in the upper half of the screen
          // B. It's a tall section that is currently occupying the middle of the screen
          if (
            (rect.top >= 0 && rect.top <= window.innerHeight / 2) || 
            (rect.top < 0 && rect.bottom > window.innerHeight / 2)
          ) {
            currentSection = "/#" + section;
            break; // Found the active one, stop checking
          }
        }
      }

      setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Set initial active section based on hash or current position
    setTimeout(() => {
      if (window.location.hash) {
        setActiveSection("/" + window.location.hash);
      } else {
        handleScroll();
      }
    }, 0);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On homepage, navbar is transparent until scrolled
  const isHome = pathname === "/";
  const showSolid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              showSolid ? "text-neutral-900" : "text-white"
            }`}
          >
            Wisata Kembang
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  onClick={() => setActiveSection(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 z-10 block ${
                    showSolid
                      ? isActive
                        ? "text-white"
                        : "text-neutral-600 hover:text-neutral-900"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full z-0 ${
                      showSolid ? "bg-primary-600" : "bg-white/20 backdrop-blur-sm"
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Language Toggle */}
        <div className="hidden md:block">
          <button
            onClick={toggleLang}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
              showSolid
                ? "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                : "border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            {lang === "id" ? "EN" : "ID"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-colors ${
            showSolid
              ? "text-neutral-600 hover:bg-neutral-100"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "max-h-72 bg-white/95 backdrop-blur-md border-t border-neutral-100"
            : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.href);
                    setMobileOpen(false);
                  }}
                  className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary-700 bg-primary-50"
                      : "text-neutral-600 hover:text-primary-700 hover:bg-neutral-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2 pt-2 border-t border-neutral-100">
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-neutral-500 rounded-full border border-neutral-200 cursor-pointer"
            >
              {lang === "id" ? "EN" : "ID"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
