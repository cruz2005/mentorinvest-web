"use client";
import { useState, useMemo } from "react";
import { Search, ChevronDown, Mail } from "lucide-react";
import { useAppLocale } from "@/components/LocaleProvider";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const categoriesFr: FaqCategory[] = [
  {
    title: "Premiers pas",
    items: [
      {
        q: "Comment créer un compte MentorInvest ?",
        a: "MentorInvest est actuellement en phase de liste d'attente. Inscris ton adresse email depuis la page d'accueil pour réserver ta place : tu recevras un email dès l'ouverture des inscriptions, avec les instructions pour créer ton compte dans l'application.",
      },
      {
        q: "Comment télécharger l'application ?",
        a: "L'application n'est pas encore disponible sur les stores. Les membres de la liste d'attente seront prévenus par email dès sa sortie sur l'App Store et Google Play, avec un accès prioritaire et des offres early adopter.",
      },
      {
        q: "L'application est-elle disponible sur iOS et Android ?",
        a: "Oui, MentorInvest sera disponible aussi bien sur iPhone (App Store) que sur Android (Google Play) dès son lancement.",
      },
      {
        q: "Est-ce que MentorInvest est gratuit ?",
        a: "MentorInvest propose un plan Gratuit donnant accès aux fonctionnalités essentielles, ainsi que deux plans payants (Analyste à 19,99 €/mois et Pro à 29,99 €/mois) pour les fonctionnalités avancées. Aucune carte bancaire n'est requise pour rejoindre la liste d'attente.",
      },
    ],
  },
  {
    title: "Fonctionnalités",
    items: [
      {
        q: "Comment fonctionne le Mentor, l'assistant IA ?",
        a: "Mentor est l'assistant intelligence artificielle intégré à l'application. Il t'aide à analyser un actif, comprendre un mouvement de marché ou une actualité, en langage clair. Mentor fournit des informations et des analyses, jamais des conseils en investissement personnalisés.",
      },
      {
        q: "Qu'est-ce que le Globe 3D et ses 3 modes ?",
        a: "Le Globe 3D offre une vue d'ensemble des marchés mondiaux. Le mode Normal affiche l'état général des places financières, le mode Live met en avant les mouvements de marché en temps réel, et le mode Macro superpose les grands indicateurs économiques mondiaux (taux, inflation, croissance).",
      },
      {
        q: "Comment lire les graphiques en temps réel ?",
        a: "Les graphiques couvrent les cryptomonnaies, actions, forex, indices et matières premières, avec des données actualisées en continu. Tu peux changer d'échelle de temps, comparer plusieurs actifs et superposer des indicateurs techniques directement depuis le graphique.",
      },
      {
        q: "Comment créer et personnaliser ma watchlist ?",
        a: "Depuis la fiche de n'importe quel actif, appuie sur l'icône d'ajout pour l'intégrer à ta watchlist. Tu peux ensuite réorganiser, regrouper et retirer des actifs directement depuis l'onglet Watchlist de l'application.",
      },
      {
        q: "Comment configurer une alerte de prix ?",
        a: "Sur la fiche d'un actif, choisis « Créer une alerte », définis le seuil de prix souhaité et la condition (au-dessus / en-dessous). Tu recevras une notification dès que le seuil est atteint.",
      },
      {
        q: "Dans quelles langues sont traduites les actualités ?",
        a: "Les actualités financières sont traduites automatiquement en 8 langues, afin de rendre l'information de marché accessible au plus grand nombre, quelle que soit la langue maternelle de l'utilisateur.",
      },
      {
        q: "Qu'est-ce que le calendrier économique ?",
        a: "Le calendrier économique recense les publications et événements macroéconomiques susceptibles d'influencer les marchés (décisions de taux, indices d'inflation, résultats d'entreprises), classés par date et par niveau d'impact attendu.",
      },
    ],
  },
  {
    title: "Abonnements",
    items: [
      {
        q: "Quelle est la différence entre Gratuit, Analyste et Pro ?",
        a: "Le plan Gratuit donne accès aux fonctionnalités essentielles (graphiques, watchlist limitée, actualités). Le plan Analyste (19,99 €/mois) débloque des analyses Mentor plus poussées et une watchlist étendue. Le plan Pro (29,99 €/mois) donne un accès complet et sans limitation à l'ensemble des fonctionnalités de l'application.",
      },
      {
        q: "Comment s'abonner à un plan payant ?",
        a: "Une fois l'application lancée, tu pourras souscrire à un plan payant directement depuis l'onglet Abonnement de l'application, avec paiement sécurisé via l'App Store ou Google Play.",
      },
      {
        q: "Comment résilier mon abonnement ?",
        a: "Tu peux résilier ton abonnement à tout moment depuis les paramètres de ton compte, ou en écrivant à contact@mentorinvest.fr. La résiliation prend effet à la fin de la période de facturation en cours, sans reconduction ultérieure.",
      },
      {
        q: "Puis-je changer de plan à tout moment ?",
        a: "Oui, tu peux passer d'un plan à un autre (upgrade ou downgrade) à tout moment depuis les paramètres de ton compte. Le changement est pris en compte au prochain cycle de facturation.",
      },
      {
        q: "Y a-t-il un engagement ?",
        a: "Non, tous les abonnements MentorInvest sont sans engagement et résiliables à tout moment.",
      },
    ],
  },
  {
    title: "Problèmes techniques",
    items: [
      {
        q: "L'application ne charge pas, que faire ?",
        a: "Vérifie d'abord ta connexion internet, puis force la fermeture de l'application et relance-la. Si le problème persiste, assure-toi que l'application est à jour depuis ton store. Si le souci continue, écris-nous à contact@mentorinvest.fr en précisant ton modèle d'appareil et la version de l'application.",
      },
      {
        q: "Les données de marché semblent incorrectes ou retardées",
        a: "Les données affichées proviennent de fournisseurs de marché tiers et peuvent, dans de rares cas, présenter un léger décalage temporel. Si tu constates une anomalie durable ou répétée, signale-la nous à contact@mentorinvest.fr avec l'actif concerné, afin que nous puissions vérifier la source des données.",
      },
      {
        q: "Je ne reçois pas mes alertes de prix",
        a: "Vérifie que les notifications sont autorisées pour MentorInvest dans les réglages de ton téléphone, et que l'alerte est toujours active dans l'application. Si le problème persiste, contacte-nous à contact@mentorinvest.fr.",
      },
      {
        q: "Comment signaler un bug ?",
        a: "Écris-nous à contact@mentorinvest.fr en décrivant le problème rencontré, les étapes pour le reproduire et, si possible, une capture d'écran. Notre équipe technique traite chaque signalement.",
      },
    ],
  },
  {
    title: "Confidentialité et sécurité",
    items: [
      {
        q: "Quelles données MentorInvest collecte-t-il ?",
        a: "Nous collectons ton adresse email, tes préférences d'utilisation (actifs suivis, langue, notifications) et certaines données de navigation techniques. Le détail complet est disponible dans notre politique de confidentialité.",
      },
      {
        q: "Mes données sont-elles partagées avec des tiers ?",
        a: "Non. Tes données personnelles ne sont ni vendues, ni louées, ni partagées avec des tiers à des fins commerciales. Elles ne sont transmises qu'à nos sous-traitants techniques strictement nécessaires au fonctionnement du service (hébergement, paiement).",
      },
      {
        q: "Comment supprimer mon compte et mes données ?",
        a: "Tu peux demander la suppression de ton compte et de tes données personnelles à tout moment en écrivant à contact@mentorinvest.fr. Nous traitons chaque demande dans un délai maximal d'un mois, conformément au RGPD.",
      },
      {
        q: "Où sont hébergées mes données ?",
        a: "Le site est hébergé par Vercel et les données utilisateurs sont gérées via Supabase, sur une infrastructure cloud sécurisée. Le détail des transferts de données est disponible dans notre politique de confidentialité.",
      },
    ],
  },
];

const categoriesEn: FaqCategory[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "How do I create a MentorInvest account?",
        a: "MentorInvest is currently in its waitlist phase. Enter your email on the homepage to save your spot: you'll get an email as soon as sign-ups open, with instructions to create your account in the app.",
      },
      {
        q: "How do I download the app?",
        a: "The app isn't available on the stores yet. Waitlist members will be notified by email as soon as it launches on the App Store and Google Play, with priority access and early adopter offers.",
      },
      {
        q: "Is the app available on iOS and Android?",
        a: "Yes, MentorInvest will be available on both iPhone (App Store) and Android (Google Play) from launch.",
      },
      {
        q: "Is MentorInvest free?",
        a: "MentorInvest offers a Free plan with access to the essential features, plus two paid plans (Analyst at €19.99/month and Pro at €29.99/month) for advanced features. No credit card is required to join the waitlist.",
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        q: "How does Mentor, the AI assistant, work?",
        a: "Mentor is the AI assistant built into the app. It helps you analyze an asset, understand a market move, or make sense of a news story, in plain language. Mentor provides information and analysis, never personalized investment advice.",
      },
      {
        q: "What is the 3D Globe and its 3 modes?",
        a: "The 3D Globe gives you an overview of global markets. Normal mode shows the general state of financial markets, Live mode highlights real-time market moves, and Macro mode overlays major global economic indicators (rates, inflation, growth).",
      },
      {
        q: "How do I read the real-time charts?",
        a: "The charts cover cryptocurrencies, stocks, forex, indices, and commodities, with continuously updated data. You can change the timeframe, compare multiple assets, and overlay technical indicators directly from the chart.",
      },
      {
        q: "How do I create and customize my watchlist?",
        a: "From any asset's page, tap the add icon to include it in your watchlist. You can then reorder, group, and remove assets directly from the Watchlist tab in the app.",
      },
      {
        q: "How do I set up a price alert?",
        a: "On an asset's page, choose “Create an alert,” set the price threshold you want and the condition (above / below). You'll get a notification the moment the threshold is reached.",
      },
      {
        q: "What languages is the news translated into?",
        a: "Financial news is automatically translated into 8 languages, to make market information accessible to as many people as possible, whatever their native language.",
      },
      {
        q: "What is the economic calendar?",
        a: "The economic calendar lists macroeconomic releases and events that can move the markets (rate decisions, inflation figures, earnings reports), sorted by date and expected impact level.",
      },
    ],
  },
  {
    title: "Subscriptions",
    items: [
      {
        q: "What's the difference between Free, Analyst and Pro?",
        a: "The Free plan gives you access to the essential features (charts, limited watchlist, news). The Analyst plan (€19.99/month) unlocks deeper Mentor analyses and an extended watchlist. The Pro plan (€29.99/month) gives you full, unlimited access to every feature in the app.",
      },
      {
        q: "How do I subscribe to a paid plan?",
        a: "Once the app has launched, you'll be able to subscribe to a paid plan directly from the Subscription tab in the app, with secure payment via the App Store or Google Play.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "You can cancel your subscription anytime from your account settings, or by emailing contact@mentorinvest.fr. Cancellation takes effect at the end of the current billing period, with no further renewal.",
      },
      {
        q: "Can I change plans anytime?",
        a: "Yes, you can switch between plans (upgrade or downgrade) at any time from your account settings. The change takes effect at your next billing cycle.",
      },
      {
        q: "Is there a commitment?",
        a: "No, all MentorInvest subscriptions are commitment-free and can be canceled anytime.",
      },
    ],
  },
  {
    title: "Technical issues",
    items: [
      {
        q: "The app won't load — what should I do?",
        a: "First check your internet connection, then force-close the app and relaunch it. If the issue persists, make sure the app is up to date from your store. If it still doesn't work, email us at contact@mentorinvest.fr with your device model and app version.",
      },
      {
        q: "The market data looks incorrect or delayed",
        a: "The data shown comes from third-party market providers and may, in rare cases, be slightly delayed. If you notice a persistent or repeated issue, let us know at contact@mentorinvest.fr with the asset in question, so we can check the data source.",
      },
      {
        q: "I'm not receiving my price alerts",
        a: "Check that notifications are enabled for MentorInvest in your phone's settings, and that the alert is still active in the app. If the issue persists, contact us at contact@mentorinvest.fr.",
      },
      {
        q: "How do I report a bug?",
        a: "Email us at contact@mentorinvest.fr describing the issue, the steps to reproduce it, and a screenshot if possible. Our technical team reviews every report.",
      },
    ],
  },
  {
    title: "Privacy & security",
    items: [
      {
        q: "What data does MentorInvest collect?",
        a: "We collect your email address, your usage preferences (tracked assets, language, notifications), and some technical browsing data. Full details are available in our privacy policy.",
      },
      {
        q: "Is my data shared with third parties?",
        a: "No. Your personal data is never sold, rented, or shared with third parties for commercial purposes. It's only passed to the technical subprocessors strictly necessary to run the service (hosting, payment).",
      },
      {
        q: "How do I delete my account and data?",
        a: "You can request the deletion of your account and personal data at any time by emailing contact@mentorinvest.fr. We process every request within one month at most, in line with GDPR.",
      },
      {
        q: "Where is my data hosted?",
        a: "The site is hosted by Vercel and user data is managed via Supabase, on secure cloud infrastructure. Details of data transfers are available in our privacy policy.",
      },
    ],
  },
];

function FaqAccordion({ item }: { item: FaqItem }) {
  return (
    <details
      className="faq-item group border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <summary className="flex items-center justify-between gap-6 cursor-pointer py-5 select-none">
        <span className="font-medium" style={{ color: "#f0f4ff", fontSize: 15 }}>
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
          style={{ color: "rgba(240,244,255,0.4)" }}
        />
      </summary>
      <div className="pb-5 legal-prose" style={{ marginTop: -4 }}>
        <p>{item.a}</p>
      </div>
    </details>
  );
}

export default function HelpCenter() {
  const { locale } = useAppLocale();
  const en = locale === "en";
  const categories = en ? categoriesEn : categoriesFr;

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, categories]);

  const totalResults = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-16 overflow-hidden"
        style={{ backgroundColor: "#080a0e" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(37,99,255,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto w-full">
          <p
            className="font-semibold mb-4 uppercase"
            style={{ color: "#4f83ff", fontSize: 12, letterSpacing: "0.08em" }}
          >
            {en ? "Help center" : "Centre d'aide"}
          </p>
          <h1
            className="font-bold tracking-tight mb-4 leading-[1.1]"
            style={{ color: "#f0f4ff", fontSize: "clamp(30px, 4.5vw, 44px)" }}
          >
            {en ? "How can we help?" : "Comment pouvons-nous t'aider ?"}
          </h1>
          <p
            className="leading-relaxed mb-8"
            style={{ color: "rgba(240,244,255,0.55)", fontSize: 16 }}
          >
            {en
              ? "Find answers to the most common questions about MentorInvest, or reach out to us directly."
              : "Retrouve les réponses aux questions les plus fréquentes sur MentorInvest, ou contacte-nous directement."}
          </p>

          {/* Barre de recherche */}
          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: 18, color: "rgba(240,244,255,0.35)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={en ? "Search for a question…" : "Rechercher une question…"}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none"
              style={{
                background: "#0c1120",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#f0f4ff",
              }}
            />
          </div>

          <a
            href="mailto:contact@mentorinvest.fr"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
            style={{ background: "rgba(37,99,255,0.10)", border: "1px solid rgba(37,99,255,0.25)", color: "#4f83ff" }}
          >
            <Mail size={15} /> {en ? "Contact us" : "Nous contacter"}
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="px-6 pb-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-2xl mx-auto pt-16">
          {query.trim() && (
            <p className="text-sm mb-8" style={{ color: "rgba(240,244,255,0.4)" }}>
              {en
                ? `${totalResults} result${totalResults !== 1 ? "s" : ""} for “${query.trim()}”`
                : `${totalResults} résultat${totalResults !== 1 ? "s" : ""} pour « ${query.trim()} »`}
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: "rgba(240,244,255,0.5)", fontSize: 16 }}>
                {en ? "No results for this search." : "Aucun résultat pour cette recherche."}
              </p>
              <p className="mt-2 text-sm" style={{ color: "rgba(240,244,255,0.35)" }}>
                {en ? "Try another keyword, or " : "Essaie un autre mot-clé, ou "}
                <a
                  href="mailto:contact@mentorinvest.fr"
                  className="underline"
                  style={{ color: "#4f83ff" }}
                >
                  {en ? "contact us directly" : "contacte-nous directement"}
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-14">
              {filtered.map((cat) => (
                <div key={cat.title}>
                  <h2
                    className="font-semibold mb-2"
                    style={{ color: "#f0f4ff", fontSize: 20, letterSpacing: "-0.3px" }}
                  >
                    {cat.title}
                  </h2>
                  <div>
                    {cat.items.map((item) => (
                      <FaqAccordion key={item.q} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
