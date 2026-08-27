"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface Props {
  children: React.ReactNode;
  /** Si true : clic = preventDefault + toast, sinon tooltip uniquement */
  showToast?: boolean;
}

export function ComingSoonTooltip({ children, showToast = false }: Props) {
  const t = useTranslations("common");
  const [hovered, setHovered] = useState(false);
  const [toast,   setToast]   = useState(false);

  function handleClick(e: React.MouseEvent) {
    if (!showToast) return;
    e.preventDefault();
    e.stopPropagation();
    if (toast) return;
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  return (
    <>
      <span
        style={{ position: "relative", display: "inline-flex" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {children}

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: 4,  x: "-50%" }}
              animate={{ opacity: 1, y: 0,  x: "-50%" }}
              exit={{    opacity: 0, y: 4,  x: "-50%" }}
              transition={{ duration: 0.18 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 9px)",
                left: "50%",
                background: "#111620",
                color: "#f0f4ff",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 6,
                padding: "5px 10px",
                fontSize: 11.5,
                fontWeight: 500,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 1000,
                lineHeight: 1.4,
              }}
            >
              {t("comingSoon")}
              {/* Flèche — bordure */}
              <span style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0, height: 0,
                borderLeft:  "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop:   "5px solid rgba(255,255,255,0.07)",
              }} />
              {/* Flèche — remplissage */}
              <span style={{
                position: "absolute",
                top: "calc(100% - 1px)",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0, height: 0,
                borderLeft:  "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop:   "4px solid #111620",
              }} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      {/* Toast centré en bas d'écran */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 14, x: "-50%" }}
            animate={{ opacity: 1, y: 0,  x: "-50%" }}
            exit={{    opacity: 0, y: 14, x: "-50%" }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed",
              bottom: 28,
              left: "50%",
              background: "#111620",
              color: "#f0f4ff",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 12,
              padding: "12px 22px",
              fontSize: 13.5,
              fontWeight: 500,
              whiteSpace: "nowrap",
              zIndex: 9998,
              boxShadow: "0 8px 32px rgba(0,0,0,0.50)",
              pointerEvents: "none",
            }}
          >
            {t("comingSoonStores")}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
