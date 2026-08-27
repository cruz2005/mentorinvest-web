"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

const screenColors = ["#2962FF", "#9B59B6", "#F39C12", "#00B4D8"];
// File-name slugs — independent of the translated tab labels, matched by index.
const screenKeys = ["marches", "mentor", "actualites", "profil"];

function ScreenshotImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{
            display: "block",
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            borderRadius: 0,
            boxShadow: "none",
          }}
        />
      </AnimatePresence>
    </div>
  );
}

export default function Screenshots() {
  const t = useTranslations("screenshots");
  const tabLabels = t.raw("tabs") as string[];
  const screens = tabLabels.map((label, i) => ({ label, color: screenColors[i], key: screenKeys[i] }));

  const [active, setActive] = useState(0);
  const activeKey = screenKeys[active];

  return (
    <section
      id="screenshots"
      className="py-14 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(41,98,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2962FF]/30 bg-[#2962FF]/10 text-[#2962FF] text-xs font-semibold mb-4">
            {t("badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {t("titleWhite")}{" "}
            <span className="gradient-text-blue">{t("titleGradient")}</span>
          </h2>
          <p className="text-[#787B86] text-base max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {screens.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                active === i
                  ? { background: s.color, color: "#fff", boxShadow: `0 0 18px ${s.color}40` }
                  : { background: "#1E222D", color: "#787B86" }
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* ── Screenshots côte à côte, rapprochées et centrées (empilées sur mobile) ── */}
        <div
          className="flex flex-col md:flex-row items-center md:items-end justify-center w-full px-4 md:px-0"
          style={{ gap: "16px" }}
        >
          <ScreenshotImage
            src={`/screenshots/mobile-${activeKey}.png`}
            alt={`MentorInvest mobile — ${screens[active].label}`}
            className="max-w-[200px]"
          />
          <ScreenshotImage
            src={`/screenshots/desktop-${activeKey}.png`}
            alt={`MentorInvest desktop — ${screens[active].label}`}
            className="max-w-[600px]"
          />
        </div>

        {/* ── Dot nav ── */}
        <div className="flex justify-center gap-2 mt-8">
          {screens.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: 5,
                width: active === i ? 22 : 5,
                background: active === i ? screens[active].color : "#2A2E39",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
