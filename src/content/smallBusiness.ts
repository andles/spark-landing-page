// Copy for /small-business-inventory-software/. Semrush shows "inventory system
// for small business" and its variants as low-difficulty searches where inFlow
// ranks with its homepage. Google ranks a mix of product pages and "how to
// choose" guides for them, so this page is both.
//
// Spark facts come from pricingData.ts and the feature pages. Competitor facts
// come from alternativesData.ts (sourced, dated) so the two pages cannot drift.
// The FAQs are also emitted as FAQPage JSON-LD from routeMeta.ts.
import type { Faq } from '../pages/features/featureFaqs';

export const smallBusinessChecklist = [
  {
    title: 'Count who needs access',
    body: 'Owners, buyers, and warehouse staff all touch inventory. Plans that cap users get expensive as you hire, so check the price of each extra seat.',
  },
  {
    title: 'Check what each plan caps',
    body: 'Look at monthly orders, locations, SKUs, and integrations. A low entry price can hide a limit you reach in your first busy season.',
  },
  {
    title: 'Look past the reorder point',
    body: 'A reorder point tells you an item is low. A demand forecast tells you how much to buy, given seasonality, lead times, and what is already on order.',
  },
  {
    title: 'Ask about setup fees',
    body: 'Some vendors require a paid onboarding package on their higher plans. Find out what setup costs before you compare monthly prices.',
  },
  {
    title: 'Connect where you sell and where you keep the books',
    body: 'Your inventory system should read orders from your store and marketplaces and stay in step with your accounting software, so nobody types numbers twice.',
  },
] as const;

export const smallBusinessFaqs: Faq[] = [
  {
    question: 'What is the best inventory system for a small business?',
    answer: 'The best fit depends on what you need the system to do. Spark Inventory is built for small product businesses that need to know what to reorder: it tracks stock across locations and channels, forecasts demand for each SKU, and drafts the purchase order for you to approve. It is free for one user, and paid plans start at $99 a month with unlimited users. If you mainly need barcode stock control, inFlow is an option, and if you already run on Zoho apps, Zoho Inventory has a low entry price.',
  },
  {
    question: 'Is there free inventory software for small businesses?',
    answer: 'Yes. Spark Inventory’s Free plan gives one user a per-SKU demand forecast with seasonal curves, dead stock and days-of-supply reports, and a monthly reorder and buying plan, with no time limit. Zoho Inventory and Katana also offer free plans: Zoho’s covers 50 orders a month, and Katana’s covers up to 30 SKUs.',
  },
  {
    question: 'How much does inventory software cost for a small business?',
    answer: 'Published prices run from free to several hundred dollars a month. On vendor pricing pages checked November 6, 2026, Zoho Inventory’s paid plans run $29 to $249 a month, inFlow starts at $99 a month for two team members, Fishbowl starts at $229 a month for two users, and Spark Inventory’s paid plans start at $99 a month with unlimited users. Also check for required onboarding fees, per-user charges, and add-ons such as forecasting or manufacturing.',
  },
  {
    question: 'Can I scan barcodes with my phone?',
    answer: 'Yes. Spark Inventory Mobile runs on iPhone, iPad, and Android and reads UPC, EAN, Code 128, QR, DataMatrix, and more with the phone camera. Rugged handhelds such as Zebra and Sunmi devices work in keyboard mode.',
  },
  {
    question: 'Can I move over from spreadsheets?',
    answer: 'Yes. Import your items and sales history from a file, or connect a supported source such as Shopify, Amazon, WooCommerce, Square, or QuickBooks Online. Sparki, or your own AI assistant over MCP, maps and validates the import for you to approve, with no onboarding fee.',
  },
  {
    question: 'Does Spark charge per user, SKU, or location?',
    answer: 'No. The Free plan includes one user, and every paid plan includes unlimited users. Spark does not meter SKUs or warehouse count. Paid plans differ by what they let you do and by included monthly orders.',
  },
];
