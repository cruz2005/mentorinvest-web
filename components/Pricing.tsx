"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const planMeta = [
  { price: "0", color: "#787B86", popular: false },
  { price: "19.99", color: "#2962FF", popular: true },
  { price: "29.99", color: "#9B59B6", popular: false },
];

interface PlanContent {
  name: string;
  desc: string;
  features: string[];
  cta: string;
}

interface AnnualContent {
  name: string;
  monthlyEquivalent: string;
  yearlyNote: string;
  savingsBadge: string;
  commitment: string;
}

type Plan = PlanContent & (typeof planMeta)[number];

type Billing = "monthly" | "annual";

export default function Pricing() {
  const t = useTranslations("pricing");
  const planItems = t.raw("plans") as PlanContent[];
  const plans: Plan[] = planItems.map((item, i) => ({ ...item, ...planMeta[i] }));
  const annual = t.raw("annual") as AnnualContent;

  const [billing, setBilling] = useState<Billing>("monthly");

  const freePlan = plans[0];
  const proPlan = plans[2];

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2962FF]/30 bg-[#2962FF]/10 text-[#2962FF] text-xs font-semibold mb-4">
            {t("badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("titleWhite")} <span className="gradient-text-blue">{t("titleGradient")}</span>
          </h2>
          <p className="text-[#787B86] text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Toggle Mensuel / Annuel */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <div className="inline-flex items-center gap-1 p-1 rounded-full" style={{ background: "#1E222D" }}>
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                billing === "monthly"
                  ? { background: "#2962FF", color: "#fff" }
                  : { background: "transparent", color: "#787B86" }
              }
            >
              {t("toggleMonthly")}
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all inline-flex items-center gap-2"
              style={
                billing === "annual"
                  ? { background: "#2962FF", color: "#fff" }
                  : { background: "transparent", color: "#787B86" }
              }
            >
              {t("toggleAnnual")}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={
                  billing === "annual"
                    ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                    : { background: "rgba(8,153,129,0.15)", color: "#089981" }
                }
              >
                {t("annualDiscountTag")}
              </span>
            </button>
          </div>
          {billing === "monthly" && (
            <p className="text-[#787B86] text-xs">{t("noCommitment")}</p>
          )}
        </div>

        {billing === "monthly" ? (
          /* ── Cards mensuelles (3 plans) ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col h-full ${
                  plan.popular ? "bg-[#131722]" : "card-glass"
                }`}
                style={
                  plan.popular
                    ? { border: "1px solid rgba(41,98,255,0.5)", boxShadow: "0 0 40px rgba(41,98,255,0.15)" }
                    : {}
                }
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#2962FF] text-white text-xs font-bold whitespace-nowrap">
                    {t("mostPopular")}
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-sm font-bold" style={{ color: plan.color }}>
                    {plan.name}
                  </span>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                      <span className="text-base text-[#787B86]">€</span>
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-[#787B86] text-sm mb-1">{t("perMonth")}</span>
                    )}
                  </div>
                  <p className="text-[#787B86] text-sm mt-2">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#D1D4DC]">
                      <Check
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: plan.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#waitlist"
                  className="block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all mt-auto"
                  style={
                    plan.popular
                      ? { background: plan.color, color: "#fff", boxShadow: `0 0 20px ${plan.color}40` }
                      : { background: "transparent", border: `1px solid ${plan.color}40`, color: plan.color }
                  }
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        ) : (
          /* ── Cards annuelles (Free + Pro Annuel) ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free — identique */}
            <div className="relative rounded-2xl p-6 transition-all duration-300 flex flex-col h-full card-glass">
              <div className="mb-6">
                <span className="text-sm font-bold" style={{ color: freePlan.color }}>
                  {freePlan.name}
                </span>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-4xl font-bold text-white">
                    0<span className="text-base text-[#787B86]">€</span>
                  </span>
                </div>
                <p className="text-[#787B86] text-sm mt-2">{freePlan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {freePlan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-[#D1D4DC]">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: freePlan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className="block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all mt-auto"
                style={{ background: "transparent", border: `1px solid ${freePlan.color}40`, color: freePlan.color }}
              >
                {freePlan.cta}
              </a>
            </div>

            {/* Pro Annuel — mis en avant */}
            <div
              className="relative rounded-2xl p-6 transition-all duration-300 flex flex-col h-full bg-[#131722]"
              style={{ border: "1px solid rgba(8,153,129,0.5)", boxShadow: "0 0 40px rgba(8,153,129,0.15)" }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#089981] text-white text-xs font-bold whitespace-nowrap">
                {annual.savingsBadge}
              </div>

              <div className="mb-6">
                <span className="text-sm font-bold" style={{ color: proPlan.color }}>
                  {annual.name}
                </span>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-4xl font-bold text-white">
                    {annual.monthlyEquivalent}
                    <span className="text-base text-[#787B86]">€</span>
                  </span>
                  <span className="text-[#787B86] text-sm mb-1">{t("perMonth")}</span>
                </div>
                <p className="text-[#787B86] text-xs mt-1">{annual.yearlyNote}</p>
                <span
                  className="inline-block text-xs font-semibold px-2 py-1 rounded-md mt-3"
                  style={{ background: `${proPlan.color}20`, color: proPlan.color }}
                >
                  {annual.commitment}
                </span>
                <p className="text-[#787B86] text-sm mt-3">{proPlan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {proPlan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-[#D1D4DC]">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: proPlan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className="block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all mt-auto"
                style={{ background: "#089981", color: "#fff", boxShadow: "0 0 20px rgba(8,153,129,0.4)" }}
              >
                {proPlan.cta}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
