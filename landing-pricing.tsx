"use client";

import { useState } from "react";
import Link from "next/link";
import { landingConfig } from "@/lib/landing-config";

export function LandingPricing() {
  const [annual, setAnnual] = useState(false);
  const { plans, taxLabel, availability, trialDays, annualDiscountLabel } = landingConfig.pricing;
  const cur = landingConfig.currencySymbol;
  return <div>
    <div className="text-center">
      <span className="landing-eyebrow">05 / TARIFS</span>
      <h2 className="landing-title mt-5">SIMPLE DÈS LE <span className="text-[#FF8A3D]">DÉPART.</span></h2>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/65">Essayez {trialDays} jours gratuitement, sans carte bancaire. Sans engagement, résiliable en un clic. Tarifs indicatifs, confirmés avant toute souscription.</p>
      <div className="mt-8 inline-flex rounded-full border-2 border-[#181818] bg-white p-1" role="group" aria-label="Période de facturation">
        <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${!annual ? "bg-[#181818] text-white" : "text-[#181818]"}`}>Mensuel</button>
        <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${annual ? "bg-[#181818] text-white" : "text-[#181818]"}`}>Annuel · {annualDiscountLabel}</button>
      </div>
    </div>
    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      {plans.map(plan => {
        const price = annual ? plan.annualPerMonth : plan.monthly;
        return <div key={plan.id} className={`relative flex flex-col rounded-[1.5rem] border-2 border-[#181818] bg-white p-7 sm:p-8 ${plan.highlight ? "shadow-[10px_10px_0_#7C5CFF]" : ""}`}>
          {plan.highlight && <span className="absolute -top-3 left-7 rounded-full bg-[#FFD23F] px-3 py-1 text-xs font-bold text-[#181818]">Le plus choisi</span>}
          <h3 className="font-display text-2xl">{plan.name}</h3>
          <p className="mt-1 text-sm text-black/55">{plan.tagline}</p>
          <div className="mt-6 flex items-baseline gap-2" aria-live="polite"><strong className="font-display text-5xl leading-none">{price} {cur}</strong><span className="text-sm text-black/60">{taxLabel} / mois</span></div>
          <p className="mt-2 text-xs text-black/50">{annual ? `Soit ${plan.annualPerMonth * 12} ${cur} ${taxLabel} facturés à l’année.` : "Facturation mensuelle, sans engagement."}</p>
          <ul className="my-6 flex-1 space-y-3 text-sm font-medium">{plan.features.map(item => <li key={item} className="flex gap-3"><span className="font-bold text-[#7C5CFF]">✓</span>{item}</li>)}</ul>
          <Link href="/business/login" className="landing-solid-link inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#181818] px-7 text-center text-sm font-bold text-white transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A3D]">Essayer {trialDays} jours <span className="ml-3" aria-hidden>↗</span></Link>
        </div>;
      })}
    </div>
    <p className="mt-8 text-center text-xs leading-relaxed text-black/50">{availability}</p>
  </div>;
}
