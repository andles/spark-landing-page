// IN-STORE PICKUP campaign landing page (Google Ads message-match variant).
// This route intentionally stays focused on the BOPIS promise, store workflow,
// and handoff instead of repeating the broader homepage narrative.
import AgencyHeader from "./AgencyHeader";
import AgencyHeroPickup from "./AgencyHeroPickup";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStatsPickup from "./AgencyStatsPickup";
import CampaignWorkflowSection from "./CampaignWorkflowSection";
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
        <CampaignFAQSection kind="pickup" />
        <CampaignCTASection kind="pickup" />
      </main>
      <AgencyFooter />
    </div>
  );
}
