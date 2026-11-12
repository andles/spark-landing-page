// Copy for /chatgpt-inventory-management/, the page for running Spark from
// ChatGPT or Claude.
//
// Why this page exists (checked 2026-11-12): most of Spark's real new sign-ups
// since late October started on the connector consent page an AI assistant
// opens, and the Spark Inventory plugin is published in ChatGPT's plugin
// directory. Before this page, nothing on the site linked to that listing.
//
// Facts here come from the published ChatGPT listing (its starter prompts and
// description) and /connect-spark-to-your-assistant/. No outcome metrics: see
// AGENTS.md "Marketing evidence". The FAQs are also emitted as FAQPage JSON-LD
// from routeMeta.ts.
import type { Faq } from '../pages/features/featureFaqs';

/** The Spark Inventory plugin's public page in ChatGPT's plugin directory. */
export const CHATGPT_PLUGIN_URL = 'https://chatgpt.com/plugins/plugin_asdk_app_6ace850d971481918d9f1666dba5fc70';

/** The MCP server URL an assistant connects to (custom connectors in Claude). */
export const SPARK_MCP_URL = 'https://api.sparkinventory.com/mcp';

/** Starter prompts, the same ones the ChatGPT listing shows. */
export const assistantPrompts = [
  'What should I reorder this week, and why?',
  'Which items will run out in the next 30 days?',
  "Draft purchase orders for the recommended reorders, but don't send anything yet.",
];

export const assistantCapabilities = [
  {
    title: 'Plan purchasing',
    body: 'Forecast demand per item, see seasonality, ask why demand changed, find dead stock, and size an order to cover a target date.',
  },
  {
    title: 'Run purchase orders end to end',
    body: 'Draft, issue, email to suppliers, receive, and review cost and quantity variances, with a preview before anything changes.',
  },
  {
    title: 'See all your inventory in one place',
    body: 'Stock by warehouse and location, inventory value, transfers, and orders synced from Shopify, Amazon, QuickBooks, and more.',
  },
  {
    title: 'Get set up from the conversation',
    body: 'Import sales and purchase history from spreadsheets, or migrate from a system like Fishbowl, then ask whether your data is ready to forecast.',
  },
];

export const assistantSteps = [
  {
    title: 'Add Spark Inventory',
    body: 'In ChatGPT, install the Spark Inventory plugin from the plugin directory. In Claude, add Spark as a custom connector with the server URL.',
  },
  {
    title: 'Sign in or create a free account',
    body: 'A browser window opens on Spark. Sign in, or create an account there. Passwords and email codes stay in the browser, never in chat.',
  },
  {
    title: 'Approve the connection',
    body: 'Choose read-only to ask questions, or read and write to let the assistant prepare changes. Then ask your first question in the chat.',
  },
];

export const assistantSafeguards = [
  'A Spark admin approves every connection and picks read-only or read and write access.',
  'Each connection sees only your own workspace.',
  'Nothing is issued or emailed to a supplier until you confirm it.',
  'You can revoke a connection from Spark at any time.',
];

export const assistantFaqs: Faq[] = [
  {
    question: 'Can I manage inventory from ChatGPT?',
    answer:
      'Yes. Spark Inventory is a plugin in ChatGPT\'s plugin directory. Once you connect your Spark workspace, you can ask what is running low, what to reorder and why, and have ChatGPT draft purchase orders that you review before anything is sent.',
  },
  {
    question: 'Does Spark Inventory work with Claude?',
    answer:
      `Yes. Add Spark as a custom connector in Claude with the server URL ${SPARK_MCP_URL}, sign in to Spark in the browser, and approve the connection. On Claude Team or Enterprise, an owner adds the connector for the organization first.`,
  },
  {
    question: 'Do I need a Spark account?',
    answer:
      'Yes. If you do not have one yet, you can create a free account in the browser window that opens when you first connect, then approve the connection and return to your chat.',
  },
  {
    question: 'Can the assistant change my inventory or send a purchase order on its own?',
    answer:
      'No. A read-only connection can only answer questions. With read and write access, the assistant prepares a change and shows a preview, and nothing is issued or emailed to a supplier until you confirm it.',
  },
  {
    question: 'Where does the data come from?',
    answer:
      'From your live Spark workspace: the sales, stock, and supplier data synced from Shopify, Amazon, QuickBooks, and other sources, or imported from your spreadsheets. Each connection sees only your own workspace.',
  },
];
