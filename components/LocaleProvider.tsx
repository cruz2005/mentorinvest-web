"use client";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { NextIntlClientProvider } from "next-intl";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

export type Locale = "fr" | "en";

const STORAGE_KEY = "mi_locale";
const messagesByLocale = { fr: frMessages, en: enMessages };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useAppLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useAppLocale must be used within LocaleProvider");
  return ctx;
}

function detectBrowserLocale(): Locale {
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Default to "fr" so the server-rendered HTML and the first client render
  // match exactly — the real preference is only known after mount (browser
  // language / localStorage), which we apply right after via useEffect.
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLocaleState(stored);
    } else {
      setLocaleState(detectBrowserLocale());
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  const ctxValue = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LocaleContext.Provider value={ctxValue}>
      <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]} timeZone="Europe/Paris">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
