// ─────────────────────────────────────────────────────────────────────────────

import { buildFaqSchema } from '../agency/campaignFaqs';
import { homeFaqs } from '../agency/homeFaqs';
// Per-route SEO metadata - single source of truth.
//
// Used in two places:
// - scripts/prerender.mjs bakes these into the static HTML at build time
//   (title, meta description, canonical, Open Graph tags, sitemap.xml)
// - RouteMetaUpdater applies title/description on client-side navigation
//
// Routes NOT listed here are not prerendered and keep the index.html defaults
// (/book-a-call is a client-side redirect; /r/:slug reports are unlisted).
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://sparkinventory.com';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  /** Date of the last significant visible-content or structured-data change (YYYY-MM-DD). */
  lastModified?: string;
  /** More specific schema.org page type when WebPage is too generic. */
  webPageType?: 'WebPage' | 'CollectionPage' | 'ContactPage';
  /** Exclude from search indexes (baked as <meta name="robots">, kept out of sitemap.xml) */
  noindex?: boolean;
  /** Canonical URL path when this route is an alias of another */
  canonical?: string;
  /** Additional schema.org nodes added to the page's JSON-LD graph. */
  schema?: Record<string, unknown>[];
  /**
   * Raw HTML injected into this route's <head> at prerender time, after the
   * SEO tags (and therefore after the global gtag base tag in index.html).
   * Used for per-page tracking snippets. Only runs on a full page load of the
   * prerendered file, which is what a Calendly redirect produces.
   */
  headHtml?: string;
}

/**
 * Google Ads event snippet for the "Sign-up" conversion action. Fires on the
 * /meeting-confirmed page, which Calendly redirects to after a real booking,
 * so one booking = one conversion. The AW-17962279599 base tag is loaded
 * globally in index.html; this only sends the event.
 */
export const MEETING_CONFIRMED_CONVERSION_SNIPPET = `<!-- Event snippet for Sign-up conversion page -->
<script>
  gtag('event', 'conversion', {'send_to': 'AW-17962279599/4ZHsCJbXouQcEK_FivVC'});
</script>`;

const HOME_SCHEMA: Record<string, unknown>[] = [
  {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software`,
    name: 'Spark Inventory',
    url: `${SITE_URL}/`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Inventory Management Software',
    operatingSystem: 'Web, iOS, Android',
    description:
      'AI inventory management software for multichannel brands selling on Shopify, Amazon, and wholesale channels.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    featureList: [
      'AI demand forecasting',
      'Multichannel inventory management',
      'Purchase order recommendations and approvals',
      'Warehouse and manufacturing workflows',
      'QuickBooks and ecommerce integrations',
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '199',
      highPrice: '749',
      priceCurrency: 'USD',
      offerCount: '3',
      url: `${SITE_URL}/#pricing`,
    },
  },
  {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: homeFaqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  },
];

export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    title: 'AI Inventory Management Software for Shopify & Amazon | Spark',
    description:
      'Forecast demand, reduce stockouts, and turn sales into draft purchase orders. AI inventory management for Shopify, Amazon, and wholesale brands.',
    lastModified: '2026-08-24',
    schema: HOME_SCHEMA,
  },
  {
    path: '/3pl',
    title: 'SPARK for 3PLs - AI Forecasting, Price Books & Run Planning',
    description:
      'Give clients AI demand forecasting and live visibility while your team manages vendor price books, run economics, purchasing, and client workspaces in one 3PL platform.',
    lastModified: '2026-08-24',
    schema: [buildFaqSchema('3pl')],
  },
  {
    path: '/in-store-pickup',
    title: 'In-Store Pickup & Order Management - SPARK Inventory',
    description:
      'Run buy-online-pickup-in-store on inventory that is actually accurate. Real-time stock sync, pickup order tracking, and AI demand forecasting in one platform.',
    lastModified: '2026-08-24',
    schema: [buildFaqSchema('pickup')],
  },
  {
    path: '/reduce-stockouts-overstock',
    title: 'Reduce Stockouts & Overstock with AI Forecasting - SPARK',
    description:
      'Reduce excess inventory and stockouts with explainable AI forecasting, adaptive reorder recommendations, and reviewed purchase orders.',
    lastModified: '2026-08-24',
    schema: [buildFaqSchema('stockouts')],
  },
  {
    path: '/reduce-stockouts-&-overstock',
    title: 'Reduce Stockouts & Overstock with AI Forecasting - SPARK',
    description:
      'Reduce excess inventory and stockouts with explainable AI forecasting, adaptive reorder recommendations, and reviewed purchase orders.',
    lastModified: '2026-08-24',
    canonical: '/reduce-stockouts-overstock',
    schema: [buildFaqSchema('stockouts')],
  },
  {
    path: '/fishbowl-alternative',
    title: 'Spark Inventory: the Fishbowl alternative built for Shopify and Amazon',
    description:
      'Switching from Fishbowl Inventory? Spark migrates your Fishbowl data in minutes, builds custom reports in seconds, syncs Shopify, Amazon and QuickBooks natively, and includes consultative onboarding. Free to start.',
    lastModified: '2026-08-24',
    schema: [buildFaqSchema('fishbowl')],
  },
  {
    path: '/meeting-confirmed',
    title: 'Meeting Confirmed - SPARK Inventory',
    description: 'Your call is booked. Here is what to expect and how to prepare.',
    noindex: true,
    headHtml: MEETING_CONFIRMED_CONVERSION_SNIPPET,
  },
  {
    path: '/404',
    title: 'Page Not Found - SPARK Inventory',
    description: 'The page you requested could not be found. Browse Spark Inventory solutions, product features, or support.',
    noindex: true,
  },
  {
    path: '/features/inventory',
    title: 'Inventory Management Software - SPARK',
    description:
      'SKU and variant management, bundles and kits, barcodes, and real-time stock levels across every location and sales channel.',
    lastModified: '2026-08-24',
  },
  {
    path: '/features/purchasing',
    title: 'Purchasing & Purchase Order Software - SPARK',
    description:
      'Purchase orders from request to receipt, supplier management, automated reordering, and AI-recommended order quantities.',
    lastModified: '2026-08-24',
  },
  {
    path: '/features/sales',
    title: 'Sales Orders & Invoicing Software - SPARK',
    description:
      'Sales order management, invoicing and billing, backorders, and multichannel order sync in one system of record.',
    lastModified: '2026-08-24',
  },
  {
    path: '/features/manufacturing',
    title: 'Manufacturing & BOM Software - SPARK',
    description:
      'Multi-level bills of materials, manufacturing orders, and component availability planning tied directly to live inventory.',
    lastModified: '2026-08-24',
  },
  {
    path: '/features/warehousing',
    title: 'Warehouse Management Software - SPARK',
    description:
      'Multi-warehouse inventory, bin-level locations, transfers, and cycle counts with real-time accuracy.',
    lastModified: '2026-08-24',
  },
  {
    path: '/features/tools-services',
    title: 'AI Tools & Services - SPARK Inventory',
    description:
      'Agentic onboarding with Sparki, governed MCP access, smart email processing, and automations that remove manual inventory work.',
    lastModified: '2026-08-24',
  },
  {
    path: '/features/accounting',
    title: 'Accounting & QuickBooks Integration - SPARK',
    description:
      'Two-way QuickBooks Online sync: invoices, payments, and inventory adjustments flow automatically with no double entry.',
    lastModified: '2026-08-24',
  },
  {
    path: '/shopify-inventory-management',
    title: 'Shopify Inventory Management & Forecasting Software | Spark',
    description:
      'Turn Shopify sales into forecasts, reorder recommendations, and draft purchase orders with agent-guided onboarding in Spark or over MCP.',
    lastModified: '2026-08-24',
    schema: [buildFaqSchema('shopify')],
  },
  {
    path: '/partners',
    title: 'Partners - SPARK Inventory',
    description: 'Partner with SPARK: integrations, referrals, and solution partnerships for inventory-driven businesses.',
  },
  {
    path: '/contact',
    title: 'Contact Us - SPARK Inventory',
    description: 'Get in touch with the SPARK team for sales, support, or partnership questions.',
    webPageType: 'ContactPage',
  },
  {
    path: '/sitemap',
    title: 'Sitemap - SPARK Inventory',
    description: 'Browse every public Spark Inventory product, solution, company, support, and legal page.',
    lastModified: '2026-08-24',
    webPageType: 'CollectionPage',
  },
  {
    path: '/support',
    title: 'Support - SPARK Inventory',
    description: 'Help and support resources for SPARK Intelligent Inventory.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy - SPARK Inventory',
    description: 'How SPARK Intelligent Inventory collects, uses, and protects your data.',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service - SPARK Inventory',
    description: 'The terms governing use of SPARK Intelligent Inventory.',
  },
  {
    path: '/app-privacy',
    title: 'App Privacy - SPARK Inventory',
    description: 'Privacy details for the SPARK Inventory mobile and web apps.',
  },
  {
    path: '/data-safety',
    title: 'Data Safety - SPARK Inventory',
    description: 'How SPARK Inventory handles, stores, and secures your business data.',
  },
  {
    path: '/eula',
    title: 'End User License Agreement - SPARK Inventory',
    description: 'End user license agreement for SPARK Intelligent Inventory.',
  },
  {
    path: '/delete-account',
    title: 'Delete Your Account - SPARK Inventory',
    description: 'How to delete your SPARK Inventory account and associated data.',
  },
];

export function findRouteMeta(pathname: string): RouteMeta | undefined {
  const normalized = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return routeMeta.find((r) => r.path === normalized);
}
