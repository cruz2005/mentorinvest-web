"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { ComingSoonTooltip } from "@/components/ComingSoonTooltip";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const linkHrefs = ["/#features", "/#screenshots", "/#pricing", "/guide"];

/* ─── Types ──────────────────────────────────────────────── */

interface Quote {
  symbol: string;
  price: number;
  changePercent: number;
  marketState?: string;
}

/* ─── Helpers ────────────────────────────────────────────── */

const FOREX = new Set(["EUR/USD", "GBP/USD"]);

function fmtPrice(symbol: string, price: number): string {
  if (FOREX.has(symbol)) return price.toFixed(4);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function fmtChange(v: number): string {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

// Show "Fermé" for any Yahoo Finance asset that's not in its regular session
function isClosed(q: Quote): boolean {
  return q.marketState !== undefined && q.marketState !== "REGULAR";
}

/* ─── Fallback statique (40 actifs) ──────────────────────── */

const STATIC_TICKERS: Quote[] = [
  { symbol: "AAPL",    price: 211.17, changePercent:  1.24 },
  { symbol: "MSFT",    price: 430.52, changePercent:  0.87 },
  { symbol: "NVDA",    price: 131.38, changePercent:  3.15 },
  { symbol: "GOOGL",   price: 178.90, changePercent: -0.31 },
  { symbol: "AMZN",    price: 191.05, changePercent:  1.08 },
  { symbol: "META",    price: 555.40, changePercent:  2.03 },
  { symbol: "TSLA",    price: 248.72, changePercent:  3.61 },
  { symbol: "PLTR",    price:  24.87, changePercent:  4.42 },
  { symbol: "JPM",     price: 218.30, changePercent:  0.54 },
  { symbol: "V",       price: 273.60, changePercent:  0.33 },
  { symbol: "COIN",    price: 219.45, changePercent:  5.17 },
  { symbol: "MSTR",    price: 162.80, changePercent:  6.44 },
  { symbol: "AMD",     price: 157.22, changePercent:  2.78 },
  { symbol: "NFLX",   price: 681.10, changePercent: -0.62 },
  { symbol: "DIS",     price:  99.34, changePercent: -1.05 },
  { symbol: "BTC/USD", price: 67420,  changePercent:  2.18 },
  { symbol: "ETH/USD", price:  3512,  changePercent: -0.83 },
  { symbol: "SOL/USD", price:   172,  changePercent:  4.60 },
  { symbol: "BNB/USD", price:   598,  changePercent:  1.34 },
  { symbol: "XRP/USD", price:  0.518, changePercent:  3.22 },
  { symbol: "DOGE/USD",price:  0.163, changePercent:  7.45 },
  { symbol: "ADA/USD", price:  0.449, changePercent: -1.88 },
  { symbol: "AVAX/USD",price:  36.80, changePercent:  2.91 },
  { symbol: "LINK/USD",price:  14.72, changePercent:  3.08 },
  { symbol: "TON/USD", price:   5.34, changePercent:  1.57 },
  { symbol: "SPY",     price: 535.80, changePercent:  0.47 },
  { symbol: "QQQ",     price: 459.20, changePercent:  0.93 },
  { symbol: "GLD",     price: 215.40, changePercent:  0.65 },
  { symbol: "EUR/USD", price:  1.0824, changePercent: -0.12 },
  { symbol: "GBP/USD", price:  1.2741, changePercent:  0.08 },
  { symbol: "USD/JPY", price: 157.32, changePercent:  0.21 },
  { symbol: "GOLD",    price:  2318,  changePercent:  0.65 },
  { symbol: "SILVER",  price:  27.45, changePercent:  1.12 },
  { symbol: "OIL",     price:  78.92, changePercent: -0.88 },
  { symbol: "SAP",     price: 184.60, changePercent:  0.44 },
  { symbol: "ASML",    price: 765.80, changePercent:  1.67 },
  { symbol: "LVMH",    price: 692.40, changePercent: -0.53 },
  { symbol: "MARA",    price:  18.34, changePercent:  8.21 },
  { symbol: "RIOT",    price:   9.87, changePercent:  5.63 },
  { symbol: "HUT",     price:  15.22, changePercent:  4.90 },
];

/* ─── Component ──────────────────────────────────────────── */

export default function Navbar() {
  const t = useTranslations("nav");
  const links = [
    { label: t("features"), href: linkHrefs[0] },
    { label: t("overview"), href: linkHrefs[1] },
    { label: t("pricing"),  href: linkHrefs[2] },
    { label: t("guide"),    href: linkHrefs[3] },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [quotes, setQuotes]     = useState<Quote[]>(STATIC_TICKERS);
  const cache   = useRef(new Map<string, Quote>(STATIC_TICKERS.map((q) => [q.symbol, q])));
  const rowRef  = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* live data — poll /api/quotes every 30 s */
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/quotes", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { tickers }: { tickers: Quote[] } = await res.json();
        if (!tickers?.length) throw new Error("empty payload");

        // Mettre à jour les prix dans le cache sans changer la liste
        tickers.forEach((q) => cache.current.set(q.symbol, q));
        // Toujours afficher les 40 actifs statiques, juste avec les prix live
        setQuotes(STATIC_TICKERS.map((s) => cache.current.get(s.symbol) ?? s));
      } catch {
        // En cas d'erreur, garder la liste statique avec les derniers prix connus
        setQuotes(STATIC_TICKERS.map((s) => cache.current.get(s.symbol) ?? s));
      }
    }

    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  /* Animation ticker — vitesse constante 90px/s, pixels exacts */
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    animRef.current?.cancel();
    const id = requestAnimationFrame(() => {
      if (!row) return;
      const halfW = row.scrollWidth / 2;
      if (halfW <= 0) return;
      const duration = (halfW / 90) * 1000; // 90px/s → ms
      animRef.current = row.animate(
        [
          { transform: "translateX(0px)" },
          { transform: `translateX(-${halfW}px)` },
        ],
        { duration, iterations: Infinity, easing: "linear" },
      );
    });
    return () => {
      cancelAnimationFrame(id);
      animRef.current?.cancel();
    };
  }, [quotes]);

  const doubled = [...quotes, ...quotes];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Ticker row ── */}
      <div className="block overflow-hidden bg-[#0D1018] border-b border-[#2A2E39]/80 relative h-6 md:h-7">

        {doubled.length > 0 ? (
          <div
            ref={rowRef}
            style={{ display: "inline-flex", whiteSpace: "nowrap" }}
            className="h-full items-center"
          >
            {doubled.map((q, i) => {
              const up     = q.changePercent >= 0;
              const closed = isClosed(q);
              return (
                <span
                  key={`${q.symbol}-${i}`}
                  className="inline-flex items-center gap-1 md:gap-1.5 mx-2.5 md:mx-6 text-[9px] md:text-[11px] font-mono"
                >
                  {/* Symbol */}
                  <span className="font-semibold" style={{ color: "#D1D4DC" }}>
                    {q.symbol}
                  </span>

                  {/* Fermé badge for closed equity / commodity sessions */}
                  {closed && (
                    <span
                      className="font-sans text-[7px] md:text-[9px] font-normal"
                      style={{ color: "#4B4F5A" }}
                    >
                      {t("marketClosed")}
                    </span>
                  )}

                  {/* Price — grey when market is closed */}
                  <span style={{ color: closed ? "#4B4F5A" : "#A8ABB7" }}>
                    {fmtPrice(q.symbol, q.price)}
                  </span>

                  {/* % change */}
                  <span
                    style={{ color: closed ? "#4B4F5A" : up ? "#089981" : "#F23645" }}
                  >
                    {fmtChange(q.changePercent)}
                  </span>

                  {/* Separator */}
                  <span style={{ color: "#2A2E39", marginLeft: 4 }}>|</span>
                </span>
              );
            })}
          </div>
        ) : (
          /* Loading skeleton */
          <div className="flex h-full items-center whitespace-nowrap opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-2 mx-2.5 md:mx-6 text-[9px] md:text-[11px] font-mono">
                <span style={{ color: "#D1D4DC" }}>······</span>
                <span style={{ color: "#787B86" }}>·······</span>
                <span style={{ color: "#2A2E39", marginLeft: 4 }}>|</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Nav row ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0E15]/95 backdrop-blur-xl border-b border-[#2A2E39]/60"
            : "bg-[#0B0E15]/80 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">

          {/* Logo + brand */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/logo.png"
              alt="MentorInvest"
              style={{ height: "36px", width: "36px", borderRadius: "8px" }}
            />
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1 }}>
              <span style={{ color: "#2563ff" }}>Mentor</span>
              <span style={{ color: "#f0f4ff" }}>Invest</span>
            </span>
          </Link>

          {/* Links — absolutely centred */}
          <ul
            className="hidden lg:flex items-center gap-8"
            style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[#787B86] hover:text-white transition-colors text-sm font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Locale switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <LocaleSwitcher />
            <ComingSoonTooltip showToast>
              <button
                className="px-4 py-2 rounded-lg bg-[#2962FF] hover:bg-[#1a4fd6] text-white text-sm font-semibold transition-all glow-blue"
              >
                {t("download")}
              </button>
            </ComingSoonTooltip>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden text-[#787B86] hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-[#131722] border-t border-[#2A2E39] px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[#D1D4DC] hover:text-white text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <LocaleSwitcher className="self-start" />
            <ComingSoonTooltip showToast>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2 w-full text-center rounded-lg bg-[#2962FF] text-white text-sm font-semibold"
              >
                {t("download")}
              </button>
            </ComingSoonTooltip>
          </div>
        )}
      </div>
    </header>
  );
}
