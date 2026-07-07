// REDUCE STOCKOUTS & OVERSTOCK campaign landing page (Google Ads message-match).
// Identical to AgencyPage.tsx except it swaps in the stockouts hero + stats
// components. Everything else — sections, CTAs, footer — is unchanged.
import AgencyHeader from "./AgencyHeader";
import AgencyHeroStockouts from "./AgencyHeroStockouts";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStatsStockouts from "./AgencyStatsStockouts";
import AgencyCoreCapabilities from "./AgencyCoreCapabilities";
import AgencyWhySpark from "./AgencyWhySpark";
import AgencyDeveloperSection from "./AgencyDeveloperSection";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import AgencyComparisonSection from "./AgencyComparisonSection";
import AgencyPricingSection from "./AgencyPricingSection";
import AgencyCTASection from "./AgencyCTASection";
import AgencyFooter from "./AgencyFooter";

export default function StockoutsPage() {
  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHeroStockouts />
        <AgencyTrustBar />
        <AgencyStatsStockouts />
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
