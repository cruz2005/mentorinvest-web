import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpCenter from "@/components/HelpCenter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centre d'aide — MentorInvest",
  description: "Questions fréquentes sur MentorInvest : premiers pas, fonctionnalités, abonnements, problèmes techniques et confidentialité.",
};

export default function CentreAidePage() {
  return (
    <main style={{ backgroundColor: "#080a0e", minHeight: "100vh" }}>
      <Navbar />
      <HelpCenter />
      <Footer />
    </main>
  );
}
