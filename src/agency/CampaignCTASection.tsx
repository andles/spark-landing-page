import BookACallButton from "./BookACallButton";
import type { CampaignKind } from "./campaignFaqs";
import { useCtaLinks, type CtaLinkOptions } from "./ctaLinks";
import ScrollReveal from "./ScrollReveal";

type SupportedKind = Extract<CampaignKind, "3pl" | "stockouts" | "pickup">;

const content: Record<SupportedKind, { title: string; gradient: string; body: string; primary: "trial" | "demo"; microcopy: string; options: CtaLinkOptions }> = {
  "3pl": {
    title: "Make your 3PL the inventory partner",
    gradient: "clients will not outgrow",
    body: "See how client workspaces, branded visibility, forecasting, and replenishment fit around the operation you already run.",
    primary: "demo",
    microcopy: "A focused 30-minute walkthrough for your client and warehouse model.",
    options: { source: "3pl" },
  },
  stockouts: {
    title: "See the next stockout",
    gradient: "before it happens",
    body: "Bring your actual sales and inventory signal. Spark will show the risk, the recommendation, and the reasoning your team can review.",
    primary: "trial",
    microcopy: "Start free for 14 days · agent-guided onboarding · human-approved actions",
    options: { source: "reduce-stockouts-overstock" },
  },
  pickup: {
    title: "Put the whole pickup flow",
    gradient: "in front of your store team",
    body: "Walk through the Shopify connection, location stock promise, ticket routing, counter hardware, and customer handoff.",
    primary: "demo",
    microcopy: "Start with one location, prove the workflow, then expand.",
    options: { source: "in-store-pickup" },
  },
};

export default function CampaignCTASection({ kind }: { kind: SupportedKind }) {
  const copy = content[kind];
  const { bookUrl, signupUrl } = useCtaLinks(copy.options);

  const trial = (
    <a href={signupUrl} className={`${copy.primary === "trial" ? "bg-gradient-to-r from-cyan-500 to-violet-500" : "glass border border-white/15 hover:bg-white/[0.06] hover:border-white/25"} inline-flex h-[46px] items-center rounded-full px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]`}>
      Start Free
    </a>
  );
  const demo = (
    <BookACallButton url={bookUrl} className={`${copy.primary === "demo" ? "bg-gradient-to-r from-cyan-500 to-violet-500" : "glass border border-white/15 hover:bg-white/[0.06] hover:border-white/25"} inline-flex h-[46px] items-center rounded-full px-7 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]`}>
      Book a 30-Minute Demo
    </BookACallButton>
  );

  return (
    <section id="book-demo" className="scroll-mt-16 relative overflow-hidden bg-[#06080d] py-20 lg:py-28">
      <div className="absolute bottom-0 left-1/2 h-[900px] w-[1800px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(139,92,246,0.16),rgba(6,182,212,0.07)_45%,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-8">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{copy.gradient}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#b8bfcc]">{copy.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {copy.primary === "trial" ? <>{trial}{demo}</> : <>{demo}{trial}</>}
          </div>
          <p className="mt-4 text-xs text-white/40">{copy.microcopy}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
