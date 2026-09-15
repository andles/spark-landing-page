import { Boxes, ChartNoAxesCombined, Timer } from "lucide-react";
import ScrollReveal, { RevealItem } from "./ScrollReveal";

const capabilities = [
  {
    icon: ChartNoAxesCombined,
    label: "Plan further ahead",
    headline: "19% lower",
    accent: "forecast error",
    title: "See six months ahead.",
    description: "Lower error than using last month’s sales to forecast six months ahead.",
  },
  {
    icon: Boxes,
    label: "Put inventory to work",
    headline: "12% less",
    accent: "stock held",
    title: "Hold less. Keep orders moving.",
    description: "Less inventory than last-month forecasting, at the same 98% fill rate.",
  },
  {
    icon: Timer,
    label: "Get value sooner",
    headline: "Under 1",
    accent: "hour to forecast",
    title: "Bring your files. Start planning.",
    description: "From export files to a working forecast with Sparki or your own AI assistant.",
  },
];

export default function ProductProofCards() {
  return (
    <div className="mt-8 lg:mt-10 w-full max-w-[1100px] mx-auto text-left">
      <ScrollReveal staggerChildren={120} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {capabilities.map(({ icon: Icon, title, label, headline, accent, description }, i) => (
          <RevealItem key={title} index={i} className="h-full">
            <article className="flex flex-col rounded-2xl border border-white/[0.10] bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 h-full hover:border-violet-400/30 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-cyan-400" />
                <p className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b8bfcc]">{label}</p>
              </div>
              <h2 className="font-bold tracking-tight leading-[1.08] mb-5">
                <span className="block text-[42px] lg:text-[50px] text-white">{headline}</span>
                <span className="block mt-1 text-[25px] lg:text-[28px] text-violet-300">{accent}</span>
              </h2>
              <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
              <p className="text-[#b8bfcc] text-sm leading-6">{description}</p>
            </article>
          </RevealItem>
        ))}
      </ScrollReveal>
      <div className="mt-7 text-center max-w-[760px] mx-auto">
        <p className="mb-3 text-sm text-[#b8bfcc]">
          Powered by{" "}
          <span className="inline-block whitespace-nowrap text-xl font-bold tracking-tight text-white">
            Demand{" "}<span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">ESP</span>
          </span>
        </p>
        <h3 className="text-lg font-semibold text-white">Every SKU. Its own forecast.</h3>
        <p className="mt-2 text-sm leading-6 text-[#b8bfcc]">Demand ESP reads each item’s demand pattern and automatically selects a forecasting method. See the method chosen and the history behind your forecast.</p>
      </div>
      <p className="mt-5 text-xs leading-5 text-[#a3adbd] text-center">
        Forecast and inventory results from public-data testing.
      </p>
      <details className="mt-1 text-sm text-[#b8bfcc] group">
        <summary className="mx-auto w-fit cursor-pointer px-2 py-2 text-center text-[#b8bfcc] hover:text-white underline underline-offset-4 decoration-white/25 focus-visible:outline-2 focus-visible:outline-cyan-400 rounded">
          How we measured it
        </summary>
        <div className="mt-4 border-t border-white/[0.08] pt-5 grid gap-5 md:grid-cols-2 text-xs leading-6">
          <section>
            <h3 className="font-semibold text-white text-sm">A method for each demand pattern</h3>
            <p>Demand ESP selects statistical methods for steady, trending, seasonal, and intermittent demand, using the available sales history and fallbacks for limited data.</p>
          </section>
          <section>
            <h3 className="font-semibold text-white text-sm">What the 12% measures</h3>
            <p>In an inventory simulation using 400 Iowa public-data items, average on-hand inventory cost was approximately $4.12M for Spark versus $4.67M for last-month forecasting at an interpolated 98% fill rate. Both used the same order-up-to policy, a 14-day lead time, lost sales, and a uniform $12 unit cost.</p>
          </section>
          <section>
            <h3 className="font-semibold text-white text-sm">What the 19% measures</h3>
            <p>Retrospective testing on 799 Iowa items found six-month pooled weighted absolute percentage error (WAPE) of 22.0% for Spark versus 27.1% for last-month forecasting, a relative reduction of approximately 19%.</p>
          </section>
          <section>
            <h3 className="font-semibold text-white text-sm">What onboarding time measures</h3>
            <p>Measured from customer export files to a working forecast. Setup time varies with data readiness and scope.</p>
          </section>
        </div>
      </details>
    </div>
  );
}
