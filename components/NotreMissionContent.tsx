"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppLocale } from "@/components/LocaleProvider";

interface Section {
  heading: string;
  blocks: { h3?: string; p: string }[];
  intro?: string;
  list?: { strong: string; text: string }[];
  outro?: string;
}

const content = {
  fr: {
    eyebrow: "Notre mission",
    titleWhite: "Les mêmes outils",
    titleGradient: "que les professionnels.",
    subtitle: "Rendre l'analyse de marché accessible à tous les investisseurs particuliers, sans jargon, sans frais cachés, sans conflit d'intérêts.",
    sections: [
      {
        heading: "Notre histoire",
        blocks: [
          { p: "MentorInvest est né d'un constat simple : les investisseurs particuliers passent aujourd'hui leurs soirées à jongler entre cinq applications différentes pour suivre leurs positions, une chaîne YouTube pour comprendre un indicateur, un forum pour vérifier une actualité, et un tableur pour tenir leur watchlist à jour. Pendant ce temps, les professionnels des marchés disposent, depuis leur poste de travail, de tout cela réuni en un seul endroit — données en temps réel, analyse assistée, actualités filtrées, alertes fiables." },
          { p: "Nous avons construit MentorInvest pour combler cet écart : une application mobile unique qui rassemble les graphiques de marché en temps réel, un assistant d'analyse propulsé par l'intelligence artificielle, une vision globale des marchés mondiaux et une veille économique complète — pensée dès le départ pour un particulier, pas pour une salle de marché." },
        ],
      },
      {
        heading: "Pourquoi MentorInvest existe",
        blocks: [
          { p: "L'accès à l'information de marché n'a jamais été aussi ouvert — et pourtant, il n'a jamais été aussi inégal. Les institutions financières disposent de terminaux professionnels coûtant plusieurs milliers d'euros par mois, d'équipes d'analystes dédiées et d'outils de traitement de données conçus sur mesure. Les investisseurs particuliers, eux, se contentent souvent d'interfaces datées, de données fragmentées ou d'analyses noyées sous la publicité." },
          { p: "Cet écart d'outils ne devrait pas exister. Comprendre un graphique, suivre une actualité économique dans sa langue, recevoir une alerte fiable ou poser une question à un assistant qui explique plutôt qu'il ne vend — ce sont des besoins fondamentaux de tout investisseur, débutant ou confirmé. C'est cet écart que MentorInvest a été conçu pour réduire." },
        ],
      },
      {
        heading: "Notre approche",
        blocks: [
          { h3: "Simplicité", p: "Chaque fonctionnalité de MentorInvest est pensée pour être comprise en quelques secondes, sans formation préalable. Un graphique doit être lisible, une analyse doit être claire, une alerte doit être actionnable. La complexité des marchés ne doit jamais devenir un obstacle à leur compréhension." },
          { h3: "Transparence", p: "Aucune publicité déguisée en contenu, aucun placement de produit, aucun conflit d'intérêt caché. Ce que tu vois dans l'application, c'est ce que nous pensons être utile — rien de plus." },
          { h3: "Indépendance", p: "MentorInvest n'est affiliée à aucune banque, aucun courtier, aucun émetteur de produits financiers. Nous ne sommes rémunérés ni par des commissions sur les transactions de nos utilisateurs, ni par la mise en avant d'un actif plutôt qu'un autre. Notre seul modèle économique est l'abonnement à l'application." },
        ],
      },
      {
        heading: "Ce que nous ne faisons pas",
        intro: "Il est tout aussi important de dire clairement ce que MentorInvest n'est pas :",
        list: [
          { strong: "Nous ne donnons pas de conseils en investissement personnalisés.", text: " MentorInvest est un outil d'information et d'analyse, pas un conseiller financier agréé. Les analyses de notre assistant Mentor sont informatives, jamais prescriptives." },
          { strong: "Nous ne gérons pas de fonds.", text: " MentorInvest ne détient, ne gère et ne place jamais l'argent de ses utilisateurs. Nous n'avons accès à aucun compte de courtage." },
          { strong: "Nous ne sommes pas un courtier.", text: " MentorInvest ne permet pas de passer d'ordres d'achat ou de vente sur des instruments financiers. Nous informons, nous n'exécutons pas." },
        ],
        outro: "Cette distinction est au cœur de notre indépendance : en ne touchant jamais à l'argent de nos utilisateurs, nous n'avons aucun intérêt à orienter leurs décisions.",
        blocks: [],
      },
      {
        heading: "Nos valeurs",
        blocks: [
          { h3: "L'utilisateur avant tout", p: "Chaque décision de produit part d'une question : est-ce que cela aide réellement la personne qui utilise l'application à mieux comprendre les marchés ? Si la réponse est non, la fonctionnalité ne voit pas le jour." },
          { h3: "La rigueur des données", p: "Des données de marché fiables et à jour sont le socle de toute analyse sérieuse. Nous investissons en priorité dans la qualité et la fraîcheur des données affichées, avant toute autre considération esthétique ou fonctionnelle." },
          { h3: "L'accessibilité", p: "Un outil d'analyse n'a de valeur que s'il est utilisable par le plus grand nombre. C'est pourquoi nous traduisons nos actualités financières en 8 langues et concevons chaque interface pour qu'elle reste claire, même pour un premier investissement." },
        ],
      },
      {
        heading: "Notre vision pour la suite",
        blocks: [
          { p: "MentorInvest n'en est qu'à ses débuts. Notre ambition est de faire de l'application le compagnon d'analyse de référence pour l'investisseur particulier européen — un outil qui grandit avec ses utilisateurs, s'enrichit de nouveaux marchés, de nouvelles langues et de nouvelles capacités d'analyse, tout en restant fidèle à ses trois piliers fondateurs : simplicité, transparence et indépendance." },
          { p: "Nous construisons MentorInvest pas à pas, avec les premiers utilisateurs de notre liste d'attente, dont les retours façonnent directement les priorités de développement. Rejoindre MentorInvest aujourd'hui, c'est participer à cette construction dès le premier jour." },
        ],
      },
    ] as Section[],
  },
  en: {
    eyebrow: "Our mission",
    titleWhite: "The same tools",
    titleGradient: "as the professionals.",
    subtitle: "Making market analysis accessible to every everyday investor — no jargon, no hidden fees, no conflicts of interest.",
    sections: [
      {
        heading: "Our story",
        blocks: [
          { p: "MentorInvest was born from a simple observation: everyday investors spend their evenings juggling five different apps to track their positions, a YouTube channel to understand an indicator, a forum to check the news, and a spreadsheet to keep their watchlist up to date. Meanwhile, market professionals have all of that brought together in one place, right from their desk — real-time data, AI-assisted analysis, filtered news, reliable alerts." },
          { p: "We built MentorInvest to close that gap: a single mobile app that brings together real-time market charts, an AI-powered analysis assistant, a global view of world markets, and complete economic monitoring — designed from day one for an everyday investor, not a trading floor." },
        ],
      },
      {
        heading: "Why MentorInvest exists",
        blocks: [
          { p: "Access to market information has never been more open — and yet, it has never been more unequal. Financial institutions run professional terminals costing thousands of euros a month, backed by dedicated analyst teams and custom-built data tools. Everyday investors, meanwhile, are often left with dated interfaces, fragmented data, or analysis buried under advertising." },
          { p: "This tooling gap shouldn't exist. Understanding a chart, following economic news in your own language, receiving a reliable alert, or asking a question to an assistant that explains rather than sells — these are basic needs for every investor, beginner or experienced. Closing that gap is exactly what MentorInvest was built to do." },
        ],
      },
      {
        heading: "Our approach",
        blocks: [
          { h3: "Simplicity", p: "Every MentorInvest feature is designed to be understood in seconds, with no prior training required. A chart should be readable, an analysis should be clear, an alert should be actionable. The complexity of the markets should never stand in the way of understanding them." },
          { h3: "Transparency", p: "No advertising disguised as content, no product placement, no hidden conflicts of interest. What you see in the app is what we believe is genuinely useful — nothing more." },
          { h3: "Independence", p: "MentorInvest isn't affiliated with any bank, broker, or financial product issuer. We're not paid through commissions on our users' trades, nor by promoting one asset over another. Our only business model is the app subscription." },
        ],
      },
      {
        heading: "What we don't do",
        intro: "It's just as important to be clear about what MentorInvest isn't:",
        list: [
          { strong: "We don't give personalized investment advice.", text: " MentorInvest is an information and analysis tool, not a licensed financial advisor. Our Mentor assistant's analyses are informative, never prescriptive." },
          { strong: "We don't manage funds.", text: " MentorInvest never holds, manages, or invests its users' money. We have no access to any brokerage account." },
          { strong: "We are not a broker.", text: " MentorInvest doesn't let you place buy or sell orders on financial instruments. We inform — we don't execute." },
        ],
        outro: "This distinction is at the heart of our independence: by never touching our users' money, we have no incentive to steer their decisions.",
        blocks: [],
      },
      {
        heading: "Our values",
        blocks: [
          { h3: "The user comes first", p: "Every product decision starts with one question: does this genuinely help the person using the app understand the markets better? If the answer is no, the feature doesn't ship." },
          { h3: "Data you can trust", p: "Reliable, up-to-date market data is the foundation of any serious analysis. We invest first in the quality and freshness of the data we display, ahead of any aesthetic or feature consideration." },
          { h3: "Accessibility", p: "An analysis tool is only valuable if it can be used by as many people as possible. That's why we translate our financial news into 8 languages and design every interface to stay clear, even for a first-time investment." },
        ],
      },
      {
        heading: "Our vision going forward",
        blocks: [
          { p: "MentorInvest is just getting started. Our ambition is to make the app the go-to analysis companion for everyday investors across Europe — a tool that grows with its users, expanding into new markets, new languages and new analysis capabilities, all while staying true to its three founding pillars: simplicity, transparency and independence." },
          { p: "We're building MentorInvest step by step, together with the first members of our waitlist, whose feedback directly shapes our development priorities. Joining MentorInvest today means being part of that journey from day one." },
        ],
      },
    ] as Section[],
  },
};

export default function NotreMissionContent() {
  const { locale } = useAppLocale();
  const c = content[locale];

  return (
    <main style={{ backgroundColor: "#080a0e", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden"
        style={{ backgroundColor: "#080a0e" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(37,99,255,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <p
            className="font-semibold mb-6 uppercase"
            style={{ color: "#4f83ff", fontSize: 12, letterSpacing: "0.08em" }}
          >
            {c.eyebrow}
          </p>

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

          <p
            className="leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(240,244,255,0.55)", fontSize: 18 }}
          >
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* ── ARTICLE ── */}
      <section
        className="px-6 pb-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <article className="max-w-2xl mx-auto pt-16">
          {c.sections.map((section, i) => (
            <div
              key={section.heading}
              className={i === 0 ? "pb-10" : "py-10 border-t"}
              style={i === 0 ? undefined : { borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h2
                className="font-semibold mb-4"
                style={{ color: "#f0f4ff", fontSize: 24, letterSpacing: "-0.3px" }}
              >
                {section.heading}
              </h2>
              <div className="legal-prose" style={{ fontSize: 16 }}>
                {section.intro && <p>{section.intro}</p>}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.strong}>
                        <strong>{item.strong}</strong>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                )}
                {section.outro && <p>{section.outro}</p>}
                {section.blocks.map((b, j) => (
                  <div key={j}>
                    {b.h3 && <h3>{b.h3}</h3>}
                    <p>{b.p}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </article>
      </section>

      <Footer />
    </main>
  );
}
