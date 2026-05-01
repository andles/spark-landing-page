import { useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";
import ApiMockup from "./developer/ApiMockup";
import McpMockup from "./developer/McpMockup";
import CrossPlatformMockup from "./developer/CrossPlatformMockup";

const tabs = [
  {
    id: "api",
    label: "Open API",
    icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    headline: "Connect anything with a full REST API.",
    bullets: [
      "Pull inventory data, push orders, or sync stock levels from any system you already use.",
      "Webhooks fire in real time so external tools always stay up to date without polling.",
    ],
    glowColor: "bg-cyan-500/10",
  },
  {
    id: "mcp",
    label: "MCP Protocol",
    icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    headline: "Let AI agents work with your inventory directly.",
    bullets: [
      "AI agents can query, update, and reason about your inventory through MCP with zero custom glue code.",
      "Point any LLM at Spark and it understands your catalog, stock levels, and order history out of the box.",
    ],
    glowColor: "bg-violet-500/10",
  },
  {
    id: "cross",
    label: "Cross-Platform",
    icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    headline: "Desktop, tablet, or phone. Same experience everywhere.",
    bullets: [
      "Scan barcodes on your phone, review POs on your tablet, run reports on desktop. Full feature parity everywhere.",
      "Offline mode keeps your warehouse team moving. Changes sync automatically when connectivity returns.",
    ],
    glowColor: "bg-fuchsia-500/10",
  },
];

const mockups = [ApiMockup, McpMockup, CrossPlatformMockup];

export default function AgencyDeveloperSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sectionRef, isInView] = useInView(0.2);

  const tab = tabs[active];

  useEffect(() => {
    if (!isInView || isPaused) return;
    const id = setTimeout(() => setActive((prev) => (prev + 1) % tabs.length), 8000);
    return () => clearTimeout(id);
  }, [active, isPaused, isInView]);

  return (
    <section
      id="features"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-14 lg:py-20 bg-[#06080d] relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-[100px] -left-[200px] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(6,182,212,0.07),transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-[200px] right-[5%] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            Platform Architecture
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
            <span className="text-white">Built for </span>
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Developers</span>
            <span className="text-white"> &amp; </span>
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">AI Agents</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-5 sm:p-8 lg:p-10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left: tabs + text */}
            <div className="min-w-0">
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-7 w-full">
                {tabs.map((t, i) => (
                  <button key={t.id} onClick={() => setActive(i)}
                    className={`flex-1 min-w-0 px-2.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap ${active === i ? "bg-white/[0.1] text-white shadow-sm" : "text-white/40 hover:text-white/70"}`}>
                    <span className="shrink-0">{t.icon}</span>
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Fixed-height panel prevents layout shift when tabs switch */}
              <div className="relative" style={{ minHeight: "280px" }}>
                {tabs.map((t, i) => (
                  <div key={t.id} className={`absolute inset-0 ${active === i ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-500`}>
                    <h3 className={`text-xl sm:text-2xl lg:text-[1.7rem] font-bold text-white leading-snug mb-5 ${active === i ? "dev-content-enter" : ""}`} style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>{t.headline}</h3>
                    <ul className="space-y-3.5">
                      {t.bullets.map((b, bi) => (
                        <li key={bi} className={`flex items-start gap-3 ${active === i ? "dev-bullet-in" : ""}`} style={active === i ? { animationDelay: `${150 + bi * 80}ms` } : undefined}>
                          <span className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </span>
                          <span className="text-[#b8bfcc] text-sm sm:text-[15px] leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-7 ${active === i ? "dev-bullet-in" : ""}`} style={active === i ? { animationDelay: `${150 + t.bullets.length * 80 + 40}ms` } : undefined}>
                      <a href="#" className="inline-flex items-center h-[42px] sm:h-[46px] px-6 sm:px-7 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300">Explore Platform</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mockup panel */}
            <div className="relative" style={{ minHeight: "300px" }}>
              <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[100px] transition-colors duration-700 pointer-events-none ${tab.glowColor}`} />
              {mockups.map((Mockup, i) => (
                <div key={i} className={`absolute inset-0 flex items-center justify-center dev-mockup-panel overflow-hidden ${active === i ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-2 pointer-events-none"}`} aria-hidden={active !== i}>
                  <Mockup isActive={active === i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
