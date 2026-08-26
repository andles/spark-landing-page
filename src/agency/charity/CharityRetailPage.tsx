// CHARITY RETAIL solutions landing page (/charity-retail). Follows the
// structure of ThreePLPage/PickupPage but with charity-specific sections:
// British English and £ throughout, demo-led CTAs only (no Start Free, since
// this solution sells through a pilot conversation, not self-serve signup),
// and no trust bar (the pilot runs standalone, so the integrations marquee
// would send the wrong message).
import AgencyHeader from "../AgencyHeader";
import AgencyFooter from "../AgencyFooter";
import CharityHero from "./CharityHero";
import CharityProblemSection from "./CharityProblemSection";
import CharityEconomicsSection from "./CharityEconomicsSection";
import CharityCapabilitiesSection from "./CharityCapabilitiesSection";
import CharityPilotSection from "./CharityPilotSection";
import CharityFAQSection from "./CharityFAQSection";
import CharityCTASection from "./CharityCTASection";
import { useScrollToHashOnMount } from "../../hooks/useScrollToHash";

export default function CharityRetailPage() {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader cta="demo" />
      <main>
        <CharityHero />
        <CharityProblemSection />
        <CharityEconomicsSection />
        <CharityCapabilitiesSection />
        <CharityPilotSection />
        <CharityFAQSection />
        <CharityCTASection />
      </main>
      <AgencyFooter />
    </div>
  );
}
