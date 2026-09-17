import AgencyHeader from "./AgencyHeader";
import AgencyHero from "./AgencyHero";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStats from "./AgencyStats";
import AgentOnboardingSection from "./AgentOnboardingSection";
import AgencyCoreCapabilities from "./AgencyCoreCapabilities";
import AgencyWhySpark from "./AgencyWhySpark";
import AgencyDeveloperSection from "./AgencyDeveloperSection";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import AgencyComparisonSection from "./AgencyComparisonSection";
import AgencyPricingSection from "./AgencyPricingSection";
import AgencyFAQ from "./AgencyFAQ";
import AgencyCTASection from "./AgencyCTASection";
import AgencyFooter from "./AgencyFooter";
import { useScrollToHashOnMount } from "../hooks/useScrollToHash";
import MobileHeroShowcase from "./MobileHeroShowcase";
import HeroVideoShowcase from "./HeroVideoShowcase";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AgencyPage() {
  // Header + footer link to #solutions / #core-capabilities / #integrations /
  // #pricing / #book-demo; make those land correctly on a fresh load too.
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHero />
        <section aria-label="Spark product experience" className="bg-[#06080d] px-6 pb-14 lg:pb-20">
          <div className="mx-auto max-w-[1100px]">
            <MobileHeroShowcase />
            <HeroVideoShowcase />
            <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">3 minute product walkthrough</p>
                <h2 className="mt-2 text-xl font-semibold text-white">See a reorder decision from demand signal to reviewed draft PO</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8b95a8]">Real product screens, clearly labeled example data, and the full planning context behind the action.</p>
              </div>
              <Link to="/inventory-reorder-walkthrough" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-200">Watch the walkthrough <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
        <AgencyTrustBar />
        <AgencyStats />
        <AgentOnboardingSection />
        <AgencyCoreCapabilities />
        <AgencyWhySpark />
        <AgencyDeveloperSection />
        <AgencyIntegrationsSection />
        <AgencyComparisonSection />
        <AgencyPricingSection />
        <AgencyFAQ />
        <AgencyCTASection />
      </main>
      <AgencyFooter />
    </div>
  );
}
