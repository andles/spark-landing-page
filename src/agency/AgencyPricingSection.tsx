import { ArrowRight, ArrowUpRight, Check, Factory, Network } from 'lucide-react';
import ScrollReveal, { RevealItem } from './ScrollReveal';
import {
  advancedPricingTiers,
  implementationServices,
  pricingTiers,
  type AdvancedPricingTier,
  type PricingTier,
} from './pricingData';
import { useCtaLinks } from './ctaLinks';

const HOME_PRICING_CTA_OPTIONS = { source: 'home_pricing' } as const;
const PRICING_PAGE_CTA_OPTIONS = { source: 'pricing_page' } as const;

const accentStyles: Record<PricingTier['accent'], { line: string; badge: string; glow: string; button: string }> = {
  cyan: {
    line: 'from-cyan-300 to-cyan-500',
    badge: 'border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200',
    glow: 'bg-cyan-400/[0.09]',
    button: 'border-cyan-300/20 hover:border-cyan-200/45 hover:bg-cyan-300/[0.08]',
  },
  sky: {
    line: 'from-sky-300 to-blue-500',
    badge: 'border-sky-300/20 bg-sky-300/[0.07] text-sky-200',
    glow: 'bg-sky-400/[0.09]',
    button: 'border-sky-300/20 hover:border-sky-200/45 hover:bg-sky-300/[0.08]',
  },
  lime: {
    line: 'from-lime-300 to-emerald-400',
    badge: 'border-lime-300/25 bg-lime-300/[0.09] text-lime-200',
    glow: 'bg-lime-300/[0.1]',
    button: 'border-lime-200 bg-lime-300 !text-[#071009] hover:bg-lime-200',
  },
  violet: {
    line: 'from-violet-300 to-violet-500',
    badge: 'border-violet-300/20 bg-violet-300/[0.07] text-violet-200',
    glow: 'bg-violet-400/[0.1]',
    button: 'border-violet-300/20 hover:border-violet-200/45 hover:bg-violet-300/[0.08]',
  },
  fuchsia: {
    line: 'from-fuchsia-300 to-pink-500',
    badge: 'border-fuchsia-300/20 bg-fuchsia-300/[0.07] text-fuchsia-200',
    glow: 'bg-fuchsia-400/[0.1]',
    button: 'border-fuchsia-300/20 hover:border-fuchsia-200/45 hover:bg-fuchsia-300/[0.08]',
  },
};

function PricingCard({ tier, signupUrl }: { tier: PricingTier; signupUrl: string }) {
  const accent = accentStyles[tier.accent];
  const href = tier.ctaKind === 'contact' ? '/contact' : signupUrl;

  return (
    <article
      className={`group relative flex h-full min-h-[620px] flex-col overflow-hidden rounded-[26px] border p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
        tier.highlighted
          ? 'border-lime-200/45 bg-[#10160f] shadow-[0_22px_80px_rgba(163,230,53,0.09)] xl:-translate-y-3 xl:hover:-translate-y-4'
          : 'border-white/[0.08] bg-[#0a0d14] hover:border-white/[0.16] hover:bg-[#0d111a]'
      }`}
    >
      <div className={`absolute -right-20 -top-20 h-48 w-48 rounded-full blur-[70px] transition-opacity duration-300 ${accent.glow} opacity-60 group-hover:opacity-100`} />
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.line}`} />

      <div className="relative flex items-center justify-between gap-3">
        <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${accent.badge}`}>
          {tier.stage}
        </span>
        {tier.highlighted && (
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-lime-200">Where plans become action</span>
        )}
      </div>

      <div className="relative mt-6">
        <h3 className="text-xl font-semibold tracking-[-0.015em] text-white/95">{tier.name}</h3>
        <div className="mt-2 flex min-h-12 items-baseline gap-1">
          <span className="font-mono text-[2.65rem] font-bold tracking-[-0.05em] text-white">
            {tier.price}
          </span>
          {tier.period && <span className="text-sm text-white/45">{tier.period}</span>}
        </div>
        <p
          className="mt-5 text-[1.65rem] leading-[1.02] tracking-[-0.035em] text-white"
          style={{ fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif" }}
        >
          {tier.promise}
        </p>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#8f98a9]">{tier.description}</p>
      </div>

      <div className={`mt-5 grid overflow-hidden rounded-2xl border border-white/[0.07] bg-black/20 ${tier.orders ? 'grid-cols-[1.25fr_0.9fr_0.85fr]' : 'grid-cols-2'}`}>
        {tier.orders && (
          <div className="min-w-0 border-r border-white/[0.07] px-2.5 py-3.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">Orders</p>
            <p className="mt-1.5 whitespace-nowrap text-[13px] font-semibold text-white/90">{tier.orders}</p>
          </div>
        )}
        <div className="min-w-0 border-r border-white/[0.07] px-2.5 py-3.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">Users</p>
          <p className="mt-1.5 whitespace-nowrap text-[13px] font-semibold text-white/90">{tier.users}</p>
        </div>
        <div className="min-w-0 px-2.5 py-3.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">Refresh</p>
          <p className="mt-1.5 whitespace-nowrap text-[13px] font-semibold text-white/90">{tier.refresh}</p>
        </div>
      </div>

      <div className="mt-6 flex-1">
        <p className="mb-3 text-[11px] text-white/40">{tier.inherits ? `Everything in ${tier.inherits}, plus:` : 'Your monthly inventory picture:'}</p>
        <ul className="space-y-2.5">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#b8bfcc]">
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${accent.badge}`}>
                <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-white/[0.07] pt-5">
        <div className="mb-4 flex items-center justify-between gap-4 text-[10px] text-white/40">
          <span>AI: {tier.aiCredits}</span>
          <span>{tier.support}</span>
        </div>
        <a
          href={href}
          className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-4 text-center text-sm font-semibold text-white transition-all duration-300 ${accent.button}`}
        >
          {tier.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function PlanComparison() {
  const rows = [
    { label: 'Included orders / mo', values: pricingTiers.map((tier) => tier.orders ?? 'Forecast only') },
    { label: 'Users', values: pricingTiers.map((tier) => tier.users) },
    { label: 'Order overage', values: pricingTiers.map((tier) => tier.overage) },
    { label: 'Forecast refresh', values: pricingTiers.map((tier) => tier.refresh) },
    { label: 'Onboarding', values: pricingTiers.map((tier) => tier.onboarding) },
    { label: 'AI credits', values: pricingTiers.map((tier) => tier.aiCredits) },
    { label: 'Support', values: pricingTiers.map((tier) => tier.support) },
  ];

  return (
    <ScrollReveal className="mx-auto mt-24 max-w-[1320px]">
      <div className="mb-8 max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Choose your operating depth</p>
        <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Orders set capacity. Workflow sets the plan.</h3>
        <p className="mt-4 text-sm leading-7 text-[#8f98a9] sm:text-base">
          Free is built for one operator. Paid plans include the team. Order volume is the visible capacity meter; operating depth determines how far Spark carries each decision.
        </p>
      </div>

      <p className="mb-3 text-right font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 sm:hidden">Swipe to compare →</p>
      <div className="overflow-x-auto rounded-[26px] border border-white/[0.08] bg-[#090c13]">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.025]">
              <th className="sticky left-0 z-10 w-[210px] bg-[#0d1017] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Plan detail</th>
              {pricingTiers.map((tier) => (
                <th key={tier.name} className="px-4 py-4 text-sm font-semibold text-white">{tier.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-white/[0.055] last:border-0">
                <th className="sticky left-0 z-10 bg-[#090c13] px-5 py-4 text-xs font-medium text-white/60">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={`${row.label}-${pricingTiers[index].name}`} className="px-4 py-4 text-xs leading-5 text-[#a6afbd]">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-5 text-white/35">
        Paid-plan order capacity is added in $49 blocks of 2,500 orders. AI credit quantities will be published after beta usage is measured.
      </p>
    </ScrollReveal>
  );
}

function AdvancedPlanCard({ tier }: { tier: AdvancedPricingTier }) {
  const Icon = tier.name === 'Scale' ? Factory : Network;
  const accent = accentStyles[tier.accent];

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0a0d14] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.17] sm:p-8">
      <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full blur-[80px] ${accent.glow}`} />
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.line}`} />

      <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accent.badge}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">{tier.stage}</p>
              <h4 className="mt-1 text-xl font-semibold text-white">{tier.name}</h4>
            </div>
          </div>

          <p
            className="mt-6 text-3xl leading-[1.05] tracking-[-0.035em] text-white"
            style={{ fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif" }}
          >
            {tier.promise}
          </p>
          <p className="mt-4 text-sm leading-7 text-[#939cac]">{tier.description}</p>
          <p className="mt-4 rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3 text-xs leading-5 text-white/55">
            <span className="font-semibold text-white/80">Best for:</span> {tier.fit}
          </p>
        </div>

        <div className="min-w-[180px] sm:text-right">
          <span className="font-mono text-3xl font-bold tracking-[-0.05em] text-white">{tier.price}</span>
          {tier.period && <span className="ml-1 text-sm text-white/45">{tier.period}</span>}
          <p className="mt-2 text-xs text-white/40">{tier.orders ? `${tier.orders} orders · ` : ''}{tier.users} users</p>
        </div>
      </div>

      <div className="relative mt-7 grid gap-3 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
        {tier.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-[#b8bfcc]">
            <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${accent.badge}`}>
              <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href="/contact"
          className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold text-white transition-all duration-300 ${accent.button}`}
        >
          {tier.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={tier.exploreHref}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] px-5 text-sm font-semibold text-white/75 transition-colors hover:border-white/20 hover:text-white"
        >
          {tier.exploreLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function AdvancedPlans() {
  return (
    <div id="advanced-plans" className="scroll-mt-24">
      <ScrollReveal className="mx-auto mt-24 max-w-[1320px]">
        <div className="mb-9 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">Advanced operator paths</p>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Built for a different kind of operator.</h3>
          <p className="mt-4 text-sm leading-7 text-[#8f98a9] sm:text-base">
            Scale and Network are guided plans for businesses with manufacturing complexity or multi-client operations. They stay separate so the core choice remains clear.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {advancedPricingTiers.map((tier) => (
            <AdvancedPlanCard key={tier.name} tier={tier} />
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}

function AdvancedPlanLink() {
  return (
    <ScrollReveal className="mx-auto mt-8 max-w-[980px]">
      <a
        href="/pricing#advanced-plans"
        className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-violet-300/15 bg-violet-300/[0.045] px-5 py-5 transition-colors hover:border-violet-300/30 hover:bg-violet-300/[0.07] sm:flex-row sm:items-center"
      >
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-violet-200">Advanced plans</p>
          <p className="mt-2 text-sm font-semibold text-white">Manufacturing products or managing inventory for clients?</p>
        </div>
        <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-violet-200">
          See Scale and Network
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </a>
    </ScrollReveal>
  );
}

function ServicesPricing() {
  return (
    <ScrollReveal className="mx-auto mt-24 max-w-[1320px]">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">Implementation and services</p>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Expert help, priced separately.</h3>
          <p className="mt-4 text-sm leading-7 text-[#8f98a9] sm:text-base">
            Self-serve stays self-serve. When migration, price books, or a custom operating model need hands-on work, the scope is explicit and one-time.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {implementationServices.map((service) => (
            <article key={service.name} className="rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-5">
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-sm font-semibold text-white">{service.name}</h4>
                <span className="shrink-0 font-mono text-xs text-violet-200">{service.price}</span>
              </div>
              <p className="mt-3 text-xs leading-6 text-[#828c9d]">{service.note}</p>
            </article>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function AgencyPricingSection({ detailed = false }: { detailed?: boolean }) {
  const { signupUrl } = useCtaLinks(detailed ? PRICING_PAGE_CTA_OPTIONS : HOME_PRICING_CTA_OPTIONS);

  return (
    <section id="pricing" className="relative scroll-mt-16 overflow-hidden bg-[#06080d] py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-[260px] -top-[180px] h-[900px] w-[900px] bg-[radial-gradient(circle,rgba(6,182,212,0.09),transparent_62%)]" />
      <div className="pointer-events-none absolute -bottom-[200px] -right-[260px] h-[900px] w-[900px] bg-[radial-gradient(circle,rgba(217,70,239,0.08),transparent_62%)]" />

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 md:px-8 lg:px-10">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.23em] text-cyan-300">Three clear starting points</p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Forecasting is free.{' '}
            <span
              className="block bg-gradient-to-r from-lime-200 via-cyan-200 to-violet-300 bg-clip-text text-transparent sm:inline"
              style={{ fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif", fontStyle: 'italic', fontWeight: 400 }}
            >
              Upgrade when you need it live.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#9aa3b2] sm:text-lg">
            Free refreshes monthly for one operator. Pulse keeps the intelligence live. Operate turns decisions into purchasing, receiving, and fulfillment.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mx-auto mt-9 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-lime-200/20 bg-lime-300/[0.055] px-5 py-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-lime-100">Free for one operator. Paid plans include the team.</p>
            <p className="mt-1 text-xs text-white/45">Users become unlimited from Pulse onward, so collaboration never becomes the upgrade trigger.</p>
          </div>
          <span className="shrink-0 rounded-full border border-lime-200/20 bg-black/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-lime-200">1 user free · unlimited paid</span>
        </ScrollReveal>

        <ScrollReveal staggerChildren={90} className="mx-auto mt-14 grid max-w-[1180px] gap-5 lg:grid-cols-3 lg:items-stretch">
          {pricingTiers.map((tier, index) => (
            <RevealItem key={tier.name} index={index}>
              <PricingCard tier={tier} signupUrl={signupUrl} />
            </RevealItem>
          ))}
        </ScrollReveal>

        {!detailed && <AdvancedPlanLink />}
        {detailed && <PlanComparison />}
        {detailed && <AdvancedPlans />}
        {detailed && <ServicesPricing />}
      </div>
    </section>
  );
}
