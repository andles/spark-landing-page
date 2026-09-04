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
import { fishbowlVideo } from "./fishbowl/fishbowlVideo";
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
            mp4Src={fishbowlVideo.mp4Src}
            posterSrc={fishbowlVideo.posterSrc}
            captionsSrc={fishbowlVideo.captionsSrc}
            videoLabel={fishbowlVideo.name}
          />
          <details className="mt-4 rounded-xl border border-white/[0.08] px-5 text-[#b8bfcc]">
            <summary className="cursor-pointer py-3 text-sm font-medium text-cyan-200">
              Read the video transcript
            </summary>
            <div className="space-y-3 pb-5 text-base leading-relaxed">
              {fishbowlVideo.transcript.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </details>
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
