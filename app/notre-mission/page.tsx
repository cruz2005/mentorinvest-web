import type { Metadata } from "next";
import NotreMissionContent from "@/components/NotreMissionContent";

export const metadata: Metadata = {
  title: "Notre mission — MentorInvest",
  description:
    "Pourquoi MentorInvest existe : donner aux investisseurs particuliers les mêmes outils d'analyse que les professionnels.",
};

export default function NotreMissionPage() {
  return <NotreMissionContent />;
}
