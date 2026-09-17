import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import { useCtaLinks } from "./links";

const sparkIncludes = [
  "Continuous forecasts and buying plans",
  "Live reorder and stockout alerts",
  "Multiple supported data connections",
  "Unlimited users",
] as const;

export default function FishbowlPriceComparison() {
  const { signupUrl } = useCtaLinks();

  return (
    <section id="price-compare" className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_50%_at_50%_0%,rgba(6,182,212,0.09),transparent_72%)]" />
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8 lg:px-12">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">Live planning comparison</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            What does it cost to get live forecasting?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#9da7b8] lg:text-lg">
            Monthly forecasting is free with Spark. When it needs to stay live, Fishbowl includes demand forecasting on Scale or sells it as an add-on to Growth. Spark includes it on Pulse.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mx-auto mt-10 max-w-[920px]">
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-[#090d15]/95 shadow-[0_38px_120px_rgba(0,0,0,0.42)]">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.025] px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-[9px] tracking-[0.18em] text-white/35">EVALUATION BRIEF / LIVE SOURCES</p>
                <p className="mt-1 text-sm font-semibold text-white">Fishbowl Inventory vs Spark Inventory</p>
              </div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-2.5 py-1 font-mono text-[9px] text-cyan-200">FACT-CHECKED</span>
            </div>

            <div className="p-5 sm:p-6">
              <p className="mx-auto max-w-[610px] text-center text-xs leading-5 text-[#9aa4b4]">
                Which subscription gets a growing inventory team from reorder points to a live demand forecast, and how many users can work from it?
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] sm:items-stretch">
                <section aria-label="Fishbowl Inventory pricing" className="rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-4">
                  <p className="text-[11px] font-medium text-white/45">Fishbowl Inventory</p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight text-white">Growth</h3>
                  <p className="mt-1 text-[11px] leading-4 text-white/35">Multichannel inventory plan</p>
                  <p className="mt-5 font-mono text-xl font-semibold tracking-tight text-white">$429/mo</p>
                  <p className="mt-1 text-[10px] leading-4 text-[#7f8999]">Billed annually</p>
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/10 px-3 py-2.5">
                    <span className="text-[10px] text-white/40">Users included</span>
                    <span className="font-mono text-xs font-semibold text-white">5</span>
                  </div>

                  <div className="my-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-amber-300/80" aria-hidden="true">
                    <span className="h-px flex-1 bg-amber-300/15" />
                    Plus
                    <span className="h-px flex-1 bg-amber-300/15" />
                  </div>

                  <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.045] p-3.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-medium text-amber-200">Planning layer</p>
                        <p className="mt-1 text-sm font-semibold text-white">Demand forecasting</p>
                      </div>
                      <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-amber-300">Add-on</span>
                    </div>
                    <p className="mt-2 text-[10px] leading-4 text-[#8b95a8]">Included when you move up to Scale at $729/month.</p>
                  </div>
                </section>

                <div className="flex items-center justify-center font-mono text-[9px] tracking-[0.16em] text-white/25" aria-hidden="true">
                  <span className="sm:hidden">VERSUS</span>
                  <span className="hidden sm:inline">VS</span>
                </div>

                <section aria-label="Spark Inventory pricing" className="relative overflow-hidden rounded-[20px] border border-cyan-300/25 bg-[linear-gradient(145deg,rgba(34,211,238,0.10),rgba(139,92,246,0.06))] p-4 shadow-[0_18px_50px_rgba(6,182,212,0.08)]">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-medium text-white/45">Spark Inventory</p>
                      <h3 className="mt-1 text-base font-semibold tracking-tight text-white">Pulse</h3>
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-emerald-300">Included</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-4 text-white/35">Live inventory intelligence</p>
                  <p className="mt-5 font-mono text-xl font-semibold tracking-tight text-cyan-200">$99/mo</p>
                  <p className="mt-1 text-[10px] leading-4 text-[#7f8999]">14-day free trial</p>
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-300/15 bg-emerald-300/[0.045] px-3 py-2.5">
                    <span className="text-[10px] text-white/45">Users included</span>
                    <span className="font-mono text-xs font-semibold text-emerald-300">Unlimited</span>
                  </div>

                  <ul className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4">
                    {sparkIncludes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[11px] leading-4 text-[#cbd2dc]">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-300/[0.09] text-emerald-300" aria-hidden="true">
                          <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <p className="mt-4 rounded-xl bg-white/[0.025] px-4 py-3 text-center text-[11px] leading-5 text-[#aeb6c3]">
                <strong className="font-semibold text-white">Clear takeaway:</strong> Spark Pulse starts at $99/month with live forecasting and unlimited users. Fishbowl Growth is $429/month for 5 users with forecasting sold as an add-on, or included on Scale at $729/month.
              </p>

              <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-4 sm:flex-row">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-white">Start with monthly forecasting at $0.</p>
                  <p className="mt-1 text-[11px] text-[#8b95a8]">Upgrade only when you need live intelligence and team access.</p>
                </div>
                <a href={signupUrl} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 text-sm font-semibold text-white transition hover:scale-[1.02]">
                  Start Forecasting Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <a
              href="https://www.fishbowlinventory.com/pricing"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border-t border-white/[0.07] px-5 py-4 text-xs text-[#8b95a8] transition hover:bg-white/[0.025] hover:text-white sm:px-6"
            >
              <span>Fishbowl pricing and plan details</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-3 text-center text-[10px] leading-5 text-white/30">
            This compares access to live demand forecasting, not complete platform feature parity. Vendor source checked September 17, 2026. Prices and packaging can change.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
