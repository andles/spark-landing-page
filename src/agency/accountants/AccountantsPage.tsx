// ACCOUNTANTS partner page (/accountants). Speaks to accountants, bookkeepers,
// and CPA firms who recommend Spark to product and manufacturing clients.
// Follows the CharityRetailPage section styles. Partner terms come from
// partnerTypes.ts and accounting claims match /features/accounting and the
// integrations FAQ, so nothing here promises more than those pages do.
import {
  ArrowRight,
  BookOpenCheck,
  Boxes,
  Calculator,
  Coins,
  Factory,
  FileSpreadsheet,
  History,
  Layers,
  LineChart,
  PackageSearch,
  Receipt,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import AgencyHeader from "../AgencyHeader";
import AgencyFooter from "../AgencyFooter";
import BookACallButton from "../BookACallButton";
import ScrollReveal, { RevealItem } from "../ScrollReveal";
import { useCtaLinks } from "../ctaLinks";
import { useScrollToHashOnMount } from "../../hooks/useScrollToHash";
import { partnerTypeById } from "../../partnerTypes";
import { accountantFaqs } from "./accountantFaqs";

const CTA_OPTIONS = { source: "accountants" } as const;
const PARTNER_URL = "/partners/?type=agency";

const headingFont = { fontFamily: "var(--font-display, 'Inter', sans-serif)" };

interface Card {
  title: string;
  body: string;
  icon: LucideIcon;
}

const problems: Card[] = [
  {
    title: "Stock lives in a spreadsheet",
    body: "The inventory balance on the balance sheet is whatever the last count said, and nobody is sure when that was.",
    icon: FileSpreadsheet,
  },
  {
    title: "Sales post as lump deposits",
    body: "Shopify, Amazon, and wholesale orders land as payouts, so cost of goods sold is estimated instead of matched to what shipped.",
    icon: ShoppingCart,
  },
  {
    title: "Freight and duties go missing",
    body: "Shipping and import costs are expensed on arrival instead of added to the cost of the goods they brought in.",
    icon: Truck,
  },
  {
    title: "Year-end counts don't reconcile",
    body: "A large shrink adjustment appears every year and nobody can say which products or locations it came from.",
    icon: PackageSearch,
  },
  {
    title: "Manufacturers can't value work in progress",
    body: "Raw materials, sub-assemblies, and finished goods blur together when components are consumed off the books.",
    icon: Factory,
  },
  {
    title: "Cash is tied up in overbuying",
    body: "You see the inventory line growing faster than sales before the owner does, but there is no plan to point to.",
    icon: Coins,
  },
];

const flowInputs = ["Sales orders", "Purchase orders and receipts", "Inventory adjustments"];
const flowOutputs = ["Invoices", "Bills", "Credit notes", "Payments"];
const ledgers = ["QuickBooks Online", "Xero", "Zoho Books"];

const capabilities: Card[] = [
  {
    title: "Landed cost on receipts",
    body: "Allocate shipping, duties, and other expenses to purchase orders so inventory carries its true cost.",
    icon: Receipt,
  },
  {
    title: "Valuation and COGS reports",
    body: "Inventory valuation, COGS, and other financial summaries ready for month-end and year-end.",
    icon: Calculator,
  },
  {
    title: "Chart of accounts mapping",
    body: "Map Spark transactions to the client's chart of accounts so every document lands in the right place.",
    icon: BookOpenCheck,
  },
  {
    title: "Audit trail",
    body: "A complete transaction history with timestamps and users, so you can see who changed what and when.",
    icon: History,
  },
  {
    title: "Multi-currency and tax rates",
    body: "Transactions in multiple currencies with exchange rate updates, and tax rates set per jurisdiction.",
    icon: Layers,
  },
  {
    title: "Sync history you can check",
    body: "Every document Spark sends to the books is listed, so a missing invoice is a lookup, not an investigation.",
    icon: Boxes,
  },
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
      </span>
      {children}
    </div>
  );
}

function CardGrid({ cards, columns }: { cards: Card[]; columns: string }) {
  return (
    <ScrollReveal staggerChildren={100} className={`grid grid-cols-1 gap-4 lg:gap-5 ${columns}`}>
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <RevealItem key={card.title} index={i} className="h-full">
            <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 overflow-hidden h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300 mb-5">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-white text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-[#8b95a8] text-sm leading-relaxed">{card.body}</p>
            </div>
          </RevealItem>
        );
      })}
    </ScrollReveal>
  );
}

function Hero() {
  const { bookUrl } = useCtaLinks(CTA_OPTIONS);
  return (
    <section className="relative bg-[#06080d]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 dot-grid" />
      <div className="absolute inset-0 noise" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-up">
            <SectionEyebrow>For accountants, bookkeepers, and CPA firms</SectionEyebrow>
          </div>
          <h1
            className="animate-fade-up delay-100 text-[2.4rem] sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.08] tracking-tight"
            style={headingFont}
          >
            <span className="text-[#f0f2f5]">The inventory system to recommend</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              to clients who hold stock.
            </span>
          </h1>
          <p className="animate-fade-up delay-200 text-sm sm:text-base lg:text-lg text-[#b8bfcc] max-w-2xl mx-auto leading-relaxed mt-5">
            Spark Inventory runs stock, purchasing, sales, and manufacturing for product businesses, and sends clean
            invoices, bills, and credit notes to QuickBooks Online, Xero, or Zoho Books. Your clients get a real
            inventory system. You get books that tie out.
          </p>
          <div className="animate-fade-up delay-300 mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PARTNER_URL}
              className="h-[46px] px-8 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2"
            >
              Become a partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <BookACallButton
              url={bookUrl}
              className="h-[46px] px-8 rounded-full glass border border-white/15 text-[#f0f2f5] font-semibold text-base hover:bg-white/[0.06] hover:border-white/25 hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center"
            >
              Book a call
            </BookACallButton>
          </div>
          <p className="animate-fade-up delay-300 mt-3 text-xs text-[#8b95a8]">
            QuickBooks Online · Xero · Zoho Books · Free forecasting plan for clients
          </p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-14 lg:py-20 relative">
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end mb-10">
          <ScrollReveal>
            <SectionEyebrow>Where client inventory breaks the books</SectionEyebrow>
            <h2 className="text-3xl lg:text-[2.6rem] font-bold text-white leading-tight tracking-tight" style={headingFont}>
              You already know which clients{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                need an inventory system.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[#b8bfcc] text-base lg:text-lg leading-relaxed max-w-lg">
              They are the ones whose month-end takes twice as long. The inventory number is a guess, COGS is a plug,
              and the fix always lands on your desk.
            </p>
          </ScrollReveal>
        </div>
        <CardGrid cards={problems} columns="md:grid-cols-2 lg:grid-cols-3" />
      </div>
    </section>
  );
}

function FlowColumn({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
      <p className={`font-mono text-[11px] uppercase tracking-[0.16em] mb-4 ${accent}`}>{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="rounded-xl border border-white/[0.06] bg-[#080b11] px-4 py-3 text-sm text-white/85">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LedgerFlowSection() {
  return (
    <section className="py-14 lg:py-20 relative border-y border-white/[0.06] bg-white/[0.018]">
      <div className="relative z-10 max-w-[1180px] mx-auto px-6 md:px-8">
        <ScrollReveal className="max-w-2xl mb-10">
          <SectionEyebrow>What Spark sends to the books</SectionEyebrow>
          <h2 className="text-3xl lg:text-[2.6rem] font-bold text-white leading-tight tracking-tight" style={headingFont}>
            Operations in Spark. The ledger stays yours.
          </h2>
          <p className="mt-4 text-[#b8bfcc] text-base lg:text-lg leading-relaxed">
            Spark does not replace your client's accounting software. It records the operational work and sends the
            accounting documents it creates to the general ledger, with a sync history you can check.
          </p>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          <FlowColumn title="Work done in Spark" items={flowInputs} accent="text-cyan-300" />
          <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-white/30 lg:rotate-0" aria-hidden="true" />
          <FlowColumn title="Documents Spark sends" items={flowOutputs} accent="text-violet-300" />
          <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-white/30 lg:rotate-0" aria-hidden="true" />
          <FlowColumn title="Your client's ledger" items={ledgers} accent="text-fuchsia-300" />
        </ScrollReveal>
        <p className="mt-5 text-sm text-[#8b95a8]">
          QuickBooks Online can also bring in sales and purchase history when a client first connects. See{" "}
          <a href="/features/accounting/" className="text-cyan-300 hover:underline">
            accounting and QuickBooks
          </a>{" "}
          and{" "}
          <a href="/integrations/" className="text-cyan-300 hover:underline">
            all integrations
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function CleanNumbersSection() {
  return (
    <section className="py-14 lg:py-20 relative">
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="max-w-2xl mb-10">
          <SectionEyebrow>Built for numbers you can sign off on</SectionEyebrow>
          <h2 className="text-3xl lg:text-[2.6rem] font-bold text-white leading-tight tracking-tight" style={headingFont}>
            Inventory that arrives in the books{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">already right.</span>
          </h2>
        </ScrollReveal>
        <CardGrid cards={capabilities} columns="md:grid-cols-2 lg:grid-cols-3" />
      </div>
    </section>
  );
}

function ManufacturingAndAdvisorySection() {
  return (
    <section className="py-14 lg:py-20 relative border-y border-white/[0.06] bg-white/[0.018]">
      <div className="relative z-10 max-w-[1180px] mx-auto px-6 md:px-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ScrollReveal className="h-full">
          <div className="h-full rounded-2xl border border-white/[0.08] bg-[#080b11] p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/[0.08] text-violet-300 mb-5">
              <Factory className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={headingFont}>
              For manufacturing clients
            </h2>
            <p className="mt-3 text-[#b8bfcc] leading-relaxed">
              Multi-level bills of materials, manufacturing orders, and component availability on the Scale plan. Raw
              materials, sub-assemblies, and finished goods are tracked in the same system as the rest of the
              client's stock, so component consumption is recorded rather than estimated.
            </p>
            <a href="/features/manufacturing/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:underline">
              Explore manufacturing <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="h-full">
          <div className="h-full rounded-2xl border border-white/[0.08] bg-[#080b11] p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300 mb-5">
              <LineChart className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight" style={headingFont}>
              Advisory, not just cleanup
            </h2>
            <p className="mt-3 text-[#b8bfcc] leading-relaxed">
              Spark forecasts demand per SKU and recommends what to reorder and when. That gives you a concrete basis
              for cash and purchasing conversations with clients. The free forecasting plan is an easy first step:
              it shows dead stock, days of supply, and a monthly buying plan from the data the client already has.
            </p>
            <a href="/pricing/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:underline">
              See plans and pricing <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PartnershipSection() {
  const agency = partnerTypeById("agency");
  const referral = partnerTypeById("referral");
  const steps = [
    { title: "Apply", body: "Tell us about your firm on the partner page. We review every application and reply within 48 hours." },
    { title: "Introduce clients", body: "Recommend Spark to clients whose inventory has outgrown their accounting software, and help them set it up." },
    { title: "Earn", body: agency.howItPays },
  ];
  return (
    <section id="partner" className="scroll-mt-16 py-14 lg:py-20 relative">
      <div className="relative z-10 max-w-[1180px] mx-auto px-6 md:px-8">
        <ScrollReveal className="max-w-2xl mb-10">
          <SectionEyebrow>How the partnership works</SectionEyebrow>
          <h2 className="text-3xl lg:text-[2.6rem] font-bold text-white leading-tight tracking-tight" style={headingFont}>
            Recommend Spark. Earn every month your clients stay.
          </h2>
          <p className="mt-4 text-[#b8bfcc] text-base lg:text-lg leading-relaxed">
            Accountants and bookkeepers join the Spark partner program as an {agency.name.toLowerCase()} partner.
          </p>
        </ScrollReveal>
        <ScrollReveal staggerChildren={100} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <RevealItem key={step.title} index={i} className="h-full">
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold mb-4">
                  {i + 1}
                </span>
                <h3 className="text-white text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[#8b95a8] text-sm leading-relaxed">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
        <p className="mt-6 text-sm text-[#8b95a8]">
          Prefer to make introductions only? The{" "}
          <a href="/partners/?type=referral" className="text-cyan-300 hover:underline">
            referral partnership
          </a>{" "}
          pays {referral.howItPays.replace(/^A /, "a ").replace(/\.$/, "")}.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-16 relative overflow-hidden border-y border-white/[0.06] bg-white/[0.018] py-16 lg:py-24">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 mx-auto grid max-w-[1180px] gap-10 px-6 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <ScrollReveal>
          <p className="text-sm font-semibold text-cyan-300">Accountant FAQ</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            What accountants ask before recommending Spark
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#8b95a8]">
            Accounting integrations, landed cost and COGS, manufacturing, client access, and how the partner program
            works.
          </p>
        </ScrollReveal>
        <div className="space-y-3">
          {accountantFaqs.map((faq, index) => (
            <ScrollReveal key={faq.question} delay={Math.min(index * 0.04, 0.16)}>
              <details className="group rounded-2xl border border-white/[0.08] bg-[#080b11] open:border-white/[0.13] open:bg-white/[0.04]">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan-300 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
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

function CTASection() {
  const { bookUrl } = useCtaLinks(CTA_OPTIONS);
  return (
    <section className="relative overflow-hidden bg-[#06080d] py-20 lg:py-28">
      <div className="absolute bottom-0 left-1/2 h-[900px] w-[1800px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(139,92,246,0.16),rgba(6,182,212,0.07)_45%,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Give your product clients{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              inventory that ties out
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#b8bfcc]">
            Apply to the partner program, or book a call and we will walk through Spark with one of your client
            scenarios.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={PARTNER_URL}
              className="inline-flex h-[46px] items-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            >
              Become a partner
            </a>
            <BookACallButton
              url={bookUrl}
              className="glass inline-flex h-[46px] items-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/[0.06]"
            >
              Book a call
            </BookACallButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function AccountantsPage() {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main>
        <Hero />
        <ProblemSection />
        <LedgerFlowSection />
        <CleanNumbersSection />
        <ManufacturingAndAdvisorySection />
        <PartnershipSection />
        <FAQSection />
        <CTASection />
      </main>
      <AgencyFooter />
    </div>
  );
}
