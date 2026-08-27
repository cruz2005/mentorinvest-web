"use client";
import { ComingSoonTooltip } from "@/components/ComingSoonTooltip";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/LocaleProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  TrendingUp, MessageSquare, Newspaper, User, Globe,
  Search, Timer, Crosshair, Bell,
  PieChart, Eye, Sparkles, XCircle, Radio, Landmark, Expand,
  MousePointerClick, LogIn, Languages, SunMoon, LogOut, Trash2,
  ShieldCheck, Plus, Minus, Move,
} from "lucide-react";

/* ─── Nav items ──────────────────────────────────────────── */

const navItems = [
  { id: "marches",    icon: TrendingUp },
  { id: "mentor",     icon: MessageSquare },
  { id: "actualites", icon: Newspaper },
  { id: "profil",     icon: User },
];

const navLabels: Record<string, Record<string, string>> = {
  fr: { marches: "Marchés", mentor: "Mentor", actualites: "Actualités", profil: "Profil" },
  en: { marches: "Markets", mentor: "Mentor", actualites: "News",       profil: "Profile" },
};

/* ─── Sticky Section Nav ─────────────────────────────────── */

function GuideNav({ active }: { active: string }) {
  const { locale } = useAppLocale();
  const labels = navLabels[locale];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 160;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 md:top-[93px] z-40 bg-[#080a0e]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto justify-center flex-wrap">
        {navItems.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
            style={{
              background: active === s.id ? "#2563ff" : "rgba(255,255,255,0.07)",
              color: active === s.id ? "#fff" : "rgba(240,244,255,0.55)",
              boxShadow: active === s.id ? "0 0 16px rgba(37,99,255,0.4)" : "none",
            }}
          >
            <s.icon size={14} />
            {labels[s.id]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Layout Primitives ──────────────────────────────────── */

function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#111620", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs mb-3 font-semibold uppercase tracking-wider" style={{ color: "rgba(240,244,255,0.4)" }}>
      {children}
    </p>
  );
}

function ChipRow({ items, activeIndex = 0 }: { items: string[]; activeIndex?: number }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {items.map((label, i) => (
        <span
          key={label}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold"
          style={
            i === activeIndex
              ? { background: "#2563ff", color: "#fff", boxShadow: "0 0 12px rgba(37,99,255,0.4)" }
              : { background: "rgba(255,255,255,0.06)", color: "rgba(240,244,255,0.5)" }
          }
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function StatRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2.5 rounded-xl"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span className="text-xs font-medium" style={{ color: "rgba(240,244,255,0.6)" }}>{label}</span>
      <span className="text-xs font-mono font-bold" style={{ color: valueColor ?? "#f0f4ff" }}>{value}</span>
    </div>
  );
}

function Step({
  number,
  title,
  desc,
  card,
}: {
  number: number;
  title: string;
  desc: string;
  card: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start py-10 border-b border-white/5 last:border-0">
      <div className="flex-1 flex gap-4 items-start">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
          style={{ background: "#2563ff", boxShadow: "0 0 16px rgba(37,99,255,0.35)" }}
        >
          {number}
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2" style={{ color: "#f0f4ff" }}>
            {title}
          </h4>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: "rgba(240,244,255,0.55)" }}
          >
            {desc}
          </p>
        </div>
      </div>
      <div className="w-full md:w-[320px] flex-shrink-0">{card}</div>
    </div>
  );
}

function GuideSection({
  id,
  badgeLabel,
  badgeColor,
  title,
  children,
}: {
  id: string;
  badgeLabel: string;
  badgeColor: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-20 px-6 border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              background: `${badgeColor}20`,
              color: badgeColor,
              border: `1px solid ${badgeColor}40`,
            }}
          >
            {badgeLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#f0f4ff" }}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ONGLET 1 — MARCHÉS
   ══════════════════════════════════════════════════════════ */

function AssetTypeCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Search an asset" : "Rechercher un actif"}</CardLabel>
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Search size={14} style={{ color: "rgba(240,244,255,0.35)" }} />
        <span className="text-xs" style={{ color: "rgba(240,244,255,0.35)" }}>BTC, AAPL, EUR/USD...</span>
      </div>
      <ChipRow items={en ? ["Crypto", "Stocks", "Forex", "Indices"] : ["Crypto", "Actions", "Forex", "Indices"]} />
    </Card>
  );
}

function ChartTypesCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Chart type" : "Type de graphique"}</CardLabel>
      <ChipRow items={en ? ["Candles", "Bars", "Line", "Area"] : ["Bougies", "Barres", "Courbe", "Région"]} />
      <p className="text-[10px] mt-3" style={{ color: "rgba(240,244,255,0.3)" }}>
        {en ? "Candles selected · BTC/USD · 1h" : "Bougies sélectionné · BTC/USD · 1h"}
      </p>
    </Card>
  );
}

function CountdownCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Next candle" : "Prochaine bougie"}</CardLabel>
      <div
        className="flex flex-col items-center justify-center rounded-xl py-6 mb-3"
        style={{ background: "rgba(37,99,255,0.08)", border: "1px solid rgba(37,99,255,0.2)" }}
      >
        <Timer size={20} style={{ color: "#4f83ff" }} className="mb-2" />
        <span className="text-2xl font-bold font-mono" style={{ color: "#f0f4ff" }}>00:42</span>
      </div>
      <p className="text-[10px] text-center" style={{ color: "rgba(240,244,255,0.35)" }}>
        {en ? "Time remaining before close · 1h timeframe" : "Temps restant avant la clôture · Timeframe 1h"}
      </p>
    </Card>
  );
}

function OHLCCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "OHLC on hover" : "OHLC au survol"}</CardLabel>
      <div className="flex items-center gap-2 mb-3">
        <Crosshair size={14} style={{ color: "#4f83ff" }} />
        <span className="text-xs font-semibold" style={{ color: "rgba(240,244,255,0.6)" }}>BTC/USD · 1h</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <StatRow label="Open"  value="67 180" />
        <StatRow label="High"  value="67 640" valueColor="#22c55e" />
        <StatRow label="Low"   value="66 920" valueColor="#F23645" />
        <StatRow label="Close" value="67 420" />
      </div>
    </Card>
  );
}

function IndicatorsLibraryCard() {
  const en = useAppLocale().locale === "en";
  const indicators = ["RSI", "MACD", "BB", "EMA", "SMA", "WMA", en ? "Stochastic" : "Stochastique", "ATR", "ADX", "OBV", "CCI", "Ichimoku"];
  return (
    <Card>
      <CardLabel>{en ? "Indicator library" : "Bibliothèque d'indicateurs"}</CardLabel>
      <div className="flex flex-wrap gap-1.5">
        {indicators.map((ind) => (
          <span
            key={ind}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,244,255,0.7)" }}
          >
            {ind}
          </span>
        ))}
      </div>
    </Card>
  );
}

function WatchlistManageCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>Watchlist</CardLabel>
      <div className="space-y-2 mb-3">
        {[{ s: "BTC/USD", icon: Minus }, { s: "AAPL", icon: Minus }].map((r) => (
          <div
            key={r.s}
            className="flex items-center justify-between px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-xs font-bold" style={{ color: "#f0f4ff" }}>{r.s}</span>
            <r.icon size={12} style={{ color: "rgba(240,244,255,0.4)" }} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: "#4f83ff" }}>
          <Plus size={12} /> {en ? "Add an asset" : "Ajouter un actif"}
        </span>
        <span className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(240,244,255,0.35)" }}>
          <Move size={11} /> {en ? "Resizable" : "Redimensionnable"}
        </span>
      </div>
    </Card>
  );
}

function PriceAlertCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Price alert" : "Alerte de prix"}</CardLabel>
      <div className="flex items-center gap-2 mb-3">
        <Bell size={14} style={{ color: "#4f83ff" }} />
        <span className="text-xs font-semibold" style={{ color: "rgba(240,244,255,0.6)" }}>BTC/USD</span>
      </div>
      <div
        className="flex items-center justify-between px-3 py-2.5 rounded-xl"
        style={{ background: "rgba(37,99,255,0.08)", border: "1px solid rgba(37,99,255,0.2)" }}
      >
        <span className="text-[11px]" style={{ color: "rgba(240,244,255,0.6)" }}>{en ? "Threshold triggered at" : "Seuil déclenché à"}</span>
        <span className="text-sm font-mono font-bold" style={{ color: "#f0f4ff" }}>{en ? "$70,000" : "70 000 $"}</span>
      </div>
    </Card>
  );
}

function FundamentalsCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Fundamental data" : "Données fondamentales"}</CardLabel>
      <div className="space-y-1.5">
        <StatRow label="P/E"  value="28.4" />
        <StatRow label="EPS"  value="6.13" />
        <StatRow label={en ? "Dividend" : "Dividende"} value="0.96%" valueColor="#22c55e" />
      </div>
    </Card>
  );
}

function AssetNewsCard() {
  const en = useAppLocale().locale === "en";
  const news = en
    ? [
        { t: "Apple unveils its quarterly results", s: "2h ago" },
        { t: "Analysts raise their price target", s: "5h ago" },
      ]
    : [
        { t: "Apple dévoile ses résultats trimestriels", s: "il y a 2h" },
        { t: "Les analystes relèvent leur objectif de cours", s: "il y a 5h" },
      ];
  return (
    <Card>
      <CardLabel>{en ? "Related news" : "Actualités liées"}</CardLabel>
      <div className="space-y-2.5">
        {news.map((n, i) => (
          <div key={i} className="flex items-start gap-2">
            <Newspaper size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#4f83ff" }} />
            <div>
              <p className="text-[11px] leading-snug" style={{ color: "rgba(240,244,255,0.7)" }}>{n.t}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(240,244,255,0.3)" }}>{n.s}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function WatchAnalyzeCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold" style={{ color: "rgba(240,244,255,0.55)" }}>BTC/USD · 1h</span>
        <div className="flex items-center gap-2">
          <span className="text-sm animate-bounce" style={{ color: "#2563ff" }}>←</span>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: "#2563ff", color: "#fff", boxShadow: "0 0 16px rgba(37,99,255,0.5)" }}
          >
            <Eye size={13} /> {en ? "WATCH" : "SURVEILLER"}
          </div>
        </div>
      </div>
      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(240,244,255,0.5)" }}>
        {en
          ? "The asset is added to your watchlist and Mentor immediately runs a first AI analysis."
          : "L'actif est ajouté à ta watchlist et le Mentor lance immédiatement une première analyse IA."}
      </p>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════
   ONGLET 2 — MENTOR
   ══════════════════════════════════════════════════════════ */

function MentorChatCard() {
  const en = useAppLocale().locale === "en";
  const suggestions = en
    ? ["BTCUSDT Analysis", "Support / Resistance", "24h Trend", "Buy Volume"]
    : ["Analyse BTCUSDT", "Support / Résistance", "Tendance 24h", "Volume d'achat"];
  return (
    <Card>
      <CardLabel>{en ? "Quick suggestions" : "Suggestions rapides"}</CardLabel>
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((s) => (
          <div
            key={s}
            className="px-3 py-2.5 rounded-xl text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(240,244,255,0.75)",
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </Card>
  );
}

function QuestionCard() {
  const en = useAppLocale().locale === "en";
  const questions = en
    ? [
        "What's the current 4h trend on ETH?",
        "Is there a buy signal on AAPL right now?",
        "What are BTC's support levels?",
      ]
    : [
        "Quelle est la tendance actuelle de l'ETH sur 4h ?",
        "Y a-t-il un signal d'achat sur AAPL en ce moment ?",
        "Quels sont les niveaux de support du BTC ?",
      ];
  return (
    <Card>
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="text-sm flex-1" style={{ color: "rgba(240,244,255,0.3)" }}>
          {en ? "Ask Mentor a question..." : "Posez une question à Mentor..."}
        </span>
        <span style={{ color: "#2563ff" }}>↑</span>
      </div>
      <div className="space-y-2">
        {questions.map((q, i) => (
          <p key={i} className="text-[11px] leading-snug" style={{ color: "rgba(240,244,255,0.4)" }}>
            • {q}
          </p>
        ))}
      </div>
    </Card>
  );
}

function AnalysisTypeCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Analysis type" : "Type d'analyse"}</CardLabel>
      <ChipRow items={en ? ["Technical", "Fundamental"] : ["Technique", "Fondamentale"]} />
      <p className="text-[11px] leading-relaxed mt-3" style={{ color: "rgba(240,244,255,0.5)" }}>
        {en
          ? "Technical: indicators, support/resistance, trend. Fundamental: P/E, revenue, growth."
          : "Technique : indicateurs, supports/résistances, tendance. Fondamentale : P/E, revenus, croissance."}
      </p>
    </Card>
  );
}

function MentorVsScreenerCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Before / Now" : "Avant / Maintenant"}</CardLabel>
      <div className="space-y-2">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <XCircle size={14} style={{ color: "rgba(240,244,255,0.3)" }} />
          <span className="text-xs" style={{ color: "rgba(240,244,255,0.35)" }}>{en ? "Screener — manual filtering" : "Screener — filtrage manuel"}</span>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "rgba(37,99,255,0.1)", border: "1px solid rgba(37,99,255,0.25)" }}
        >
          <Sparkles size={14} style={{ color: "#4f83ff" }} />
          <span className="text-xs font-semibold" style={{ color: "#f0f4ff" }}>{en ? "Mentor — instant AI analysis" : "Mentor — analyse IA instantanée"}</span>
        </div>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════
   ONGLET 3 — ACTUALITÉS
   ══════════════════════════════════════════════════════════ */

function NewsTranslatedCard() {
  const en = useAppLocale().locale === "en";
  const langs = ["FR", "EN", "ES", "DE", "IT", "PT", "AR", "ZH"];
  return (
    <Card>
      <CardLabel>{en ? "Automatic translation" : "Traduction automatique"}</CardLabel>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {langs.map((l, i) => (
          <span
            key={l}
            className="px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono"
            style={
              i === (en ? 1 : 0)
                ? { background: "#2563ff", color: "#fff" }
                : { background: "rgba(255,255,255,0.06)", color: "rgba(240,244,255,0.5)" }
            }
          >
            {l}
          </span>
        ))}
      </div>
      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(240,244,255,0.5)" }}>
        {en
          ? "“The Fed keeps rates unchanged” — automatically translated into your language."
          : "« La Fed maintient ses taux inchangés » — traduit automatiquement dans ta langue."}
      </p>
    </Card>
  );
}

function CalendarCard() {
  const en = useAppLocale().locale === "en";
  const events = en
    ? [
        { time: "14:30", label: "NFP — Non-Farm Payrolls", high: true },
        { time: "20:00", label: "Fed Rate Decision",        high: true },
        { time: "08:00", label: "CPI Eurozone",             high: false },
      ]
    : [
        { time: "14:30", label: "NFP — Emplois non-agricoles", high: true },
        { time: "20:00", label: "Fed Rate Decision",            high: true },
        { time: "08:00", label: "CPI Eurozone",                 high: false },
      ];
  return (
    <Card>
      <CardLabel>{en ? "Economic calendar" : "Calendrier économique"}</CardLabel>
      <div className="space-y-2">
        {events.map((e, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{
              background: e.high ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${e.high ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.05)"}`,
            }}
          >
            <span className="text-[10px] font-mono flex-shrink-0" style={{ color: "rgba(240,244,255,0.4)" }}>
              {e.time}
            </span>
            <span className="flex-1 text-[11px] font-medium" style={{ color: e.high ? "#f0f4ff" : "rgba(240,244,255,0.6)" }}>
              {e.label}
            </span>
            {e.high && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>
                {en ? "HIGH" : "FORT"}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

function GlobeNormalCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "3D Globe · Normal mode" : "Globe 3D · Mode Normal"}</CardLabel>
      <div
        className="flex items-center justify-center rounded-xl mb-3"
        style={{ height: 100, background: "radial-gradient(circle, rgba(37,99,255,0.18) 0%, rgba(37,99,255,0.03) 70%)" }}
      >
        <Globe size={40} style={{ color: "#2563ff" }} />
      </div>
      <p className="text-[11px] leading-relaxed text-center" style={{ color: "rgba(240,244,255,0.5)" }}>
        {en
          ? "A realistic globe, with a real-time day/night effect and major city lights."
          : "Globe réaliste, effet jour/nuit calculé en temps réel et lumières des grandes villes."}
      </p>
    </Card>
  );
}

function GlobeLiveCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "3D Globe · Live mode" : "Globe 3D · Mode Live"}</CardLabel>
      <div className="flex items-center gap-2 mb-3">
        <Radio size={14} style={{ color: "#22c55e" }} className="animate-pulse" />
        <span className="text-[11px] font-bold" style={{ color: "#22c55e" }}>{en ? "65 live assets" : "65 actifs en direct"}</span>
      </div>
      <ChipRow
        items={en ? ["Macro", "Crypto", "Stocks", "Forex", "Indices", "Commodities"] : ["Macro", "Crypto", "Actions", "Forex", "Indices", "Matières 1ères"]}
        activeIndex={1}
      />
    </Card>
  );
}

function GlobeMacroCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "3D Globe · Macro mode" : "Globe 3D · Mode Macro"}</CardLabel>
      <div className="flex items-center gap-2 mb-3">
        <Landmark size={14} style={{ color: "#4f83ff" }} />
        <span className="text-xs font-semibold" style={{ color: "rgba(240,244,255,0.6)" }}>France</span>
      </div>
      <div className="space-y-1.5">
        <StatRow label={en ? "GDP" : "PIB"}         value={en ? "$3,052B" : "3 052 Md$"} />
        <StatRow label={en ? "Debt" : "Dette"}       value={en ? "111.6% of GDP" : "111.6% PIB"} />
        <StatRow label="Inflation"                   value="2.1%" />
        <StatRow label={en ? "Unemployment" : "Chômage"} value="7.3%" />
      </div>
    </Card>
  );
}

function GlobeImmersiveCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Immersive mode" : "Mode Immersif"}</CardLabel>
      <div
        className="flex items-center justify-center gap-4 rounded-xl mb-3"
        style={{ height: 90, background: "radial-gradient(circle, rgba(37,99,255,0.14) 0%, rgba(37,99,255,0.02) 70%)" }}
      >
        <Expand size={26} style={{ color: "#4f83ff" }} />
        <MousePointerClick size={26} style={{ color: "#4f83ff" }} />
      </div>
      <p className="text-[11px] leading-relaxed text-center" style={{ color: "rgba(240,244,255,0.5)" }}>
        {en
          ? "Full screen from any mode — every country stays clickable."
          : "Plein écran depuis n'importe quel mode — tous les pays restent cliquables."}
      </p>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════
   ONGLET 4 — PROFIL
   ══════════════════════════════════════════════════════════ */

function AuthCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <LogIn size={14} style={{ color: "#4f83ff" }} />
        <CardLabel>{en ? "Secure sign-in" : "Connexion sécurisée"}</CardLabel>
      </div>
      <div className="space-y-2 mb-3">
        <div className="px-3 py-2 rounded-lg text-[11px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,244,255,0.35)" }}>
          {en ? "you@email.com" : "ton@email.com"}
        </div>
        <div className="px-3 py-2 rounded-lg text-[11px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,244,255,0.35)" }}>
          ••••••••
        </div>
      </div>
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold"
        style={{ background: "rgba(0,180,216,0.12)", color: "#00B4D8", border: "1px solid rgba(0,180,216,0.3)" }}
      >
        <ShieldCheck size={11} /> Supabase
      </span>
    </Card>
  );
}

function LanguageCard() {
  const en = useAppLocale().locale === "en";
  const langs = ["Français", "English", "Español", "Deutsch", "Italiano", "Português", "العربية", "中文"];
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <Languages size={14} style={{ color: "#4f83ff" }} />
        <CardLabel>{en ? "App language" : "Langue de l'app"}</CardLabel>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {langs.map((l, i) => (
          <span
            key={l}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
            style={
              i === (en ? 1 : 0)
                ? { background: "#2563ff", color: "#fff" }
                : { background: "rgba(255,255,255,0.06)", color: "rgba(240,244,255,0.5)" }
            }
          >
            {l}
          </span>
        ))}
      </div>
    </Card>
  );
}

function ThemeCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <SunMoon size={14} style={{ color: "#4f83ff" }} />
        <CardLabel>{en ? "Theme" : "Thème"}</CardLabel>
      </div>
      <div className="flex gap-2">
        <div
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(240,244,255,0.5)" }}
        >
          {en ? "Light" : "Clair"}
        </div>
        <div
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-semibold"
          style={{ background: "#2563ff", color: "#fff", boxShadow: "0 0 16px rgba(37,99,255,0.4)" }}
        >
          {en ? "Dark" : "Sombre"}
        </div>
      </div>
    </Card>
  );
}

function StatsCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <PieChart size={14} style={{ color: "#4f83ff" }} />
        <CardLabel>{en ? "Stats" : "Statistiques"}</CardLabel>
      </div>
      <div className="space-y-1.5">
        <StatRow label={en ? "Favorites" : "Favoris"}                value="12" />
        <StatRow label={en ? "Member since" : "Membre depuis"}       value={en ? "March 14, 2026" : "14 mars 2026"} />
      </div>
    </Card>
  );
}

function AccountManageCard() {
  const en = useAppLocale().locale === "en";
  return (
    <Card>
      <CardLabel>{en ? "Account management" : "Gestion du compte"}</CardLabel>
      <div className="space-y-2">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,244,255,0.7)" }}
        >
          <LogOut size={13} /> {en ? "Log out" : "Déconnexion"}
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#F23645" }}
        >
          <Trash2 size={13} /> {en ? "Delete account" : "Supprimer le compte"}
        </div>
      </div>
    </Card>
  );
}

/* ─── Contenu localisé (hero, sections, steps, CTA) ─────────── */

interface StepContent { title: string; desc: string }
interface SectionContent { badgeLabel: string; title: string; steps: StepContent[] }

const content = {
  fr: {
    heroBadge: "Guide d'utilisation",
    heroTitleWhite: "Maîtrisez MentorInvest",
    heroTitleGradient: "en quelques minutes.",
    heroSubtitle: "Les 4 espaces de l'app, étape par étape : Marchés, Mentor, Actualités et Profil.",
    ctaTitle: "Prêt à passer à la pratique ?",
    ctaDesc: "Télécharge MentorInvest gratuitement\net applique tout ce que tu viens d'apprendre.",
    sections: {
      marches: {
        badgeLabel: "MARCHÉS",
        title: "Analyser un actif comme un pro",
        steps: [
          { title: "Choisir son actif", desc: "Recherche n'importe quel actif : crypto, actions, forex ou indices.\n\nTape un nom ou un symbole (BTC, AAPL, EUR/USD, S&P 500...) et accède instantanément à son graphique." },
          { title: "Choisir son type de graphique", desc: "4 types de graphiques selon ton style d'analyse :\n\n• Bougies — le classique japonais\n• Barres — vue OHLC condensée\n• Courbe — tendance épurée\n• Région — volume visuel" },
          { title: "Suivre le compte à rebours", desc: "Un compte à rebours affiche en direct le temps restant avant la clôture de la bougie en cours — pratique pour anticiper le prochain mouvement." },
          { title: "Lire l'OHLC au survol", desc: "Passe la souris sur n'importe quelle bougie pour voir instantanément l'Open, le High, le Low et le Close — sans avoir à cliquer." },
          { title: "Activer la bibliothèque d'indicateurs", desc: "Une bibliothèque complète d'indicateurs techniques est à ta disposition : RSI, MACD, Bandes de Bollinger, EMA, SMA, WMA, Stochastique, ATR, ADX, OBV, CCI et Ichimoku." },
          { title: "Gérer sa Watchlist", desc: "Ajoute ou supprime des actifs en un clic, puis redimensionne le panneau Watchlist selon ton espace de travail." },
          { title: "Configurer des alertes de prix", desc: "Définis un seuil de prix sur n'importe quel actif et reçois une notification dès qu'il est atteint." },
          { title: "Consulter les données fondamentales", desc: "Au-delà du graphique, accède aux données fondamentales de chaque actif : P/E, EPS, dividendes et plus encore." },
          { title: "Lire les actualités liées à l'actif", desc: "Chaque actif affiche son propre fil d'actualité, filtré automatiquement pour ne montrer que ce qui le concerne directement." },
          { title: "Lancer une analyse IA avec Surveiller", desc: "Appuie sur le bouton SURVEILLER pour ajouter l'actif à ta watchlist et déclencher une première analyse IA du Mentor." },
        ],
      },
      mentor: {
        badgeLabel: "MENTOR",
        title: "Ton assistant d'analyse intelligent",
        steps: [
          { title: "Discuter avec le Mentor à tout moment", desc: "Le Mentor est un chat IA disponible en permanence pour analyser les marchés à ta place.\n\nUtilise les suggestions rapides pour démarrer instantanément." },
          { title: "Poser une question sur un actif précis", desc: "Plus ta question est précise, meilleure sera l'analyse.\n\nExemples de bonnes questions :\n• \"Quelle est la tendance actuelle de l'ETH sur 4h ?\"\n• \"Y a-t-il un signal d'achat sur AAPL en ce moment ?\"\n• \"Quels sont les niveaux de support du BTC ?\"" },
          { title: "Demander une analyse technique ou fondamentale", desc: "Précise le type d'analyse que tu veux :\n\n• Technique — indicateurs, supports/résistances, tendance\n• Fondamentale — P/E, revenus, croissance\n\nLe Mentor adapte sa réponse en conséquence." },
          { title: "Le Mentor remplace le Screener", desc: "Plus besoin de filtrer manuellement des centaines d'actifs : demande simplement au Mentor de trouver des opportunités, il fait tout le travail d'analyse à ta place." },
        ],
      },
      actualites: {
        badgeLabel: "ACTUALITÉS",
        title: "Rester informé, où que soient les marchés",
        steps: [
          { title: "Suivre l'actualité traduite en 8 langues", desc: "Toute l'actualité financière est traduite automatiquement dans ta langue, parmi 8 langues disponibles." },
          { title: "Anticiper avec le Calendrier économique", desc: "Anticipe les événements qui font bouger les marchés : décisions de la Fed, publications CPI/NFP, résultats trimestriels.\n\nLes événements à fort impact sont marqués en rouge." },
          { title: "Explorer le Globe 3D — Mode Normal", desc: "Le mode Normal affiche un globe réaliste avec un effet jour/nuit calculé en temps réel et les lumières des grandes villes qui s'allument à la tombée de la nuit." },
          { title: "Mode Live — marchés mondiaux en direct", desc: "Bascule en mode Live pour voir les news et les marchés du monde entier en direct, filtrables par catégorie : Macro, Crypto, Actions, Forex, Indices, Matières premières.\n\n65 actifs suivis en simultané." },
          { title: "Mode Macro — PIB par pays", desc: "Le mode Macro colore chaque pays selon son PIB réel.\n\nClique sur un pays pour ouvrir un panneau détaillé : PIB, dette, inflation, chômage." },
          { title: "Mode Immersif & pays cliquables", desc: "Active le Mode Immersif pour explorer le Globe en plein écran.\n\nTous les pays sont cliquables, dans les 3 modes, pour approfondir chaque zone géographique." },
        ],
      },
      profil: {
        badgeLabel: "PROFIL",
        title: "Ton compte, à ton image",
        steps: [
          { title: "Se connecter en toute sécurité", desc: "Connecte-toi ou crée un compte via une authentification sécurisée Supabase." },
          { title: "Choisir sa langue", desc: "Sélectionne ta langue parmi les 8 disponibles — l'app et les actualités s'adaptent automatiquement." },
          { title: "Choisir son thème", desc: "Passe du thème sombre au thème clair (ou inversement) en un clic, selon ta préférence." },
          { title: "Consulter ses stats", desc: "Retrouve tes statistiques réelles : nombre de favoris et date d'inscription." },
          { title: "Gérer son compte", desc: "Déconnecte-toi à tout moment, ou supprime définitivement ton compte et tes données depuis les réglages." },
        ],
      },
    } as Record<string, SectionContent>,
  },
  en: {
    heroBadge: "User guide",
    heroTitleWhite: "Master MentorInvest",
    heroTitleGradient: "in just a few minutes.",
    heroSubtitle: "The app's 4 spaces, step by step: Markets, Mentor, News and Profile.",
    ctaTitle: "Ready to put it into practice?",
    ctaDesc: "Download MentorInvest for free\nand put everything you just learned into practice.",
    sections: {
      marches: {
        badgeLabel: "MARKETS",
        title: "Analyze an asset like a pro",
        steps: [
          { title: "Choose your asset", desc: "Search for any asset: crypto, stocks, forex or indices.\n\nType a name or a ticker (BTC, AAPL, EUR/USD, S&P 500...) and get instant access to its chart." },
          { title: "Choose your chart type", desc: "4 chart types to match your analysis style:\n\n• Candles — the Japanese classic\n• Bars — condensed OHLC view\n• Line — a clean trend view\n• Area — visual volume" },
          { title: "Track the countdown", desc: "A live countdown shows the time remaining before the current candle closes — handy for anticipating the next move." },
          { title: "Read the OHLC on hover", desc: "Hover over any candle to instantly see the Open, High, Low and Close — no clicking required." },
          { title: "Activate the indicator library", desc: "A full library of technical indicators is at your fingertips: RSI, MACD, Bollinger Bands, EMA, SMA, WMA, Stochastic, ATR, ADX, OBV, CCI and Ichimoku." },
          { title: "Manage your watchlist", desc: "Add or remove assets in one click, then resize the watchlist panel to fit your workspace." },
          { title: "Set up price alerts", desc: "Set a price threshold on any asset and get notified the moment it's reached." },
          { title: "Check fundamental data", desc: "Beyond the chart, access each asset's fundamental data: P/E, EPS, dividends and more." },
          { title: "Read asset-related news", desc: "Every asset has its own news feed, automatically filtered to show only what's directly relevant to it." },
          { title: "Launch an AI analysis with Watch", desc: "Tap the WATCH button to add the asset to your watchlist and trigger a first AI analysis from Mentor." },
        ],
      },
      mentor: {
        badgeLabel: "MENTOR",
        title: "Your smart analysis assistant",
        steps: [
          { title: "Chat with Mentor anytime", desc: "Mentor is an AI chat always available to analyze the markets for you.\n\nUse the quick suggestions to get started instantly." },
          { title: "Ask about a specific asset", desc: "The more precise your question, the better the analysis.\n\nExamples of good questions:\n• \"What's the current 4h trend on ETH?\"\n• \"Is there a buy signal on AAPL right now?\"\n• \"What are BTC's support levels?\"" },
          { title: "Ask for a technical or fundamental analysis", desc: "Specify the type of analysis you want:\n\n• Technical — indicators, support/resistance, trend\n• Fundamental — P/E, revenue, growth\n\nMentor adapts its answer accordingly." },
          { title: "Mentor replaces the screener", desc: "No more manually filtering through hundreds of assets: just ask Mentor to find opportunities, and it does all the analysis work for you." },
        ],
      },
      actualites: {
        badgeLabel: "NEWS",
        title: "Stay informed, wherever the markets move",
        steps: [
          { title: "Follow news translated into 8 languages", desc: "All financial news is automatically translated into your language, from 8 available languages." },
          { title: "Stay ahead with the economic calendar", desc: "Anticipate the events that move the markets: Fed decisions, CPI/NFP releases, quarterly earnings.\n\nHigh-impact events are flagged in red." },
          { title: "Explore the 3D Globe — Normal mode", desc: "Normal mode displays a realistic globe with a real-time day/night effect and city lights that switch on as night falls." },
          { title: "Live mode — global markets in real time", desc: "Switch to Live mode to see news and markets from around the world in real time, filterable by category: Macro, Crypto, Stocks, Forex, Indices, Commodities.\n\n65 assets tracked simultaneously." },
          { title: "Macro mode — GDP by country", desc: "Macro mode colors each country based on its real GDP.\n\nClick a country to open a detailed panel: GDP, debt, inflation, unemployment." },
          { title: "Immersive mode & clickable countries", desc: "Turn on Immersive mode to explore the Globe in full screen.\n\nEvery country is clickable, in all 3 modes, so you can dig deeper into any region." },
        ],
      },
      profil: {
        badgeLabel: "PROFILE",
        title: "Your account, your way",
        steps: [
          { title: "Sign in securely", desc: "Sign in or create an account through secure Supabase authentication." },
          { title: "Choose your language", desc: "Pick your language from the 8 available — the app and the news adapt automatically." },
          { title: "Choose your theme", desc: "Switch from dark to light theme (or back) in one click, whatever you prefer." },
          { title: "Check your stats", desc: "See your real stats: number of favorites and sign-up date." },
          { title: "Manage your account", desc: "Sign out anytime, or permanently delete your account and data from the settings." },
        ],
      },
    } as Record<string, SectionContent>,
  },
};

const sectionCards: Record<string, ReactNode[]> = {
  marches: [
    <AssetTypeCard key="0" />, <ChartTypesCard key="1" />, <CountdownCard key="2" />, <OHLCCard key="3" />,
    <IndicatorsLibraryCard key="4" />, <WatchlistManageCard key="5" />, <PriceAlertCard key="6" />,
    <FundamentalsCard key="7" />, <AssetNewsCard key="8" />, <WatchAnalyzeCard key="9" />,
  ],
  mentor: [
    <MentorChatCard key="0" />, <QuestionCard key="1" />, <AnalysisTypeCard key="2" />, <MentorVsScreenerCard key="3" />,
  ],
  actualites: [
    <NewsTranslatedCard key="0" />, <CalendarCard key="1" />, <GlobeNormalCard key="2" />,
    <GlobeLiveCard key="3" />, <GlobeMacroCard key="4" />, <GlobeImmersiveCard key="5" />,
  ],
  profil: [
    <AuthCard key="0" />, <LanguageCard key="1" />, <ThemeCard key="2" />, <StatsCard key="3" />, <AccountManageCard key="4" />,
  ],
};

const sectionColors: Record<string, string> = {
  marches: "#22c55e",
  mentor: "#2563ff",
  actualites: "#a855f7",
  profil: "#f59e0b",
};

/* ─── Page ───────────────────────────────────────────────── */

export default function GuidePage() {
  const { locale } = useAppLocale();
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const c = content[locale];

  const [activeSection, setActiveSection] = useState("marches");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main style={{ backgroundColor: "#080a0e", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-48 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(37,99,255,0.10) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-semibold"
            style={{
              background: "rgba(37,99,255,0.10)",
              border: "1px solid rgba(37,99,255,0.25)",
              borderRadius: 100,
              color: "#4f83ff",
              fontSize: 13,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4f83ff" }} />
            {c.heroBadge}
          </div>
          <h1
            className="font-bold tracking-tight mb-6 leading-[1.08]"
            style={{ color: "#f0f4ff", fontSize: "clamp(36px, 6vw, 60px)" }}
          >
            {c.heroTitleWhite}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #2963ff, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {c.heroTitleGradient}
            </span>
          </h1>
          <p className="leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(240,244,255,0.55)", fontSize: 18 }}>
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      <GuideNav active={activeSection} />

      {navItems.map(({ id }) => {
        const section = c.sections[id];
        return (
          <GuideSection key={id} id={id} badgeLabel={section.badgeLabel} badgeColor={sectionColors[id]} title={section.title}>
            {section.steps.map((step, i) => (
              <Step key={i} number={i + 1} title={step.title} desc={step.desc} card={sectionCards[id][i]} />
            ))}
          </GuideSection>
        );
      })}

      {/* CTA Final */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2
            className="font-bold leading-tight"
            style={{ color: "#f0f4ff", fontSize: 32, letterSpacing: "-0.5px" }}
          >
            {c.ctaTitle}
          </h2>
          <p style={{ color: "rgba(240,244,255,0.55)", fontSize: 17, whiteSpace: "pre-line" }}>
            {c.ctaDesc}
          </p>
          <ComingSoonTooltip showToast>
            <button
              className="inline-flex items-center px-8 py-4 rounded-xl font-semibold text-base transition-all glow-blue"
              style={{ background: "#2563ff", color: "#fff" }}
            >
              {tNav("download")}
            </button>
          </ComingSoonTooltip>
          <p className="text-sm" style={{ color: "rgba(240,244,255,0.35)" }}>
            {tHero("freeNoCard")}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
