import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "À propos — MentorInvest",
  description:
    "MentorInvest rend l'analyse de marché accessible à tous les investisseurs particuliers.",
};

export default function AboutPage() {
  return <AboutContent />;
}
