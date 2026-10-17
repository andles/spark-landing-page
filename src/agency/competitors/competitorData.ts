import type { CtaLinkOptions } from '../ctaLinks';

export type CompetitorKey = 'cin7' | 'zoho' | 'inflow';
export type ComparisonLean = 'spark' | 'competitor' | 'tradeoff';

export interface CompetitorFaq {
  question: string;
  answer: string;
}

export interface CompetitorConfig {
  key: CompetitorKey;
  name: string;
  fullName: string;
  slug: string;
  eyebrow: string;
  accent: 'cyan' | 'emerald' | 'amber';
  heroBody: string;
  sourceLabel: string;
  sourceUrl: string;
  snapshot: Array<{ label: string; value: string; note: string }>;
  packagingComparison?: {
    question: string;
    incumbent: {
      vendor: string;
      packageName: string;
      packageNote: string;
      price: string;
      priceNote: string;
      addOn: { label: string; name: string; note: string; status: string };
    };
    spark: {
      vendor: string;
      packageName: string;
      packageNote: string;
      price: string;
      priceNote: string;
      included: string[];
    };
    takeaway: string;
  };
  migrationSignals: string[];
  themes: Array<{
    number: string;
    label: string;
    title: string;
    body: string;
    incumbent: string;
    spark: string;
  }>;
  comparison: Array<{
    category: string;
    competitor: string;
    spark: string;
    lean: ComparisonLean;
  }>;
  stayReasons: string[];
  switchReasons: string[];
  staySummary: string;
  /** Optional page copy. Pages without it keep the original evaluation framing. */
  salesCopy?: {
    heroHeadline: { lead: string; highlight: string };
    heroFootnote: string;
    heroPanel: { kicker: string; title: string; badge: string };
    heroReasons: Array<{ label: string; incumbent: string; spark: string }>;
    sourceChecked: string;
    themes: { eyebrow: string; title: string; body: string };
    comparison: { eyebrow: string; title: string; body: string };
    fit: { eyebrow: string; title: string };
    closing: { eyebrow: string; lead: string; highlight: string; body: string };
  };
  sourceNote: string;
  trademark: string;
  relatedLinks: Array<{ href: string; label: string }>;
  faqs: CompetitorFaq[];
  ctaOptions: CtaLinkOptions;
}

const sharedRelatedLinks = [
  { href: '/shopify-inventory-management/', label: 'Shopify inventory management' },
  { href: '/features/purchasing/', label: 'Plan your next reorder' },
  { href: '/features/accounting/', label: 'QuickBooks and accounting' },
  { href: '/fishbowl-alternative/', label: 'Fishbowl alternative' },
];

export const competitorConfigs: Record<CompetitorKey, CompetitorConfig> = {
  cin7: {
    key: 'cin7',
    name: 'Cin7',
    fullName: 'Cin7 Core or Cin7 Omni',
    slug: '/cin7-alternative/',
    eyebrow: 'For teams evaluating life after Cin7 Core or Omni',
    accent: 'cyan',
    heroBody:
      'Cin7 is built for broad multichannel operations. Spark Inventory takes a more focused route: one cloud inventory system for Shopify, Amazon, wholesale, and QuickBooks, with demand planning and governed AI workflows inside the product.',
    sourceLabel: 'Cin7 pricing and plan details',
    sourceUrl: 'https://www.cin7.com/pricing/',
    snapshot: [
      { label: 'Cin7 Core', value: '$349–$1,199/mo', note: 'Three public Core tiers' },
      { label: 'Planning', value: 'ForesightAI add-on', note: 'Listed as an add-on across plans' },
      { label: 'Spark Inventory', value: 'Free; paid from $99', note: 'Planning and governed MCP included' },
    ],
    packagingComparison: {
      question: 'Is demand planning included in the inventory subscription, or added as a separate product?',
      incumbent: {
        vendor: 'Cin7',
        packageName: 'Core subscription',
        packageNote: 'Three public Core tiers',
        price: '$349–$1,199/mo',
        priceNote: 'Base inventory platform pricing',
        addOn: {
          label: 'Cin7 forecasting add-on',
          name: 'ForesightAI',
          note: 'Listed as an add-on across Core plans',
          status: 'Separate add-on',
        },
      },
      spark: {
        vendor: 'Spark Inventory',
        packageName: 'One planning stack',
        packageNote: 'Inventory operations and planning together',
        price: 'Free; paid from $99/mo',
        priceNote: 'Monthly forecasting through live operations',
        included: ['Demand forecasting', 'Replenishment planning', 'Sparki onboarding', 'Governed MCP access'],
      },
      takeaway: 'Cin7 separates the forecasting layer. Spark includes planning in the core subscription.',
    },
    migrationSignals: ['Products + variants', 'Customers + suppliers', 'Sales + purchasing history'],
    themes: [
      {
        number: '01',
        label: 'Product shape',
        title: 'One operating model instead of choosing Core or Omni',
        body: 'Cin7 serves two materially different product paths. That breadth is valuable, but it makes product fit part of the buying decision before implementation begins.',
        incumbent: 'Core is the published SMB product; Omni is the customizable EDI, 3PL, and multi-entity path.',
        spark: 'Spark is one product for inventory, purchasing, planning, warehousing, and accounting workflows.',
      },
      {
        number: '02',
        label: 'Planning',
        title: 'Forecasting lives in the operating loop',
        body: 'Cin7 publishes ForesightAI as an add-on. Spark is designed around the forecast-to-draft-PO loop, with the operator reviewing the evidence before approval.',
        incumbent: 'Forecasting is available through Cin7 ForesightAI and is priced separately from the base plans.',
        spark: 'Demand signals, risk, recommended quantities, and draft purchase orders share the same workspace.',
      },
      {
        number: '03',
        label: 'Price shape',
        title: 'Fewer meters to model before the first order',
        body: 'Cin7 Core publishes limits for users, integrations, and annual sale-order volume, with additional capacity available for purchase.',
        incumbent: 'The limits are explicit and can scale, but the final package depends on operating volume and add-ons.',
        spark: 'Spark uses published monthly order bands and included AI usage. Free is a single-user workspace; paid plans include unlimited users, and SKUs are not metered.',
      },
      {
        number: '04',
        label: 'Agent access',
        title: 'Bring the assistant your team already trusts',
        body: 'Spark exposes governed MCP tools for onboarding and operational work, including previews and approval gates before changes land.',
        incumbent: 'Cin7 publishes API access and professional services as add-ons across its plan comparison.',
        spark: 'Use Sparki in app or a compatible AI assistant through Spark MCP, with the same governed workflow.',
      },
      {
        number: '05',
        label: 'Migration',
        title: 'Make the import a reviewed proposal',
        body: 'Review the data mapping, proposed repairs, and decisions that need your judgment before approving the migration.',
        incumbent: 'Cin7 offers group, one-to-one, and partner-led onboarding options.',
        spark: 'Sparki profiles the exports, maps records, validates the dataset, and presents the proposed import for approval.',
      },
    ],
    comparison: [
      { category: 'Product model', competitor: 'Core and Omni cover different operating depths and buyer profiles.', spark: 'One cloud product with tiered capabilities.', lean: 'tradeoff' },
      { category: 'Published price', competitor: 'Core: $349, $599, and $1,199 per month. Omni is quote-based.', spark: 'Free for one user; Solo $99 and Operate $349. Advanced Scale is $749; Custom is quoted.', lean: 'spark' },
      { category: 'Forecasting', competitor: 'Cin7 ForesightAI is listed as an add-on.', spark: 'Forecasting, inventory risk, and draft purchase orders are part of the operating workflow.', lean: 'spark' },
      { category: 'Channels', competitor: 'More than 700 integrations and a mature partner ecosystem.', spark: 'Focused native paths for Shopify, Amazon, QuickBooks Online, and core commerce workflows.', lean: 'competitor' },
      { category: 'Order and integration limits', competitor: 'Published limits by Core tier, with more capacity available for purchase.', spark: 'Paid plans include 2,500 to 25,000 monthly orders; additional capacity comes in $49 blocks of 2,500.', lean: 'tradeoff' },
      { category: 'Manufacturing', competitor: 'Core has deeper MRP and advanced manufacturing options.', spark: 'BOMs, spec templates, and advanced vendor price books on Scale. Full MRP requires a separate solution.', lean: 'competitor' },
      { category: 'EDI, POS, multi-entity', competitor: 'Omni is built for this depth; POS and B2B options are available across the Cin7 ecosystem.', spark: 'For advanced EDI, POS, or multi-entity ERP requirements, evaluate a dedicated solution alongside Spark.', lean: 'competitor' },
      { category: 'AI and agent access', competitor: 'API and related extensibility are packaged as add-ons.', spark: 'Sparki and governed MCP workflows are part of the product experience.', lean: 'spark' },
      { category: 'Public proof', competitor: 'Cin7 publishes 8,500+ customers and substantial order and sales volume.', spark: 'Early-stage public proof without a comparable named-customer or review footprint yet.', lean: 'competitor' },
    ],
    stayReasons: [
      'Omni-class EDI, multi-entity, or 3PL connectivity is central to the operation.',
      'MRP, advanced manufacturing, or POS is the main reason you bought the system.',
      'The 700+ integration ecosystem matters more than a focused planning workflow.',
    ],
    switchReasons: [
      'You primarily run Shopify, Amazon, wholesale, and QuickBooks Online.',
      'Forecasting and draft purchase orders should be part of the core workflow.',
      'You want Sparki or your own assistant to handle governed onboarding and operations.',
    ],
    staySummary: 'Cin7 is the stronger choice when breadth, MRP depth, or Omni infrastructure is the job. Spark is the cleaner fit when the job is turning commerce demand into an approved inventory plan.',
    sourceNote: 'Cin7 prices, plan limits, add-on packaging, onboarding options, integration count, and customer figures were checked against Cin7’s public pricing page. Spark comparisons reflect the current Spark pricing and product implementation.',
    trademark: 'Cin7, Cin7 Core, Cin7 Omni, and Cin7 ForesightAI are trademarks of their respective owners. Spark Inventory is not affiliated with or endorsed by Cin7.',
    relatedLinks: sharedRelatedLinks,
    faqs: [
      { question: 'How does Spark migrate data out of Cin7?', answer: 'Bring your Cin7 exports to Sparki in app, or use a compatible AI assistant through Spark MCP. Spark profiles the files, maps the records, validates the proposed import, and waits for approval before the data lands.' },
      { question: 'Does Spark replace Cin7 Core or Cin7 Omni?', answer: 'Spark can replace the inventory, purchasing, and planning layer for Shopify, Amazon, and wholesale teams that do not need Omni-class EDI, multi-entity ERP depth, or Core-class MRP. If those capabilities are central, Cin7 may remain the better fit.' },
      { question: 'Is demand forecasting included with Spark?', answer: 'Yes. Spark uses sales, inventory, lead-time, and supply context to surface risk and prepare reviewable purchase recommendations. Your team approves operational actions.' },
      { question: 'Does Spark connect to Shopify and QuickBooks Online?', answer: 'Yes. Spark supports Shopify and QuickBooks Online workflows so commerce, inventory, purchasing, and accounting context can operate together.' },
      { question: 'Can we evaluate Spark before a broader migration?', answer: 'Yes. Start free or book a working session using your own Cin7 exports, then evaluate the workflow before committing to a broader migration.' },
    ],
    ctaOptions: {
      source: 'cin7_lp',
      defaults: { utm_source: 'cin7_lp', utm_medium: 'website', utm_campaign: 'competitor' },
    },
  },
  zoho: {
    key: 'zoho',
    name: 'Zoho Inventory',
    fullName: 'Zoho Inventory',
    slug: '/zoho-inventory-alternative/',
    eyebrow: 'For teams outgrowing Zoho Inventory',
    accent: 'emerald',
    heroBody:
      'Zoho Inventory is capable, inexpensive, and especially strong inside the Zoho suite. Spark Inventory is for teams willing to pay more for a deeper planning loop: forecast demand, prepare the buy, review the reasoning, and keep Shopify, Amazon, and QuickBooks at the center.',
    sourceLabel: 'Zoho Inventory pricing and limits',
    sourceUrl: 'https://www.zoho.com/us/inventory/pricing/',
    snapshot: [
      { label: 'Zoho', value: '$0–$249/mo', note: 'Annual billing, with order caps' },
      { label: 'Order ceiling', value: '50–15,000/mo', note: 'Varies by Zoho plan' },
      { label: 'Spark Inventory', value: '$0-$749/mo', note: 'Monthly forecasting through manufacturing' },
    ],
    migrationSignals: ['Items + composites', 'Customers + vendors', 'Orders + purchasing history'],
    themes: [
      {
        number: '01',
        label: 'Growth meter',
        title: 'Move when the order cap becomes the plan',
        body: 'Zoho’s limits are transparent and rational for smaller operations. They become friction when the team is managing order volume and add-on blocks instead of choosing features.',
        incumbent: 'Published tiers range from 50 to 15,000 orders per month, with additional order blocks available.',
        spark: 'Spark Free is forecast-only. Paid plans publish 2,500, 10,000, and 25,000 included monthly-order bands, with paid overage blocks.',
      },
      {
        number: '02',
        label: 'Planning depth',
        title: 'Go beyond the reorder threshold',
        body: 'Zoho covers reorder levels and replenishment. Spark is designed to combine demand, stock, incoming supply, and lead times into a draft purchasing decision.',
        incumbent: 'Zoho provides a broad SMB inventory and order-management toolkit at a low price.',
        spark: 'Spark concentrates more of the product around forecast-to-approval inventory planning.',
      },
      {
        number: '03',
        label: 'System of record',
        title: 'Keep QuickBooks and commerce at the center',
        body: 'Zoho Inventory is at its most cohesive alongside Zoho Books, CRM, and Commerce. Spark is designed as the inventory layer around Shopify, Amazon, and QuickBooks Online.',
        incumbent: 'The Zoho suite is a real advantage when the rest of the business already lives there.',
        spark: 'Keep your existing commerce and accounting stack while adding Spark for inventory planning.',
      },
      {
        number: '04',
        label: 'Agent workflow',
        title: 'Operate through Sparki or your own assistant',
        body: 'Spark’s MCP tools expose governed onboarding and operational workflows to compatible AI assistants, with previews and approval gates before writes.',
        incumbent: 'Zoho offers APIs, webhooks, custom functions, and a large automation ecosystem.',
        spark: 'Work with Sparki in app or your preferred AI assistant over MCP for guided inventory tasks.',
      },
      {
        number: '05',
        label: 'Price honesty',
        title: 'Compare the free plans honestly',
        body: 'Zoho’s free tier is a low-volume operating ledger. Spark Free is a single-user monthly forecasting workspace. The better entry point depends on whether the immediate job is recording stock or planning the next buy.',
        incumbent: 'Zoho has a forever-free plan and paid plans starting at $29 per organization per month when billed annually.',
        spark: 'Spark Free provides monthly forecasting without live order operations; live intelligence begins with Solo at $99 per month.',
      },
    ],
    comparison: [
      { category: 'Starting price', competitor: 'Forever-free plan; paid plans start at $29 per month billed annually.', spark: 'Free for one user; Solo begins at $99 per month.', lean: 'tradeoff' },
      { category: 'Order limits', competitor: '50, 500, 3,000, 7,500, or 15,000 orders per month by plan.', spark: 'Free is forecast-only. Paid plans include 2,500, 10,000, or 25,000 monthly orders; overage is $49 per 2,500.', lean: 'tradeoff' },
      { category: 'Planning', competitor: 'Reorder levels, replenishment, and Zoho AI capabilities within a broad SMB inventory suite.', spark: 'Forecast-to-draft-PO workflow with reasoning and human approval.', lean: 'spark' },
      { category: 'Commerce', competitor: 'Native multichannel capabilities, including Shopify and Amazon.', spark: 'Focused Shopify and Amazon inventory-planning workflows.', lean: 'tradeoff' },
      { category: 'Accounting', competitor: 'Strongest with Zoho Books; an official QuickBooks Online integration is available.', spark: 'QuickBooks Online is the native accounting path, including two-way operational workflows.', lean: 'tradeoff' },
      { category: 'Shipping labels', competitor: 'In-app carrier and shipping integrations are a meaningful strength.', spark: 'Use a separate shipping-label workflow alongside Spark.', lean: 'competitor' },
      { category: 'Manufacturing', competitor: 'Composite items and assemblies, without a full work-order manufacturing layer.', spark: 'Multi-level BOMs, spec templates, and advanced vendor price books on Scale.', lean: 'spark' },
      { category: 'Agent access', competitor: 'APIs, webhooks, custom functions, and the broader Zoho automation ecosystem.', spark: 'Sparki and governed MCP workflows built into onboarding and operations.', lean: 'tradeoff' },
      { category: 'Public proof', competitor: 'Named customer stories and a mature public review footprint.', spark: 'Early-stage public proof without equivalent review volume today.', lean: 'competitor' },
    ],
    stayReasons: [
      'You are under the order cap and the price-to-capability ratio is working.',
      'Zoho Books, CRM, or Commerce is already the center of the business.',
      'In-app shipping labels and strong locations-per-dollar matter most.',
    ],
    switchReasons: [
      'The order meter is driving plan changes more than the capabilities are.',
      'QuickBooks Online, not Zoho Books, is the accounting system of record.',
      'You want the system to forecast, draft the buy, and wait for approval.',
    ],
    staySummary: 'Zoho Inventory is a very strong value when the operation fits its caps and suite. Spark becomes relevant when the planning gap costs more than the software price difference.',
    sourceNote: 'Zoho prices, order limits, users, locations, add-ons, support, and onboarding details were checked against Zoho Inventory’s public US pricing and comparison pages. Spark comparisons reflect the current Spark pricing and product implementation.',
    trademark: 'Zoho, Zoho Inventory, Zoho Books, Zoho CRM, Zoho Commerce, and Zia are trademarks of Zoho Corporation. Spark Inventory is not affiliated with or endorsed by Zoho.',
    relatedLinks: sharedRelatedLinks,
    faqs: [
      { question: 'How does Spark migrate data out of Zoho Inventory?', answer: 'Bring your Zoho Inventory exports to Sparki in app, or use a compatible AI assistant through Spark MCP. Spark profiles the files, maps and validates the records, and presents the proposed import for approval.' },
      { question: 'Does Spark replace Zoho Inventory or Zoho Books?', answer: 'Spark replaces the inventory and purchasing layer, not Zoho Books, CRM, or Commerce. Spark’s native accounting workflow is built around QuickBooks Online.' },
      { question: 'Why consider Spark when Zoho Inventory starts at $29?', answer: 'Consider Spark when order caps, a non-Zoho accounting stack, or the work required to build each purchase plan has become the larger operating cost.' },
      { question: 'Does Spark connect to Shopify, Amazon, and QuickBooks Online?', answer: 'Yes. Spark is designed around Shopify, Amazon, and QuickBooks Online inventory workflows, while leaving Shopify as the commerce platform.' },
      { question: 'Can we evaluate Spark before moving everything?', answer: 'Yes. Start free or book a working session using your own Zoho Inventory exports, then decide whether the planning workflow is worth a broader migration.' },
    ],
    ctaOptions: {
      source: 'zoho_inventory_lp',
      defaults: { utm_source: 'zoho_inventory_lp', utm_medium: 'website', utm_campaign: 'competitor' },
    },
  },
  inflow: {
    key: 'inflow',
    name: 'inFlow',
    fullName: 'inFlow Inventory',
    slug: '/inflow-alternative/',
    eyebrow: 'For teams switching from inFlow Inventory',
    accent: 'amber',
    heroBody:
      'Spark Inventory forecasts demand for every SKU, turns it into a purchase order your team reviews, and runs the warehouse, wholesale, and manufacturing work around that plan. Bring the whole team on any paid plan, and let Sparki move your inFlow data for you.',
    sourceLabel: 'inFlow Inventory pricing',
    sourceUrl: 'https://www.inflowinventory.com/software-pricing-inflow',
    snapshot: [],
    migrationSignals: ['Products + barcodes', 'Customers + suppliers', 'Sales + purchasing history'],
    themes: [
      {
        number: '01',
        label: 'Forecasting',
        title: 'Buy from a forecast, not a fixed reorder point',
        body: 'A reorder point tells you when you are already low. Spark forecasts demand for every SKU with seasonal curves, weighs stock on hand and incoming purchase orders against supplier lead times, and drafts the order before you run short.',
        incumbent: 'Reorder points, recommended reorder points, and reorder by purchase order.',
        spark: 'Per-SKU forecasts, seasonal curves, lead-time risk, and a draft PO with the reasoning shown.',
      },
      {
        number: '02',
        label: 'Your team',
        title: 'Bring everyone in without counting seats',
        body: 'Buyers, warehouse staff, and the owner all work from the same plan. Spark does not charge per user on paid plans, and it does not meter SKUs or warehouses either.',
        incumbent: '2, 5, 10, or 20 team members by plan, then $29 per extra member each month.',
        spark: 'Unlimited users on Solo, Operate, and Scale.',
      },
      {
        number: '03',
        label: 'One system',
        title: 'Manufacturing, wholesale, and scanning in one place',
        body: 'Bills of materials, manufacturing orders, a B2B wholesale store, a supplier portal, EDI, and the mobile warehouse app all run on the same inventory and the same plan in Spark.',
        incumbent: 'Manufacturing is a separate inFlow product from $169 a month. Stockroom, Showroom, lot numbers, and serial numbers are monthly add-ons on its entry plans.',
        spark: 'Multi-level BOMs and manufacturing orders on Scale, plus wholesale, supplier, EDI, and mobile workflows in the same system.',
      },
      {
        number: '04',
        label: 'AI that acts',
        title: 'An AI teammate that does the work, with your approval',
        body: 'Sparki works inside the app, Spark Signal proposes the next action, Spark Solo answers by text, and your own assistant can connect over MCP. Every change waits for a person to approve it.',
        incumbent: 'An AI Report Assistant, with Inventory API & MCP as a $49 monthly add-on on Lite and Core.',
        spark: 'Sparki, Spark Signal, plain-English automation rules, Spark Solo by text, and governed MCP access.',
      },
      {
        number: '05',
        label: 'Switching',
        title: 'Move over without buying an onboarding package',
        body: 'Hand Sparki your inFlow exports. It profiles the files, maps and validates the records, and shows you the proposed import before anything lands.',
        incumbent: 'A $499 onboarding package, listed as required on Core.',
        spark: 'Self-serve, agent-led import with your approval at every step. No onboarding fee.',
      },
      {
        number: '06',
        label: 'Channels',
        title: 'Every channel feeds one plan',
        body: 'Shopify, Amazon, WooCommerce, Square, Faire, Etsy, and Meta shops flow into one forecast, with QuickBooks Online, Xero, Zoho Books, ShipStation, and Flexport alongside.',
        incumbent: 'Integrations beyond the plan allowance cost $49 to $89 a month each, or $119 to $159 for unlimited.',
        spark: 'Multiple connections from Solo up, with no per-connection fee.',
      },
    ],
    comparison: [
      { category: 'Demand forecasting', competitor: 'Reorder points and recommended reorder points.', spark: 'Per-SKU forecasts, seasonal curves, and a buying plan. Free for one user.', lean: 'spark' },
      { category: 'Purchasing', competitor: 'Reorder by purchase order.', spark: 'Draft POs sized from demand, stock, incoming supply, and lead times, with the reasoning shown for approval.', lean: 'spark' },
      { category: 'Users', competitor: '2, 5, 10, or 20 team members by plan; $29 per extra member per month.', spark: 'Unlimited users on every paid plan.', lean: 'spark' },
      { category: 'Locations', competitor: 'One location on Lite and five on Core; $39 per extra location per month.', spark: 'No warehouse meter on any plan.', lean: 'spark' },
      { category: 'Getting started', competitor: '$499 onboarding package, listed as required on Core.', spark: 'Sparki maps and validates your inFlow exports for approval. No onboarding fee.', lean: 'spark' },
      { category: 'Manufacturing', competitor: 'A separate inFlow Manufacturing product, from $169 per month.', spark: 'Multi-level BOMs, spec templates, and manufacturing orders on Scale.', lean: 'spark' },
      { category: 'Mobile warehouse', competitor: 'inFlow Stockroom is a $39 monthly add-on.', spark: 'Receive, pick, pack, count, and move stock on iPhone, iPad, or Android, with the phone camera or Zebra and Sunmi scanners.', lean: 'spark' },
      { category: 'Wholesale and suppliers', competitor: 'Showroom B2B portal is a $39 monthly add-on on Lite and Core.', spark: 'Wholesale store, supplier portal, EDI, and supplier invoice matching.', lean: 'spark' },
      { category: 'AI', competitor: 'AI Report Assistant; Inventory API & MCP is a $49 monthly add-on on Lite and Core.', spark: 'Sparki agent, Spark Signal actions, automation rules, Spark Solo by text, and governed MCP.', lean: 'spark' },
    ],
    stayReasons: [],
    switchReasons: [
      'You want purchasing driven by real demand, including seasonal swings, instead of fixed reorder points.',
      'You want everyone on the team in the system without paying for each seat.',
      'You sell across Shopify, Amazon, wholesale, and marketplaces and need one plan for all of it.',
      'You make or assemble products and want manufacturing in the same system as inventory.',
      'You want an AI agent to handle setup and routine work, with a person approving every change.',
    ],
    staySummary: 'Inventory is where your cash sits, and the buying decision is where you win or lose it. Spark is built around that decision.',
    salesCopy: {
      heroHeadline: { lead: 'Switching from inFlow?', highlight: 'Spark plans the buy, not just the reorder point.' },
      heroFootnote: 'Unlimited users on paid plans · Free forecasting plan · Sparki handles the import',
      heroPanel: { kicker: 'INFLOW VS SPARK', title: 'What changes when you switch', badge: 'AT A GLANCE' },
      heroReasons: [
        { label: 'Team seats', incumbent: '2 to 20 members by plan, then $29 per extra member each month', spark: 'Unlimited users on every paid plan' },
        { label: 'Planning', incumbent: 'Reorder points and recommended reorder points', spark: 'Per-SKU demand forecasts and draft POs, free to start' },
        { label: 'Setup', incumbent: '$499 onboarding package, required on Core', spark: 'Sparki maps your inFlow exports. No onboarding fee.' },
      ],
      sourceChecked: 'October 17, 2026',
      themes: {
        eyebrow: 'Why Spark',
        title: 'Six reasons teams pick Spark over inFlow',
        body: 'Each one is a workflow you can open in Spark today. inFlow details come from inFlow’s public pricing page.',
      },
      comparison: {
        eyebrow: 'Side by side',
        title: 'Spark vs inFlow, line by line',
        body: 'Plan details reflect each company’s published pricing.',
      },
      fit: { eyebrow: 'Is Spark right for you?', title: 'Spark is built for teams that' },
      closing: {
        eyebrow: 'See it with your own data',
        lead: 'Bring your inFlow data.',
        highlight: 'See your forecast and buying plan.',
        body: 'Start free and get a forecast from the records you already have, or book a demo and walk through the switch using your own inFlow exports.',
      },
    },
    sourceNote: 'inFlow prices, team-member and location limits, add-ons, the onboarding package, and inFlow Manufacturing pricing were checked against inFlow’s public pricing page on October 17, 2026. Spark details reflect current Spark pricing and the product as it ships today.',
    trademark: 'inFlow, inFlow Inventory, inFlow Manufacturing, inFlow Stockroom, and Showroom are trademarks of Archon Systems Inc. Spark Inventory is not affiliated with or endorsed by inFlow or Archon Systems.',
    relatedLinks: [
      { href: '/features/purchasing/', label: 'Forecasting and reorder planning' },
      { href: '/features/mobile/', label: 'Mobile warehouse app' },
      { href: '/features/manufacturing/', label: 'Manufacturing and BOMs' },
      { href: '/integrations/', label: 'Integrations' },
      { href: '/pricing/', label: 'Pricing' },
    ],
    faqs: [
      { question: 'How hard is it to switch from inFlow?', answer: 'Export your products, customers, suppliers, and order history from inFlow and hand them to Sparki in app, or to your own AI assistant through Spark MCP. Spark profiles the files, maps and validates the records, and shows you the proposed import. Nothing lands until you approve it, and there is no onboarding fee.' },
      { question: 'Does Spark charge per user?', answer: 'No. Solo, Operate, and Scale include unlimited users, and Spark does not meter SKUs or warehouses. Free is a single-user forecasting plan.' },
      { question: 'Does Spark work with barcode scanners?', answer: 'Yes. The Spark mobile warehouse app runs on iPhone, iPad, and Android. Scan with the phone camera or with keyboard-mode hardware scanners such as Zebra and Sunmi devices to receive, pick, pack, count, and move stock.' },
      { question: 'Can Spark handle manufacturing?', answer: 'Yes. The Scale plan adds multi-level bills of materials, spec templates, manufacturing orders, and component-priced vendor price books, in the same system as your inventory and purchasing.' },
      { question: 'How is Spark purchasing different from reorder points?', answer: 'Spark starts from a demand forecast for each SKU, then weighs stock on hand, incoming purchase orders, and supplier lead times to recommend what to buy and when. It drafts the purchase order with its reasoning, and your team approves it.' },
      { question: 'Can we try Spark before we switch?', answer: 'Yes. Start on the Free forecasting plan with your own data, or start a 14-day free trial of Solo, Operate, or Scale. You can also book a demo and walk through the switch using your inFlow exports.' },
    ],
    ctaOptions: {
      source: 'inflow_lp',
      defaults: { utm_source: 'inflow_lp', utm_medium: 'website', utm_campaign: 'competitor' },
    },
  },
};

export function buildCompetitorFaqSchema(key: CompetitorKey): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: competitorConfigs[key].faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
