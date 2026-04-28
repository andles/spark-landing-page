import { useState } from "react";
import ScrollReveal, { RevealItem } from "./ScrollReveal";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

interface Tier {
  name: string;
  price: string;
  period?: string;
  description: string;
  highlighted?: boolean;
  quickStats: { value: string; label: string }[];
  inherits?: string;
  heroFeatures: string[];
  featureCategories: { heading: string; items: string[] }[];
  ctaLabel: string;
}

const tiers: Tier[] = [
  {
    name: "Starter", price: "$199", period: "/month",
    description: "For early-stage teams replacing spreadsheets and basic tools.",
    quickStats: [{ value: "2", label: "Users" }, { value: "1", label: "Warehouse" }, { value: "250", label: "AI Actions/mo" }],
    heroFeatures: ["Multi-channel inventory sync", "Real-time stock tracking", "Basic order management", "Purchase order creation", "2 e-commerce integrations"],
    featureCategories: [
      { heading: "Inventory Management", items: ["Items & SKU management", "Item groups & categories", "Bundle items & kits", "Single-warehouse tracking", "Barcode generation & printing"] },
      { heading: "AI-Powered", items: ["AI-powered CSV/Excel import", "Intelligent data mapping", "Proactive inventory alerts", "Basic demand forecasting"] },
    ],
    ctaLabel: "Get Started",
  },
  {
    name: "Professional", price: "$399", period: "/month", highlighted: true,
    description: "For growing operators running multi-channel, multi-location businesses.",
    quickStats: [{ value: "4", label: "Users" }, { value: "3", label: "Warehouses" }, { value: "1,500", label: "AI Actions/mo" }],
    inherits: "Starter",
    heroFeatures: ["Multi-warehouse management", "Pick lists & wave picking", "Smart email PO processing", "Advanced demand forecasting", "Priority support"],
    featureCategories: [
      { heading: "Inventory Management", items: ["Multi-warehouse tracking", "Bin-level location management", "Transfer orders between locations"] },
      { heading: "AI-Powered", items: ["Smart email processing", "Automatic order extraction", "Advanced demand forecasting"] },
    ],
    ctaLabel: "Get Started",
  },
  {
    name: "Business", price: "$749", period: "/month",
    description: "For complex manufacturing and high-volume needs.",
    quickStats: [{ value: "10", label: "Users" }, { value: "10", label: "Warehouses" }, { value: "5,000", label: "AI Actions/mo" }],
    inherits: "Professional",
    heroFeatures: ["Bill of Materials & assemblies", "Manufacturing work orders", "Barcode & lot tracking", "Custom B2B/wholesale portals", "Dedicated account manager"],
    featureCategories: [
      { heading: "Manufacturing", items: ["Multi-level bills of materials", "Manufacturing orders", "Work orders & approvals", "Shop floor control"] },
      { heading: "AI-Powered", items: ["High-volume AI automations", "Advanced proactive alerts", "Forecasting for procurement"] },
    ],
    ctaLabel: "Get Started",
  },
  {
    name: "Custom", price: "Contact",
    description: "For enterprises with unique workflows, scale, or compliance.",
    quickStats: [{ value: "∞", label: "Users" }, { value: "∞", label: "Warehouses" }, { value: "∞", label: "AI Actions" }],
    inherits: "Business",
    heroFeatures: ["Unlimited everything", "Custom API integrations", "SSO & advanced security", "SLA guarantees", "White-glove onboarding"],
    featureCategories: [
      { heading: "Enterprise", items: ["Dedicated MCP server", "Custom integrations", "Custom forecasting models", "Dedicated Customer Success Manager"] },
    ],
    ctaLabel: "Contact Sales",
  },
];

function PricingCard({ tier }: { tier: Tier }) {
  const [expanded, setExpanded] = useState(false);
  const totalFeatures = tier.featureCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className={tier.highlighted
      ? "gradient-border glass rounded-2xl p-6 flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.08)] relative h-full hover:shadow-[0_0_50px_rgba(6,182,212,0.12)] hover:-translate-y-0.5 transition-all duration-300"
      : "glass rounded-2xl p-6 flex flex-col border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03] hover:-translate-y-0.5 transition-all duration-300 h-full"
    }>
      {tier.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-xs font-semibold text-white whitespace-nowrap z-30">
          Most Popular
        </div>
      )}
      <h3 className="font-bold text-lg text-[#f0f2f5]" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>{tier.name}</h3>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="font-mono text-4xl font-bold text-[#f0f2f5]">{tier.price}</span>
        {tier.period && <span className="text-[#b8bfcc] text-sm">{tier.period}</span>}
      </div>
      <p className="text-[#b8bfcc] text-sm mt-2 min-h-[44px]">{tier.description}</p>

      <div className="mt-5 px-3 py-2 rounded-xl bg-[#0c1019] border border-white/[0.06]">
        {tier.name === "Custom" ? (
          <div className="text-center">
            <p className="font-mono font-bold text-white text-sm leading-none">Unlimited</p>
            <p className="text-white/50 text-[10px] mt-1">Users · Warehouses · AI Actions</p>
          </div>
        ) : (
          <div className="flex items-stretch divide-x divide-white/[0.04]">
            {tier.quickStats.map((stat) => (
              <div key={stat.label} className="flex-1 flex flex-col items-center justify-center px-3">
                <p className="font-mono font-bold text-white text-sm leading-none">{stat.value}</p>
                <p className="text-white/50 text-[10px] mt-1 whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.06] mt-5 mb-4" />
      <p className="text-[13px] text-white/50 mb-3">{tier.inherits ? `Everything in ${tier.inherits}, plus:` : "Core features included:"}</p>

      <div className="flex-1">
        <ul className="space-y-2">
          {tier.heroFeatures.map((item) => (
            <li key={item} className="flex items-start gap-2"><CheckIcon /><span className="text-[#b8bfcc] text-sm">{item}</span></li>
          ))}
        </ul>
        <div className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ maxHeight: expanded ? "2000px" : "0px", opacity: expanded ? 1 : 0 }}>
          <div className="pt-4">
            {tier.featureCategories.map((category) => (
              <div key={category.heading}>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#b8bfcc] mt-4 mb-2">{category.heading}</h4>
                <ul className="space-y-1.5">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2"><CheckIcon /><span className="text-[#b8bfcc] text-sm">{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="mt-4 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
          {expanded ? "Show less" : `+${totalFeatures} more features`}
        </button>
      </div>

      <div className="mt-auto pt-8">
        <a href="https://app.sparkinventory.com" className={tier.highlighted
          ? "flex items-center justify-center w-full h-[46px] rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300"
          : "flex items-center justify-center w-full h-[46px] rounded-full border border-white/[0.06] text-[#f0f2f5] text-sm font-semibold hover:bg-white/[0.04] hover:border-white/[0.12] hover:scale-[1.02] transition-all duration-300"
        }>{tier.ctaLabel}</a>
      </div>
    </div>
  );
}

export default function AgencyPricingSection() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#06080d] relative">
      <div className="absolute -top-[100px] -left-[200px] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(6,182,212,0.07),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-[100px] -right-[200px] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            Simple, <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Transparent</span>
          </h2>
          <p className="mt-4 text-lg text-[#b8bfcc] max-w-2xl mx-auto">Choose the plan that fits your business. All plans include a 14-day free trial.</p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={120} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-7xl mx-auto">
          {tiers.map((tier, i) => (
            <RevealItem key={tier.name} index={i}>
              <PricingCard tier={tier} />
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
