// Copy for /ai-inventory-management/, an explainer for the search "ai
// inventory management" (Semrush, US, Nov 12 2026: about 1.9K searches a
// month, keyword difficulty 45). The homepage keeps the product title "AI
// Inventory Management Software"; this page answers the question behind the
// search (what AI actually does in inventory, and how to judge a tool) and
// shows how Spark does each part, so the two pages serve different intents.
//
// Spark facts come from the feature pages (Demand ESP, purchasing, Signals,
// Sparki and MCP) and pricingData.ts. No outcome metrics: see AGENTS.md
// "Marketing evidence". The FAQs are also emitted as FAQPage JSON-LD from
// routeMeta.ts.
import type { Faq } from '../pages/features/featureFaqs';

export interface AiInventoryJob {
  title: string;
  body: string;
  /** How Spark does this job. */
  spark: string;
  href: string;
  link: string;
}

export const aiInventoryJobs: AiInventoryJob[] = [
  {
    title: 'Forecast every item from its own history',
    body: 'A spreadsheet applies one rule to every product. An AI forecast looks at each SKU separately: steady sellers, seasonal items, trending items and slow, lumpy ones each need a different method.',
    spark: 'Demand ESP sorts every SKU as steady, trending, seasonal or intermittent, backtests several models on its own history, and keeps the one that predicted best.',
    href: '/demand-forecasting-software/',
    link: 'Demand forecasting',
  },
  {
    title: 'Count the sales you missed',
    body: 'When an item is out of stock, its sales drop to zero. A forecast built on those months learns to buy less, which causes the next stockout.',
    spark: 'Demand ESP counts the days each warehouse actually had the item in stock and scales that month up to what it would have sold.',
    href: '/demand-forecasting-software/',
    link: 'How stockouts are handled',
  },
  {
    title: 'Size safety stock from real errors and lead times',
    body: 'Fixed safety stock rules ignore how wrong the forecast tends to be and how long the supplier really takes. Both change by item.',
    spark: 'Safety stock is sized from each forecast’s past misses and your real supplier lead times, and every forecast gets an A to D trust grade.',
    href: '/features/purchasing/',
    link: 'Purchasing',
  },
  {
    title: 'Turn the forecast into a buying decision',
    body: 'A forecast only helps when it becomes an order: what to buy, from whom, how much, and when, with what is already on order taken into account.',
    spark: 'Spark recommends what to reorder and when, then drafts the purchase order with the reasoning attached for you to approve.',
    href: '/features/purchasing/',
    link: 'Reorder recommendations',
  },
  {
    title: 'Watch for changes and propose the next step',
    body: 'Demand shifts, suppliers slip, and a channel goes quiet. Software can watch for these every day and bring you the few that need a decision.',
    spark: 'Spark watches stock, demand, suppliers and sales channels. Each rule can observe and report, propose an action for approval, or act on its own.',
    href: '/features/signals-automation/',
    link: 'Signals and automation',
  },
  {
    title: 'Answer questions in plain language',
    body: 'Instead of building a report, ask what is running low, why demand changed, or what to buy this week, and get an answer from your own data.',
    spark: 'Ask Sparki inside Spark, or connect ChatGPT or Claude to your workspace and ask there. Nothing is sent to a supplier until you confirm it.',
    href: '/chatgpt-inventory-management/',
    link: 'Spark in ChatGPT and Claude',
  },
];

/** Rule-based reorder points next to an AI forecast, one row per question. */
export const aiVersusRules = [
  {
    question: 'How much will this item sell?',
    rules: 'An average of recent months, the same rule for every item.',
    ai: 'A method chosen per item by testing it on that item’s own history.',
  },
  {
    question: 'What about seasonal peaks?',
    rules: 'Someone adjusts the reorder point by hand before the season.',
    ai: 'Seasonality is read from the item’s history and applied ahead of time.',
  },
  {
    question: 'What if it was out of stock?',
    rules: 'Zero-sales months pull the average down.',
    ai: 'Lost sales are estimated from the days it was in stock.',
  },
  {
    question: 'How much safety stock?',
    rules: 'A fixed number of days or units.',
    ai: 'Sized from how wrong the forecast has been and the supplier’s real lead time.',
  },
  {
    question: 'What should I do now?',
    rules: 'An alert that an item is low.',
    ai: 'A recommended quantity and a draft order, with the reasoning, to approve.',
  },
];

export const aiEvaluationChecklist = [
  {
    title: 'It forecasts from your own data',
    body: 'Ask whether every SKU gets its own forecast from your sales history, or whether one rule covers the whole catalog.',
  },
  {
    title: 'It shows its work',
    body: 'Each recommendation should say why: the forecast, the lead time, the stock on hand and on order. You should never have to take a number on faith.',
  },
  {
    title: 'It tells you how much to trust a forecast',
    body: 'Some items are easy to predict and some are not. Look for accuracy measured on your own history and a clear signal when a forecast is weak.',
  },
  {
    title: 'You approve before anything is sent',
    body: 'AI should prepare the purchase order, not place it behind your back. Check who approves, and whether you can choose how far automation goes.',
  },
  {
    title: 'It starts from the data you already have',
    body: 'You should be able to connect your store or accounting system, or import a spreadsheet, without a paid onboarding project.',
  },
  {
    title: 'It works where you already work',
    body: 'Alerts by text or email, and answers inside the AI assistant you use, mean fewer reports to open and fewer logins to remember.',
  },
] as const;

export const aiInventoryFaqs: Faq[] = [
  {
    question: 'What is AI inventory management?',
    answer:
      'AI inventory management uses your sales, stock and supplier data to forecast demand for each item, decide what to reorder and when, and flag problems before they become stockouts or dead stock. The software prepares the decision with its reasoning, and a person approves it.',
  },
  {
    question: 'How does AI forecast inventory demand?',
    answer:
      'It looks at each item’s own sales history, sorts the item by its demand pattern (steady, trending, seasonal or intermittent), tests several forecasting methods on past months, and keeps the one that predicted best. Good tools also correct for months when the item was out of stock, since those sales were lost, not missing demand.',
  },
  {
    question: 'Does AI replace the buyer?',
    answer:
      'No. AI does the counting, forecasting and drafting. The buyer decides. In Spark Inventory, recommendations arrive as draft purchase orders with the reasoning attached, and nothing is sent to a supplier until someone approves it.',
  },
  {
    question: 'How much sales history does AI forecasting need?',
    answer:
      'More history gives a better forecast, and a year or more lets Spark find each item’s own seasonality. Spark still forecasts items with shorter histories and grades each forecast from A to D so you can see how much to rely on it.',
  },
  {
    question: 'Is there free AI inventory management software?',
    answer:
      'Yes. Spark Inventory’s Free plan gives one user a per-SKU demand forecast with seasonal curves, dead stock and days-of-supply reports, and a monthly reorder and buying plan, with no time limit. Paid plans start at $99 a month and add live operations and unlimited users.',
  },
  {
    question: 'Can I manage inventory with ChatGPT or Claude?',
    answer:
      'Yes, when the assistant is connected to your inventory data. Spark Inventory is a plugin in ChatGPT and a custom connector in Claude: ask what is running low or what to reorder, and the answer comes from your own Spark workspace.',
  },
];
