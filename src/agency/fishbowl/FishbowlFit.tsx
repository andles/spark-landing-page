// ─────────────────────────────────────────────────────────────────────────────
// Who Spark fits (and who it doesn't), what moves over from Fishbowl, how long
// the move takes, and links to the other comparison pages.
// ─────────────────────────────────────────────────────────────────────────────
import { ArrowRight, CircleCheck, CircleMinus } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../ScrollReveal";
import { otherComparisonPages } from "../competitors/comparisonPages";

const fits = [
  "Want purchasing planned from a per-SKU demand forecast instead of built by hand from reports.",
  "Want everyone on the team in the system without paying for each user.",
  "Sell through Shopify, Amazon, or wholesale and run QuickBooks Online, Xero, or Zoho Books.",
  "Want to describe a report and get it from live data, without buying custom reports.",
  "Want to run Spark alongside Fishbowl and compare with their own data before switching.",
];

const notFits = [
  "You run QuickBooks Desktop or QuickBooks Enterprise. Spark syncs with QuickBooks Online, Xero, and Zoho Books.",
  "Your shop depends on MRP production scheduling and job and labor costing, as in Fishbowl Advanced Manufacturing.",
  "You need to host the system on your own servers. Spark is cloud software.",
];

const moves = [
  "Items and inventory levels",
  "Customers and vendors",
  "Sales history",
  "Purchase orders",
];

export default function FishbowlFit() {
  return (
    <section id="fit" className="scroll-mt-16 relative bg-[#06080d] py-14 lg:py-20">
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8 lg:px-12">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold text-cyan-300">Is Spark right for you?</p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            Who Spark fits, and who it doesn't
          </h2>
        </ScrollReveal>

        <ScrollReveal className="grid gap-5 md:grid-cols-2">
          <article className="h-full rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6 sm:p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-200">Spark fits teams that</h3>
            <ul className="mt-5 space-y-3.5">
              {fits.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[#e0e4ea]">
                  <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Spark may not fit if</h3>
            <ul className="mt-5 space-y-3.5">
              {notFits.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[#c7cdd7]">
                  <CircleMinus className="mt-1 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </ScrollReveal>

        <ScrollReveal className="mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-white/[0.08] bg-[#0c1019] p-6 sm:p-7">
            <h3 className="text-xl font-bold text-[#f0f2f5]">Migrating from Fishbowl</h3>
            <h4 className="mt-5 text-sm font-semibold text-white">What moves over</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {moves.map((item) => (
                <li key={item} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs text-white/65">{item}</li>
              ))}
            </ul>
            <h4 className="mt-5 text-sm font-semibold text-white">How long it takes</h4>
            <p className="mt-2 text-sm leading-7 text-[#b8bfcc]">
              Your Fishbowl database backup imports in minutes once you approve the mapping. Fishbowl keeps running while
              you compare, and Spark is free until your current Fishbowl contract ends, so you choose the cutover date.
            </p>
          </article>
          <aside className="rounded-2xl border border-white/[0.08] bg-[#0c1019] p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-white">Compare Spark</h3>
            <div className="mt-3 space-y-1">
              {otherComparisonPages("/fishbowl-alternative/").map((page) => (
                <Link
                  key={page.href}
                  to={page.href}
                  className="group flex min-h-10 items-center justify-between rounded-xl px-3 py-2 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
                >
                  <span>{page.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ))}
              <Link
                to="/pricing/"
                className="group flex min-h-10 items-center justify-between rounded-xl px-3 py-2 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white"
              >
                <span>Spark pricing</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </ScrollReveal>
      </div>
    </section>
  );
}
