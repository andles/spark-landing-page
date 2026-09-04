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
// Booking CTAs open Calendly in a modal and preserve campaign attribution.
// ─────────────────────────────────────────────────────────────────────────────
import { useScrollToHashOnMount } from "../hooks/useScrollToHash";
import FishbowlHeader from "./fishbowl/FishbowlHeader";
import FishbowlHero from "./fishbowl/FishbowlHero";
import MarketingVideo from "./MarketingVideo";
import FishbowlOffer from "./fishbowl/FishbowlOffer";
import CampaignWorkflowSection from "./CampaignWorkflowSection";
import FishbowlMigration from "./fishbowl/FishbowlMigration";
import FishbowlComparison from "./fishbowl/FishbowlComparison";
import FishbowlTrust from "./fishbowl/FishbowlTrust";
import CampaignFAQSection from "./CampaignFAQSection";
import FishbowlCTA from "./fishbowl/FishbowlCTA";
import AgencyFooter from "./AgencyFooter";
import { useFishbowlBookingTracking } from "./fishbowl/useFishbowlBookingTracking";

export default function FishbowlPage() {
  useScrollToHashOnMount();
  useFishbowlBookingTracking();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <FishbowlHeader />
      <main>
        <FishbowlHero />
        <div className="mx-auto w-full max-w-[1180px] px-5 pb-4 sm:px-6 md:px-8 lg:px-12">
          <MarketingVideo
            mp4Src="/media/fishbowl-bridge.mp4"
            posterSrc="/media/fishbowl-bridge-poster.jpg"
            captionsSrc="/media/fishbowl-bridge-captions.vtt"
            videoLabel="Spark for Fishbowl teams: product overview"
          />
        </div>
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
