import AgencyHeader from "./AgencyHeader";
import AgencyHero from "./AgencyHero";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStats from "./AgencyStats";
import AgencyCoreCapabilities from "./AgencyCoreCapabilities";
import AgencyWhySpark from "./AgencyWhySpark";
import AgencyDeveloperSection from "./AgencyDeveloperSection";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import AgencyComparisonSection from "./AgencyComparisonSection";
import AgencyPricingSection from "./AgencyPricingSection";
import AgencyCTASection from "./AgencyCTASection";
import AgencyFooter from "./AgencyFooter";
import { useScrollToHashOnMount } from "../hooks/useScrollToHash";

export default function AgencyPage() {
  // Header + footer link to #solutions / #core-capabilities / #integrations /
  // #pricing / #book-demo; make those land correctly on a fresh load too.
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHero />
        <AgencyTrustBar />
        <AgencyStats />
        <AgencyCoreCapabilities />
        <AgencyWhySpark />
        <AgencyDeveloperSection />
        <AgencyIntegrationsSection />
        <AgencyComparisonSection />
        <AgencyPricingSection />
        <AgencyCTASection />
      </main>
      <AgencyFooter />
    </div>
  );
}
