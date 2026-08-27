"use client";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3s-1.88.09-3.25-1.48z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/mentorinvest_off", icon: InstagramIcon },
  { label: "TikTok",     href: "https://www.tiktok.com/@mentorinvest_off",  icon: TikTokIcon },
  { label: "X (Twitter)", href: "https://x.com/MentorInvestoff", icon: X },
];

// Hrefs are language-independent, so they live in code and are matched by
// index with the translated column/link labels from messages/*.json.
const columnHrefs = [
  ["/#features", "/#screenshots", "/#pricing", "/guide"],
  ["/centre-aide", "mailto:contact@mentorinvest.fr", "/guide"],
  ["/about", "/notre-mission", "/mentions-legales"],
  ["/politique-confidentialite", "/conditions-generales", "/mentions-legales"],
];

interface FooterLinkContent {
  label: string;
}

interface FooterColumnContent {
  title: string;
  links: FooterLinkContent[];
}

function FooterColumn({ title, links, hrefs }: { title: string; links: FooterLinkContent[]; hrefs: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((l, i) => (
          <li key={l.label}>
            <a
              href={hrefs[i]}
              className="text-[#787B86] text-sm hover:text-white transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const columns = t.raw("columns") as FooterColumnContent[];

  return (
    <footer className="bg-[#0B0E15] border-t border-[#2A2E39] px-6 pt-14 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-8 pb-10 border-b border-[#2A2E39]/60">
        {/* Logo + copyright */}
        <div className="flex flex-col gap-4 lg:w-64 flex-shrink-0">
          <img src="/logo.png" alt="MentorInvest" style={{ height: "32px", width: "32px", borderRadius: "8px" }} />
          <p className="text-[#787B86] text-xs leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        {/* 4 colonnes de liens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          {columns.map((c, i) => (
            <FooterColumn key={c.title} title={c.title} links={c.links} hrefs={columnHrefs[i]} />
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="max-w-6xl mx-auto text-[#787B86] text-xs text-center pt-6 mb-6">
        {t("copyright")}
      </p>

      {/* Réseaux sociaux */}
      <div className="max-w-6xl mx-auto flex justify-center gap-5 mb-6">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-white opacity-60 hover:opacity-100 hover:text-[#2563ff] transition-all duration-200"
          >
            <s.icon size={20} />
          </a>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto border-t border-[#2A2E39]/60 pt-5">
        <p className="text-[#787B86] text-[11px] text-center leading-relaxed">
          {t("disclaimer")}
        </p>
      </div>
    </footer>
  );
}
