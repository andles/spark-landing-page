// ─────────────────────────────────────────────────────────────────────────────
// Shortlists for the plural "X alternatives" searches. Search Console shows the
// Zoho Inventory, inFlow, and Cin7 pages earning impressions for "zoho inventory
// alternatives", "inflow alternatives", and "cin7 alternatives", where
// searchers expect a list of options rather than a single product pitch.
//
// Every competitor fact below comes from that vendor's public pricing page,
// checked on ALTERNATIVES_CHECKED. Re-check the source before changing a fact,
// and update the date when you do. No ratings, review counts, or outcome claims.
// ─────────────────────────────────────────────────────────────────────────────
// Kept local: routeMeta imports this file for the ItemList schema.
const SITE_URL = 'https://sparkinventory.com';

export const ALTERNATIVES_CHECKED = 'November 6, 2026';

export type AlternativeKey = 'spark' | 'zoho' | 'inflow' | 'cin7' | 'fishbowl' | 'katana';

export interface AlternativeOption {
  key: AlternativeKey;
  name: string;
  bestFor: string;
  pricing: string;
  users: string;
  planning: string;
  /** Spark: why teams pick it. Competitors: a sourced fact worth checking before you buy. */
  note: string;
  /** Vendor page the facts were checked against. */
  sourceUrl: string;
  /** Spark's own comparison page for this vendor, when there is one. */
  comparisonHref?: string;
}

export const alternativeOptions: Record<AlternativeKey, AlternativeOption> = {
  spark: {
    key: 'spark',
    name: 'Spark Inventory',
    bestFor: 'Product businesses that want each purchase order planned from a demand forecast.',
    pricing: 'Free for one user. Solo $99, Operate $349, and Scale $749 a month.',
    users: 'Unlimited users on every paid plan.',
    planning: 'Per-SKU demand forecasts, seasonal curves, and draft purchase orders, starting on the Free plan.',
    note: 'Sparki, or your own AI assistant over MCP, maps and validates your import for approval, with no onboarding fee. From Solo up, text Sparki to approve a draft purchase order from your phone.',
    sourceUrl: `${SITE_URL}/pricing/`,
  },
  zoho: {
    key: 'zoho',
    name: 'Zoho Inventory',
    bestFor: 'Small teams that want a low entry price, especially those already on Zoho apps.',
    pricing: 'Free for 50 orders a month. Paid plans from $29 to $249 a month, billed annually.',
    users: '1 to 10 users by plan; extra users are $7.50 a month.',
    planning: 'Reorder levels and replenishment alerts.',
    note: 'Each plan caps users, locations, and monthly orders.',
    sourceUrl: 'https://www.zoho.com/us/inventory/pricing/',
    comparisonHref: '/zoho-inventory-alternative/',
  },
  inflow: {
    key: 'inflow',
    name: 'inFlow Inventory',
    bestFor: 'Teams that want barcode-driven stock control with unlimited integrations.',
    pricing: 'Lite $99, Core $299, Pro $499, and Max $699 a month, billed annually.',
    users: '2, 5, 10, or 20 team members by plan.',
    planning: 'Reorder points and recommended reorder points.',
    note: 'A $499 onboarding package is required on Core and above. Manufacturing is an add-on from $69 a month.',
    sourceUrl: 'https://www.inflowinventory.com/software-pricing-inflow-2026',
    comparisonHref: '/inflow-alternative/',
  },
  cin7: {
    key: 'cin7',
    name: 'Cin7 Core',
    bestFor: 'Established multichannel brands that want a broad platform with over 700 app partners.',
    pricing: 'Standard $349, Pro $599, and Advanced $1,199 a month.',
    users: '5, 10, or 15 users by plan.',
    planning: 'ForesightAI demand forecasting is an add-on.',
    note: 'Integrations and yearly sale-order volume are capped by plan.',
    sourceUrl: 'https://www.cin7.com/pricing/',
    comparisonHref: '/cin7-alternative/',
  },
  fishbowl: {
    key: 'fishbowl',
    name: 'Fishbowl',
    bestFor: 'Warehouses built around QuickBooks, and manufacturers on Fishbowl Advanced.',
    pricing: 'Essentials $229, Growth $429, and Scale $729 a month, billed annually.',
    users: '2, 5, or 10 users by plan.',
    planning: 'Reorder points; demand forecasting is an add-on on Growth and included on Scale.',
    note: 'Manufacturing needs Fishbowl Advanced, starting at $675 a month.',
    sourceUrl: 'https://www.fishbowlinventory.com/pricing',
    comparisonHref: '/fishbowl-alternative/',
  },
  katana: {
    key: 'katana',
    name: 'Katana',
    bestFor: 'Manufacturers that want their setup scoped and built for them by the vendor.',
    pricing: 'Advantage is custom-priced on an annual contract. A Free plan covers up to 30 SKUs.',
    users: 'Unlimited users.',
    planning: 'Planning, forecasting, and AI replenishment.',
    note: 'No published price for the paid plan, and the Free plan connects only Shopify for ecommerce.',
    sourceUrl: 'https://katanamrp.com/pricing/',
  },
};

export interface AlternativesShortlist {
  /** The tool searchers are leaving, as written in the heading. */
  incumbent: string;
  eyebrow: string;
  title: string;
  /** Answer-first summary, also used as the FAQ answer. */
  summary: string;
  options: AlternativeKey[];
}

function listNames(keys: AlternativeKey[]) {
  const names = keys.map((key) => alternativeOptions[key].name);
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

function shortlist(incumbent: string, options: AlternativeKey[], fits: string): AlternativesShortlist {
  return {
    incumbent,
    eyebrow: `${incumbent} alternatives`,
    title: `${options.length} ${incumbent} alternatives, compared`,
    summary: `The most common ${incumbent} alternatives are ${listNames(options)}. ${fits}`,
    options,
  };
}

export const alternativesShortlists = {
  zoho: shortlist(
    'Zoho Inventory',
    ['spark', 'inflow', 'cin7', 'katana', 'fishbowl'],
    'Spark is the pick for teams that want demand forecasts and draft purchase orders included on every plan, with unlimited users on paid plans. inFlow fits barcode-driven stock control, Cin7 Core fits established multichannel brands, Katana fits manufacturers that want a vendor-built setup, and Fishbowl fits QuickBooks-centered warehouses.',
  ),
  inflow: shortlist(
    'inFlow',
    ['spark', 'zoho', 'cin7', 'fishbowl', 'katana'],
    'Spark is the pick for teams that want demand forecasts and draft purchase orders included on every plan, with unlimited users on paid plans. Zoho Inventory fits small teams that want a low entry price, Cin7 Core fits established multichannel brands, Fishbowl fits QuickBooks-centered warehouses, and Katana fits manufacturers that want a vendor-built setup.',
  ),
  cin7: shortlist(
    'Cin7',
    ['spark', 'katana', 'fishbowl', 'inflow', 'zoho'],
    'Spark is the pick for teams that want demand forecasts and draft purchase orders on every plan, with no forecasting add-on and unlimited users on paid plans. Katana fits manufacturers that want a vendor-built setup, Fishbowl fits QuickBooks-centered warehouses, inFlow fits barcode-driven stock control, and Zoho Inventory fits small teams that want a low entry price.',
  ),
} as const satisfies Record<string, AlternativesShortlist>;

export type ShortlistKey = keyof typeof alternativesShortlists;

/** ItemList structured data naming each option in the order shown on the page. */
export function buildAlternativesItemListSchema(key: ShortlistKey, pagePath: string) {
  const list = alternativesShortlists[key];
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}${pagePath}/#alternatives`,
    name: list.title.charAt(0).toUpperCase() + list.title.slice(1),
    numberOfItems: list.options.length,
    itemListElement: list.options.map((optionKey, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: alternativeOptions[optionKey].name,
      url: alternativeOptions[optionKey].sourceUrl,
    })),
  };
}
