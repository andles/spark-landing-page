import { useEffect, useState, type CSSProperties } from "react";
import {
  Bot,
  Braces,
  Check,
  CircleCheck,
  Database,
  FileStack,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type AgentRoute = "sparki" | "mcp";

interface AgentStage {
  title: string;
  detail: string;
  trace: string;
  icon: LucideIcon;
}

const stages: AgentStage[] = [
  {
    title: "Audit the workspace",
    detail: "Sparki checks what already exists and which readiness gates are still missing.",
    trace: "Catalog, locations, and history inspected",
    icon: ScanSearch,
  },
  {
    title: "Understand every source",
    detail: "Files and connected systems are profiled, classified, and ordered automatically.",
    trace: "24,681 rows profiled across 3 sources",
    icon: FileStack,
  },
  {
    title: "Map and repair",
    detail: "Columns are mapped, safe fixes are explained, and real judgment calls come back to you.",
    trace: "7 fields mapped · 2 safe fixes prepared",
    icon: WandSparkles,
  },
  {
    title: "Validate every row",
    detail: "The full dataset is checked against Spark's schema and the records already in your workspace.",
    trace: "24,681 of 24,681 rows validated",
    icon: ShieldCheck,
  },
  {
    title: "Present the import",
    detail: "You see the exact proposal, counts, and changes. Nothing imports until you confirm it.",
    trace: "Proposal ready · human confirmation required",
    icon: Check,
  },
  {
    title: "Verify readiness",
    detail: "Spark confirms the data gates are green and tells you what the platform can do next.",
    trace: "Forecast foundation ready",
    icon: CircleCheck,
  },
];

const routeCopy: Record<AgentRoute, { label: string; badge: string; prompt: string; source: string; icon: LucideIcon }> = {
  sparki: {
    label: "Sparki in app",
    badge: "IN-APP AGENT",
    prompt: "Onboard these catalog, sales, and purchasing exports. Build my forecast foundation.",
    source: "3 files · catalog, sales, purchasing",
    icon: Bot,
  },
  mcp: {
    label: "Your AI over MCP",
    badge: "YOUR ASSISTANT · MCP",
    prompt: "Use Spark MCP to onboard this business, then verify forecasting readiness.",
    source: "Claude or ChatGPT · governed Spark tools",
    icon: Braces,
  },
};

const readiness = [
  { label: "Inventory", progress: [12, 22, 48, 74, 88, 100] },
  { label: "Sales history", progress: [7, 18, 39, 72, 88, 100] },
  { label: "Supply signals", progress: [0, 14, 34, 66, 84, 100] },
];

const promises = [
  "Understands multi-file exports",
  "Explains fixes and judgment calls",
  "Requires approval before import",
];

export default function AgentOnboardingSection() {
  const [route, setRoute] = useState<AgentRoute>("sparki");
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % stages.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [isAutoPlaying]);

  const active = stages[activeStage];
  const ActiveIcon = active.icon;
  const SourceIcon = routeCopy[route].icon;
  const isApproval = activeStage === 4;
  const isReady = activeStage === 5;

  return (
    <section id="agentic-onboarding" className="relative overflow-hidden bg-[#06080d] py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_25%_45%,rgba(139,92,246,0.10),transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_48%_at_85%_55%,rgba(6,182,212,0.09),transparent_70%)]" />
      <div className="absolute inset-0 dot-grid opacity-25" />

      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-6 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 lg:px-12">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2 text-sm text-violet-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Agentic onboarding
          </div>
          <h2
            className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-[3.25rem]"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            Bring your data.
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              Sparki builds the system.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#b8bfcc] lg:text-lg">
            Tell Sparki what you are moving—or ask your own AI assistant through Spark MCP. Both paths inspect, map, repair, validate, and verify your data instead of handing you a migration project.
          </p>

          <ul className="mt-7 space-y-3">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-3 text-sm text-[#d6dae2]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                  <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                </span>
                {promise}
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-lg border-l border-cyan-400/30 pl-4 text-sm leading-6 text-[#8b95a8]">
            Spreadsheet upload still works. It is one input—not the onboarding strategy.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#090d15]/95 shadow-[0_32px_100px_rgba(0,0,0,0.48)]">
            <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

            <div className="flex min-h-14 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-4 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-300/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                </div>
                <span className="hidden font-mono text-[10px] tracking-[0.18em] text-white/35 sm:inline">SPARK / ONBOARDING RUN</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                GOVERNED
              </div>
            </div>

            <div className="border-b border-white/[0.07] p-4 sm:p-5">
              <div className="inline-flex rounded-xl border border-white/[0.08] bg-black/20 p-1" role="tablist" aria-label="Choose an AI onboarding path">
                {(Object.keys(routeCopy) as AgentRoute[]).map((key) => {
                  const config = routeCopy[key];
                  const Icon = config.icon;
                  const selected = route === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setRoute(key)}
                      className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition-colors ${
                        selected ? "bg-white/[0.09] text-white shadow-sm" : "text-[#8b95a8] hover:text-white"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {config.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-3 rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-400/[0.08] to-cyan-400/[0.04] p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-950/40">
                  <SourceIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[9px] font-semibold tracking-[0.16em] text-violet-300">{routeCopy[route].badge}</p>
                  <p className="mt-1 text-xs leading-5 text-[#e3e6ed] sm:text-sm">“{routeCopy[route].prompt}”</p>
                  <p className="mt-1.5 truncate text-[10px] text-white/35">{routeCopy[route].source}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/[0.07] p-3 md:border-b-0 md:border-r md:p-4">
                <p className="px-2 pb-2 font-mono text-[9px] tracking-[0.16em] text-white/30">AGENT TRACE</p>
                <div className="grid grid-cols-2 gap-1 md:grid-cols-1">
                  {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    const selected = activeStage === index;
                    const complete = index < activeStage || isReady;
                    return (
                      <button
                        key={stage.title}
                        type="button"
                        onClick={() => {
                          setActiveStage(index);
                          setIsAutoPlaying(false);
                        }}
                        className={`group flex min-h-12 items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all sm:px-3 ${
                          selected ? "bg-white/[0.07] text-white" : "text-[#687386] hover:bg-white/[0.035] hover:text-[#b8bfcc]"
                        }`}
                        aria-pressed={selected}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            selected
                              ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300"
                              : complete
                                ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                                : "border-white/[0.07] bg-white/[0.025] text-white/25"
                          }`}
                        >
                          {complete && !selected ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                        </span>
                        <span className="hidden text-[11px] font-medium leading-tight sm:block">{stage.title}</span>
                        <span className="text-[10px] font-medium leading-tight sm:hidden">{index + 1}. {stage.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
                    <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-white/30">0{activeStage + 1} / 06</span>
                </div>

                <div key={active.title} className="agent-stage-enter mt-4">
                  <h3 className="text-base font-semibold text-white">{active.title}</h3>
                  <p className="mt-2 min-h-[60px] text-xs leading-5 text-[#8b95a8] sm:text-sm">{active.detail}</p>
                </div>

                <div
                  className={`mt-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[11px] ${
                    isReady
                      ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                      : isApproval
                        ? "border-amber-300/20 bg-amber-300/[0.07] text-amber-200"
                        : "border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isReady ? "bg-emerald-300" : isApproval ? "bg-amber-300" : "animate-pulse bg-cyan-300"}`} />
                  <span className="truncate font-mono">{active.trace}</span>
                </div>

                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-3.5 w-3.5 text-white/35" aria-hidden="true" />
                      <span className="text-[10px] font-semibold tracking-wide text-white/45">DATA READINESS</span>
                    </div>
                    <span className={`text-[10px] font-semibold ${isReady ? "text-emerald-300" : "text-white/35"}`}>
                      {isReady ? "READY" : "IN PROGRESS"}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {readiness.map((item) => {
                      const value = item.progress[activeStage];
                      return (
                        <div key={item.label}>
                          <div className="mb-1.5 flex justify-between text-[10px]">
                            <span className="text-[#8b95a8]">{item.label}</span>
                            <span className="font-mono text-white/45">{value}%</span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className={`h-full rounded-full transition-[width] duration-700 ${isReady ? "bg-emerald-400" : "bg-gradient-to-r from-violet-400 to-cyan-300"}`}
                              style={{ width: `${value}%` } as CSSProperties}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[10px] leading-5 text-white/30">
            Interactive illustration based on Spark's live onboarding and MCP workflows.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
