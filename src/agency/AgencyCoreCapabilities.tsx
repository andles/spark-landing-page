import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    subtitle: "Order Fulfillment",
    iconGradient: "from-teal-500 to-cyan-500",
    accentGradient: "from-teal-400 to-cyan-400",
    accentColor: "text-teal-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Order Management & Forecasting",
    description: "See every order in real time and know exactly what to reorder before you run out. Spark forecasts demand based on your actual sales history, not guesswork.",
    bullets: [
      "Real-time order tracking across all channels",
      "AI-powered demand forecasting from sales history",
      "Automated reorder point alerts before stockouts",
    ],
  },
  {
    subtitle: "Business Intelligence",
    iconGradient: "from-violet-500 to-purple-500",
    accentGradient: "from-violet-400 to-purple-400",
    accentColor: "text-violet-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "Custom Reporting & Signal",
    description: "Pull the numbers that actually matter to your business. Signal flags low stock, unusual velocity, and emerging trends so nothing slips through the cracks.",
    bullets: [
      "Custom dashboards with the metrics that matter",
      "Signal alerts for low stock and velocity anomalies",
      "Revenue, order volume, and trend analysis at a glance",
    ],
  },
  {
    subtitle: "Modern Operations",
    iconGradient: "from-cyan-500 to-blue-500",
    accentGradient: "from-cyan-400 to-blue-400",
    accentColor: "text-cyan-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Unified Integrations & Workflow",
    description: "Shopify, Amazon, QuickBooks, Stripe and more connect in minutes. Your data flows in one direction so your team works from a single source of truth.",
    bullets: [
      "One-click integrations with Shopify, Amazon, and more",
      "Bi-directional sync keeps every platform current",
      "Single source of truth for your entire team",
    ],
  },
];

interface MockupProps { isActive: boolean }

function OrdersMockup({ isActive }: MockupProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "forecast">("orders");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [animatedIn, setAnimatedIn] = useState(false);
  useEffect(() => {
    if (isActive) { const t = setTimeout(() => setAnimatedIn(true), 150); return () => clearTimeout(t); }
    setAnimatedIn(false);
  }, [isActive]);

  const orders = [
    { id: "#ORD-4821", customer: "Acme Corp", channel: "Shopify", status: "Shipped", statusColor: "bg-emerald-400/15 text-emerald-400", amount: "$1,240.00" },
    { id: "#ORD-4820", customer: "Globex Inc", channel: "Amazon", status: "Processing", statusColor: "bg-amber-400/15 text-amber-400", amount: "$867.50" },
    { id: "#ORD-4819", customer: "Initech", channel: "Direct", status: "Pending", statusColor: "bg-blue-500/15 text-blue-500", amount: "$2,100.00" },
    { id: "#ORD-4818", customer: "Stark Ltd", channel: "Shopify", status: "Shipped", statusColor: "bg-emerald-400/15 text-emerald-400", amount: "$445.20" },
    { id: "#ORD-4817", customer: "Wayne Ent", channel: "WooCommerce", status: "Shipped", statusColor: "bg-emerald-400/15 text-emerald-400", amount: "$1,890.00" },
  ];

  const forecastProducts = [
    { name: "Wireless Headphones", current: 142, reorderAt: 50, daysLeft: 18, velocity: "12/day", safe: true },
    { name: "USB-C Hub Adapter", current: 23, reorderAt: 30, daysLeft: 3, velocity: "8/day", safe: false },
    { name: "Laptop Stand Pro", current: 87, reorderAt: 25, daysLeft: 29, velocity: "3/day", safe: true },
    { name: "Mech Keyboard v2", current: 11, reorderAt: 20, daysLeft: 1, velocity: "6/day", safe: false },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 rounded-lg bg-[#0c1019] p-0.5">
          <button onClick={() => setActiveTab("orders")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${activeTab === "orders" ? "bg-[#111622] text-[#f0f2f5] shadow-sm" : "text-[#8b95a8] hover:text-[#b8bfcc]"}`}>Live Orders</button>
          <button onClick={() => setActiveTab("forecast")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${activeTab === "forecast" ? "bg-[#111622] text-[#f0f2f5] shadow-sm" : "text-[#8b95a8] hover:text-[#b8bfcc]"}`}>Demand Forecast</button>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] text-[#b8bfcc]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />Live
        </span>
      </div>

      {activeTab === "orders" && (
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[{ label: "Today", value: "23", sub: "orders" }, { label: "Processing", value: "7", sub: "in queue" }, { label: "Revenue", value: "$8.4K", sub: "today" }].map((s, idx) => (
              <div key={s.label} className="rounded-lg bg-[#0c1019] border border-white/[0.06] px-3 h-[72px] flex flex-col justify-center transition-all duration-500"
                style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(8px)", transitionDelay: `${idx * 80}ms` }}>
                <div className="text-[9px] text-[#8b95a8] uppercase tracking-wider mb-0.5">{s.label}</div>
                <div className="text-base font-mono font-bold text-[#f0f2f5] leading-tight">{s.value}</div>
                <div className="text-[9px] text-[#8b95a8] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_1fr_0.7fr_0.7fr_0.8fr] gap-2 text-[10px] font-mono uppercase tracking-wider text-[#8b95a8] pb-2 border-b border-white/[0.06] mb-1 px-2">
            <span>Order</span><span>Customer</span><span>Channel</span><span>Status</span><span className="text-right">Amount</span>
          </div>
          {orders.map((row, idx) => (
            <div key={row.id}
              className={`grid grid-cols-[1fr_1fr_0.7fr_0.7fr_0.8fr] gap-2 items-center py-2.5 px-2 rounded-lg border border-transparent transition-all duration-300 cursor-default ${hoveredRow === idx ? "bg-[#0c1019] border-white/[0.06]" : ""}`}
              style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateX(0)" : "translateX(-12px)", transitionDelay: `${200 + idx * 60}ms` }}
              onMouseEnter={() => setHoveredRow(idx)} onMouseLeave={() => setHoveredRow(null)}>
              <span className="font-mono text-[#f0f2f5] text-xs">{row.id}</span>
              <span className="text-[#b8bfcc] text-xs truncate">{row.customer}</span>
              <span className="text-[11px] text-[#8b95a8]">{row.channel}</span>
              <span><span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${row.statusColor}`}>{row.status}</span></span>
              <span className="font-mono text-[#f0f2f5] text-xs text-right">{row.amount}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "forecast" && (
        <div className="flex-1 min-h-0">
          <div className="mb-4 rounded-lg bg-[#0c1019] border border-white/[0.06] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#8b95a8] font-mono uppercase tracking-wider">30-Day Demand Projection</span>
              <span className="text-xs text-cyan-400 font-mono font-medium">+18.2% vs last month</span>
            </div>
            <svg viewBox="0 0 400 70" className="w-full h-14" fill="none">
              <defs>
                <linearGradient id="ag-forecastFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" /><stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ag-projectionFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.2" /><stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 55 C30 50, 60 45, 100 42 C140 38, 170 40, 200 33" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
              <path d="M0 55 C30 50, 60 45, 100 42 C140 38, 170 40, 200 33 L200 70 L0 70 Z" fill="url(#ag-forecastFill)" />
              <path d="M200 33 C230 28, 270 22, 310 15 C350 10, 370 12, 400 6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" />
              <path d="M200 33 C230 28, 270 22, 310 15 C350 10, 370 12, 400 6 L400 70 L200 70 Z" fill="url(#ag-projectionFill)" opacity="0.6" />
              <line x1="200" y1="0" x2="200" y2="70" stroke="white" strokeOpacity="0.1" strokeDasharray="3 3" />
              <text x="90" y="68" fill="#5a6478" fontSize="8" fontFamily="monospace">Actual</text>
              <text x="280" y="68" fill="#5a6478" fontSize="8" fontFamily="monospace">Projected</text>
            </svg>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8b95a8] grid grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr_0.5fr] gap-2 pb-2 border-b border-white/[0.06] mb-1 px-2">
            <span>Product</span><span>Stock</span><span>Reorder</span><span>Velocity</span><span className="text-right">Days Left</span>
          </div>
          {forecastProducts.map((p, idx) => (
            <div key={p.name} className="grid grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr_0.5fr] gap-2 items-center py-2 px-2 rounded-lg hover:bg-[#0c1019] transition-all duration-200 cursor-default"
              style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(6px)", transitionDelay: `${idx * 80}ms` }}>
              <span className="text-xs text-[#f0f2f5] truncate">{p.name}</span>
              <span className="text-xs font-mono text-[#b8bfcc]">{p.current}</span>
              <span className="text-xs font-mono text-[#8b95a8]">{p.reorderAt}</span>
              <span className="text-xs font-mono text-[#b8bfcc]">{p.velocity}</span>
              <span className={`text-xs font-mono text-right font-medium ${p.safe ? "text-emerald-400" : "text-rose-400"}`}>{p.daysLeft}d</span>
            </div>
          ))}
          <div className="mt-3 rounded-lg bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20 px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              <span className="text-[11px] font-semibold text-rose-400">2 products below reorder point</span>
            </div>
            <p className="text-[10px] text-[#8b95a8] ml-5">Auto-reorder suggestion ready for review</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportMockup({ isActive }: MockupProps) {
  const [animatedIn, setAnimatedIn] = useState(false);
  useEffect(() => {
    if (isActive) { const t = setTimeout(() => setAnimatedIn(true), 150); return () => clearTimeout(t); }
    setAnimatedIn(false);
  }, [isActive]);

  const metrics = [
    { label: "Revenue", value: "$124.5K", change: "+12.3%", positive: true, sparkline: [30, 35, 32, 40, 38, 45, 50] },
    { label: "Units Sold", value: "1,847", change: "+8.1%", positive: true, sparkline: [20, 28, 25, 32, 30, 38, 42] },
    { label: "Avg Order", value: "$67.40", change: "-2.4%", positive: false, sparkline: [35, 32, 30, 28, 32, 29, 27] },
    { label: "Return Rate", value: "2.8%", change: "+0.5%", positive: false, sparkline: [4, 5, 6, 5, 7, 6, 8] },
  ];

  const signals = [
    { color: "text-amber-400 bg-amber-400/10 border-amber-500/20", label: "Unusual velocity spike", detail: "Wireless Headphones — 3x normal rate since Monday" },
    { color: "text-rose-400 bg-rose-400/10 border-rose-500/20", label: "Critical stock warning", detail: "USB-C Hub Adapter — 3 days until stockout at current velocity" },
    { color: "text-violet-400 bg-violet-400/10 border-violet-500/20", label: "Emerging trend detected", detail: "Laptop Stand Pro — 40% week-over-week growth" },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-[#f0f2f5]">Performance Report</span>
        <div className="flex items-center gap-0.5 rounded-lg bg-[#0c1019] p-0.5">
          {["7D", "30D", "90D"].map((r) => (
            <button key={r} className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium transition-all duration-200 cursor-pointer ${r === "30D" ? "bg-[#111622] text-[#f0f2f5] shadow-sm" : "text-[#8b95a8]"}`}>{r}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {metrics.map((m, idx) => {
          const sparkMax = Math.max(...m.sparkline);
          return (
            <div key={m.label} className="rounded-xl bg-[#0c1019] border border-white/[0.06] px-3 py-2 transition-all duration-500"
              style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "scale(1)" : "scale(0.95)", transitionDelay: `${idx * 80}ms` }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#8b95a8] uppercase tracking-wider">{m.label}</span>
                <span className={`text-[10px] font-mono font-medium ${m.positive ? "text-emerald-400" : "text-rose-400"}`}>{m.change}</span>
              </div>
              <div className="flex items-end justify-between gap-2">
                <div className="text-lg font-mono font-bold text-[#f0f2f5] leading-tight">{m.value}</div>
                <svg viewBox="0 0 70 20" className="w-16 h-3.5 shrink-0">
                  <polyline points={m.sparkline.map((v, j) => `${j * (70 / (m.sparkline.length - 1))},${20 - (v / sparkMax) * 16}`).join(" ")}
                    fill="none" stroke={m.positive ? "#34d399" : "#fb7185"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="h-2 w-2 rounded-full bg-violet-400 animate-glow-pulse" />
        <span className="text-xs font-semibold text-violet-400">Signal Alerts</span>
      </div>
      <div className="space-y-2 flex-1">
        {signals.map((s, idx) => (
          <div key={idx} className={`rounded-lg border px-3 py-2 transition-all duration-500 cursor-default ${s.color}`}
            style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateX(0)" : "translateX(8px)", transitionDelay: `${400 + idx * 100}ms` }}>
            <div className="text-[11px] font-semibold mb-0.5">{s.label}</div>
            <p className="text-[10px] text-[#8b95a8] leading-relaxed">{s.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsMockup({ isActive }: MockupProps) {
  const [animatedIn, setAnimatedIn] = useState(false);
  useEffect(() => {
    if (isActive) { const t = setTimeout(() => setAnimatedIn(true), 150); return () => clearTimeout(t); }
    setAnimatedIn(false);
  }, [isActive]);

  const integrations = [
    { label: "Shopify", synced: "2m ago", orders: "1,247", icon: "🛍️" },
    { label: "Amazon", synced: "5m ago", orders: "892", icon: "📦" },
    { label: "QuickBooks", synced: "1m ago", orders: "—", icon: "📊" },
    { label: "Stripe", synced: "Real-time", orders: "—", icon: "💳" },
    { label: "WooCommerce", synced: "3m ago", orders: "634", icon: "🛒" },
    { label: "Xero", synced: "10m ago", orders: "—", icon: "📒" },
  ];

  const activityLog = [
    { time: "Just now", action: "Synced 23 new orders", source: "Shopify", color: "text-emerald-400" },
    { time: "2m ago", action: "Inventory updated (148 SKUs)", source: "Amazon", color: "text-cyan-400" },
    { time: "5m ago", action: "Invoice exported", source: "QuickBooks", color: "text-violet-400" },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-[#f0f2f5]">Connected Platforms</span>
        <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] text-emerald-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />All systems synced
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {integrations.map((node, idx) => (
          <div key={node.label} className="rounded-xl border border-white/[0.06] bg-[#0c1019] px-3 py-3 transition-all duration-500 hover:border-white/[0.12] cursor-default"
            style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "scale(1)" : "scale(0.9)", transitionDelay: `${idx * 70}ms` }}>
            <div className="text-base mb-1">{node.icon}</div>
            <div className="text-xs font-medium text-[#f0f2f5]">{node.label}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] text-[#8b95a8]">{node.synced}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mb-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-cyan-500/10 border border-cyan-500/20"
        style={{ opacity: animatedIn ? 1 : 0, transitionDelay: "500ms", transition: "opacity 0.5s ease-out" }}>
        <div className="text-center">
          <div className="text-[11px] font-medium text-[#f0f2f5]">Spark is your single source of truth</div>
          <div className="text-[9px] text-[#8b95a8]">6 platforms synced · 2,773 orders unified</div>
        </div>
      </div>
      <div className="space-y-1.5 flex-1">
        {activityLog.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-[#0c1019] transition-all duration-200 cursor-default"
            style={{ opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(4px)", transitionDelay: `${600 + idx * 80}ms` }}>
            <span className="text-[9px] text-[#8b95a8] font-mono whitespace-nowrap w-[50px] shrink-0 text-right">{entry.time}</span>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-[#b8bfcc]">{entry.action}</span>
              <span className={`text-[10px] ml-1.5 font-medium ${entry.color}`}>{entry.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockups = [OrdersMockup, ReportMockup, IntegrationsMockup];

export default function AgencyCoreCapabilities() {
  const [containerRef, activeIndex] = useActiveSection(features.length);

  return (
    <section id="core-capabilities" className="py-14 lg:py-20 bg-[#06080d] relative overflow-x-clip">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute -top-[300px] left-[10%] w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(13,148,136,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-[200px] right-[10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(139,92,246,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-2">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            What You Get
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            <span className="text-white">Intelligent Inventory for</span>
            <br />
            <span className="hidden lg:inline-flex relative overflow-hidden h-[1.3em] align-bottom">
              <span className="invisible font-bold">Business Intelligence</span>
              {features.map((f, i) => (
                <span key={f.subtitle} className={`absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent dynamic-subtitle ${activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} aria-hidden={activeIndex !== i}>{f.subtitle}</span>
              ))}
            </span>
            <span className="lg:hidden bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Modern Operations</span>
          </h2>
          <p className="mt-5 text-lg text-[#b8bfcc] leading-relaxed">
            One platform to track stock, fulfill orders, and plan purchases<br className="hidden sm:block" />
            across every channel you sell on.
          </p>
        </ScrollReveal>

        {/* Desktop: scroll-linked layout */}
        <div ref={containerRef} className="hidden lg:grid lg:grid-cols-[1fr_1fr] gap-16 mt-14">
          <div>
            {features.map((feature, i) => (
              <div key={feature.title} data-section-index={i}
                className={`min-h-[60vh] flex flex-col justify-center py-10 capability-section ${activeIndex === i ? "opacity-100" : "opacity-30"}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center`}>{feature.icon}</div>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#f0f2f5]" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>{feature.title}</h3>
                <p className="mt-4 text-[#b8bfcc] leading-relaxed">{feature.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#b8bfcc]">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${feature.accentGradient} shrink-0`} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`inline-flex items-center gap-2 mt-6 text-sm font-medium bg-gradient-to-r ${feature.accentGradient} bg-clip-text text-transparent transition-all`}>
                  Learn More
                  <svg className={`w-4 h-4 ${feature.accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              </div>
            ))}
          </div>
          <div>
            <div className="sticky top-[15vh] h-[70vh] flex items-center">
              <div className="glass gradient-border rounded-2xl w-full overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <span className="w-3 h-3 rounded-full bg-rose-500/60" /><span className="w-3 h-3 rounded-full bg-amber-500/60" /><span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="ml-3 text-xs font-mono text-[#8b95a8]">spark.inventory</span>
                </div>
                <div className="relative" style={{ minHeight: "460px" }}>
                  {mockups.map((Mockup, i) => (
                    <div key={i} className={`absolute inset-0 mockup-panel ${activeIndex === i ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-2 pointer-events-none"}`} aria-hidden={activeIndex !== i}>
                      <Mockup isActive={activeIndex === i} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="lg:hidden space-y-14 mt-12">
          {features.map((feature, i) => (
            <div key={feature.title}>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center`}>{feature.icon}</div>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>
                <h3 className="text-2xl font-bold text-[#f0f2f5]" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>{feature.title}</h3>
                <p className="mt-4 text-[#b8bfcc] leading-relaxed">{feature.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#b8bfcc]">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${feature.accentGradient} shrink-0`} />{bullet}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
              <ScrollReveal className="mt-8">
                <div className="glass gradient-border rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  {(() => { const Mockup = mockups[i]; return <Mockup isActive={true} />; })()}
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
