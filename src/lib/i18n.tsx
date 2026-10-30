"use client";

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import idDict from "../i18n/id.json";
import enDict from "../i18n/en.json";

export type Locale = "id" | "en";
export type Dictionary = typeof idDict;

interface I18nContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const dictionaries: Record<Locale, Dictionary> = {
  id: idDict,
  en: enDict,
};

const I18nContext = createContext<I18nContextType | null>(null);

function getSnapshot(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const saved = localStorage.getItem("portfolio_lang") as Locale | null;
    if (saved === "id" || saved === "en") return saved;
    return navigator.language.startsWith("id") ? "id" : "en";
  } catch {
    return "id";
  }
}

function getServerSnapshot(): Locale {
  return "id";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const currentLocale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [locale, setLocaleState] = useState<Locale>(currentLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("portfolio_lang", newLocale);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        t: dictionaries[locale],
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
