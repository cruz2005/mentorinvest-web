"use client";
import { useState } from "react";
import { ArrowRight, Check, Apple, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SHOW_WAITLIST, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/config";

export default function CTA() {
  const t = useTranslations("cta");
  const tc = useTranslations("common");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#131722]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2962FF]/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {t("titleWhite")}{" "}
          <span className="gradient-text-blue">{t("titleGradient")}</span>
        </h2>

        <p className="text-[#787B86] text-lg mb-10">
          {t("description")}
        </p>

        {!SHOW_WAITLIST ? (
          <>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex px-6 py-4 rounded-xl bg-[#2962FF] hover:bg-[#1a4fd6] text-white font-semibold text-sm transition-all items-center justify-center gap-2 glow-blue whitespace-nowrap"
              >
                <Apple size={18} /> {tc("appStore")}
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex px-6 py-4 rounded-xl bg-[#0B0E15] border border-[#2A2E39] hover:border-[#2962FF] text-white font-semibold text-sm transition-all items-center justify-center gap-2 whitespace-nowrap"
              >
                <PlayCircle size={18} /> {tc("googlePlay")}
              </a>
            </div>
            <p className="text-[#787B86] text-xs mt-4">
              {tc("availableNow")}
            </p>
          </>
        ) : submitted ? (
          <div className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-[#089981]/10 border border-[#089981]/30 text-[#089981] font-semibold text-lg">
            <Check size={22} />
            {tc("joinedWaitlist")}
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder={tc("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-xl bg-[#0B0E15] border border-[#2A2E39] text-white placeholder-[#787B86] text-sm focus:outline-none focus:border-[#2962FF] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-xl bg-[#2962FF] hover:bg-[#1a4fd6] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 glow-blue whitespace-nowrap"
              >
                {t("joinButton")} <ArrowRight size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
