import AgencyHeader from "./AgencyHeader";
import AgencyHero3PL from "./AgencyHero3PL";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStats3PL from "./AgencyStats3PL";
import AgencyCoreCapabilities from "./AgencyCoreCapabilities";
import AgencyWhySpark from "./AgencyWhySpark";
import AgencyDeveloperSection from "./AgencyDeveloperSection";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import AgencyComparisonSection from "./AgencyComparisonSection";
import AgencyPricingSection from "./AgencyPricingSection";
import AgencyCTASection from "./AgencyCTASection";
import AgencyFooter from "./AgencyFooter";

export default function ThreePLPage() {
  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHero3PL />
        <AgencyTrustBar />
        <AgencyStats3PL />
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
