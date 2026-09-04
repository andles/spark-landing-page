// ─────────────────────────────────────────────────────────────────────────────
// FISHBOWL ALTERNATIVE campaign landing page (/fishbowl-alternative).
// Destination for Google Ads traffic from "fishbowl alternative", "fishbowl
// custom reports", "fishbowl shopify integration", etc. Deliberately half
// the section count of AgencyPage: every section answers a Fishbowl-specific
// complaint. Sections live in ./fishbowl/; CTA links + source tagging in
// ./fishbowl/links.ts.
//
// Sitelink anchors (Google Ads sitelink assets deep-link into the page):
//   #migrate  FishbowlMigration      #reports / #sync  FishbowlComparison
//   #book     FishbowlCTA
// ─────────────────────────────────────────────────────────────────────────────
import { useScrollToHashOnMount } from "../hooks/useScrollToHash";
import FishbowlHeader from "./fishbowl/FishbowlHeader";
import FishbowlHero from "./fishbowl/FishbowlHero";
import FishbowlBooking from "./fishbowl/FishbowlBooking";
import FishbowlOffer from "./fishbowl/FishbowlOffer";
import CampaignWorkflowSection from "./CampaignWorkflowSection";
import FishbowlMigration from "./fishbowl/FishbowlMigration";
import FishbowlComparison from "./fishbowl/FishbowlComparison";
import FishbowlTrust from "./fishbowl/FishbowlTrust";
import CampaignFAQSection from "./CampaignFAQSection";
import FishbowlCTA from "./fishbowl/FishbowlCTA";
import AgencyFooter from "./AgencyFooter";

export default function FishbowlPage() {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <FishbowlHeader />
      <main>
        <FishbowlHero />
        <FishbowlBooking />
        <FishbowlOffer />
        <CampaignWorkflowSection kind="fishbowl" />
        <FishbowlMigration />
        <FishbowlComparison />
        <FishbowlTrust />
        <CampaignFAQSection kind="fishbowl" />
        <FishbowlCTA />
      </main>
      <AgencyFooter />
    </div>
  );
}
