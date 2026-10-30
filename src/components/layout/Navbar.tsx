"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "../../lib/i18n";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { href: "#home", label: t.nav.home, id: "home" },
    { href: "#about", label: t.nav.about, id: "about" },
    { href: "#pillars", label: "Pillars", id: "pillars" },
    { href: "#projects", label: t.nav.projects, id: "projects" },
    { href: "#experience", label: t.nav.experience, id: "experience" },
    { href: "#contacts", label: t.nav.contacts, id: "contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["contacts", "experience", "projects", "pillars", "about", "home"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-[var(--line)]/80 bg-[var(--surface)]/90 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Handle */}
        <a
          href="#home"
          className="flex items-center space-x-2.5 group focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-none select-none"
          aria-label="Home dhimno"
        >
          <div className="text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
            <Logo className="w-7 h-7" />
          </div>
          <span className="font-pixel font-bold text-sm tracking-wider text-[var(--ink)]">
            dhimno
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-3 py-1.5 text-[11px] font-pixel uppercase tracking-wider transition-colors rounded-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                  isActive
                    ? "text-[var(--accent)] font-bold"
                    : "text-[var(--ink-muted)] hover:text-[var(--accent)]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[3px] bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <LangToggle />
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-none border-2 border-[var(--line)] shadow-[2px_2px_0px_var(--line)] bg-[var(--surface-2)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)] cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--line)] bg-[var(--surface)] md:hidden px-4 py-4 space-y-2"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-none border-2 text-xs font-pixel uppercase tracking-wider transition-all ${
                  activeSection === item.id
                    ? "bg-[var(--surface-2)] text-[var(--accent)] border-[var(--line)] shadow-[2px_2px_0px_var(--accent)] font-bold"
                    : "text-[var(--ink)] border-transparent hover:bg-[var(--surface-2)] hover:border-[var(--line)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
