import type { Metadata } from "next";
import PolitiqueConfidentialiteContent from "@/components/PolitiqueConfidentialiteContent";

export const metadata: Metadata = {
  title: "Politique de confidentialité — MentorInvest",
  description: "Comment MentorInvest collecte, utilise et protège tes données personnelles, conformément au RGPD.",
};

export default function PolitiqueConfidentialitePage() {
  return <PolitiqueConfidentialiteContent />;
}
