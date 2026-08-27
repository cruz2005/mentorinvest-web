"use client";
import { useState } from "react";
import { ArrowRight, TrendingUp, Shield, Zap, Check, Apple, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import CandleBackground from "@/components/CandleBackground";
import { SHOW_WAITLIST, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/config";

/* ── Globe (client-only) ── */
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="rounded-full animate-pulse"
        style={{
          width: 160, height: 160,
          background: "radial-gradient(circle, rgba(37,99,255,0.10) 0%, transparent 70%)",
        }}
      />
    </div>
  ),
});

/* ── Framer Motion fade-up ── */
const up = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.60, delay, ease: [0.16, 1, 0.3, 1] as const } },
});

export default function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  /* ── Titre — mots blancs (stagger Framer Motion) ── */
  const WHITE_WORDS = t("titleWhite").split(" ");

  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24 md:pt-28 pb-16"
      style={{ backgroundColor: "#080a0e" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 55% at 70% 38%, rgba(37,99,255,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 45% at 15% 75%, rgba(37,99,255,0.04) 0%, transparent 55%)",
          ].join(","),
        }}
      />

      <div
        className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0"
        style={{ zIndex: 1 }}
      >
        {/* ── Colonne gauche ── */}
        <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-14 lg:pl-12">

          {/* H1 */}
          <h1
            className="mb-6 font-bold tracking-tight leading-[1.04]"
            style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.6rem)", color: "#f0f4ff" }}
          >
            {WHITE_WORDS.map((w, i) => (
              <motion.span
                key={`w${i}`}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.50, delay: 0.28 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            ))}{" "}
            <motion.span
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #2563ff, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.60, delay: 0.28 + WHITE_WORDS.length * 0.055, ease: [0.16, 1, 0.3, 1] }}
            >
              {t("titleGradient")}
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            variants={up(0.40)} initial="hidden" animate="visible"
            className="mb-5 leading-relaxed max-w-lg"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: "rgba(240,244,255,0.48)" }}
          >
            {t("description")}
          </motion.p>

          {/* Chips */}
          <motion.div
            variants={up(0.48)} initial="hidden" animate="visible"
            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-9"
          >
            {[
              { icon: <TrendingUp size={12} />, label: t("chipLive") },
              { icon: <Zap        size={12} />, label: t("chipMentor") },
              { icon: <Shield     size={12} />, label: t("chipSecure") },
            ].map((b, i) => (
              <span key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: "#0e1422", border: "1px solid rgba(255,255,255,0.07)", color: "#b8c4e0" }}
              >
                <span style={{ color: "#2563ff" }}>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </motion.div>

          {/* Formulaire waitlist */}
          <motion.div
            variants={up(0.54)} initial="hidden" animate="visible"
            id="waitlist" className="w-full max-w-md"
          >
            {!SHOW_WAITLIST ? (
              <>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
                    style={{ background: "#2563ff", color: "#fff", boxShadow: "0 0 28px rgba(37,99,255,0.26)" }}
                  >
                    <Apple size={16} /> {tc("appStore")}
                  </a>
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
                    style={{ background: "#0c1120", border: "1px solid rgba(255,255,255,0.14)", color: "#f0f4ff" }}
                  >
                    <PlayCircle size={16} /> {tc("googlePlay")}
                  </a>
                </div>
                <p className="text-xs mt-2.5 text-center" style={{ color: "rgba(240,244,255,0.28)" }}>
                  {tc("availableNow")}
                </p>
              </>
            ) : submitted ? (
              <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm"
                style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.28)", color: "#22c55e" }}>
                <Check size={16} /> {tc("joinedWaitlist")}
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email" required placeholder={tc("emailPlaceholder")}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3.5 rounded-xl text-sm focus:outline-none"
                    style={{ background: "#0c1120", border: "1px solid rgba(255,255,255,0.08)", color: "#f0f4ff" }}
                  />
                  <button type="submit"
                    className="px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 whitespace-nowrap hover:brightness-110 active:scale-95 transition-all"
                    style={{ background: "#2563ff", color: "#fff", boxShadow: "0 0 28px rgba(37,99,255,0.26)" }}
                  >
                    {t("joinButton")} <ArrowRight size={14} />
                  </button>
                </form>
                <p className="text-xs mt-2.5" style={{ color: "rgba(240,244,255,0.28)" }}>
                  {t("freeNoCard")}
                </p>
                <p
                  className="mt-3 mx-auto text-center"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", maxWidth: "400px" }}
                >
                  {t("waitlistNote")}
                </p>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={up(0.62)} initial="hidden" animate="visible"
            className="flex gap-8 w-full mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { value: t("statAssetsValue"), label: t("statAssetsLabel") },
              { value: t("statMentorValue"), label: t("statMentorLabel") },
              { value: t("statLiveValue"),   label: t("statLiveLabel") },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold" style={{ color: "#f0f4ff" }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(240,244,255,0.36)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Colonne droite — Globe uniquement ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="w-full lg:w-[52%] flex-shrink-0"
          style={{ height: "clamp(320px, 46vw, 580px)", position: "relative", overflow: "hidden" }}
        >
          <CandleBackground />
          <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
            <Globe3D />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
