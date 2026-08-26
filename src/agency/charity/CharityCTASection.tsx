import BookACallButton from "../BookACallButton";
import { useCtaLinks } from "../ctaLinks";
import ScrollReveal from "../ScrollReveal";

const CTA_OPTIONS = { source: "charity-retail" } as const;

export default function CharityCTASection() {
  const { bookUrl } = useCtaLinks(CTA_OPTIONS);

  return (
    <section id="book-demo" className="scroll-mt-16 relative overflow-hidden bg-[#06080d] py-20 lg:py-28">
      <div className="absolute bottom-0 left-1/2 h-[900px] w-[1800px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(139,92,246,0.16),rgba(6,182,212,0.07)_45%,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Turn the stock you already have{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">into funding for the work you exist to do</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#b8bfcc]">
            A 30-minute walkthrough of intake, pricing, and channel routing, shaped around your estate and your donation mix.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookACallButton
              url={bookUrl}
              className="inline-flex h-[46px] items-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            >
              Book a 30-Minute Demo
            </BookACallButton>
            <a
              href="/contact"
              className="glass inline-flex h-[46px] items-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/[0.06]"
            >
              Talk to the Spark team
            </a>
          </div>
          <p className="mt-4 text-xs text-white/40">Pilot-first · 15 to 20 shops · no EPOS integration required</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
