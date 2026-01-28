import { Check, Sparkles, Users, Warehouse, Zap, Link2 } from 'lucide-react';
import { Button, Container } from '../components';
import { useTheme } from '../context/ThemeContext';

interface PlanLimit {
  icon: 'users' | 'warehouse' | 'ai' | 'integrations';
  label: string;
  value: string;
}

interface FeatureCategory {
  name: string;
  features: string[];
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  limits: PlanLimit[];
  includesFrom?: string;
  featureCategories: FeatureCategory[];
  cta: string;
  popular: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$199',
    period: '/month',
    description: 'For early-stage teams replacing spreadsheets and basic tools',
    limits: [
      { icon: 'users', label: 'Users', value: 'Up to 2' },
      { icon: 'warehouse', label: 'Warehouses', value: '1' },
      { icon: 'ai', label: 'AI Actions', value: '250/mo' },
      { icon: 'integrations', label: 'Integrations', value: '2' },
    ],
    featureCategories: [
      {
        name: 'Inventory Management',
        features: [
          'Items & SKU management (variants)',
          'Item groups & categories',
          'Bundle items & kits',
          'Single-warehouse tracking',
          'Write-offs & adjustments',
          'Barcode generation & printing',
          'Custom item fields',
        ],
      },
      {
        name: 'Sales & Fulfillment',
        features: [
          'Sales orders',
          'Invoicing & billing',
          'Quotes & estimates',
          'Customer management & history',
          'Discounts & discount groups',
          'Services & non-inventory items',
        ],
      },
      {
        name: 'Purchasing & Procurement',
        features: [
          'Purchase orders',
          'Delivery receipts & receiving',
          'Supplier management',
          'Reorder point planning',
          'Backorder management',
        ],
      },
      {
        name: 'E-Commerce & Integrations',
        features: [
          'Shopify real-time sync',
          'B2B customer portal (basic)',
          'Member roles & permissions (basic)',
          'REST API access',
        ],
      },
      {
        name: 'AI-Powered',
        features: [
          'AI-powered CSV/Excel import',
          'Intelligent data mapping',
          'Proactive inventory alerts',
          'Basic demand forecasting',
        ],
      },
      {
        name: 'Support & Onboarding',
        features: [
          'Email support',
          'Self-serve onboarding',
        ],
      },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$399',
    period: '/month',
    description: 'For growing operators running multi-channel, multi-location businesses',
    limits: [
      { icon: 'users', label: 'Users', value: 'Up to 4' },
      { icon: 'warehouse', label: 'Warehouses', value: 'Up to 3' },
      { icon: 'ai', label: 'AI Actions', value: '1,500/mo' },
      { icon: 'integrations', label: 'Integrations', value: '5' },
    ],
    includesFrom: 'Starter',
    featureCategories: [
      {
        name: 'Inventory Management',
        features: [
          'Multi-warehouse tracking',
          'Bin-level location management',
          'Transfer orders between locations',
        ],
      },
      {
        name: 'Sales & Fulfillment',
        features: [
          'Customer returns & return receipts',
          'Pick lists & wave picking',
          'Pack stations & ship lists',
          'Shipping method configuration',
        ],
      },
      {
        name: 'Purchasing & Procurement',
        features: [
          'Supplier return orders',
          'Procurement forecasting',
          'Request for proposals (RFP)',
          'Vendor portal',
        ],
      },
      {
        name: 'E-Commerce & Integrations',
        features: [
          'Webhook integrations',
          'API key management',
        ],
      },
      {
        name: 'AI-Powered',
        features: [
          'Smart email processing',
          'Automatic order extraction',
          'Advanced demand forecasting',
        ],
      },
      {
        name: 'Support & Onboarding',
        features: [
          'Priority support',
          'Guided onboarding (included)',
        ],
      },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    price: '$749',
    period: '/month',
    description: 'For complex operations, manufacturing, and high-volume workflows',
    limits: [
      { icon: 'users', label: 'Users', value: 'Up to 10' },
      { icon: 'warehouse', label: 'Warehouses', value: 'Up to 10' },
      { icon: 'ai', label: 'AI Actions', value: '5,000/mo' },
      { icon: 'integrations', label: 'Integrations', value: '10' },
    ],
    includesFrom: 'Professional',
    featureCategories: [
      {
        name: 'Inventory Management',
        features: [
          'Advanced adjustment workflows',
          'Large-scale multi-location support',
        ],
      },
      {
        name: 'Manufacturing',
        features: [
          'Multi-level bills of materials (BOMs)',
          'Manufacturing orders',
          'Work orders & approvals',
          'Operation tracking & scheduling',
          'Machine management',
          'Production materials tracking',
          'Shop floor control',
        ],
      },
      {
        name: 'Purchasing & Procurement',
        features: [
          'Advanced backorder logic',
          'Supplier performance visibility',
        ],
      },
      {
        name: 'E-Commerce & Integrations',
        features: [
          'B2B customer portal',
          'MCP protocol support',
          'Priority API throughput',
          'Complex integration workflows',
        ],
      },
      {
        name: 'AI-Powered',
        features: [
          'High-volume AI automations',
          'Advanced proactive alerts',
          'Forecasting for procurement & production',
        ],
      },
      {
        name: 'Support & Onboarding',
        features: [
          'Priority support',
          'Guided onboarding (included)',
        ],
      },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Custom',
    price: 'Contact',
    period: '',
    description: 'For enterprises with unique workflows, scale, or compliance needs',
    limits: [
      { icon: 'users', label: 'Users', value: 'Unlimited' },
      { icon: 'warehouse', label: 'Warehouses', value: 'Unlimited' },
      { icon: 'ai', label: 'AI Actions', value: 'Unlimited' },
      { icon: 'integrations', label: 'Integrations', value: 'Unlimited' },
    ],
    includesFrom: 'Business',
    featureCategories: [
      {
        name: 'Enterprise Features',
        features: [
          'Dedicated MCP server configuration',
          'Custom integrations & data pipelines',
          'Custom forecasting models',
          'Dedicated Customer Success Manager',
          'Custom reports & dashboards',
          'SLA & compliance support',
          'White-label portals (optional)',
        ],
      },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const LimitIcon = ({ icon }: { icon: PlanLimit['icon'] }) => {
  switch (icon) {
    case 'users':
      return <Users className="w-3.5 h-3.5" />;
    case 'warehouse':
      return <Warehouse className="w-3.5 h-3.5" />;
    case 'ai':
      return <Zap className="w-3.5 h-3.5" />;
    case 'integrations':
      return <Link2 className="w-3.5 h-3.5" />;
  }
};

function PricingClassic() {
  return (
    <section id="pricing" className="py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? 'ring-2 ring-primary shadow-xl scale-[1.02]'
                  : 'border border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-4 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 min-h-[40px]">{plan.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-slate-50 rounded-xl">
                {plan.limits.map((limit) => (
                  <div key={limit.label} className="flex items-center gap-1.5 group/limit relative" title={limit.label}>
                    <div className="text-primary">
                      <LimitIcon icon={limit.icon} />
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-gray-900">{limit.value}</span>
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover/limit:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {limit.label}
                    </div>
                  </div>
                ))}
              </div>

              {plan.includesFrom && (
                <p className="text-xs text-primary font-medium mb-3 text-center">
                  Everything in {plan.includesFrom}, plus:
                </p>
              )}

              <div className="flex-1 space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                {plan.featureCategories.map((category) => (
                  <div key={category.name}>
                    <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-2">
                      {category.name}
                    </h4>
                    <ul className="space-y-1.5">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-xs leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full mt-auto"
                size="sm"
                onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PricingNextGen() {
  return (
    <section id="pricing" className="py-16 lg:py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[200px]" />
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-white/80 font-medium">Pricing</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Simple, </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Transparent
            </span>
          </h2>
          <p className="text-lg text-white/50">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative rounded-2xl p-5 flex flex-col transition-all duration-500 ${
                plan.popular
                  ? 'bg-gradient-to-b from-white/10 to-white/[0.02] border-2 border-cyan-500/50 scale-[1.02]'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-4 pt-3">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? 'bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-white/40 text-sm mt-2 min-h-[40px]">{plan.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-white/5 rounded-xl">
                {plan.limits.map((limit) => (
                  <div key={limit.label} className="flex items-center gap-1.5 group/limit relative" title={limit.label}>
                    <div className={plan.popular ? 'text-cyan-400' : 'text-white/50'}>
                      <LimitIcon icon={limit.icon} />
                    </div>
                    <div className="text-xs">
                      <span className="font-semibold text-white/80">{limit.value}</span>
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-gray-900 text-xs rounded opacity-0 group-hover/limit:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                      {limit.label}
                    </div>
                  </div>
                ))}
              </div>

              {plan.includesFrom && (
                <p className="text-xs text-cyan-400 font-medium mb-3 text-center">
                  Everything in {plan.includesFrom}, plus:
                </p>
              )}

              <div className="flex-1 space-y-3 mb-5 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                {plan.featureCategories.map((category) => (
                  <div key={category.name}>
                    <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1.5">
                      {category.name}
                    </h4>
                    <ul className="space-y-1">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20' : 'bg-white/10'}`}>
                            <Check className={`w-2.5 h-2.5 ${plan.popular ? 'text-cyan-400' : 'text-white/50'}`} />
                          </div>
                          <span className="text-white/50 text-xs leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 mt-auto ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/25'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Pricing() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <PricingNextGen /> : <PricingClassic />;
}
