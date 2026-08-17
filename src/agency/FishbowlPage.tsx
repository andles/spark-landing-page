// ─────────────────────────────────────────────────────────────────────────────
// FISHBOWL ALTERNATIVE campaign landing page (/fishbowl-alternative).
// Destination for Google Ads traffic from "fishbowl alternative", "fishbowl
// custom reports", "fishbowl shopify integration", etc. Deliberately half
// the section count of AgencyPage: every section answers a Fishbowl-specific
// complaint. Sections live in ./fishbowl/; CTA links + source tagging in
// ./fishbowl/links.ts.
// ─────────────────────────────────────────────────────────────────────────────
import FishbowlHeader from "./fishbowl/FishbowlHeader";
import FishbowlHero from "./fishbowl/FishbowlHero";
import FishbowlMigration from "./fishbowl/FishbowlMigration";
import FishbowlComparison from "./fishbowl/FishbowlComparison";
import FishbowlTrust from "./fishbowl/FishbowlTrust";
import FishbowlCTA from "./fishbowl/FishbowlCTA";
import AgencyFooter from "./AgencyFooter";

export default function FishbowlPage() {
  return (
    <div className="min-h-screen bg-[#06080d]">
      <FishbowlHeader />
      <main>
        <FishbowlHero />
        <FishbowlMigration />
        <FishbowlComparison />
        <FishbowlTrust />
        <FishbowlCTA />
      </main>
      <AgencyFooter />
    </div>
  );
}
