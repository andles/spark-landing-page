// REDUCE STOCKOUTS & OVERSTOCK campaign landing page (Google Ads message-match).
// Identical to AgencyPage.tsx except it swaps in the stockouts hero + stats
// components. Everything else, including sections, CTAs, and footer, is unchanged.
import AgencyHeader from "./AgencyHeader";
import AgencyHeroStockouts from "./AgencyHeroStockouts";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStatsStockouts from "./AgencyStatsStockouts";
import CampaignWorkflowSection from "./CampaignWorkflowSection";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import CampaignFAQSection from "./CampaignFAQSection";
import CampaignCTASection from "./CampaignCTASection";
import CampaignDecisionSection from "./CampaignDecisionSection";
import CampaignPlatformSection from "./CampaignPlatformSection";
import AgencyFooter from "./AgencyFooter";
import { useScrollToHashOnMount } from "../hooks/useScrollToHash";

export default function StockoutsPage() {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHeroStockouts />
        <AgencyTrustBar />
        <AgencyStatsStockouts />
        <CampaignWorkflowSection kind="stockouts" />
        <CampaignDecisionSection kind="stockouts" />
        <CampaignPlatformSection kind="stockouts" />
        <AgencyIntegrationsSection />
        <CampaignFAQSection kind="stockouts" />
        <CampaignCTASection kind="stockouts" />
      </main>
      <AgencyFooter />
    </div>
  );
}
