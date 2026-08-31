export type PricingCtaKind = 'signup' | 'contact';

export interface PricingTier {
  name: string;
  stage: string;
  price: string;
  period?: string;
  promise: string;
  description: string;
  orders?: string;
  users: string;
  overage: string;
  refresh: string;
  onboarding: string;
  aiCredits: string;
  support: string;
  inherits?: string;
  features: string[];
  ctaLabel: string;
  ctaKind: PricingCtaKind;
  highlighted?: boolean;
  accent: 'cyan' | 'sky' | 'lime' | 'violet' | 'fuchsia';
}

export interface AdvancedPricingTier extends PricingTier {
  operator: string;
  fit: string;
  exploreHref: string;
  exploreLabel: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    stage: '01 / See',
    price: '$0',
    promise: 'See your forecast',
    description: 'Free forecasting for one operator, refreshed every month from the inventory data you already have.',
    users: '1 user',
    overage: 'Upgrade to Pulse',
    refresh: 'Monthly',
    onboarding: 'Self-serve',
    aiCredits: 'Monthly allotment',
    support: 'Community + AI',
    features: [
      'Supported source connection or file import',
      'Per-SKU forecast and seasonal curves',
      'Dead stock and days-of-supply reports',
      'Monthly reorder and buying plan',
    ],
    ctaLabel: 'Start forecasting free',
    ctaKind: 'signup',
    accent: 'cyan',
  },
  {
    name: 'Pulse',
    stage: '02 / Know',
    price: '$99',
    period: '/mo',
    promise: 'Live intelligence',
    description: 'For operators who need the forecast, stock risk, and buying plan to stay current.',
    orders: '2,500 / month',
    users: 'Unlimited',
    overage: '+$49 / 2,500',
    refresh: 'Live',
    onboarding: 'Self-serve',
    aiCredits: 'Starter allotment',
    support: 'AI-assisted',
    inherits: 'Free',
    features: [
      'Continuous forecasts and buying plans',
      'Live reorder and stockout alerts',
      'Multiple supported data connections',
      'Inventory policy management',
    ],
    ctaLabel: 'Start Pulse',
    ctaKind: 'signup',
    accent: 'sky',
  },
  {
    name: 'Operate',
    stage: '03 / Act',
    price: '$349',
    period: '/mo',
    promise: 'Act on the plan',
    description: 'For teams ready to turn recommendations into purchasing, receiving, and fulfillment.',
    orders: '10,000 / month',
    users: 'Unlimited',
    overage: '+$49 / 2,500',
    refresh: 'Live',
    onboarding: 'Self-serve + services',
    aiCredits: 'Standard allotment',
    support: 'Email + AI',
    inherits: 'Pulse',
    features: [
      'One-click POs and full PO lifecycle',
      'Supplier quotes, terms, and price books',
      'Receiving and exception workflows',
      'Transfers and multi-warehouse operations',
    ],
    ctaLabel: 'Run POs in Spark',
    ctaKind: 'signup',
    highlighted: true,
    accent: 'lime',
  },
];

export const advancedPricingTiers: AdvancedPricingTier[] = [
  {
    name: 'Scale',
    stage: 'Advanced / Make',
    price: '$749',
    period: '/mo',
    promise: 'Run your operation',
    description: 'For manufacturers and teams that need Spark shaped around a more complex workflow.',
    orders: '25,000 / month',
    users: 'Unlimited',
    overage: '+$49 / 2,500',
    refresh: 'Live',
    onboarding: 'Guided implementation',
    aiCredits: 'Expanded allotment',
    support: 'Priority + human',
    inherits: 'Operate',
    features: [
      'Multi-level BOMs and spec templates',
      'Component- and spec-priced books',
      'One scoped custom module configuration',
      'Advanced integration support',
    ],
    ctaLabel: 'Plan my implementation',
    ctaKind: 'contact',
    accent: 'violet',
    operator: 'For manufacturers',
    fit: 'Production planning, component economics, and workflows that need structured implementation.',
    exploreHref: '/features/manufacturing',
    exploreLabel: 'Explore manufacturing',
  },
  {
    name: 'Custom',
    stage: 'Advanced / Orchestrate',
    price: 'Let\'s talk',
    promise: 'Multi-client operations',
    description: 'For 3PLs and fulfillment providers operating inventory on behalf of many clients.',
    orders: 'Negotiated',
    users: 'Unlimited',
    overage: 'Contracted',
    refresh: 'Live',
    onboarding: 'Full implementation',
    aiCredits: 'Negotiated',
    support: 'Dedicated',
    inherits: 'Operate',
    features: [
      'Multi-client workspaces and entitlements',
      'Per-client catalogs and order feeds',
      'External warehouse inventory feeds',
      'Dedicated support and named contact',
    ],
    ctaLabel: 'Talk about Custom',
    ctaKind: 'contact',
    accent: 'fuchsia',
    operator: 'For 3PLs and service operators',
    fit: 'Client-separated inventory intelligence, shared operations, and a commercial model built for managed services.',
    exploreHref: '/3pl',
    exploreLabel: 'Explore 3PL operations',
  },
];

export const implementationServices = [
  {
    name: 'Historical data migration',
    price: '$500-$1,500',
    note: 'Staged sales and purchase-order history imports, scoped by source and volume.',
  },
  {
    name: 'Price book implementation',
    price: '$1,500-$2,500',
    note: 'Spec- or component-priced setup for Scale manufacturing workflows.',
  },
  {
    name: 'Custom module build',
    price: 'Quoted',
    note: 'Additional builds beyond the scoped Scale implementation.',
  },
  {
    name: '3PL client onboarding',
    price: '$250 / client',
    note: 'Available individually or bundled into a Custom annual commitment.',
  },
] as const;

export const pricingFaqs = [
  {
    question: 'Is Free a trial?',
    answer: 'No. Free is an ongoing single-user forecasting plan. Spark refreshes your forecast, stock-risk reports, reorder recommendations, and buying plan every month. Live order operations begin with Pulse.',
  },
  {
    question: 'What changes when I upgrade to Pulse?',
    answer: 'Pulse removes the monthly refresh cycle. Forecasts, reorder alerts, stockout warnings, buying plans, demand analysis, and inventory policies stay live across multiple sales channels.',
  },
  {
    question: 'When do I need Operate?',
    answer: 'Choose Operate when you are ready to commit the draft purchase orders Spark recommends. Operate adds the full PO lifecycle, suppliers and quotes, receiving, transfers, sales orders, and multi-warehouse workflows.',
  },
  {
    question: 'What are the advanced plans?',
    answer: 'Scale is the advanced path for manufacturers that need bills of materials, production specifications, component economics, and custom workflows. Custom is a separate path for 3PLs and service operators managing inventory across many clients. Both include guided implementation.',
  },
  {
    question: 'How do order overages work?',
    answer: 'Pulse, Operate, and Scale add capacity in predictable 2,500-order blocks at $49 per block. Free is forecast-only and has no order allowance. Custom volume is contracted.',
  },
  {
    question: 'Do you charge per user, SKU, or warehouse?',
    answer: 'Free includes one user. Paid plans include unlimited users, and Spark does not meter SKUs or warehouse count. Paid plans are separated by operating capability, included monthly orders, and AI usage.',
  },
  {
    question: 'What data can Spark use?',
    answer: 'Spark is designed to work from the operational data your business already has. Supported connections and file imports can bring together sales, inventory, purchasing, supplier, warehouse, accounting, marketplace, or ERP data without making one commerce platform the center of the model.',
  },
  {
    question: 'How are AI credits priced?',
    answer: 'Each plan includes an AI credit allotment for Sparki chat, research, diagnostics, and agentic workflows. Exact published allotments will be set after beta usage is measured; paid-plan overage is metered per credit.',
  },
] as const;
