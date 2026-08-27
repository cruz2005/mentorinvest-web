"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const KEY = "mi_intro_done";
const DURATION = 1.5; // secondes

export default function IntroAnimation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(KEY);
    // setTimeout évite un setState synchrone dans l'effet (règle React Compiler)
    const show = setTimeout(() => {
      // Masque le cache statique SSR (layout.tsx) uniquement quand l'intro démarre
      // (ou immédiatement si l'intro ne doit pas rejouer cette session).
      // On le cache (display:none) plutôt que de le retirer du DOM (.remove()) :
      // ce noeud est géré par React (RootLayout), le retirer nous-mêmes désynchronise
      // le virtual DOM et fait planter React (NotFoundError) au prochain re-render.
      const overlay = document.getElementById("intro-overlay");
      if (overlay) overlay.style.display = "none";
      if (!alreadyShown) setVisible(true);
    }, 0);
    return () => clearTimeout(show);
  }, []);

  function finish() {
    sessionStorage.setItem(KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.img
        src="/logo.png"
        alt="MentorInvest"
        style={{ width: 120, height: 120, objectFit: "contain" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: DURATION, times: [0, 0.5, 1], ease: "easeInOut" }}
        onAnimationComplete={finish}
      />
    </div>
  );
}
