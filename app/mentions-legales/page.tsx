import type { Metadata } from "next";
import MentionsLegalesContent from "@/components/MentionsLegalesContent";

export const metadata: Metadata = {
  title: "Mentions légales — MentorInvest",
  description: "Mentions légales du site et de l'application MentorInvest : éditeur, hébergement, propriété intellectuelle et responsabilité.",
};

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />;
}
