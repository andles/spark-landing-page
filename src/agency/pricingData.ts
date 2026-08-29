export type PricingCtaKind = 'signup' | 'contact';

export interface PricingTier {
  name: string;
  stage: string;
  price: string;
  period?: string;
  promise: string;
  description: string;
  orders: string;
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

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    stage: '01 / See',
    price: '$0',
    promise: 'See your forecast',
    description: 'A monthly inventory audit that turns your sales history into a concrete buying plan.',
    orders: '500 / month',
    overage: 'Upgrade to Pulse',
    refresh: 'Monthly',
    onboarding: 'Self-serve',
    aiCredits: 'Trial allotment',
    support: 'Community + AI',
    features: [
      'Shopify connection or CSV import',
      'Per-SKU forecast and seasonal curves',
      'Dead stock and days-of-supply reports',
      'Reorder plan with draft POs visible',
    ],
    ctaLabel: 'Run my free forecast',
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
    overage: '+$49 / 2,500',
    refresh: 'Live',
    onboarding: 'Self-serve',
    aiCredits: 'Starter allotment',
    support: 'AI-assisted',
    inherits: 'Free',
    features: [
      'Continuous forecasts and buying plans',
      'Live reorder and stockout alerts',
      'Multiple sales channel connections',
      'Inventory policy management',
    ],
    ctaLabel: 'Start with Free',
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
    ctaLabel: 'Start with Free',
    ctaKind: 'signup',
    highlighted: true,
    accent: 'lime',
  },
  {
    name: 'Scale',
    stage: '04 / Make',
    price: '$749',
    period: '/mo',
    promise: 'Run your operation',
    description: 'For manufacturers and teams that need Spark shaped around a more complex workflow.',
    orders: '25,000 / month',
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
  },
  {
    name: 'Network',
    stage: '05 / Orchestrate',
    price: 'Let\'s talk',
    promise: 'Multi-client operations',
    description: 'For 3PLs and fulfillment providers operating inventory on behalf of many clients.',
    orders: 'Negotiated',
    overage: 'Contracted',
    refresh: 'Live',
    onboarding: 'Full implementation',
    aiCredits: 'Negotiated',
    support: 'Dedicated',
    inherits: 'Scale',
    features: [
      'Multi-client workspaces and entitlements',
      'Per-client catalogs and order feeds',
      'External warehouse inventory feeds',
      'Dedicated support and named contact',
    ],
    ctaLabel: 'Talk about Network',
    ctaKind: 'contact',
    accent: 'fuchsia',
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
    note: 'Available individually or bundled into a Network annual commitment.',
  },
] as const;

export const pricingFaqs = [
  {
    question: 'Is Free a trial?',
    answer: 'No. Free is a real monthly forecast audit for up to 500 orders per month. Your connected data stays in sync, and Spark regenerates the forecast, stock-risk reports, reorder recommendations, and buying plan each month.',
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
    question: 'Which plan includes manufacturing?',
    answer: 'Scale adds multi-level bills of materials, production specifications, component- and spec-priced vendor books, advanced integrations, and a scoped custom module configuration. A guided implementation is required.',
  },
  {
    question: 'How do order overages work?',
    answer: 'Pulse, Operate, and Scale add capacity in predictable 2,500-order blocks at $49 per block. Free moves to Pulse above 500 monthly orders. Network volume is contracted.',
  },
  {
    question: 'Do you charge per user, SKU, or warehouse?',
    answer: 'No. Every plan includes unlimited users, and Spark does not meter SKUs or warehouse count. Plans are separated by operating capability, included monthly orders, and AI usage.',
  },
  {
    question: 'How are AI credits priced?',
    answer: 'Each plan includes an AI credit allotment for Sparki chat, research, diagnostics, and agentic workflows. Exact published allotments will be set after beta usage is measured; paid-plan overage is metered per credit.',
  },
] as const;
