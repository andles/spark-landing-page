// Copy for /reorder-in-chatgpt/, the landing page for paid ChatGPT ads only.
//
// Why a separate page (2026-11-17): ChatGPT ad visitors are almost all on an
// iPhone inside the ChatGPT app, and none of them scrolled past the first
// screen of /chatgpt-inventory-management/ (PostHog, Nov 12 to 17). That page
// serves both ChatGPT and Claude and stays as it is for search and site
// visitors. This one matches the ad ("Know what to reorder"), shows the
// example answer in the first phone screen, and asks for one action: add Spark
// to ChatGPT. It is noindex and out of the sitemap so it never competes with
// the main page in search.
//
// Facts come from the published ChatGPT listing and aiAssistants.ts. No
// outcome metrics: see AGENTS.md "Marketing evidence".
import type { Faq } from '../pages/features/featureFaqs';

export const CHATGPT_AD_PATH = '/reorder-in-chatgpt';

/** The data sources a visitor needs one of before the answer can be theirs. */
export const chatgptAdDataSources = 'Works with your Shopify, QuickBooks or a spreadsheet';

export const chatgptAdSteps = [
  {
    title: 'Add Spark Inventory to ChatGPT',
    body: 'Tap Add to ChatGPT and add the Spark Inventory plugin from ChatGPT\'s plugin directory.',
  },
  {
    title: 'Create your free account',
    body: 'A browser window opens on Spark. Create a free account or sign in. Passwords and email codes stay in the browser, never in chat.',
  },
  {
    title: 'Bring in your data and ask',
    body: 'Connect Shopify or QuickBooks, or import a spreadsheet of past sales. Then ask ChatGPT what to reorder.',
  },
];

export const chatgptAdFaqs: Faq[] = [
  {
    question: 'Is it really free?',
    answer:
      'Yes. Spark has a free plan for one user, with no credit card. You create the account in the browser window that opens when you first connect from ChatGPT.',
  },
  {
    question: 'What data does Spark need?',
    answer:
      'Your past sales and current stock. Connect Shopify or QuickBooks, or import a spreadsheet. Supplier lead times make the reorder dates more accurate, and you can add them later.',
  },
  {
    question: 'Can ChatGPT change my inventory or send an order on its own?',
    answer:
      'No. You choose read-only or read and write access when you connect. With write access, ChatGPT prepares a purchase order and shows a preview, and nothing is issued or emailed to a supplier until you confirm it.',
  },
  {
    question: 'Who can see my data?',
    answer:
      'Each connection sees only your own Spark workspace, and you can revoke it from Spark at any time.',
  },
];
