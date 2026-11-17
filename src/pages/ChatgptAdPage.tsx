import { useEffect, useRef } from 'react';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyFooter from '../agency/AgencyFooter';
import { useCtaLinks } from '../agency/ctaLinks';
import { captureExampleAnswerViewed } from '../analytics';
import { CHATGPT_PLUGIN_URL, assistantSafeguards, exampleConversation } from '../content/aiAssistants';
import { chatgptAdDataSources, chatgptAdFaqs, chatgptAdSteps } from '../content/chatgptAd';

// Landing page for paid ChatGPT ads only (noindex). See content/chatgptAd.ts
// for why it is separate from /chatgpt-inventory-management/.

const CTA_OPTIONS = { source: 'reorder-in-chatgpt' } as const;

const heroFacts = ['Free for one user', 'No credit card'];

const primaryButton =
  'inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 text-base font-semibold text-white transition-transform hover:scale-[1.02] sm:w-auto';
const secondaryButton =
  'inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] sm:w-auto';

/** Reports once when at least half of the example answer has been on screen. */
function useExampleAnswerViewed() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      captureExampleAnswerViewed();
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ExampleAnswer() {
  const ref = useExampleAnswerViewed();
  return (
    <div ref={ref}>
      <div className="rounded-3xl border border-white/[0.08] bg-[#0a0d14] p-3 text-left shadow-2xl shadow-emerald-500/[0.04] sm:p-5">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.08] px-3.5 py-2 text-sm text-white">
          {exampleConversation.question}
        </p>
        <div className="mt-3 flex gap-2.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" aria-hidden="true">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <div className="min-w-0 flex-1 text-sm leading-6 text-[#d7dce5]">
            <p>{exampleConversation.intro}</p>
            <ul className="mt-2 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
              {exampleConversation.items.map((item) => (
                <li key={item.sku} className="flex items-center justify-between gap-3 bg-white/[0.02] px-3 py-2">
                  <span className="min-w-0">
                    <span className="block font-semibold leading-5 text-white">{item.sku}</span>
                    <span className="block text-xs leading-5 text-[#8b95a8]">{item.reason}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-emerald-300">{item.order}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 hidden sm:block">{exampleConversation.close}</p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-white/40">Example answer with sample data. Spark answers from your own.</p>
    </div>
  );
}

function AddToChatgptButtons({ signupUrl, primaryOnly = false }: { signupUrl: string; primaryOnly?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={CHATGPT_PLUGIN_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>Add Spark to ChatGPT, free</a>
      {primaryOnly ? null : <a href={signupUrl} className={secondaryButton}>Start a free account</a>}
    </div>
  );
}

export function ChatgptAdPage() {
  const { signupUrl } = useCtaLinks(CTA_OPTIONS);

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        {/* Built for a phone inside the ChatGPT app (about 400 by 650): the
            headline, the example answer and the button all fit the first
            screen, because ad visitors do not scroll. */}
        <section className="relative overflow-clip px-4 pb-12 pt-20 sm:px-6 md:px-8 lg:pb-20 lg:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.13),transparent_65%)]" />
          <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-5 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <h1 className="text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                Know what to reorder,
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">right in ChatGPT</span>
              </h1>
              <p className="mx-auto mt-3 hidden max-w-xl text-sm leading-6 text-[#b8bfcc] sm:block sm:text-lg sm:leading-8 lg:mx-0">
                Ask what to buy this week. Spark answers from your own sales and stock.
              </p>
              <div className="mt-8 hidden lg:block">
                <AddToChatgptButtons signupUrl={signupUrl} />
                <HeroFacts />
              </div>
            </div>
            <ExampleAnswer />
            {/* On phones the button sticks to the bottom of the screen while
                the hero is in view, so it is in the first screen on any phone
                height, then settles under the example answer. */}
            <div className="sticky bottom-0 z-20 -mx-4 bg-gradient-to-t from-[#06080d] via-[#06080d] to-[#06080d]/90 px-4 pb-3 pt-3 sm:-mx-6 sm:px-6 lg:hidden">
              <AddToChatgptButtons signupUrl={signupUrl} primaryOnly />
              <HeroFacts signupUrl={signupUrl} />
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.015] px-6 py-14 md:px-8 lg:py-20">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Set up in three steps</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {chatgptAdSteps.map(({ title, body }, index) => (
                <li key={title} className="h-full rounded-2xl border border-white/[0.08] bg-[#0a0d14] p-6">
                  <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 py-14 md:px-8 lg:py-20">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">ChatGPT prepares. You approve.</h2>
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

        <section className="border-t border-white/[0.06] px-6 py-14 md:px-8 lg:py-20">
          <div className="mx-auto max-w-[760px]">
            <h2 className="text-center text-3xl font-bold tracking-tight">Questions</h2>
            <div className="mt-8 space-y-3">
              {chatgptAdFaqs.map(({ question, answer }) => (
                <details key={question} className="group rounded-2xl border border-white/[0.08] bg-[#080b11] open:bg-white/[0.04]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="text-cyan-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-7 text-[#8b95a8]">{answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <AddToChatgptButtons signupUrl={signupUrl} />
            </div>
          </div>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}

function HeroFacts({ signupUrl }: { signupUrl?: string }) {
  return (
    <>
      <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-[#c9d1dc] lg:justify-start">
        {heroFacts.map((fact) => (
          <li key={fact} className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            {fact}
          </li>
        ))}
      </ul>
      <p className="mt-1.5 text-center text-xs text-white/55 lg:text-left">{chatgptAdDataSources}.</p>
      {signupUrl ? (
        <p className="mt-1 text-center text-xs text-white/55">
          Not using ChatGPT? <a href={signupUrl} className="font-semibold text-cyan-300 underline-offset-4 hover:underline">Start a free account</a>
        </p>
      ) : null}
    </>
  );
}
