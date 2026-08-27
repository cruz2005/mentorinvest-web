"use client";
import { useRef } from "react";
import {
  TrendingUp, MessageSquare, Newspaper, Bell, Globe, Calendar,
  CandlestickChart, Star,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const featureMeta = [
  { icon: <TrendingUp size={22} />, tagColor: "#089981" },
  { icon: <CandlestickChart size={22} />, tagColor: "#3498DB" },
  { icon: <MessageSquare size={22} />, tagColor: "#2962FF" },
  { icon: <Globe size={22} />, tagColor: "#1ABC9C" },
  { icon: <Newspaper size={22} />, tagColor: "#F39C12" },
  { icon: <Star size={22} />, tagColor: "#2ECC71" },
  { icon: <Bell size={22} />, tagColor: "#E74C3C" },
  { icon: <Calendar size={22} />, tagColor: "#34495E" },
];

interface FeatureContent {
  title: string;
  description: string;
  tag: string;
}

type Feature = FeatureContent & (typeof featureMeta)[number];

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  const col     = index % 4; // stagger delay by column

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: col * 0.10, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.015 }}
      className="card-glass rounded-2xl p-6 cursor-default group"
      style={{ transition: "box-shadow 0.3s ease" }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ scale: 1.12, rotate: 4 }}
          transition={{ duration: 0.22 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${f.tagColor}15`, color: f.tagColor }}
        >
          {f.icon}
        </motion.div>
        {f.tag && (
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{
              background: `${f.tagColor}20`,
              color: f.tagColor,
              border: `1px solid ${f.tagColor}40`,
            }}
          >
            {f.tag}
          </span>
        )}
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
      <p className="text-[#787B86] text-sm leading-relaxed">{f.description}</p>
    </motion.div>
  );
}

export default function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as FeatureContent[];
  const features: Feature[] = items.map((item, i) => ({ ...item, ...featureMeta[i] }));

  const headerRef = useRef(null);
  const headerIn  = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-28 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.60, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2962FF]/30 bg-[#2962FF]/10 text-[#2962FF] text-xs font-semibold mb-4">
            {t("badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("titleWhite")}{" "}
            <span className="gradient-text-blue">{t("titleGradient")}</span>
          </h2>
          <p className="text-[#787B86] text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
