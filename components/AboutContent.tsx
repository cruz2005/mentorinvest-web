"use client";
import Navbar from "@/components/Navbar";
import { ComingSoonTooltip } from "@/components/ComingSoonTooltip";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/LocaleProvider";

const content = {
  fr: {
    badge: "Notre mission",
    titleWhite: "Rendre l'analyse de marché",
    titleGradient: "accessible à tous.",
    subtitle: "MentorInvest donne aux investisseurs particuliers les mêmes outils d'analyse que les professionnels — en un seul clic.",
    valuesTitle: "Ce qui guide MentorInvest",
    values: [
      { title: "Simplicité", text: "Un clic. Une analyse complète. Pas besoin d'être expert pour comprendre les marchés." },
      { title: "Transparence", text: "Aucun conflit d'intérêt. Aucune publicité. Juste des données claires et fiables." },
      { title: "Indépendance", text: "MentorInvest n'est affilié à aucune institution financière et ne vend aucun produit d'investissement." },
    ],
    disclaimerTitle: "Avertissement",
    disclaimer: "MentorInvest est un outil d'information et d'analyse de marché. Le contenu proposé sur cette plateforme ne constitue en aucun cas un conseil en investissement, une recommandation personnalisée, ni une incitation à acheter ou vendre un instrument financier. Les investissements en instruments financiers comportent des risques de perte en capital. Chaque utilisateur est seul responsable de ses décisions d'investissement et est invité, si nécessaire, à consulter un conseiller financier agréé avant toute prise de décision.",
    ctaTitle: "Prêt à analyser les marchés comme un pro ?",
  },
  en: {
    badge: "Our mission",
    titleWhite: "Making market analysis",
    titleGradient: "accessible to everyone.",
    subtitle: "MentorInvest gives everyday investors the same analysis tools as the professionals — in a single tap.",
    valuesTitle: "What guides MentorInvest",
    values: [
      { title: "Simplicity", text: "One tap. A complete analysis. No need to be an expert to understand the markets." },
      { title: "Transparency", text: "No conflicts of interest. No advertising. Just clear, reliable data." },
      { title: "Independence", text: "MentorInvest isn't affiliated with any financial institution and doesn't sell any investment product." },
    ],
    disclaimerTitle: "Disclaimer",
    disclaimer: "MentorInvest is an information and market-analysis tool. The content offered on this platform does not, under any circumstances, constitute investment advice, a personalized recommendation, or an inducement to buy or sell any financial instrument. Investing in financial instruments carries a risk of capital loss. Each user is solely responsible for their investment decisions and is encouraged, where necessary, to consult a licensed financial advisor before making any decision.",
    ctaTitle: "Ready to analyze the markets like a pro?",
  },
};

export default function AboutContent() {
  const { locale } = useAppLocale();
  const c = content[locale];
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");

  return (
    <main style={{ backgroundColor: "#080a0e", minHeight: "100vh" }}>
      <Navbar />

      {/* ── SECTION 1 — HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden"
        style={{ backgroundColor: "#080a0e" }}
      >
        {/* Halo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(37,99,255,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Badge */}
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
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#4f83ff" }}
            />
            {c.badge}
          </div>

          {/* Titre */}
          <h1
            className="font-bold tracking-tight mb-6 leading-[1.08]"
            style={{ color: "#f0f4ff", fontSize: "clamp(38px, 6vw, 64px)" }}
          >
            {c.titleWhite}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #2963ff, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {c.titleGradient}
            </span>
          </h1>

          {/* Sous-titre */}
          <p
            className="leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(240,244,255,0.55)", fontSize: 18 }}
          >
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* ── SECTION 2 — VALEURS ── */}
      <section
        className="px-6 pt-4 pb-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-5xl mx-auto pt-24">
          <h2
            className="text-center font-bold mb-14"
            style={{ color: "#f0f4ff", fontSize: 32, letterSpacing: "-0.5px" }}
          >
            {c.valuesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.values.map((v) => (
              <div
                key={v.title}
                className="card-glass rounded-2xl p-7 flex flex-col gap-4"
              >
                <h3
                  className="font-semibold text-lg"
                  style={{ color: "#f0f4ff" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(240,244,255,0.55)" }}
                >
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — DISCLAIMER ── */}
      <section
        className="px-6 pt-24 pb-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-center font-bold mb-6"
            style={{ color: "#f0f4ff", fontSize: 24, letterSpacing: "-0.5px" }}
          >
            {c.disclaimerTitle}
          </h2>
          <p
            className="text-sm leading-relaxed text-center"
            style={{ color: "rgba(240,244,255,0.50)" }}
          >
            {c.disclaimer}
          </p>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
      <section
        className="px-6 pb-24 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 60, marginTop: 60 }}
      >
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2
            className="font-bold leading-tight"
            style={{ color: "#f0f4ff", fontSize: 32, letterSpacing: "-0.5px" }}
          >
            {c.ctaTitle}
          </h2>
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
