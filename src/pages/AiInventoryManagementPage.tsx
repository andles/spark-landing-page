import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyFooter from '../agency/AgencyFooter';
import BookACallButton from '../agency/BookACallButton';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';
import {
  aiEvaluationChecklist,
  aiInventoryFaqs,
  aiInventoryJobs,
  aiVersusRules,
} from '../content/aiInventoryManagement';

const CTA_OPTIONS = { source: 'ai-inventory-management' } as const;

const primaryButton =
  'inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]';
const secondaryButton =
  'inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]';

const heroFacts = ['A forecast for every SKU', 'Draft orders you approve', 'Free for one user'];

export function AiInventoryManagementPage() {
  const { signupUrl, bookUrl } = useCtaLinks(CTA_OPTIONS);

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-28 md:px-8 lg:pb-24 lg:pt-32">
          <div className="absolute inset-0 dot-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(139,92,246,0.14),transparent_65%)]" />
          <div className="relative z-10 mx-auto max-w-[1180px] text-center">
            <ScrollReveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.07] px-4 py-2 text-sm text-violet-100">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                A practical guide
              </p>
              <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.6rem]">
                AI Inventory Management
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">What It Does and What to Check</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                AI inventory management uses your own sales, stock and supplier data to forecast each item, decide what to reorder and when, and flag problems early. The software prepares the decision with its reasoning. You approve it.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={signupUrl} className={primaryButton}>Start Free</a>
                <BookACallButton url={bookUrl} className={secondaryButton}>Book a demo</BookACallButton>
              </div>
              <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#c9d1dc]">
                {heroFacts.map((fact) => (
                  <li key={fact} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        <section aria-labelledby="jobs-heading" className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">Six jobs AI takes on</p>
              <h2 id="jobs-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What AI actually does in inventory management</h2>
              <p className="mt-4 text-base leading-7 text-[#b8bfcc]">Most of the work is not magic. It is doing the same careful calculation for every item, every day, and bringing you only the decisions that need a person.</p>
            </ScrollReveal>
            <ScrollReveal staggerChildren={70} className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {aiInventoryJobs.map((job, index) => (
                <RevealItem key={job.title} index={index}>
                  <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                    <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                    <h3 className="mt-4 text-lg font-semibold">{job.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{job.body}</p>
                    <p className="mt-4 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4 text-sm leading-6 text-[#d7dce5]">
                      <span className="font-semibold text-cyan-200">In Spark: </span>
                      {job.spark}
                    </p>
                    <Link to={job.href} className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-cyan-200 hover:text-white">
                      {job.link}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </article>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section aria-labelledby="rules-heading" className="px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1080px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">AI versus reorder points</p>
              <h2 id="rules-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How an AI forecast differs from a reorder point rule</h2>
            </ScrollReveal>
            <ScrollReveal className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08]">
              <div className="hidden grid-cols-[1fr_1.3fr_1.3fr] gap-6 border-b border-white/[0.08] bg-white/[0.03] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 md:grid">
                <span>Question</span><span>Reorder point rule</span><span>AI forecast</span>
              </div>
              {aiVersusRules.map((row) => (
                <div key={row.question} className="grid gap-3 border-b border-white/[0.06] px-6 py-5 last:border-b-0 md:grid-cols-[1fr_1.3fr_1.3fr] md:gap-6">
                  <p className="font-semibold text-white">{row.question}</p>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 md:hidden">Reorder point rule</p>
                    <p className="text-sm leading-6 text-[#8b95a8]">{row.rules}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35 md:hidden">AI forecast</p>
                    <p className="text-sm leading-6 text-[#d7dce5]">{row.ai}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
            <p className="mt-5 text-sm text-[#8b95a8]">
              Still using reorder points? <Link to="/reorder-point-calculator/" className="font-semibold text-cyan-200 underline-offset-4 hover:underline">Work one out with the reorder point calculator.</Link>
            </p>
          </div>
        </section>

        <section aria-labelledby="choose-heading" className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto max-w-[1080px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-300">Buyer’s checklist</p>
              <h2 id="choose-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How to evaluate AI inventory management software</h2>
              <p className="mt-4 text-base leading-7 text-[#b8bfcc]">Many tools now say they use AI. These six questions separate a real forecast from a label.</p>
            </ScrollReveal>
            <ScrollReveal>
              <ol className="mt-10 grid gap-4 md:grid-cols-2">
                {aiEvaluationChecklist.map((item, index) => (
                  <li key={item.title} className="rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6">
                    <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{item.body}</p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <ScrollReveal>
              <p className="text-sm font-semibold text-violet-300">AI inventory management FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Common questions</h2>
              <div className="mt-6 space-y-3 text-sm">
                <Link to="/demand-forecasting-software/" className="block text-cyan-300 hover:text-cyan-200">How Spark forecasts demand →</Link>
                <Link to="/chatgpt-inventory-management/" className="block text-cyan-300 hover:text-cyan-200">Spark in ChatGPT and Claude →</Link>
                <Link to="/pricing/" className="block text-cyan-300 hover:text-cyan-200">Plans and pricing →</Link>
              </div>
            </ScrollReveal>
            <div className="space-y-3">
              {aiInventoryFaqs.map(({ question, answer }) => (
                <details key={question} className="group rounded-2xl border border-white/[0.08] bg-[#080b11] open:bg-white/[0.04]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="text-cyan-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-7 text-[#8b95a8]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/[0.06] px-6 py-20 text-center md:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_50%_100%,rgba(139,92,246,0.12),transparent_68%)]" />
          <ScrollReveal className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See an AI forecast of your own inventory</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#b8bfcc]">Connect your store or accounting system, or import a spreadsheet. Free is an ongoing plan for one user, not a trial.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={signupUrl} className={primaryButton}>Start Free</a>
              <BookACallButton url={bookUrl} className={secondaryButton}>Book a demo</BookACallButton>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
