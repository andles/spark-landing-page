// FAQ content for the /accountants page. Partner terms are read from
// partnerTypes.ts so this page can never drift from what /partners offers.
import { partnerTypeById } from "../../partnerTypes";

export interface AccountantFaq {
  question: string;
  answer: string;
}

export const accountantFaqs: AccountantFaq[] = [
  {
    question: "What inventory software works with QuickBooks Online, Xero, and Zoho Books?",
    answer:
      "Spark Inventory connects to QuickBooks Online, Xero, and Zoho Books. Spark sends invoices, bills, credit notes, and other accounting documents to the books, with a sync history you can check. QuickBooks can also bring in sales and purchase history when a client first connects.",
  },
  {
    question: "Does Spark replace my client's accounting software?",
    answer:
      "No. Spark runs the operational side: stock by location, purchasing, receiving, sales orders, and manufacturing. QuickBooks Online, Xero, or Zoho Books stays the general ledger, and Spark sends it the documents those operations create.",
  },
  {
    question: "When should a client move inventory out of their accounting software?",
    answer:
      "Usually when inventory stops fitting in the books: the client sells on several channels, holds stock in more than one location, reorders from suppliers on a regular cycle, or builds products from components. At that point stock counts, purchase orders, and COGS need a system built for inventory, with the ledger kept in sync.",
  },
  {
    question: "When does Spark post cost of goods sold to QuickBooks Online, Xero, or Zoho Books?",
    answer:
      "When the stock ships. Each shipment posts its own journal (Dr Cost of Goods Sold, Cr Inventory Asset), dated the day the stock left and valued at the cost Spark's cost ledger relieved for those units. Channel orders from Shopify, Amazon, and other marketplaces post the same way. Invoices carry revenue, receivables, and tax only, so cost is never booked twice.",
  },
  {
    question: "Does Spark use FIFO or average cost?",
    answer:
      "Either, set per item. A FIFO item relieves its oldest cost layers first; an average item relieves its running weighted average. For example, receive 10 units at $5 and 10 at $8, then ship 12: on FIFO the shipment posts $66 of COGS, not the $96 that costing at the latest price would give.",
  },
  {
    question: "How does Spark handle landed cost?",
    answer:
      "Spark allocates shipping, duties, and other charges to purchase order lines, and received units enter stock at that landed cost. COGS therefore includes what it took to get the goods on the shelf. Inventory valuation and COGS reports summarize stock value and cost of goods sold for the books.",
  },
  {
    question: "What happens to COGS when a customer returns stock or a cost is corrected later?",
    answer:
      "A customer return puts its units back at the cost they left at (Dr Inventory Asset, Cr Cost of Goods Sold), never at the sale price. If a receipt's cost is corrected after some of its units sold, Spark posts a correction journal that re-values the units that already left and the stock still on hand.",
  },
  {
    question: "Can Spark track raw materials and finished goods for manufacturing clients?",
    answer:
      "Yes. Spark supports multi-level bills of materials, manufacturing orders, and component availability on the Scale plan. When a work order completes, the finished goods enter stock carrying the cost their materials relieved plus labor and other conversion costs, and units that fail QA go to Scrapped Inventory.",
  },
  {
    question: "Can I see my client's inventory data in Spark?",
    answer:
      "Yes. Your client can add you to their Spark account as a user, and paid plans include unlimited users. You can also connect Claude, ChatGPT, or another approved AI assistant to Spark over MCP with read-only access to ask questions about the data.",
  },
  {
    question: "How do accountants and bookkeepers earn by recommending Spark?",
    answer: `Through the Spark partner program. As an agency or consultant partner: ${partnerTypeById("agency").howItPays} If you prefer to make introductions only, the referral partnership pays ${partnerTypeById("referral").howItPays.replace(/^A /, "a ")}`,
  },
  {
    question: "What does Spark cost my client?",
    answer:
      "Clients can start on the free forecasting plan, which shows a per-SKU forecast, seasonal curves, and a monthly buying plan from their existing data. The Solo, Operate, and Scale plans include a 14-day free trial. Current prices are on the Spark pricing page.",
  },
];

export function buildAccountantFaqSchema(): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: accountantFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
