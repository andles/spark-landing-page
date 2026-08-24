import AgencyHeader from "./AgencyHeader";
import AgencyHero3PL from "./AgencyHero3PL";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStats3PL from "./AgencyStats3PL";
import ThreePLPriceRunSection from "./ThreePLPriceRunSection";
import AgencyCoreCapabilities from "./AgencyCoreCapabilities";
import AgencyWhySpark from "./AgencyWhySpark";
import AgencyDeveloperSection from "./AgencyDeveloperSection";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import AgencyComparisonSection from "./AgencyComparisonSection";
import AgencyPricingSection from "./AgencyPricingSection";
import CampaignFAQSection from "./CampaignFAQSection";
import CampaignCTASection from "./CampaignCTASection";
import AgencyFooter from "./AgencyFooter";

export default function ThreePLPage() {
  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHero3PL />
        <AgencyTrustBar />
        <AgencyStats3PL />
        <ThreePLPriceRunSection />
        <AgencyCoreCapabilities />
        <AgencyWhySpark />
        <AgencyDeveloperSection />
        <AgencyIntegrationsSection />
        <AgencyComparisonSection />
        <AgencyPricingSection />
        <CampaignFAQSection kind="3pl" />
        <CampaignCTASection kind="3pl" />
      </main>
      <AgencyFooter />
    </div>
  );
}
