import AgencyHeader from "./AgencyHeader";
import AgencyHero3PL from "./AgencyHero3PL";
import AgencyTrustBar from "./AgencyTrustBar";
import AgencyStats3PL from "./AgencyStats3PL";
import ThreePLPriceRunSection from "./ThreePLPriceRunSection";
import AgencyIntegrationsSection from "./AgencyIntegrationsSection";
import CampaignFAQSection from "./CampaignFAQSection";
import CampaignCTASection from "./CampaignCTASection";
import CampaignDecisionSection from "./CampaignDecisionSection";
import CampaignPlatformSection from "./CampaignPlatformSection";
import AgencyFooter from "./AgencyFooter";
import { useScrollToHashOnMount } from "../hooks/useScrollToHash";

export default function ThreePLPage() {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <AgencyHero3PL />
        <AgencyTrustBar />
        <AgencyStats3PL />
        <ThreePLPriceRunSection />
        <CampaignDecisionSection kind="3pl" />
        <CampaignPlatformSection kind="3pl" />
        <AgencyIntegrationsSection />
        <CampaignFAQSection kind="3pl" />
        <CampaignCTASection kind="3pl" />
      </main>
      <AgencyFooter />
    </div>
  );
}
