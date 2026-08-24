import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, type LucideIcon } from 'lucide-react';
import AgencyHeader from '../../agency/AgencyHeader';
import AgencyFooter from '../../agency/AgencyFooter';
import BookACallButton from '../../agency/BookACallButton';
import ScrollReveal, { RevealItem } from '../../agency/ScrollReveal';
import { useCtaLinks } from '../../agency/ctaLinks';

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeaturePageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  features: FeatureItem[];
  nextCategory?: { name: string; href: string };
  prevCategory?: { name: string; href: string };
}

const decisionSteps = [
  {
    number: '01',
    title: 'Ask the onboarding agent',
    body: 'Use Sparki in app or your own AI assistant over MCP to inspect what exists and bring in the data your team already trusts.',
  },
  {
    number: '02',
    title: 'See the recommendation',
    body: 'Spark turns sales, stock, and lead times into a clear next action with the reasoning attached.',
  },
  {
    number: '03',
    title: 'Approve and move',
    body: 'Review, adjust, and approve in one place. Your team keeps control without rebuilding the analysis every week.',
  },
];

export function FeaturePage({
  title,
  subtitle,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  features,
  nextCategory,
  prevCategory,
}: FeaturePageProps) {
  const { signupUrl } = useCtaLinks();

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8 lg:pb-28 lg:pt-40">
          <div className="absolute inset-0 dot-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_10%,rgba(6,182,212,0.12),transparent_62%)]" />
          <div className="absolute -left-56 top-48 h-[620px] w-[620px] rounded-full bg-violet-500/[0.07] blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-[1180px]">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#8b95a8] transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Spark Inventory
            </Link>

            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
              <ScrollReveal>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#b8bfcc]">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </span>
                  {subtitle}
                </div>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4.25rem]">
                  <span className="text-[#f0f2f5]">{title}</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Without the Spreadsheet Work
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">{description}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
                    Start Free
                  </a>
                  <BookACallButton className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">
                    Book a 30-Minute Demo
                  </BookACallButton>
                </div>
                <p className="mt-3 text-xs text-white/40">Onboard with Sparki in app or your own AI assistant over MCP.</p>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="relative rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-2xl shadow-cyan-950/20 sm:p-8">
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">What your team gets</p>
                  <div className="mt-6 space-y-5">
                    {features.slice(0, 4).map((feature) => (
                      <div key={feature.title} className="flex gap-4 border-b border-white/[0.06] pb-5 last:border-0 last:pb-0">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                          <Check className="h-3.5 w-3.5 text-cyan-300" />
                        </span>
                        <div>
                          <h2 className="text-sm font-semibold text-white">{feature.title}</h2>
                          <p className="mt-1 text-sm leading-6 text-[#8b95a8]">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">Complete capability</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything you need to run {title.toLowerCase()}</h2>
              <p className="mt-4 text-base leading-7 text-[#b8bfcc]">Built into the same system that tracks stock, orders, purchasing, warehouses, and the decisions between them.</p>
            </ScrollReveal>

            <ScrollReveal staggerChildren={60} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <RevealItem key={feature.title} index={index}>
                  <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]">
                    <div className={`mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{feature.description}</p>
                  </article>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section className="relative px-6 py-16 md:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(139,92,246,0.06),transparent_65%)]" />
          <div className="relative mx-auto max-w-[1080px]">
            <ScrollReveal className="text-center">
              <p className="text-sm font-semibold text-violet-300">From signal to action</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">A decision workflow your whole team can follow</h2>
            </ScrollReveal>
            <ScrollReveal staggerChildren={100} className="mt-10 grid gap-4 md:grid-cols-3">
              {decisionSteps.map((step, index) => (
                <RevealItem key={step.number} index={index}>
                  <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6">
                    <span className="font-mono text-xs text-cyan-300">{step.number}</span>
                    <h3 className="mt-8 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{step.body}</p>
                  </div>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {(prevCategory || nextCategory) && (
          <nav aria-label="Related feature pages" className="border-y border-white/[0.06] bg-white/[0.02] px-6 py-6 md:px-8">
            <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4">
              {prevCategory ? (
                <Link to={prevCategory.href} className="inline-flex items-center gap-2 text-sm text-[#b8bfcc] transition-colors hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                  {prevCategory.name}
                </Link>
              ) : <span />}
              {nextCategory && (
                <Link to={nextCategory.href} className="inline-flex items-center gap-2 text-right text-sm text-[#b8bfcc] transition-colors hover:text-white">
                  {nextCategory.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </nav>
        )}

        <section className="relative overflow-hidden px-6 py-20 text-center md:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_50%_100%,rgba(6,182,212,0.11),transparent_68%)]" />
          <ScrollReveal className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">See your own inventory plan in Spark</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#b8bfcc]">Upload the data you already have and turn it into the next decisions your team needs to make.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">Start Free</a>
              <BookACallButton className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">Book a Demo</BookACallButton>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <AgencyFooter />
    </div>
  );
}
