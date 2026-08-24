// IN-STORE PICKUP campaign landing page (Google Ads message-match variant).
// Identical to AgencyPage.tsx except it swaps in the pickup hero + stats
// components. Everything else — sections, CTAs, footer — is unchanged.
import AgencyHeader from "./AgencyHeader";
import AgencyHeroPickup from "./AgencyHeroPickup";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStatsPickup from "./AgencyStatsPickup";
import CampaignWorkflowSection from "./CampaignWorkflowSection";
import AgencyCoreCapabilities from "./AgencyCoreCapabilities";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import AgencyPricingSection from "./AgencyPricingSection";
import CampaignFAQSection from "./CampaignFAQSection";
import CampaignCTASection from "./CampaignCTASection";
import CampaignDecisionSection from "./CampaignDecisionSection";
import AgencyFooter from "./AgencyFooter";
import { useScrollToHashOnMount } from "../hooks/useScrollToHash";

export default function PickupPage() {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHeroPickup />
        <AgencyTrustBar />
        <AgencyStatsPickup />
        <CampaignWorkflowSection kind="pickup" />
        <CampaignDecisionSection kind="pickup" />
        <AgencyCoreCapabilities />
        <AgencyIntegrationsSection />
        <AgencyPricingSection />
        <CampaignFAQSection kind="pickup" />
        <CampaignCTASection kind="pickup" />
      </main>
      <AgencyFooter />
    </div>
  );
}
