import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "MentorInvest — Outil d'analyse de marché",
  description:
    "Analysez les marchés, obtenez des analyses avec votre Mentor et prenez de meilleures décisions avec MentorInvest.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "MentorInvest",
    description: "L'outil d'analyse de marché pour traders sérieux.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geist.variable} ${syne.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
