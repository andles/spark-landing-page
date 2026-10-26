import type { CtaLinkOptions } from '../ctaLinks';

export type CompetitorKey = 'cin7' | 'zoho' | 'inflow' | 'linnworks';
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

export const competitorConfigs: Record<CompetitorKey, CompetitorConfig> = {
  cin7: {
    key: 'cin7',
    name: 'Cin7',
    fullName: 'Cin7 Core or Cin7 Omni',
    slug: '/cin7-alternative/',
    eyebrow: 'For teams switching from Cin7 Core or Omni',
    accent: 'cyan',
    heroBody:
      'Spark Inventory puts demand forecasting, reorder recommendations, and draft purchase orders in the core product, not in an add-on. Bring the whole team on any paid plan, connect every channel without counting integration slots, and let Sparki move your Cin7 data for you.',
    sourceLabel: 'Cin7 pricing',
    sourceUrl: 'https://www.cin7.com/pricing/',
    snapshot: [],
    migrationSignals: ['Products + variants', 'Customers + suppliers', 'Sales + purchasing history'],
    themes: [
      {
        number: '01',
        label: 'Forecasting',
        title: 'Forecasting comes in the box',
        body: 'Spark forecasts demand for every SKU with seasonal curves, weighs stock and incoming purchase orders against supplier lead times, and drafts the order for your review. It is the core of the product, not a second subscription.',
        incumbent: 'ForesightAI forecasting is listed as an add-on on every Core plan and on Omni.',
        spark: 'Per-SKU forecasts, seasonal curves, and draft POs, starting on the Free plan.',
      },
      {
        number: '02',
        label: 'Room to grow',
        title: 'More people and more orders for the same $349',
        body: 'Spark plans are sized by monthly orders and capability, not by seats. Add buyers, warehouse staff, and managers without moving up a tier.',
        incumbent: 'Core Standard at $349 a month includes 5 users, 6,000 sale orders a year, and 2 integrations.',
        spark: 'Operate at $349 a month includes unlimited users and 10,000 orders a month.',
      },
      {
        number: '03',
        label: 'One product',
        title: 'No Core-or-Omni decision before you start',
        body: 'Spark is one product with plans that add capability as you grow, so you never re-platform to get the next feature.',
        incumbent: 'Core and Omni are separate products for different buyers, and Omni is quote-only.',
        spark: 'One product for inventory, purchasing, planning, warehousing, wholesale, and accounting sync.',
      },
      {
        number: '04',
        label: 'AI that acts',
        title: 'An AI teammate that does the work, with your approval',
        body: 'Sparki works inside the app, Spark Signal proposes the next action, Sparki answers by text, and your own assistant can connect over MCP. Every change waits for a person to approve it.',
        incumbent: 'API access is listed as an add-on on every Cin7 plan.',
        spark: 'Sparki, Spark Signal, plain-English automation rules, Text with Sparki, and governed MCP access.',
      },
      {
        number: '05',
        label: 'Switching',
        title: 'An import you review, not a project you staff',
        body: 'Hand Sparki your Cin7 exports. It profiles the files, maps and validates the records, and shows you the proposed import before anything lands.',
        incumbent: 'Onboarding runs through group, one-to-one, or partner-led sessions; professional services are an add-on.',
        spark: 'Self-serve, agent-led import with your approval at every step. No onboarding fee.',
      },
      {
        number: '06',
        label: 'Channels',
        title: 'Every channel feeds one plan',
        body: 'Shopify, Amazon, WooCommerce, Square, Faire, Etsy, and Meta shops flow into one forecast, with QuickBooks Online, Xero, Zoho Books, ShipStation, and Flexport alongside.',
        incumbent: 'Core plans include 2, 4, or 6 integrations, with more available for purchase.',
        spark: 'Multiple connections from Solo up, with no per-connection fee.',
      },
    ],
    comparison: [
      { category: 'Demand forecasting', competitor: 'ForesightAI is listed as an add-on on every plan.', spark: 'Per-SKU forecasts, seasonal curves, and a buying plan. Free for one user.', lean: 'spark' },
      { category: 'Published price', competitor: 'Core: $349, $599, or $1,199 per month. Omni is quote-based.', spark: 'Free; Solo $99, Operate $349, and Scale $749 per month, each paid plan with a 14-day free trial.', lean: 'spark' },
      { category: 'Users', competitor: '5, 10, or 15 users on Core plans, with more available for purchase.', spark: 'Unlimited users on every paid plan.', lean: 'spark' },
      { category: 'Order volume', competitor: '6,000, 24,000, or 120,000 sale orders per year on Core plans.', spark: '2,500, 10,000, or 25,000 orders per month on paid plans, with more in $49 blocks of 2,500.', lean: 'spark' },
      { category: 'Integrations', competitor: '2, 4, or 6 integrations on Core plans, with more available for purchase.', spark: 'Multiple connections from Solo up, with no per-connection fee.', lean: 'spark' },
      { category: 'Product model', competitor: 'Choose between Core and Omni, two products for different buyers.', spark: 'One product with plans that add capability as you grow.', lean: 'spark' },
      { category: 'Wholesale and suppliers', competitor: 'B2B Portal is listed as an add-on on every plan.', spark: 'Wholesale store, supplier portal, EDI, and supplier invoice matching.', lean: 'spark' },
      { category: 'AI', competitor: 'API access is listed as an add-on on every plan.', spark: 'Sparki agent, Spark Signal actions, automation rules, Text with Sparki, and governed MCP.', lean: 'spark' },
    ],
    stayReasons: [],
    switchReasons: [
      'You want forecasting and draft purchase orders in the core product, not bought separately.',
      'You want everyone on the team in the system without paying for each seat.',
      'You sell across Shopify, Amazon, wholesale, and marketplaces and need one plan for all of it.',
      'You want room to grow without choosing between two different products.',
      'You want an AI agent to handle setup and routine work, with a person approving every change.',
    ],
    staySummary: 'Inventory is where your cash sits, and the buying decision is where you win or lose it. Spark is built around that decision.',
    salesCopy: {
      heroHeadline: { lead: 'Switching from Cin7?', highlight: 'Forecasting included. No add-on.' },
      heroFootnote: 'Forecasting included · Unlimited users on paid plans · Sparki handles the import',
      heroPanel: { kicker: 'CIN7 VS SPARK', title: 'What changes when you switch', badge: 'AT A GLANCE' },
      heroReasons: [
        { label: 'Forecasting', incumbent: 'ForesightAI is an add-on on every plan', spark: 'Forecasts and draft POs included, from the Free plan up' },
        { label: 'At $349 a month', incumbent: 'Core Standard: 5 users and 6,000 sale orders a year', spark: 'Operate: unlimited users and 10,000 orders a month' },
        { label: 'Integrations', incumbent: '2 to 6 by plan, with more for purchase', spark: 'No per-connection fee from Solo up' },
      ],
      sourceChecked: 'October 17, 2026',
      themes: {
        eyebrow: 'Why Spark',
        title: 'Six reasons teams pick Spark over Cin7',
        body: 'Each one is a workflow you can open in Spark today. Cin7 details come from Cin7’s public pricing page.',
      },
      comparison: {
        eyebrow: 'Side by side',
        title: 'Spark vs Cin7, line by line',
        body: 'Plan details reflect each company’s published pricing.',
      },
      fit: { eyebrow: 'Is Spark right for you?', title: 'Spark is built for teams that' },
      closing: {
        eyebrow: 'See it with your own data',
        lead: 'Bring your Cin7 data.',
        highlight: 'See your forecast and buying plan.',
        body: 'Start free and get a forecast from the records you already have, or book a demo and walk through the switch using your own Cin7 exports.',
      },
    },
    sourceNote: 'Cin7 prices, users, sale-order and integration limits, add-on packaging, and onboarding options were checked against Cin7’s public pricing page on October 17, 2026. Spark details reflect current Spark pricing and the product as it ships today.',
    trademark: 'Cin7, Cin7 Core, Cin7 Omni, and Cin7 ForesightAI are trademarks of their respective owners. Spark Inventory is not affiliated with or endorsed by Cin7.',
    relatedLinks: [
      { href: '/features/purchasing/', label: 'Forecasting and reorder planning' },
      { href: '/features/wholesale-suppliers/', label: 'Wholesale and supplier portals' },
      { href: '/integrations/', label: 'Integrations' },
      { href: '/features/tools-services/', label: 'Sparki, MCP, and AI tools' },
      { href: '/pricing/', label: 'Pricing' },
    ],
    faqs: [
      { question: 'How hard is it to switch from Cin7?', answer: 'Export your products, customers, suppliers, and order history from Cin7 and hand them to Sparki in app, or to your own AI assistant through Spark MCP. Spark profiles the files, maps and validates the records, and shows you the proposed import. Nothing lands until you approve it, and there is no onboarding fee.' },
      { question: 'Is demand forecasting included with Spark?', answer: 'Yes. Forecasting is the core of Spark, not an add-on. The Free plan gives one user a monthly forecast and buying plan, and Solo and above keep it live with reorder alerts and draft purchase orders.' },
      { question: 'Does Spark charge per user?', answer: 'No. Solo, Operate, and Scale include unlimited users, and Spark does not meter SKUs or warehouses. Free is a single-user forecasting plan.' },
      { question: 'Does Spark connect to Shopify, Amazon, and QuickBooks Online?', answer: 'Yes. Spark connects Shopify, Amazon, WooCommerce, Square, Faire, Etsy, and Meta shops, with QuickBooks Online, Xero, or Zoho Books for accounting, and ShipStation and Flexport for shipping.' },
      { question: 'Can we try Spark before we switch?', answer: 'Yes. Start on the Free forecasting plan with your own data, or start a 14-day free trial of Solo, Operate, or Scale. You can also book a demo and walk through the switch using your Cin7 exports.' },
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
    eyebrow: 'For teams switching from Zoho Inventory',
    accent: 'emerald',
    heroBody:
      'Spark Inventory forecasts demand for every SKU, turns it into a purchase order your team reviews, and runs purchasing, warehousing, and manufacturing around that plan. Bring the whole team on any paid plan, keep QuickBooks Online, Xero, or Zoho Books, and let Sparki move your Zoho data for you.',
    sourceLabel: 'Zoho Inventory pricing',
    sourceUrl: 'https://www.zoho.com/us/inventory/pricing/',
    snapshot: [],
    migrationSignals: ['Items + composites', 'Customers + vendors', 'Orders + purchasing history'],
    themes: [
      {
        number: '01',
        label: 'Forecasting',
        title: 'Buy from a forecast, not a reorder level',
        body: 'A reorder level tells you when you are already low. Spark forecasts demand for every SKU with seasonal curves, weighs stock on hand and incoming purchase orders against supplier lead times, and drafts the order before you run short.',
        incumbent: 'Reorder levels and replenishment alerts.',
        spark: 'Per-SKU forecasts, seasonal curves, lead-time risk, and a draft PO with the reasoning shown.',
      },
      {
        number: '02',
        label: 'Your team',
        title: 'Bring everyone in without counting seats',
        body: 'Buyers, warehouse staff, and the owner all work from the same plan. Spark does not charge per user on paid plans, and it does not meter SKUs or warehouses either.',
        incumbent: '1 to 10 users and 1 to 10 locations by plan; extra users are $7.50 and extra locations $10 a month.',
        spark: 'Unlimited users on Solo, Operate, and Scale, with no warehouse meter.',
      },
      {
        number: '03',
        label: 'Your books',
        title: 'Keep the accounting system you already use',
        body: 'Spark sends invoices, bills, credit notes, and vendor credits to QuickBooks Online, Xero, or Zoho Books, with a sync history you can check.',
        incumbent: 'Built to pair with Zoho Books and the rest of the Zoho suite.',
        spark: 'QuickBooks Online, Xero, or Zoho Books. Your choice.',
      },
      {
        number: '04',
        label: 'Manufacturing',
        title: 'Real manufacturing, not just kits',
        body: 'When you make or assemble products, Spark plans components alongside finished goods in the same system as your inventory and purchasing.',
        incumbent: 'Composite items for kits and bundles.',
        spark: 'Multi-level BOMs, spec templates, manufacturing orders, and component-priced vendor price books on Scale.',
      },
      {
        number: '05',
        label: 'AI that acts',
        title: 'An AI teammate that does the work, with your approval',
        body: 'Sparki works inside the app, Spark Signal proposes the next action, Sparki answers by text, and your own assistant can connect over MCP. Every change waits for a person to approve it.',
        incumbent: 'Workflow rules and custom functions you configure yourself.',
        spark: 'Sparki, Spark Signal, plain-English automation rules, Text with Sparki, and governed MCP access.',
      },
      {
        number: '06',
        label: 'Switching',
        title: 'An import you review, not a project you staff',
        body: 'Hand Sparki your Zoho Inventory exports. It profiles the files, maps and validates the records, and shows you the proposed import before anything lands.',
        incumbent: 'Guided setup is offered through Zoho’s separate Jumpstart program.',
        spark: 'Self-serve, agent-led import with your approval at every step. No onboarding fee.',
      },
    ],
    comparison: [
      { category: 'Demand forecasting', competitor: 'Reorder levels and replenishment alerts.', spark: 'Per-SKU forecasts, seasonal curves, and a buying plan. Free for one user.', lean: 'spark' },
      { category: 'Users', competitor: '1, 3, 5, or 10 users by plan; $7.50 per extra user per month.', spark: 'Unlimited users on every paid plan.', lean: 'spark' },
      { category: 'Locations', competitor: '1 to 10 locations by plan; $10 per extra location per month.', spark: 'No warehouse meter on any plan.', lean: 'spark' },
      { category: 'Accounting', competitor: 'Built to pair with Zoho Books.', spark: 'QuickBooks Online, Xero, or Zoho Books.', lean: 'spark' },
      { category: 'Manufacturing', competitor: 'Composite items for kits and bundles.', spark: 'Multi-level BOMs, spec templates, and manufacturing orders on Scale.', lean: 'spark' },
      { category: 'Wholesale and suppliers', competitor: 'Customer portal from Standard; vendor portal from Premium.', spark: 'Wholesale store with cart and checkout, supplier portal, EDI, and supplier invoice matching.', lean: 'spark' },
      { category: 'AI', competitor: 'Workflow rules and custom functions you configure.', spark: 'Sparki agent, Spark Signal actions, automation rules, Text with Sparki, and governed MCP.', lean: 'spark' },
    ],
    stayReasons: [],
    switchReasons: [
      'You want purchasing driven by real demand, including seasonal swings, instead of reorder levels.',
      'You want everyone on the team in the system without paying for each seat or location.',
      'You run QuickBooks Online or Xero, or want the freedom to choose your accounting system.',
      'You make or assemble products and want manufacturing in the same system as inventory.',
      'You want an AI agent to handle setup and routine work, with a person approving every change.',
    ],
    staySummary: 'The subscription is rarely the expensive part of inventory. Cash tied up in the wrong stock and sales lost to stockouts cost more, and the buying decision is where Spark is built to help.',
    salesCopy: {
      heroHeadline: { lead: 'Switching from Zoho Inventory?', highlight: 'Spark plans the buy, not just the reorder level.' },
      heroFootnote: 'Unlimited users on paid plans · Free forecasting plan · Sparki handles the import',
      heroPanel: { kicker: 'ZOHO VS SPARK', title: 'What changes when you switch', badge: 'AT A GLANCE' },
      heroReasons: [
        { label: 'Planning', incumbent: 'Reorder levels and replenishment alerts', spark: 'Per-SKU demand forecasts and draft POs, free to start' },
        { label: 'Team seats', incumbent: '1 to 10 users by plan, then $7.50 per extra user each month', spark: 'Unlimited users on every paid plan' },
        { label: 'Accounting', incumbent: 'Built to pair with Zoho Books', spark: 'QuickBooks Online, Xero, or Zoho Books' },
      ],
      sourceChecked: 'October 17, 2026',
      themes: {
        eyebrow: 'Why Spark',
        title: 'Six reasons teams pick Spark over Zoho Inventory',
        body: 'Each one is a workflow you can open in Spark today. Zoho details come from Zoho Inventory’s public US pricing page.',
      },
      comparison: {
        eyebrow: 'Side by side',
        title: 'Spark vs Zoho Inventory, line by line',
        body: 'Plan details reflect each company’s published pricing.',
      },
      fit: { eyebrow: 'Is Spark right for you?', title: 'Spark is built for teams that' },
      closing: {
        eyebrow: 'See it with your own data',
        lead: 'Bring your Zoho data.',
        highlight: 'See your forecast and buying plan.',
        body: 'Start free and get a forecast from the records you already have, or book a demo and walk through the switch using your own Zoho Inventory exports.',
      },
    },
    sourceNote: 'Zoho Inventory users, locations, portals, composite items, add-on prices, and the Jumpstart program were checked against Zoho Inventory’s public US pricing page on October 17, 2026. Spark details reflect current Spark pricing and the product as it ships today.',
    trademark: 'Zoho, Zoho Inventory, Zoho Books, Zoho CRM, Zoho Commerce, and Zia are trademarks of Zoho Corporation. Spark Inventory is not affiliated with or endorsed by Zoho.',
    relatedLinks: [
      { href: '/features/purchasing/', label: 'Forecasting and reorder planning' },
      { href: '/features/accounting/', label: 'Accounting and QuickBooks' },
      { href: '/features/manufacturing/', label: 'Manufacturing and BOMs' },
      { href: '/integrations/', label: 'Integrations' },
      { href: '/pricing/', label: 'Pricing' },
    ],
    faqs: [
      { question: 'How hard is it to switch from Zoho Inventory?', answer: 'Export your items, customers, vendors, and order history from Zoho Inventory and hand them to Sparki in app, or to your own AI assistant through Spark MCP. Spark profiles the files, maps and validates the records, and shows you the proposed import. Nothing lands until you approve it, and there is no onboarding fee.' },
      { question: 'Can I keep Zoho Books?', answer: 'Yes. Spark sends invoices, bills, credit notes, and vendor credits to Zoho Books, QuickBooks Online, or Xero, so you can keep your books where they are.' },
      { question: 'Why pay for Spark when Zoho Inventory starts at $29?', answer: 'Because the subscription is rarely the expensive part of inventory. Cash tied up in the wrong stock and sales lost to stockouts cost more, and the buying decision is what Spark is built around. Paid plans also include unlimited users, so the price does not climb as the team grows.' },
      { question: 'Does Spark charge per user?', answer: 'No. Solo, Operate, and Scale include unlimited users, and Spark does not meter SKUs or warehouses. Free is a single-user forecasting plan.' },
      { question: 'Can we try Spark before we switch?', answer: 'Yes. Start on the Free forecasting plan with your own data, or start a 14-day free trial of Solo, Operate, or Scale. You can also book a demo and walk through the switch using your Zoho Inventory exports.' },
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
        body: 'Sparki works inside the app, Spark Signal proposes the next action, Sparki answers by text, and your own assistant can connect over MCP. Every change waits for a person to approve it.',
        incumbent: 'An AI Report Assistant, with Inventory API & MCP as a $49 monthly add-on on Lite and Core.',
        spark: 'Sparki, Spark Signal, plain-English automation rules, Text with Sparki, and governed MCP access.',
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
      { category: 'AI', competitor: 'AI Report Assistant; Inventory API & MCP is a $49 monthly add-on on Lite and Core.', spark: 'Sparki agent, Spark Signal actions, automation rules, Text with Sparki, and governed MCP.', lean: 'spark' },
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
  linnworks: {
    key: 'linnworks',
    name: 'Linnworks',
    fullName: 'Linnworks',
    slug: '/linnworks-alternative/',
    eyebrow: 'For teams switching from Linnworks',
    accent: 'cyan',
    heroBody:
      'Spark Inventory is built around the buying decision. Demand ESP forecasts every SKU, sizes safety stock from real supplier lead times, and drafts the purchase order for your team to approve. Pricing is published, forecasting is included from the Free plan, and Sparki moves your Linnworks data for you.',
    sourceLabel: 'Linnworks pricing',
    sourceUrl: 'https://www.linnworks.com/pricing/',
    snapshot: [],
    migrationSignals: ['Products + SKUs', 'Suppliers + purchase orders', 'Orders + sales history'],
    themes: [
      {
        number: '01',
        label: 'Forecasting',
        title: 'Forecasting is the product, not an add-on',
        body: 'Demand ESP sorts every SKU as steady, trending, seasonal or intermittent, picks the forecasting model that best predicts its own history, adds back sales lost to stockouts, and turns the result into a reorder point and a draft purchase order.',
        incumbent: 'Stock forecasting is a paid add-on to Linnworks Advanced. Seasonality and promotions are adjusted manually in the built-in version.',
        spark: 'Per-SKU Demand ESP forecasts with automatic seasonality, demand events, and draft POs, starting on the Free plan.',
      },
      {
        number: '02',
        label: 'Alerts',
        title: 'Know when to reorder, by text',
        body: 'Spark watches inventory position (on hand, open purchase orders, inbound transfers and committed sales orders) against each reorder point. Text with Sparki tells you when an item needs ordering, and you approve the drafted PO with one reply.',
        incumbent: 'Linnworks says alerts are not currently available for stock forecasting.',
        spark: 'Live reorder alerts and Text with Sparki on Solo ($99/mo) and up.',
      },
      {
        number: '03',
        label: 'Pricing',
        title: 'A price you can see before you talk to sales',
        body: 'Spark publishes every plan. Start free, or start a 14-day trial of any paid plan, without a call or a quote.',
        incumbent: 'Quote-based pricing tiered by monthly orders, with overage charges. Every package has a one-off onboarding fee.',
        spark: 'Free; Solo $99, Operate $349, Scale $749 a month. No onboarding fee.',
      },
      {
        number: '04',
        label: 'AI that acts',
        title: 'An AI teammate that does the work, with your approval',
        body: 'Sparki works inside the app, Spark Signal proposes the next action, Sparki answers by text, and Claude, ChatGPT or any MCP client can connect through Spark MCP. Every change waits for a person to approve it.',
        incumbent: 'Spotlight AI is listed among Linnworks features.',
        spark: 'Sparki, Spark Signal, reorder rules in Observe, Propose or Autopilot mode, Text with Sparki, and governed MCP access.',
      },
      {
        number: '05',
        label: 'Switching',
        title: 'An import you review, not a project you staff',
        body: 'Hand Sparki your Linnworks exports. It profiles the files, maps and validates the records, and shows you the proposed import before anything lands.',
        incumbent: 'A guided onboarding plan with a one-off fee on every package.',
        spark: 'Self-serve, agent-led import with your approval at every step. No onboarding fee.',
      },
      {
        number: '06',
        label: 'One system',
        title: 'Wholesale, manufacturing and scanning on the same plan',
        body: 'A B2B wholesale store, supplier portal, EDI, bills of materials and the mobile warehouse app all run on the same inventory and the same forecast in Spark.',
        incumbent: 'Warehouse management, listing, and forecasting are separately priced modules.',
        spark: 'Wholesale, supplier, EDI and mobile workflows in the same system, with manufacturing on Scale.',
      },
    ],
    comparison: [
      { category: 'Demand forecasting', competitor: 'Paid add-on to Linnworks Advanced; seasonality and promotions adjusted manually.', spark: 'Demand ESP per-SKU forecasts with automatic seasonality and a buying plan. Free for one user.', lean: 'spark' },
      { category: 'Reorder alerts', competitor: 'Not currently available for stock forecasting.', spark: 'Live reorder alerts and Text with Sparki from Solo up.', lean: 'spark' },
      { category: 'Safety stock and lead times', competitor: 'Sales velocity and supplier lead times.', spark: 'Safety stock sized from forecast error and lead time variability learned from your purchase orders.', lean: 'spark' },
      { category: 'Published price', competitor: 'Quote-based, tiered by monthly orders with overage charges.', spark: 'Free; Solo $99, Operate $349, and Scale $749 per month, each paid plan with a 14-day free trial.', lean: 'spark' },
      { category: 'Getting started', competitor: 'One-off onboarding fee on every package.', spark: 'Sparki maps and validates your Linnworks exports for approval. No onboarding fee.', lean: 'spark' },
      { category: 'Marketplace channels', competitor: '100+ channel integrations and listing management tools.', spark: 'Shopify, Amazon, WooCommerce, Square, Faire, Etsy, and Meta shops, with no per-connection fee.', lean: 'tradeoff' },
      { category: 'Wholesale and suppliers', competitor: 'Focused on ecommerce order management.', spark: 'Wholesale store, supplier portal, EDI, and supplier invoice matching.', lean: 'spark' },
      { category: 'AI', competitor: 'Spotlight AI.', spark: 'Sparki agent, Spark Signal actions, automation rules, Text with Sparki, and governed MCP.', lean: 'spark' },
    ],
    stayReasons: [],
    switchReasons: [
      'You want forecasting and draft purchase orders included, not priced as an add-on.',
      'You want to be told when to reorder, by text, instead of checking a report.',
      'You want to see the price before you talk to sales, with no onboarding fee.',
      'You sell wholesale or make products as well as selling online, and want it in one system.',
      'You want an AI agent to handle setup and routine work, with a person approving every change.',
    ],
    staySummary: 'Order routing keeps you shipping. The buying decision decides how much cash sits on your shelves, and that is where Spark is built to help.',
    salesCopy: {
      heroHeadline: { lead: 'Switching from Linnworks?', highlight: 'Forecasting and reorder alerts included.' },
      heroFootnote: 'Published pricing · Forecasting from the Free plan · Sparki handles the import',
      heroPanel: { kicker: 'LINNWORKS VS SPARK', title: 'What changes when you switch', badge: 'AT A GLANCE' },
      heroReasons: [
        { label: 'Forecasting', incumbent: 'A paid add-on to Linnworks Advanced', spark: 'Demand ESP forecasts and draft POs, free to start' },
        { label: 'Reorder alerts', incumbent: 'Not currently available for stock forecasting', spark: 'Live alerts and Text with Sparki from Solo up' },
        { label: 'Pricing', incumbent: 'Quote-based, plus a one-off onboarding fee', spark: 'Published plans from $0. No onboarding fee.' },
      ],
      sourceChecked: 'October 26, 2026',
      themes: {
        eyebrow: 'Why Spark',
        title: 'Six reasons teams pick Spark over Linnworks',
        body: 'Each one is a workflow you can open in Spark today. Linnworks details come from Linnworks’ public pricing and stock forecasting pages.',
      },
      comparison: {
        eyebrow: 'Side by side',
        title: 'Spark vs Linnworks, line by line',
        body: 'Linnworks does not publish prices, so this compares packaging and capability.',
      },
      fit: { eyebrow: 'Is Spark right for you?', title: 'Spark is built for teams that' },
      closing: {
        eyebrow: 'See it with your own data',
        lead: 'Bring your Linnworks data.',
        highlight: 'See your forecast and buying plan.',
        body: 'Start free and get a forecast from the records you already have, or book a demo and walk through the switch using your own Linnworks exports.',
      },
    },
    sourceNote: 'Linnworks pricing model, onboarding fee, add-on packaging, forecasting method, and alert availability were checked against Linnworks’ public pricing and stock forecasting pages on October 26, 2026. Spark details reflect current Spark pricing and the product as it ships today.',
    trademark: 'Linnworks, SkuVault, and Inventory Planner are trademarks of their respective owners. Spark Inventory is not affiliated with or endorsed by Linnworks.',
    relatedLinks: [
      { href: '/features/purchasing/', label: 'Forecasting and reorder planning' },
      { href: '/reorder-point-calculator/', label: 'Reorder point calculator' },
      { href: '/features/wholesale-suppliers/', label: 'Wholesale and supplier portals' },
      { href: '/integrations/', label: 'Integrations' },
      { href: '/pricing/', label: 'Pricing' },
    ],
    faqs: [
      { question: 'How hard is it to switch from Linnworks?', answer: 'Export your products, suppliers, purchase orders, and order history from Linnworks and hand them to Sparki in app, or to your own AI assistant through Spark MCP. Spark profiles the files, maps and validates the records, and shows you the proposed import. Nothing lands until you approve it, and there is no onboarding fee.' },
      { question: 'Is forecasting included in Spark?', answer: 'Yes. Demand ESP forecasts every SKU from its own sales history, including seasonality, and builds a reorder and buying plan on the Free plan. Solo ($99/mo) and up add continuous forecasts, live reorder alerts, and Text with Sparki.' },
      { question: 'How does Spark decide when to reorder?', answer: 'Spark compares each item’s inventory position (on hand plus open purchase orders and inbound transfers, less committed sales orders) to a reorder point it recalculates per SKU and per warehouse. Safety stock comes from how far past forecasts missed and how much supplier lead times vary, at the service level you choose.' },
      { question: 'Does Spark connect to Amazon and Shopify?', answer: 'Yes. Spark connects to Shopify, Amazon, WooCommerce, Square, Faire, Etsy, and Meta shops, plus QuickBooks Online, Xero, Zoho Books, ShipStation, and Flexport, with no per-connection fee from Solo up.' },
      { question: 'Does Spark charge per user?', answer: 'No. Solo, Operate, and Scale include unlimited users. Free is a single-user forecasting plan.' },
      { question: 'Can we try Spark before we switch?', answer: 'Yes. Start on the Free forecasting plan with your own data, or start a 14-day free trial of Solo, Operate, or Scale. You can also book a demo and walk through the switch using your Linnworks exports.' },
    ],
    ctaOptions: {
      source: 'linnworks_lp',
      defaults: { utm_source: 'linnworks_lp', utm_medium: 'website', utm_campaign: 'competitor' },
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
