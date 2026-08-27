"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import { useAppLocale } from "@/components/LocaleProvider";

interface LegalSection {
  heading: string;
  content: ReactNode;
}

interface LegalDocProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function LegalDoc({ eyebrow, title, lastUpdated, intro, sections }: LegalDocProps) {
  const { locale } = useAppLocale();
  const items = sections.map((s) => ({ ...s, id: slugify(s.heading) }));

  return (
    <main style={{ backgroundColor: "#080a0e", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="px-6 pt-40 pb-16" style={{ backgroundColor: "#080a0e" }}>
        <div className="max-w-3xl mx-auto">
          <p
            className="font-semibold mb-4 uppercase"
            style={{ color: "#4f83ff", fontSize: 12, letterSpacing: "0.08em" }}
          >
            {eyebrow}
          </p>
          <h1
            className="font-bold tracking-tight mb-4 leading-[1.1]"
            style={{ color: "#f0f4ff", fontSize: "clamp(30px, 4.5vw, 44px)" }}
          >
            {title}
          </h1>
          <p className="text-sm mb-6" style={{ color: "rgba(240,244,255,0.35)" }}>
            {locale === "en" ? "Last updated: " : "Dernière mise à jour : "}{lastUpdated}
          </p>
          {intro && (
            <div className="legal-prose max-w-2xl" style={{ fontSize: 16 }}>
              {intro}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section
        className="px-6 pb-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-6xl mx-auto pt-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16">
          {/* Sommaire */}
          <nav className="hidden lg:block" aria-label={locale === "en" ? "Table of contents" : "Sommaire"}>
            <div style={{ position: "sticky", top: 100 }}>
              <p
                className="font-semibold mb-4 uppercase"
                style={{ color: "rgba(240,244,255,0.3)", fontSize: 11, letterSpacing: "0.08em" }}
              >
                {locale === "en" ? "Table of contents" : "Sommaire"}
              </p>
              <ul className="flex flex-col gap-2.5 border-l" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {items.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block pl-4 text-sm transition-colors hover:text-white"
                      style={{ color: "rgba(240,244,255,0.45)" }}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sections */}
          <div className="max-w-2xl">
            {items.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className={i === 0 ? "pb-10" : "py-10 border-t"}
                style={{ borderColor: "rgba(255,255,255,0.06)", scrollMarginTop: 96 }}
              >
                <h2
                  className="font-semibold mb-4"
                  style={{ color: "#f0f4ff", fontSize: 20, letterSpacing: "-0.3px" }}
                >
                  {s.heading}
                </h2>
                <div className="legal-prose">{s.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
