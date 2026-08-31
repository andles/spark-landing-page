// ─────────────────────────────────────────────────────────────────────────────
// Prospect data for /r/<slug> stock signals reports.
//
// One entry per prospect. To publish a new report, add an object here; the
// route and component are already wired. Slugs are deliberately suffixed with
// a random token so pages can't be guessed. Every number in an entry is a
// measured fact from the prospect's public storefront: render them exactly,
// never recompute or restyle them into different values.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProspectLaunches {
  /** Products launched in the last 90 days */
  n: number;
  /** Of those, products with at least one sold-out variant */
  withSoldOut: number;
  /** Total variants across those launches */
  variants: number;
  /** Of those variants, how many are unavailable */
  oosVariants: number;
  /** Launches already carrying a markdown */
  withMarkdown: number;
}

export interface ProspectReport {
  slug: string;
  company: string;
  domain: string;
  /** ISO date of the catalog read, e.g. "2026-07-29" */
  crawled: string;
  /** Products listed */
  sku: number;
  /** Variants listed */
  variants: number;
  oosVariants: number;
  /** Share of variants unavailable, 0..1 */
  oosRate: number;
  mdVariants: number;
  /** Share of variants marked down, 0..1 (also drives the overbuy estimate) */
  mdRate: number;
  fullyInStock: number;
  partiallyOut: number;
  dead: number;
  launches: ProspectLaunches;
}

export const PROSPECTS: Record<string, ProspectReport> = {
  "drakewaterfowl-k7q2": {
    slug: "drakewaterfowl-k7q2",
    company: "Drake Waterfowl",
    domain: "drakewaterfowl.com",
    crawled: "2026-07-29",
    sku: 1039,
    variants: 13265,
    oosVariants: 5228,
    oosRate: 0.394,
    mdVariants: 8352,
    mdRate: 0.63,
    fullyInStock: 422,
    partiallyOut: 617,
    dead: 0,
    launches: { n: 60, withSoldOut: 15, variants: 704, oosVariants: 36, withMarkdown: 5 },
  },
};

// Internal alias: same Drake Waterfowl report under a long unguessable slug,
// used as the team-facing example link. The original slug stays valid in case
// it was already shared externally.
PROSPECTS["dw-example-5fje3v79r12qdi"] = PROSPECTS["drakewaterfowl-k7q2"];
