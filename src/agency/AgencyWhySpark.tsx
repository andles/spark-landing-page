import { useState, useEffect } from "react";
import ScrollReveal, { RevealItem } from "./ScrollReveal";

function BrowserFrame({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0c1019] overflow-hidden shadow-2xl shadow-black/30">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-[#080c14]">
        <span className="w-2 h-2 rounded-full bg-rose-400/50" />
        <span className="w-2 h-2 rounded-full bg-amber-400/50" />
        <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
        {url && <span className="ml-2 text-[9px] font-mono text-white/25 bg-white/[0.04] px-2 py-0.5 rounded flex-1 text-center truncate">{url}</span>}
      </div>
      {children}
    </div>
  );
}

function AgentMockup({ isActive }: { isActive: boolean }) {
  const [animatedIn, setAnimatedIn] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const agentResponse = "Based on current velocity, USB-C Hub Adapter will stockout in 3 days. I recommend ordering 200 units from TechSource Ltd.";

  useEffect(() => {
    if (isActive) { const t = setTimeout(() => setAnimatedIn(true), 100); return () => clearTimeout(t); }
    setAnimatedIn(false); setTypedChars(0);
  }, [isActive]);

  useEffect(() => {
    if (!animatedIn) return;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedChars((c) => { if (c >= agentResponse.length) { clearInterval(interval); return c; } return c + 1; });
      }, 20);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(t);
  }, [animatedIn, agentResponse.length]);

  const actions = [
    { label: "Create PO", color: "text-cyan-400 bg-cyan-400/10 border-cyan-500/20" },
    { label: "Adjust Reorder Point", color: "text-violet-400 bg-violet-400/10 border-violet-500/20" },
    { label: "Alert Team", color: "text-amber-400 bg-amber-400/10 border-amber-500/20" },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <span className="text-xs font-semibold text-[#f0f2f5]">Spark Agent</span>
        <span className="inline-flex items-center gap-1 rounded-full glass px-2 py-0.5 text-[9px] text-emerald-400 ml-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Active
        </span>
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex justify-end" style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transition: "all 0.4s ease-out" }}>
          <div className="rounded-2xl rounded-br-sm bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/20 px-3 py-2 max-w-[85%]">
            <p className="text-xs text-[#f0f2f5]">Which products need reordering soon?</p>
          </div>
        </div>
        <div className="flex gap-2" style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transition: "all 0.4s ease-out 0.2s" }}>
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0 mt-1">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div className="rounded-2xl rounded-bl-sm bg-[#0c1019] border border-white/[0.06] px-3 py-2 max-w-[85%]">
            <p className="text-xs text-[#b8bfcc] leading-relaxed">
              {agentResponse.slice(0, typedChars)}
              {typedChars < agentResponse.length && <span className="inline-block w-0.5 h-3 bg-violet-400 animate-pulse ml-0.5 align-middle" />}
            </p>
          </div>
        </div>
        {typedChars >= agentResponse.length && (
          <div className="flex flex-wrap gap-1.5 ml-7 animate-fade-in">
            {actions.map((a) => (
              <button key={a.label} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium cursor-pointer hover:brightness-125 transition-all ${a.color}`}>{a.label}</button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#0c1019] border border-white/[0.06] px-3 py-2"
        style={{ opacity: animatedIn ? 1 : 0, transition: "opacity 0.4s ease-out 0.3s" }}>
        <span className="text-xs text-[#8b95a8] flex-1">Ask Spark anything...</span>
        <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </div>
  );
}

function PortalMockup({ isActive }: { isActive: boolean }) {
  const [animatedIn, setAnimatedIn] = useState(false);
  useEffect(() => {
    if (isActive) { const t = setTimeout(() => setAnimatedIn(true), 100); return () => clearTimeout(t); }
    setAnimatedIn(false);
  }, [isActive]);

  const products = [
    { name: "Wireless Headphones", sku: "WH-PRO-200", price: "$79.99", stock: 142, moq: 50 },
    { name: "USB-C Hub Adapter", sku: "USB-HUB-7P", price: "$34.99", stock: 23, moq: 25 },
    { name: "Laptop Stand Pro", sku: "LS-ALM-PRO", price: "$49.99", stock: 87, moq: 30 },
    { name: "Mech Keyboard v2", sku: "KB-MECH-V2", price: "$129.99", stock: 11, moq: 20 },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center"><span className="text-[9px] font-bold text-white">B2B</span></div>
          <div>
            <div className="text-xs font-semibold text-[#f0f2f5]">Wholesale Portal</div>
            <div className="text-[9px] text-[#8b95a8]">Acme Distribution Co.</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] text-emerald-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[{ label: "Active Buyers", value: "48" }, { label: "This Month", value: "$32.4K" }, { label: "Avg Order", value: "$675" }].map((s, idx) => (
          <div key={s.label} className="rounded-lg bg-[#0c1019] border border-white/[0.06] px-2.5 py-2 text-center"
            style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(6px)", transitionDelay: `${idx * 80}ms`, transition: "all 0.5s ease-out" }}>
            <div className="text-sm font-mono font-bold text-[#f0f2f5]">{s.value}</div>
            <div className="text-[9px] text-[#8b95a8]">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b95a8] grid grid-cols-[1.2fr_0.8fr_0.5fr_0.5fr] gap-2 pb-2 border-b border-white/[0.06] mb-1 px-2">
        <span>Product</span><span>SKU</span><span>Price</span><span className="text-right">Avail</span>
      </div>
      {products.map((p, idx) => (
        <div key={p.sku} className="grid grid-cols-[1.2fr_0.8fr_0.5fr_0.5fr] gap-2 items-center py-2 px-2 rounded-lg cursor-default"
          style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateX(0)" : "translateX(-8px)", transitionDelay: `${200 + idx * 70}ms`, transition: "all 0.5s ease-out" }}>
          <span className="text-xs text-[#f0f2f5] truncate">{p.name}</span>
          <span className="text-[10px] font-mono text-[#8b95a8]">{p.sku}</span>
          <span className="text-xs font-mono text-[#b8bfcc]">{p.price}</span>
          <span className={`text-xs font-mono text-right font-medium ${p.stock > p.moq ? "text-emerald-400" : "text-rose-400"}`}>{p.stock}</span>
        </div>
      ))}
    </div>
  );
}

function MigrationMockup({ isActive }: { isActive: boolean }) {
  const [animatedIn, setAnimatedIn] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isActive) { const t = setTimeout(() => setAnimatedIn(true), 100); return () => clearTimeout(t); }
    setAnimatedIn(false); setActiveStep(0);
  }, [isActive]);

  useEffect(() => {
    if (!animatedIn) return;
    const interval = setInterval(() => setActiveStep((s) => (s + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, [animatedIn]);

  const fields = [
    { source: "product_name", target: "title", confidence: 99, status: "mapped" },
    { source: "sku_code", target: "sku", confidence: 98, status: "mapped" },
    { source: "qty_on_hand", target: "stock_level", confidence: 95, status: "mapped" },
    { source: "unit_cost", target: "cost_price", confidence: 97, status: "mapped" },
    { source: "vendor_id", target: "supplier_ref", confidence: 88, status: "review" },
  ];

  const stepLabels = ["Analyzing", "Mapping Fields", "Validating"];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-4">
        {stepLabels.map((step, i) => (
          <div key={step} className="flex items-center gap-1.5 flex-1">
            <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-500 ${i <= activeStep ? "bg-gradient-to-br from-pink-500 to-violet-500 text-white" : "bg-[#0c1019] text-[#8b95a8] border border-white/[0.06]"}`}
              style={{ opacity: animatedIn ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
              {i < activeStep ? "✓" : i + 1}
            </div>
            <span className={`text-[9px] font-medium whitespace-nowrap transition-colors duration-300 ${i <= activeStep ? "text-[#f0f2f5]" : "text-[#8b95a8]"}`}>{step}</span>
            {i < stepLabels.length - 1 && <div className={`flex-1 h-px transition-colors duration-500 ${i < activeStep ? "bg-violet-500/50" : "bg-white/[0.06]"}`} />}
          </div>
        ))}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b95a8] grid grid-cols-[1fr_0.3fr_1fr_0.5fr] gap-2 pb-2 border-b border-white/[0.06] mb-1 px-2">
        <span>Source Field</span><span></span><span>Spark Field</span><span className="text-right">Match</span>
      </div>
      {fields.map((f, idx) => (
        <div key={f.source} className="grid grid-cols-[1fr_0.3fr_1fr_0.5fr] gap-2 items-center py-2 px-2 rounded-lg hover:bg-[#0c1019] transition-all duration-300 cursor-default"
          style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateX(0)" : "translateX(-12px)", transitionDelay: `${200 + idx * 80}ms` }}>
          <span className="font-mono text-[#b8bfcc] text-xs">{f.source}</span>
          <span className="text-center"><svg className="w-3 h-3 text-violet-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
          <span className="font-mono text-[#f0f2f5] text-xs">{f.target}</span>
          <div className="flex items-center justify-end gap-1.5">
            <span className={`text-[10px] font-mono font-medium ${f.confidence >= 95 ? "text-emerald-400" : "text-amber-400"}`}>{f.confidence}%</span>
            <span className={`h-1.5 w-1.5 rounded-full ${f.status === "mapped" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
          </div>
        </div>
      ))}
      <div className="mt-auto pt-3 border-t border-white/[0.06] grid grid-cols-3 gap-2"
        style={{ opacity: animatedIn ? 1 : 0, transitionDelay: "600ms", transition: "opacity 0.5s ease-out" }}>
        {[{ label: "Fields", value: "47/49", sub: "mapped" }, { label: "Records", value: "12,841", sub: "imported" }, { label: "Errors", value: "0", sub: "detected" }].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-xs font-mono font-bold text-[#f0f2f5]">{s.value}</div>
            <div className="text-[9px] text-[#8b95a8]">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cards = [
  {
    badge: "Easy Migration",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    headline: "From spreadsheets to Spark in one afternoon.",
    description: "Our AI reads any CSV, maps your columns automatically, and flags anything that needs review. Most teams are fully migrated in under 4 hours.",
    accentGlow: "from-pink-500/10 via-transparent",
    Mockup: MigrationMockup,
    url: "spark.inventory/import",
  },
  {
    badge: "Intelligent Agent",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    headline: "An AI that works your inventory, not just reports on it.",
    description: "Ask Spark which products are running low, get a reorder recommendation, and approve a PO — all in plain language. No dashboards required.",
    accentGlow: "from-violet-500/10 via-transparent",
    Mockup: AgentMockup,
    url: "spark.inventory/agent",
  },
  {
    badge: "B2B & Wholesale",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    headline: "A self-service portal your wholesale buyers will actually use.",
    description: "Give each customer a branded portal with their pricing, available inventory, and order history. Fewer emails, faster approvals, higher order frequency.",
    accentGlow: "from-cyan-500/10 via-transparent",
    Mockup: PortalMockup,
    url: "spark.inventory/portal",
  },
];

export default function AgencyWhySpark() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-[#06080d] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Why Spark
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            <span className="text-white">Built for teams that are</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">done with workarounds</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            Hover any card to see Spark in action.
          </p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={120} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map(({ badge, badgeColor, headline, description, accentGlow, Mockup, url }, i) => (
            <RevealItem key={badge} index={i}>
              <div
                className="group relative rounded-2xl border border-white/[0.08] bg-[#0c1019] overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:-translate-y-1 cursor-default"
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Glow top fade */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${accentGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Text content */}
                <div className={`relative z-10 p-6 transition-all duration-500 ${activeCard === i ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-4 ${badgeColor}`}>{badge}</span>
                  <h3 className="text-lg font-bold text-[#f0f2f5] leading-snug mb-3" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>{headline}</h3>
                  <p className="text-sm text-[#b8bfcc] leading-relaxed">{description}</p>
                </div>

                {/* Mockup on hover */}
                <div className={`absolute inset-0 z-10 transition-all duration-500 ${activeCard === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  <BrowserFrame url={url}>
                    <div style={{ minHeight: "280px" }}>
                      <Mockup isActive={activeCard === i} />
                    </div>
                  </BrowserFrame>
                </div>
              </div>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
