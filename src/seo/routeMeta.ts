// ─────────────────────────────────────────────────────────────────────────────
// Per-route SEO metadata — single source of truth.
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
  /** Exclude from search indexes (baked as <meta name="robots">, kept out of sitemap.xml) */
  noindex?: boolean;
  /** Canonical URL path when this route is an alias of another */
  canonical?: string;
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

export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    title: 'SPARK — AI Inventory Management That Thinks Ahead',
    description:
      'Transform your inventory management with AI that predicts demand, prevents stockouts, and optimizes your cash flow automatically.',
  },
  {
    path: '/3pl',
    title: 'SPARK for 3PLs — AI Forecasting & Client Portals Under Your Brand',
    description:
      'Give your clients AI demand forecasting, real-time visibility, and a self-serve portal under your brand. The capability that beats commodity warehouses.',
  },
  {
    path: '/in-store-pickup',
    title: 'In-Store Pickup & Order Management — SPARK Inventory',
    description:
      'Run buy-online-pickup-in-store on inventory that is actually accurate. Real-time stock sync, pickup order tracking, and AI demand forecasting in one platform.',
  },
  {
    path: '/reduce-stockouts-overstock',
    title: 'Reduce Stockouts & Overstock with AI Forecasting — SPARK',
    description:
      'Cut excess inventory and stockouts with AI demand forecasting. Automated reorder points and purchase orders — measurable results in 14 days.',
  },
  {
    path: '/reduce-stockouts-&-overstock',
    title: 'Reduce Stockouts & Overstock with AI Forecasting — SPARK',
    description:
      'Cut excess inventory and stockouts with AI demand forecasting. Automated reorder points and purchase orders — measurable results in 14 days.',
    canonical: '/reduce-stockouts-overstock',
  },
  {
    path: '/fishbowl-alternative',
    title: 'Spark Inventory: the Fishbowl alternative built for Shopify and Amazon',
    description:
      'Switching from Fishbowl Inventory? Spark migrates your Fishbowl data in minutes, builds custom reports in seconds, syncs Shopify, Amazon and QuickBooks natively, and includes consultative onboarding. Free to start.',
  },
  {
    path: '/meeting-confirmed',
    title: 'Meeting Confirmed — SPARK Inventory',
    description: 'Your call is booked. Here is what to expect and how to prepare.',
    noindex: true,
    headHtml: MEETING_CONFIRMED_CONVERSION_SNIPPET,
  },
  {
    path: '/features/inventory',
    title: 'Inventory Management Software — SPARK',
    description:
      'SKU and variant management, bundles and kits, barcodes, and real-time stock levels across every location and sales channel.',
  },
  {
    path: '/features/purchasing',
    title: 'Purchasing & Purchase Order Software — SPARK',
    description:
      'Purchase orders from request to receipt, supplier management, automated reordering, and AI-recommended order quantities.',
  },
  {
    path: '/features/sales',
    title: 'Sales Orders & Invoicing Software — SPARK',
    description:
      'Sales order management, invoicing and billing, backorders, and multichannel order sync in one system of record.',
  },
  {
    path: '/features/manufacturing',
    title: 'Manufacturing & BOM Software — SPARK',
    description:
      'Multi-level bills of materials, manufacturing orders, and component availability planning tied directly to live inventory.',
  },
  {
    path: '/features/warehousing',
    title: 'Warehouse Management Software — SPARK',
    description:
      'Multi-warehouse inventory, bin-level locations, transfers, and cycle counts with real-time accuracy.',
  },
  {
    path: '/features/tools-services',
    title: 'AI Tools & Services — SPARK Inventory',
    description:
      'AI-powered CSV import, smart email processing, and automations that remove the manual work from inventory operations.',
  },
  {
    path: '/features/accounting',
    title: 'Accounting & QuickBooks Integration — SPARK',
    description:
      'Two-way QuickBooks Online sync: invoices, payments, and inventory adjustments flow automatically with no double entry.',
  },
  {
    path: '/partners',
    title: 'Partners — SPARK Inventory',
    description: 'Partner with SPARK: integrations, referrals, and solution partnerships for inventory-driven businesses.',
  },
  {
    path: '/contact',
    title: 'Contact Us — SPARK Inventory',
    description: 'Get in touch with the SPARK team for sales, support, or partnership questions.',
  },
  {
    path: '/support',
    title: 'Support — SPARK Inventory',
    description: 'Help and support resources for SPARK Intelligent Inventory.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy — SPARK Inventory',
    description: 'How SPARK Intelligent Inventory collects, uses, and protects your data.',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service — SPARK Inventory',
    description: 'The terms governing use of SPARK Intelligent Inventory.',
  },
  {
    path: '/app-privacy',
    title: 'App Privacy — SPARK Inventory',
    description: 'Privacy details for the SPARK Inventory mobile and web apps.',
  },
  {
    path: '/data-safety',
    title: 'Data Safety — SPARK Inventory',
    description: 'How SPARK Inventory handles, stores, and secures your business data.',
  },
  {
    path: '/eula',
    title: 'End User License Agreement — SPARK Inventory',
    description: 'End user license agreement for SPARK Intelligent Inventory.',
  },
  {
    path: '/delete-account',
    title: 'Delete Your Account — SPARK Inventory',
    description: 'How to delete your SPARK Inventory account and associated data.',
  },
];

export function findRouteMeta(pathname: string): RouteMeta | undefined {
  const normalized = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return routeMeta.find((r) => r.path === normalized);
}
