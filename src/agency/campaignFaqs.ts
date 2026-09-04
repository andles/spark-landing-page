export type CampaignKind = "3pl" | "stockouts" | "pickup" | "fishbowl" | "shopify";

export interface CampaignFaq {
  question: string;
  answer: string;
}

export const campaignFaqs: Record<CampaignKind, CampaignFaq[]> = {
  "3pl": [
    {
      question: "Is Spark a WMS or a client-facing inventory platform?",
      answer:
        "It is both an inventory operations platform and a client-facing planning layer. Your team can manage stock, orders, purchasing, and warehouse workflows while clients get forecasting, visibility, and a self-service portal under your brand.",
    },
    {
      question: "Can each 3PL client have a separate workspace and view?",
      answer:
        "Yes. Spark keeps client inventory and operating context scoped while giving your team a consolidated way to work. Client-facing access can be branded so the experience reinforces your 3PL, not another software vendor.",
    },
    {
      question: "Can clients connect Shopify, Amazon, and other channels?",
      answer:
        "Yes. Spark is designed for multichannel operations. Client stores, order history, inventory, and supply data can feed the same planning workflow instead of living in separate spreadsheets and portals.",
    },
    {
      question: "How do price books and run planning work for a 3PL?",
      answer:
        "Spark can keep shared house books or client-specific vendor price books, including per-SKU rates, specification matrices, component costs, quantity breaks, and setup fees. Run planning then compares run size, cadence, carrying cost, and capital tradeoffs, and can surface compatible demand that may be pooled across clients for operator review.",
    },
    {
      question: "How does onboarding a new client work?",
      answer:
        "Use Sparki in app or your own AI assistant through Spark MCP. The agent checks what already exists, brings in the missing catalog and history, validates the data, presents the import for approval, and verifies readiness before the client goes live.",
    },
    {
      question: "Do we need to replace our entire warehouse stack?",
      answer:
        "Not necessarily. Spark can become the inventory intelligence, purchasing, and client-experience layer around the systems you already use. The team can map the right rollout during a demo based on your warehouse and client structure.",
    },
  ],
  stockouts: [
    {
      question: "How does Spark predict a stockout?",
      answer:
        "Spark combines SKU-level sales history, changing velocity, current and incoming stock, supplier lead times, and inventory policy. It shows the risk window and the reasoning behind the recommended action.",
    },
    {
      question: "Does the AI place purchase orders automatically?",
      answer:
        "Spark prepares the recommendation and draft purchase order. Your team can review the evidence, change quantities, and approve before anything is sent or committed.",
    },
    {
      question: "Can Spark help with overstock as well as stockouts?",
      answer:
        "Yes. The same demand and supply model identifies inventory accumulating faster than expected, changing velocity, and cash tied up in stock that is unlikely to move on the current plan.",
    },
    {
      question: "How much sales history should we bring?",
      answer:
        "Bring the reliable history you have. Twelve months or more is ideal for a stronger seasonal signal, and Spark can use up to the latest 36 months during onboarding.",
    },
    {
      question: "How quickly can we see our first inventory plan?",
      answer:
        "Sparki or your own AI assistant over MCP can inspect, map, repair, and validate the data you already have. Once the forecast foundation is ready, Spark can surface the first planning recommendations without a traditional migration project.",
    },
  ],
  pickup: [
    {
      question: "Does Spark in-store pickup work with Shopify?",
      answer:
        "Yes. Spark connects the Shopify order to the store fulfillment workflow so staff can see the pickup, prepare it, and complete the handoff from one operating view.",
    },
    {
      question: "How does Spark prevent pickup promises on unavailable stock?",
      answer:
        "Spark keeps location-level inventory and order activity together so the pickup workflow is based on the stock available at the selected store, not a disconnected spreadsheet or stale manual count.",
    },
    {
      question: "Can we run pickup across multiple stores?",
      answer:
        "Yes. Spark is built for multilocation inventory. Each location can work its own pickup queue while the operations team keeps visibility across the network.",
    },
    {
      question: "What does the store team need at the counter?",
      answer:
        "The pickup solution includes the Shopify connection, automatic ticket printing, and the counter workflow. The Spark team can walk through the hardware and rollout for your locations.",
    },
    {
      question: "Can we start with one location?",
      answer:
        "Yes. A focused first-location rollout lets the team validate the promise, preparation, and handoff process before expanding it across the rest of the store network.",
    },
  ],
  fishbowl: [
    {
      question: "Is Spark really free until my Fishbowl contract ends?",
      answer:
        "Yes. Spark is free through the end date of your current Fishbowl agreement. Migration and onboarding are included. After that, choose the Spark plan that fits or export your data at any time.",
    },
    {
      question: "Does Spark run alongside Fishbowl or replace it?",
      answer:
        "Spark runs alongside Fishbowl while you evaluate it. Fishbowl keeps running as it does today. Drop your database backup into Spark, let Sparki prepare the import, and compare the two using your own inventory before you decide whether to switch.",
    },
    {
      question: "What is Spark Inventory, and why consider it as a Fishbowl alternative?",
      answer:
        "Spark Inventory is inventory management and demand forecasting software. Fishbowl teams can use Spark to forecast demand by product, calculate reorder points, and prepare draft purchase orders. Start by importing a Fishbowl database backup and evaluating Spark alongside your existing system.",
    },
    {
      question: "How does Spark forecast seasonal or sporadic demand?",
      answer:
        "Spark forecasts each product according to its sales pattern, including seasonal, growing, steady, and sporadic demand. It incorporates what your team knows is coming and gives each forecast a confidence grade, so you can judge how much to rely on the recommendation.",
    },
    {
      question: "Does Spark send purchase orders automatically?",
      answer:
        "Spark turns forecasts into reorder points and draft purchase orders. Your team reviews the recommendations and approves the purchase orders before they are sent or committed.",
    },
    {
      question: "How does Spark migrate data out of Fishbowl?",
      answer:
        "Drop your Fishbowl database backup into the importer. Sparki identifies the records and relationships, maps the fields, validates the data, and presents the exact import for your approval.",
    },
    {
      question: "Will our historical sales and purchasing data come across?",
      answer:
        "Yes. Catalog, customers, vendors, historical sales, purchase orders, and inventory levels can be brought into the governed onboarding flow so Spark can rebuild both demand and supply context.",
    },
    {
      question: "Can Spark replace custom Fishbowl reports?",
      answer:
        "Spark includes custom reporting and an AI-assisted reports playground. Your team can describe the view it needs, save it, rerun it, and work from live inventory data without a consultant for every change.",
    },
    {
      question: "Does Spark connect to Shopify and QuickBooks?",
      answer:
        "Yes. Spark supports commerce and accounting integrations so inventory, orders, and financial workflows do not depend on the brittle handoffs many Fishbowl teams are trying to replace.",
    },
    {
      question: "Do we have to commit before seeing Spark with our data?",
      answer:
        "No. Run Spark alongside Fishbowl and compare both systems using your own data. Nothing is replaced until you decide the workflow is a fit.",
    },
  ],
  shopify: [
    {
      question: "Does Spark replace Shopify?",
      answer:
        "No. Shopify remains your commerce platform. Spark becomes the inventory planning and operations layer that turns channel data into forecasts, reorder decisions, purchasing workflows, and cross-channel stock visibility.",
    },
    {
      question: "Can Spark manage more than one Shopify store?",
      answer:
        "Spark is built for multichannel and multilocation operations. Your workspace can reflect the stores, warehouses, and channels through which inventory actually moves.",
    },
    {
      question: "Can I start before every integration is connected?",
      answer:
        "Yes. Sparki can onboard the data you already have in app, or your own assistant can run the governed workflow over Spark MCP. Both paths validate the data and present the import for approval.",
    },
    {
      question: "What happens after Shopify is connected?",
      answer:
        "Spark uses products, orders, inventory, sales history, and supply inputs to calculate demand, surface stock risk, recommend reorder quantities, and prepare draft purchase orders for review.",
    },
    {
      question: "How much does Spark cost?",
      answer:
        "Free gives one user monthly forecasting without live order operations. Pulse is $99 per month for live intelligence, and Operate is $349 for purchasing and fulfillment. Paid plans include unlimited users. Manufacturers and multi-client operators can explore the separate Scale and Custom paths.",
    },
  ],
};

export function buildFaqSchema(kind: CampaignKind): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: campaignFaqs[kind].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
