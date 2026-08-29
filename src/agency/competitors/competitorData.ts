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
  sourceNote: string;
  trademark: string;
  relatedLinks: Array<{ href: string; label: string }>;
  faqs: CompetitorFaq[];
  ctaOptions: CtaLinkOptions;
}

const sharedRelatedLinks = [
  { href: '/shopify-inventory-management', label: 'Shopify inventory management' },
  { href: '/features/purchasing', label: 'Purchasing and planning' },
  { href: '/features/accounting', label: 'QuickBooks and accounting' },
  { href: '/fishbowl-alternative', label: 'Fishbowl alternative' },
];

export const competitorConfigs: Record<CompetitorKey, CompetitorConfig> = {
  cin7: {
    key: 'cin7',
    name: 'Cin7',
    fullName: 'Cin7 Core or Cin7 Omni',
    slug: '/cin7-alternative',
    eyebrow: 'For teams evaluating life after Cin7 Core or Omni',
    accent: 'cyan',
    heroBody:
      'Cin7 is built for broad multichannel operations. Spark takes a more focused route: one cloud inventory system for Shopify, Amazon, wholesale, and QuickBooks, with demand planning and governed AI workflows inside the product.',
    sourceLabel: 'Cin7 pricing and plan details',
    sourceUrl: 'https://www.cin7.com/pricing/',
    snapshot: [
      { label: 'Cin7 Core', value: '$349–$1,199/mo', note: 'Three public Core tiers' },
      { label: 'Planning', value: 'ForesightAI add-on', note: 'Listed as an add-on across plans' },
      { label: 'Spark', value: 'Free; paid from $99', note: 'Planning and governed MCP included' },
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
        priceNote: 'Forecast audit through live operations',
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
        spark: 'Spark uses two meters: published monthly order bands and included AI usage. Users and SKUs are not metered.',
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
        body: 'A migration should explain what it understood, what it repaired, and what still needs a judgment call, not silently map columns and hope.',
        incumbent: 'Cin7 offers group, one-to-one, and partner-led onboarding options.',
        spark: 'Sparki profiles the exports, maps records, validates the dataset, and presents the proposed import for approval.',
      },
    ],
    comparison: [
      { category: 'Product model', competitor: 'Core and Omni cover different operating depths and buyer profiles.', spark: 'One cloud product with tiered capabilities.', lean: 'tradeoff' },
      { category: 'Published price', competitor: 'Core: $349, $599, and $1,199 per month. Omni is quote-based.', spark: 'Free forecast audit; Pulse $99, Operate $349, Scale $749, and Network quoted.', lean: 'spark' },
      { category: 'Forecasting', competitor: 'Cin7 ForesightAI is listed as an add-on.', spark: 'Forecasting, inventory risk, and draft purchase orders are part of the operating workflow.', lean: 'spark' },
      { category: 'Channels', competitor: 'More than 700 integrations and a mature partner ecosystem.', spark: 'Focused native paths for Shopify, Amazon, QuickBooks Online, and core commerce workflows.', lean: 'competitor' },
      { category: 'Order and integration limits', competitor: 'Published limits by Core tier, with more capacity available for purchase.', spark: '500 to 25,000 included monthly orders by tier; paid capacity adds in $49 blocks of 2,500.', lean: 'tradeoff' },
      { category: 'Manufacturing', competitor: 'Core has deeper MRP and advanced manufacturing options.', spark: 'BOMs, spec templates, and advanced vendor price books on Scale; not positioned as full MRP.', lean: 'competitor' },
      { category: 'EDI, POS, multi-entity', competitor: 'Omni is built for this depth; POS and B2B options are available across the Cin7 ecosystem.', spark: 'Spark does not claim Omni-class EDI, POS, or multi-entity ERP depth.', lean: 'competitor' },
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
    slug: '/zoho-inventory-alternative',
    eyebrow: 'For teams outgrowing Zoho Inventory',
    accent: 'emerald',
    heroBody:
      'Zoho Inventory is capable, inexpensive, and especially strong inside the Zoho suite. Spark is for teams willing to pay more for a deeper planning loop: forecast demand, prepare the buy, review the reasoning, and keep Shopify, Amazon, and QuickBooks at the center.',
    sourceLabel: 'Zoho Inventory pricing and limits',
    sourceUrl: 'https://www.zoho.com/us/inventory/pricing/',
    snapshot: [
      { label: 'Zoho', value: '$0–$249/mo', note: 'Annual billing, with order caps' },
      { label: 'Order ceiling', value: '50–15,000/mo', note: 'Varies by Zoho plan' },
      { label: 'Spark', value: '$0-$749/mo', note: 'Forecast audit through manufacturing' },
    ],
    migrationSignals: ['Items + composites', 'Customers + vendors', 'Orders + purchasing history'],
    themes: [
      {
        number: '01',
        label: 'Growth meter',
        title: 'Move when the order cap becomes the plan',
        body: 'Zoho’s limits are transparent and rational for smaller operations. They become friction when the team is managing order volume and add-on blocks instead of choosing features.',
        incumbent: 'Published tiers range from 50 to 15,000 orders per month, with additional order blocks available.',
        spark: 'Spark publishes 500, 2,500, 10,000, and 25,000 included monthly-order bands, with paid overage blocks.',
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
        spark: 'Spark does not ask the team to move its commerce or accounting stack into a broader suite.',
      },
      {
        number: '04',
        label: 'Agent workflow',
        title: 'Operate through Sparki or your own assistant',
        body: 'Spark’s MCP tools expose governed onboarding and operational workflows to compatible AI assistants, with previews and approval gates before writes.',
        incumbent: 'Zoho offers APIs, webhooks, custom functions, and a large automation ecosystem.',
        spark: 'Spark makes agent-led inventory work a first-class product path instead of a custom integration project.',
      },
      {
        number: '05',
        label: 'Price honesty',
        title: 'Compare the free plans honestly',
        body: 'Zoho’s free tier is a low-volume operating ledger. Spark Free is a read-only monthly forecast audit. The better entry point depends on whether the immediate job is recording stock or planning the next buy.',
        incumbent: 'Zoho has a forever-free plan and paid plans starting at $29 per organization per month when billed annually.',
        spark: 'Spark Free covers up to 500 orders per month; live intelligence begins with Pulse at $99 per month.',
      },
    ],
    comparison: [
      { category: 'Starting price', competitor: 'Forever-free plan; paid plans start at $29 per month billed annually.', spark: 'Free monthly forecast audit; Pulse begins at $99 per month.', lean: 'tradeoff' },
      { category: 'Order limits', competitor: '50, 500, 3,000, 7,500, or 15,000 orders per month by plan.', spark: '500, 2,500, 10,000, or 25,000 included monthly orders; paid overage is $49 per 2,500.', lean: 'tradeoff' },
      { category: 'Planning', competitor: 'Reorder levels, replenishment, and Zoho AI capabilities within a broad SMB inventory suite.', spark: 'Forecast-to-draft-PO workflow with reasoning and human approval.', lean: 'spark' },
      { category: 'Commerce', competitor: 'Native multichannel capabilities, including Shopify and Amazon.', spark: 'Focused Shopify and Amazon inventory-planning workflows.', lean: 'tradeoff' },
      { category: 'Accounting', competitor: 'Strongest with Zoho Books; an official QuickBooks Online integration is available.', spark: 'QuickBooks Online is the native accounting path, including two-way operational workflows.', lean: 'tradeoff' },
      { category: 'Shipping labels', competitor: 'In-app carrier and shipping integrations are a meaningful strength.', spark: 'Spark is not positioned as an in-app postage product.', lean: 'competitor' },
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
      { question: 'Why consider Spark when Zoho Inventory starts at $29?', answer: 'Do not switch for price. Consider Spark when order caps, a non-Zoho accounting stack, or the work required to build each purchase plan has become the larger operating cost.' },
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
    slug: '/inflow-alternative',
    eyebrow: 'For teams comparing inFlow Inventory and Spark',
    accent: 'amber',
    heroBody:
      'inFlow is respected for approachable inventory control, barcode workflows, hardware, and support. Spark is the alternative when the harder problem is planning the buy, not scanning the bin, and you want the forecast, purchasing decision, and approval in one loop.',
    sourceLabel: 'inFlow Inventory pricing and plan details',
    sourceUrl: 'https://www.inflowinventory.com/software-pricing-inflow',
    snapshot: [
      { label: 'inFlow Inventory', value: '$129–$699/mo', note: 'Annual billing, public tiers' },
      { label: 'Onboarding', value: '$499 once', note: 'Required on most higher plans' },
      { label: 'Spark', value: 'Free; $99 live', note: 'Monthly audit through live planning' },
    ],
    migrationSignals: ['Products + barcodes', 'Customers + suppliers', 'Sales + purchasing history'],
    themes: [
      {
        number: '01',
        label: 'Planning loop',
        title: 'Move from reorder point to reviewed recommendation',
        body: 'inFlow publishes reorder points, recommended points, and purchase-order tools. Spark focuses on the reasoning before the PO: demand, available stock, incoming supply, and lead-time risk.',
        incumbent: 'inFlow provides a capable, approachable reorder and purchasing workflow.',
        spark: 'Spark prepares quantities and timing from the planning signal, then waits for operator approval.',
      },
      {
        number: '02',
        label: 'Capacity',
        title: 'Stop counting orders and connection slots',
        body: 'inFlow’s public tiers meter sales orders and active integrations, with overages and additional connections available for purchase.',
        incumbent: 'The meters are transparent: 100 or 1,000 monthly orders on the first two public tiers, then unlimited.',
        spark: 'Spark publishes monthly order bands and adds paid capacity in $49 blocks of 2,500 orders.',
      },
      {
        number: '03',
        label: 'Onboarding',
        title: 'Put agent-led setup inside the product',
        body: 'inFlow’s onboarding package includes real customer-success help and is required on most higher plans. Spark uses Sparki or MCP to do the repeatable data work, with human judgment available when needed.',
        incumbent: 'The published onboarding package is $499; additional training and professional services are $199 per hour.',
        spark: 'Free and Pulse are self-serve; historical migration services are available as a separately scoped one-time engagement.',
      },
      {
        number: '04',
        label: 'MCP',
        title: 'Both products support MCP, but the packaging differs',
        body: 'Spark should not claim uniqueness here. inFlow publishes MCP as part of API access, which is an add-on on its first two Inventory tiers and included higher up.',
        incumbent: 'API access, including the inFlow MCP server, is a paid add-on on the first two tiers.',
        spark: 'Governed MCP workflows are part of Spark’s product and onboarding story.',
      },
      {
        number: '05',
        label: 'Warehouse strengths',
        title: 'Do not switch for the hardware row',
        body: 'inFlow’s barcode hardware, label tools, Stockroom app, and EasyPost shipping path are genuine strengths. Spark wins a different decision.',
        incumbent: 'Choose inFlow when scanning, portable hardware, or buying labels inside the inventory tool is central.',
        spark: 'Choose Spark when demand planning and reviewed purchasing decisions are the larger operational gap.',
      },
    ],
    comparison: [
      { category: 'Starting price', competitor: '$129 per month billed annually for Entrepreneur.', spark: 'Free monthly forecast audit; Pulse begins at $99 per month.', lean: 'spark' },
      { category: 'Order limits', competitor: '100 monthly orders on Entrepreneur, 1,000 on Small Business, unlimited on Mid-Size.', spark: '500, 2,500, 10,000, or 25,000 included monthly orders; paid overage is $49 per 2,500.', lean: 'tradeoff' },
      { category: 'Integrations', competitor: 'One, three, or five active integrations on public tiers; additional connections are available.', spark: 'One channel on Free and multiple channels from Pulse, without a per-connection meter.', lean: 'tradeoff' },
      { category: 'Planning', competitor: 'Reorder points, recommended reorder points, notifications, and PO generation.', spark: 'Demand and supply context produces a reasoned draft purchasing recommendation for approval.', lean: 'spark' },
      { category: 'Onboarding', competitor: '$499 package required on Small Business and above; extra services are $199 per hour.', spark: 'Self-serve on Free and Pulse; historical migration is a separately scoped $500-$1,500 service.', lean: 'tradeoff' },
      { category: 'API and MCP', competitor: 'API access including MCP is an add-on on the first two tiers and included on Mid-Size.', spark: 'Governed MCP workflows are included in the product experience.', lean: 'spark' },
      { category: 'Barcode and hardware', competitor: 'Label design, Smart Scanner, portable printer, and Stockroom options.', spark: 'Barcode and warehouse workflows without a published rugged-hardware product line.', lean: 'competitor' },
      { category: 'Shipping labels', competitor: 'EasyPost integration supports comparing and buying labels in app.', spark: 'Spark is not positioned as an in-app postage product.', lean: 'competitor' },
      { category: 'Manufacturing', competitor: 'A separate inFlow Manufacturing product adds BOM and production workflows.', spark: 'Multi-level BOMs, spec templates, and advanced vendor price books are included on Scale.', lean: 'tradeoff' },
      { category: 'Public proof', competitor: 'A mature public review footprint with frequent praise for usability and support.', spark: 'Early-stage public proof without equivalent review volume today.', lean: 'competitor' },
    ],
    stayReasons: [
      'Barcode hardware, label design, Stockroom, or in-app postage is the daily workflow.',
      'The current plan limits fit and the support relationship is working well.',
      'Simple inventory control matters more than demand-planning depth.',
    ],
    switchReasons: [
      'Order caps or integration slots are becoming an operating constraint.',
      'The team still builds the purchase plan outside the inventory system.',
      'You want agent-led onboarding without a required onboarding package.',
    ],
    staySummary: 'inFlow is the stronger warehouse-floor and hardware story. Spark is the stronger fit when the expensive problem is deciding what, when, and how much to buy.',
    sourceNote: 'inFlow prices, order and integration limits, onboarding fees, service rates, hardware, shipping, manufacturing, and MCP packaging were checked against inFlow’s public pricing page. Spark comparisons reflect the current Spark pricing and product implementation.',
    trademark: 'inFlow, inFlow Inventory, inFlow Manufacturing, inFlow Stockroom, and Showroom are trademarks of Archon Systems Inc. Spark Inventory is not affiliated with or endorsed by inFlow or Archon Systems.',
    relatedLinks: sharedRelatedLinks,
    faqs: [
      { question: 'How does Spark migrate data out of inFlow?', answer: 'Bring your inFlow exports to Sparki in app, or use a compatible AI assistant through Spark MCP. Spark profiles the source, maps and validates the data, and presents the proposed import for approval.' },
      { question: 'Does Spark replace inFlow Inventory or inFlow Manufacturing?', answer: 'Spark can replace inventory, purchasing, and planning for teams that do not depend on inFlow’s hardware, postage, or Stockroom workflows. Spark adds multi-level BOMs, spec templates, and advanced price books on Scale, but the products are not identical.' },
      { question: 'inFlow already supports MCP. What is different?', answer: 'Both products support MCP. inFlow packages API and MCP access as an add-on on its first two Inventory tiers. Spark makes governed agent workflows part of the product and onboarding experience.' },
      { question: 'What is different about Spark purchasing?', answer: 'Spark concentrates on the work before PO creation: demand, inventory position, incoming supply, lead times, recommended quantities, and the reasoning an operator reviews before approval.' },
      { question: 'Can we evaluate Spark before moving everything?', answer: 'Yes. Start free or book a working session using your own inFlow exports, then evaluate the planning and migration workflow before a broader change.' },
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
