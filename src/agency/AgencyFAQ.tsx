import ScrollReveal from "./ScrollReveal";
import { homeFaqs } from './homeFaqs';

export default function AgencyFAQ() {
  return (
    <section id="faq" className="scroll-mt-16 relative py-16 lg:py-24 bg-[#06080d]">
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
      <div className="relative z-10 max-w-[1080px] mx-auto px-6 md:px-8">
        <ScrollReveal className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-5">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Questions before you switch
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Get the details. Then get your inventory plan.
          </h2>
          <p className="mt-4 max-w-2xl text-base lg:text-lg leading-relaxed text-[#b8bfcc]">
            Clear answers about setup, automation, integrations, pricing, and whether Spark fits the way your business operates.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-3">
          {homeFaqs.map((faq, index) => (
            <ScrollReveal key={faq.question} delay={Math.min(index * 0.04, 0.2)}>
              <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] open:bg-white/[0.05] transition-colors">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left text-base font-semibold text-white sm:px-6 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan-300 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 pr-14 text-sm leading-7 text-[#b8bfcc] sm:px-6 sm:pb-6 sm:pr-20">
                  {faq.answer}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
