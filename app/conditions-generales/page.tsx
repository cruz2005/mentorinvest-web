import type { Metadata } from "next";
import ConditionsGeneralesContent from "@/components/ConditionsGeneralesContent";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — MentorInvest",
  description: "Conditions générales d'utilisation du service MentorInvest : inscription, abonnements, responsabilité et droit applicable.",
};

export default function ConditionsGeneralesPage() {
  return <ConditionsGeneralesContent />;
}
