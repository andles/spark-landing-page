import { MessageSquare, ShieldCheck } from 'lucide-react';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyFooter from '../agency/AgencyFooter';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { useCtaLinks } from '../agency/ctaLinks';
import {
  CHATGPT_PLUGIN_URL,
  SPARK_MCP_URL,
  assistantCapabilities,
  assistantFaqs,
  assistantPrompts,
  assistantSafeguards,
  assistantSteps,
} from '../content/aiAssistants';

const CTA_OPTIONS = { source: 'chatgpt-inventory-management' } as const;

const primaryButton =
  'inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-white transition-transform hover:scale-[1.02]';
const secondaryButton =
  'inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]';

export function AiAssistantInventoryPage() {
  const { signupUrl } = useCtaLinks(CTA_OPTIONS);

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-28 md:px-8 lg:pb-24 lg:pt-32">
          <div className="absolute inset-0 dot-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.13),transparent_65%)]" />
          <div className="relative z-10 mx-auto max-w-[1180px] text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2 text-sm text-emerald-200">
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                Inventory management in ChatGPT and Claude
              </div>
              <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.6rem]">
                Run Your Inventory
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">From a Conversation</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Ask ChatGPT or Claude what is running low, what to buy, and why. Spark answers from your live workspace with demand forecasts per SKU, days of supply, lead times, and supplier terms, then drafts the purchase orders you approve.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={CHATGPT_PLUGIN_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>Add to ChatGPT</a>
                <a href="#claude" className={secondaryButton}>Connect Claude</a>
              </div>
              <p className="mt-3 text-xs text-white/50">
                Needs a Spark account. New to Spark? <a href={signupUrl} className="text-cyan-300 underline-offset-4 hover:underline">Start free</a>, or create one when you first connect.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-20">
          <div className="mx-auto max-w-[1080px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-emerald-300">Try asking</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Questions Spark answers from your own data</h2>
            </ScrollReveal>
            <ScrollReveal staggerChildren={80} className="mt-8 grid gap-3 md:grid-cols-3">
              {assistantPrompts.map((prompt, index) => (
                <RevealItem key={prompt} index={index}>
                  <p className="h-full rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-5 text-sm leading-6 text-[#d7dce5]">“{prompt}”</p>
                </RevealItem>
              ))}
            </ScrollReveal>
            <ScrollReveal staggerChildren={80} className="mt-10 grid gap-4 md:grid-cols-2">
              {assistantCapabilities.map(({ title, body }, index) => (
                <RevealItem key={title} index={index}>
                  <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{body}</p>
                  </article>
                </RevealItem>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <section className="px-6 py-16 md:px-8 lg:py-20">
          <div className="mx-auto max-w-[1080px]">
            <ScrollReveal className="text-center">
              <p className="text-sm font-semibold text-cyan-300">Set up in a few minutes</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Connect Spark in three steps</h2>
            </ScrollReveal>
            <ScrollReveal staggerChildren={100} className="mt-10 grid gap-4 md:grid-cols-3">
              {assistantSteps.map(({ title, body }, index) => (
                <RevealItem key={title} index={index}>
                  <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6">
                    <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                    <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{body}</p>
                  </div>
                </RevealItem>
              ))}
            </ScrollReveal>
            <div id="claude" className="mt-10 scroll-mt-24 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6 sm:p-8">
              <h3 className="text-lg font-semibold">Connecting Claude</h3>
              <p className="mt-2 text-sm leading-6 text-[#b8bfcc]">
                Open <strong>Customize → Connectors</strong>, add a custom connector, and paste this server URL. On Team or Enterprise, an owner adds it in Organization settings first.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#06080d] p-4 text-sm text-cyan-200" aria-label="Spark MCP server URL"><code>{SPARK_MCP_URL}</code></pre>
              <a href="/connect-spark-to-your-assistant/" className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">Full setup and permissions guide →</a>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-16 md:px-8 lg:py-20">
          <div className="mx-auto max-w-[1080px]">
            <ScrollReveal className="max-w-3xl">
              <p className="text-sm font-semibold text-violet-300">You stay in charge</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">The assistant prepares. You approve.</h2>
            </ScrollReveal>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {assistantSafeguards.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-5 text-sm leading-6 text-[#d7dce5]">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 px-6 py-16 md:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <ScrollReveal>
              <p className="text-sm font-semibold text-violet-300">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Using Spark from ChatGPT or Claude</h2>
              <div className="mt-6 space-y-3 text-sm">
                <a href="/features/tools-services/" className="block text-cyan-300 hover:text-cyan-200">Sparki and MCP in detail →</a>
                <a href="/demand-forecasting-software/" className="block text-cyan-300 hover:text-cyan-200">How Spark forecasts demand →</a>
                <a href="/pricing/" className="block text-cyan-300 hover:text-cyan-200">Plans and pricing →</a>
              </div>
            </ScrollReveal>
            <div className="space-y-3">
              {assistantFaqs.map(({ question, answer }) => (
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

        <section className="relative overflow-hidden px-6 py-20 text-center md:px-8 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_50%_100%,rgba(34,197,94,0.11),transparent_68%)]" />
          <ScrollReveal className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ask your first inventory question today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#b8bfcc]">Add Spark Inventory in ChatGPT, or start a free Spark account and connect the assistant you already use.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={CHATGPT_PLUGIN_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>Add to ChatGPT</a>
              <a href={signupUrl} className={secondaryButton}>Start Free</a>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
