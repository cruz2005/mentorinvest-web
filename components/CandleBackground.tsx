"use client";
import { useMemo } from "react";

const H        = 560;   // hauteur SVG (dépasse légèrement pour couvrir)
const CANDLE_W = 5;
const GAP      = 10;
const SLOT     = CANDLE_W + GAP;
const COUNT    = 80;
const STRIP_W  = COUNT * SLOT;

// Hash déterministe — SSR safe
function p(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Math.sin diverge de ~1 ULP entre le V8 de Node (SSR) et celui du navigateur,
// ce qui casse l'hydratation sur ces attributs SVG — on arrondit pour absorber l'écart.
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export default function CandleBackground() {
  const candles = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => {
      const bullish = p(i * 5)          > 0.45;
      const bodyH   = 10 + p(i * 5 + 1) * 55;
      const wickTop = 4  + p(i * 5 + 2) * 18;
      const wickBot = 4  + p(i * 5 + 3) * 14;
      // cy centré au milieu du conteneur, variation ±40px pour un aspect naturel
      const cy      = H / 2 + (p(i * 5 + 4) - 0.5) * 80;
      const color   = bullish ? "#2563ff" : "#ef4444";
      return {
        color,
        x:        i * SLOT,
        bodyY:    round2(cy - bodyH / 2),
        bodyH:    round2(bodyH),
        wickTopY: round2(cy - bodyH / 2 - wickTop),
        wickBotY: round2(cy + bodyH / 2 + wickBot),
      };
    }),
  []);

  return (
    <>
      <style>{`
        @keyframes candleScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${STRIP_W}px); }
        }
        @media (max-width: 768px) {
          .candle-bg { opacity: 0.07 !important; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="candle-bg"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0.12,
          filter: "blur(0.6px)",
          zIndex: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            width: STRIP_W * 2,
            height: "100%",
            animation: "candleScroll 26s linear infinite",
          }}
        >
          {[0, 1].map((pass) => (
            <svg
              key={pass}
              width={STRIP_W}
              height={H}
              style={{ flexShrink: 0, alignSelf: "center", overflow: "hidden" }}
            >
              {candles.map((c, i) => (
                <g key={i}>
                  <line
                    x1={c.x + CANDLE_W / 2} y1={c.wickTopY}
                    x2={c.x + CANDLE_W / 2} y2={c.wickBotY}
                    stroke={c.color}
                    strokeWidth={1}
                  />
                  <rect
                    x={c.x} y={c.bodyY}
                    width={CANDLE_W} height={c.bodyH}
                    fill={c.color}
                    rx={1}
                  />
                </g>
              ))}
            </svg>
          ))}
        </div>
      </div>
    </>
  );
}
