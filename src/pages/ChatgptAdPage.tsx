import { useEffect, useRef } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import AgencyHeader from '../agency/AgencyHeader';
import AgencyFooter from '../agency/AgencyFooter';
import { useCtaLinks } from '../agency/ctaLinks';
import { captureExampleAnswerViewed } from '../analytics';
import { CHATGPT_PLUGIN_URL, assistantSafeguards, exampleConversation } from '../content/aiAssistants';
import { chatgptAdDataSources, chatgptAdFaqs, chatgptAdSteps } from '../content/chatgptAd';

// Landing page for paid ChatGPT ads only (noindex). See content/chatgptAd.ts
// for why it is separate from /chatgpt-inventory-management/.

const CTA_OPTIONS = { source: 'reorder-in-chatgpt' } as const;

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

// On phones the example is pared down to the question and the three
// recommendations, so the first screen stays calm. Reasons and the closing
// line show from the sm breakpoint up.
function ExampleAnswer() {
  const ref = useExampleAnswerViewed();
  return (
    <div ref={ref} className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0a0d14] p-4 text-left sm:p-5">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-white/[0.08] px-3.5 py-2 text-sm text-white">
          {exampleConversation.question}
        </p>
        <div className="mt-3 flex gap-2.5">
          <span className="mt-0.5 hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 sm:flex" aria-hidden="true">
            <Sparkles className="h-3 w-3 text-white" />
          </span>
          <div className="min-w-0 flex-1 text-sm leading-6 text-[#d7dce5]">
            <p className="hidden sm:block">{exampleConversation.intro}</p>
            <ul className="space-y-1.5 sm:mt-2 sm:space-y-0 sm:divide-y sm:divide-white/[0.06] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-white/[0.08]">
              {exampleConversation.items.map((item) => (
                <li key={item.sku} className="flex items-baseline justify-between gap-3 sm:items-center sm:bg-white/[0.02] sm:px-3 sm:py-2">
                  <span className="min-w-0">
                    <span className="block text-white sm:font-semibold sm:leading-5">{item.sku}</span>
                    <span className="hidden text-xs leading-5 text-[#8b95a8] sm:block">{item.reason}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-emerald-300">{item.order}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 hidden sm:block">{exampleConversation.close}</p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-white/40">Example answer in ChatGPT, with sample data.</p>
    </div>
  );
}

function AddToChatgptButtons({ signupUrl, hideSecondaryOnPhone = false }: { signupUrl: string; hideSecondaryOnPhone?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={CHATGPT_PLUGIN_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>Add Spark to ChatGPT, free</a>
      <a href={signupUrl} className={hideSecondaryOnPhone ? `hidden sm:inline-flex ${secondaryButton.replace('inline-flex ', '')}` : secondaryButton}>Start a free account</a>
    </div>
  );
}

export function ChatgptAdPage() {
  const { signupUrl } = useCtaLinks(CTA_OPTIONS);

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        {/* Built for a phone inside the ChatGPT app (about 400 by 650). Ad
            visitors do not scroll, so the first screen says what Spark does
            and shows the button right under the headline, then the example
            chat starts below it. */}
        <section className="relative overflow-hidden px-4 pb-12 pt-20 sm:px-6 md:px-8 lg:pb-20 lg:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(34,197,94,0.13),transparent_65%)]" />
          <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-7 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <h1 className="mx-auto max-w-[16ch] text-[2rem] font-bold leading-[1.1] tracking-tight lg:mx-0 sm:text-5xl lg:text-[3.5rem]">
                Know what to reorder, right in <span className="text-emerald-300">ChatGPT</span>
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-6 text-[#c9d1dc] sm:text-lg sm:leading-8 lg:mx-0">
                Spark connects ChatGPT to your sales and stock, so it can tell you what to buy and why.
              </p>
              <div className="mt-5 lg:mt-8">
                <AddToChatgptButtons signupUrl={signupUrl} hideSecondaryOnPhone />
                <HeroFacts />
              </div>
            </div>
            <ExampleAnswer />
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

// One quiet line under the button. The data sources move to the setup steps
// on phones, where they do not compete with the button.
function HeroFacts() {
  return (
    <>
      <p className="mt-3 text-center text-sm text-[#9aa3b2] lg:text-left">Free for one user. No credit card.</p>
      <p className="mt-1 hidden text-xs text-white/50 sm:block sm:text-center lg:text-left">{chatgptAdDataSources}.</p>
    </>
  );
}
