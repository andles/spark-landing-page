import ScrollReveal from "../ScrollReveal";
import { charityFaqs } from "./charityFaqs";

export default function CharityFAQSection() {
  return (
    <section id="faq" className="scroll-mt-16 relative overflow-hidden border-y border-white/[0.06] bg-white/[0.018] py-16 lg:py-24">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-10 px-6 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <ScrollReveal>
          <p className="text-sm font-semibold text-cyan-300">Charity retail FAQ</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">What retail directors ask before a pilot</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#8b95a8]">The practical details about volunteers, tills, Gift Aid, data ownership, and how a pilot is structured.</p>
        </ScrollReveal>

        <div className="space-y-3">
          {charityFaqs.map((faq, index) => (
            <ScrollReveal key={faq.question} delay={Math.min(index * 0.04, 0.16)}>
              <details className="group rounded-2xl border border-white/[0.08] bg-[#080b11] open:border-white/[0.13] open:bg-white/[0.04]">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="px-5 pb-5 pr-14 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
