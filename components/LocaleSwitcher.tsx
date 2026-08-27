"use client";
import { useAppLocale, type Locale } from "@/components/LocaleProvider";

const LOCALES: Locale[] = ["fr", "en"];

export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useAppLocale();

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-full ${className}`}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className="px-2.5 py-1 rounded-full text-xs font-semibold transition-colors"
          style={
            locale === l
              ? { background: "#2563ff", color: "#fff" }
              : { background: "transparent", color: "rgba(255,255,255,0.5)" }
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
