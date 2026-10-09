// FAQs for the mobile, signals, wholesale, and integrations pages. Each list is
// rendered on its page and emitted as FAQPage JSON-LD from routeMeta.ts, so the
// structured data always matches the visible answers.

export interface Faq {
  question: string;
  answer: string;
}

export const mobileFaqs: Faq[] = [
  {
    question: 'Does Spark Inventory have a mobile app?',
    answer: 'Yes. Spark Inventory Mobile runs on iPhone, iPad, and Android. Your team can receive, put away, pick, pack, ship, count, move, and adjust stock from the floor, and every scan updates the same inventory your plan and purchase orders use.',
  },
  {
    question: 'Which barcode scanners work with the Spark mobile app?',
    answer: 'You can scan with the phone camera, which reads UPC, EAN, Code 128, QR, DataMatrix, and more. Rugged handhelds such as Zebra and Sunmi devices work in keyboard mode.',
  },
  {
    question: 'Can I receive a purchase order on my phone?',
    answer: 'Yes. Open the purchase order, scan what arrived, and put it away to a bin. Short, over-received, and unlisted lines are flagged as you go, and a barcode the PO does not list can be received without leaving the dock.',
  },
  {
    question: 'Does the mobile app support picking and packing?',
    answer: 'Yes. Pickers work the pick list by scan or let Auto Pick fill the open lines, then scan each item into its package with UPC verification and ship out from the same flow.',
  },
  {
    question: 'Can I run in-store pickup from an iPad?',
    answer: 'Yes. The Pickup Monitor runs on a docked iPad with a live board of pickup orders, customer text threads, ready notifications, and printable pick tickets.',
  },
];

export const signalsFaqs: Faq[] = [
  {
    question: 'What is Spark Signal?',
    answer: 'Spark Signal is one inbox for what needs attention in your inventory. Spark watches stock, demand, suppliers, and sales channels, then turns what it finds into proposed actions with the evidence attached. You approve, prepare, dismiss, or undo each one on the web or from your phone.',
  },
  {
    question: 'What kinds of signals does Spark send?',
    answer: 'Reorder and backorder alerts, demand and velocity changes, expiring, stale, and slow-moving stock, Shopify and Amazon FBA quantity mismatches, supplier price changes, supplier emails about open purchase orders, invoice discrepancies, and receiving variances.',
  },
  {
    question: 'How do I create an inventory automation rule?',
    answer: 'Describe the rule in plain English and Spark drafts it. You set conditions and a schedule, run a dry run against your own data, and Spark checks it against your existing rules for conflicts before it goes live.',
  },
  {
    question: 'What is the difference between Observe, Propose, and Autopilot?',
    answer: 'Observe surfaces the signal in the feed without drafting an action. Propose drafts the action and waits for your approval. Autopilot drafts and runs the action, and you see the result already done. You can change the mode or turn a rule off at any time.',
  },
  {
    question: 'What is Spark Solo?',
    answer: 'Spark Solo lets owners and admins text Spark questions about their account and get a morning summary, a weekly summary, and urgent alerts. Changes made by text need a confirmation reply first. Spark Solo is a paid add-on.',
  },
];

export const wholesaleFaqs: Faq[] = [
  {
    question: 'Does Spark Inventory include a B2B wholesale store?',
    answer: 'Yes. Wholesale customers order from a branded store with your catalog, item pages, cart, and checkout, backed by the same stock Spark plans. You invite buyers and control what each member of a customer account can see and do.',
  },
  {
    question: 'What can suppliers do in the vendor portal?',
    answer: 'Invited suppliers log in to see the purchase orders and items you share with them, add shipping status and tracking, and request changes to dates or quantities. Your buyers review each change request before anything changes.',
  },
  {
    question: 'Does Spark support EDI?',
    answer: 'Yes. Spark exchanges purchase orders, invoices, and shipping notices with trading partners over EDI, with document and item mappings managed in Spark.',
  },
  {
    question: 'How does Spark match supplier invoices?',
    answer: 'Spark reads supplier invoices and flags discrepancies and unmatched invoices against your purchase orders and receipts.',
  },
];

export const integrationsFaqs: Faq[] = [
  {
    question: 'What does Spark Inventory integrate with?',
    answer: 'Spark connects to Shopify, Amazon Seller Central and FBA, WooCommerce, Square, Faire, Etsy, and Meta Commerce for sales; QuickBooks Online, Xero, and Zoho Books for accounting; ShipStation, Flexport, and EDI for shipping and trading partners; Spark Payments and Gmail; and Claude or ChatGPT over MCP.',
  },
  {
    question: 'Does Spark sync inventory with Shopify?',
    answer: 'Yes. Spark brings in Shopify products, stock, and sales history, syncs inventory at the location level, and alerts you when Shopify and Spark quantities drift apart.',
  },
  {
    question: 'Which accounting systems does Spark connect to?',
    answer: 'QuickBooks Online, Xero, and Zoho Books. Spark sends invoices, bills, credit notes, and other accounting documents, with a sync history you can check. QuickBooks can also bring in sales and purchase history.',
  },
  {
    question: 'Can I connect my own AI assistant to Spark?',
    answer: 'Yes. Claude, ChatGPT, or another approved assistant connects to Spark over MCP, with read-only or read and write access that you control.',
  },
  {
    question: 'What if my system is not listed?',
    answer: 'Ask the Spark team about NetSuite, BigCommerce, Walmart, ShipBob, or any other system you use.',
  },
];

export function buildFaqPageSchema(id: string, faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
