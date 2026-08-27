import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  CircleCheck,
  GitCompareArrows,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollToHashOnMount } from '../../hooks/useScrollToHash';
import AgencyFooter from '../AgencyFooter';
import AgencyHeader from '../AgencyHeader';
import BookACallButton from '../BookACallButton';
import ScrollReveal, { RevealItem } from '../ScrollReveal';
import { useCtaLinks } from '../ctaLinks';
import { competitorConfigs, type ComparisonLean, type CompetitorKey } from './competitorData';

const accentStyles = {
  cyan: {
    text: 'text-cyan-300',
    subtleText: 'text-cyan-200',
    border: 'border-cyan-300/20',
    soft: 'bg-cyan-300/[0.07]',
    gradient: 'from-cyan-300 via-violet-300 to-fuchsia-300',
    button: 'from-cyan-500 to-violet-500',
    glow: 'rgba(34,211,238,0.10)',
  },
  emerald: {
    text: 'text-emerald-300',
    subtleText: 'text-emerald-200',
    border: 'border-emerald-300/20',
    soft: 'bg-emerald-300/[0.07]',
    gradient: 'from-emerald-300 via-cyan-300 to-violet-300',
    button: 'from-emerald-500 to-cyan-500',
    glow: 'rgba(52,211,153,0.10)',
  },
  amber: {
    text: 'text-amber-300',
    subtleText: 'text-amber-200',
    border: 'border-amber-300/20',
    soft: 'bg-amber-300/[0.07]',
    gradient: 'from-amber-300 via-rose-300 to-violet-300',
    button: 'from-amber-500 to-rose-500',
    glow: 'rgba(251,191,36,0.10)',
  },
} as const;

const migrationSteps = [
  { number: '01', title: 'Inspect', body: 'Classify every source and understand the relationships in the export.', icon: ScanSearch },
  { number: '02', title: 'Map', body: 'Resolve fields and surface missing references instead of silently guessing.', icon: GitCompareArrows },
  { number: '03', title: 'Validate', body: 'Explain safe repairs and return real judgment calls to your team.', icon: ShieldCheck },
  { number: '04', title: 'Approve', body: 'Present record counts and proposed changes before anything lands.', icon: CircleCheck },
] as const;

const leanLabels: Record<ComparisonLean, string> = {
  spark: 'Spark advantage',
  competitor: 'Incumbent advantage',
  tradeoff: 'Depends on the job',
};

const leanClasses: Record<ComparisonLean, string> = {
  spark: 'border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200',
  competitor: 'border-amber-300/20 bg-amber-300/[0.07] text-amber-200',
  tradeoff: 'border-violet-300/20 bg-violet-300/[0.07] text-violet-200',
};

function PackagingComparison({ competitorKey }: { competitorKey: CompetitorKey }) {
  const comparison = competitorConfigs[competitorKey].packagingComparison;

  if (!comparison) return null;

  return (
    <div className="p-5 sm:p-6">
      <p className="mx-auto max-w-[520px] text-center text-xs leading-5 text-[#9aa4b4]">
        {comparison.question}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] sm:items-stretch">
        <section aria-label="Cin7 packaging" className="rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-[11px] font-medium text-white/45">{comparison.incumbent.vendor}</p>
          <h3 className="mt-1 text-base font-semibold tracking-tight text-white">{comparison.incumbent.packageName}</h3>
          <p className="mt-1 text-[11px] leading-4 text-white/35">{comparison.incumbent.packageNote}</p>
          <p className="mt-5 font-mono text-xl font-semibold tracking-tight text-white">{comparison.incumbent.price}</p>
          <p className="mt-1 text-[10px] leading-4 text-[#7f8999]">{comparison.incumbent.priceNote}</p>

          <div className="my-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-amber-300/80" aria-hidden="true">
            <span className="h-px flex-1 bg-amber-300/15" />
            Plus
            <span className="h-px flex-1 bg-amber-300/15" />
          </div>

          <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.045] p-3.5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-medium text-amber-200">{comparison.incumbent.addOn.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{comparison.incumbent.addOn.name}</p>
              </div>
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-amber-300">{comparison.incumbent.addOn.status}</span>
            </div>
            <p className="mt-2 text-[10px] leading-4 text-[#8b95a8]">{comparison.incumbent.addOn.note}</p>
          </div>
        </section>

        <div className="flex items-center justify-center font-mono text-[9px] tracking-[0.16em] text-white/25" aria-hidden="true">
          <span className="sm:hidden">VERSUS</span>
          <span className="hidden sm:inline">VS</span>
        </div>

        <section aria-label="Spark Inventory packaging" className="relative overflow-hidden rounded-[20px] border border-cyan-300/25 bg-[linear-gradient(145deg,rgba(34,211,238,0.10),rgba(139,92,246,0.06))] p-4 shadow-[0_18px_50px_rgba(6,182,212,0.08)]">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium text-white/45">{comparison.spark.vendor}</p>
              <h3 className="mt-1 text-base font-semibold tracking-tight text-white">{comparison.spark.packageName}</h3>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-emerald-300">Included</span>
          </div>
          <p className="mt-1 text-[11px] leading-4 text-white/35">{comparison.spark.packageNote}</p>
          <p className="mt-5 font-mono text-xl font-semibold tracking-tight text-cyan-200">{comparison.spark.price}</p>
          <p className="mt-1 text-[10px] leading-4 text-[#7f8999]">{comparison.spark.priceNote}</p>

          <ul className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4">
            {comparison.spark.included.map((item) => (
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
        <strong className="font-semibold text-white">Clear takeaway:</strong> {comparison.takeaway}
      </p>
    </div>
  );
}

function EvidenceHero({ competitorKey }: { competitorKey: CompetitorKey }) {
  const config = competitorConfigs[competitorKey];
  const colors = accentStyles[config.accent];
  const { bookUrl, signupUrl } = useCtaLinks(config.ctaOptions);

  return (
    <section className="relative overflow-hidden bg-[#06080d] px-6 pb-20 pt-28 md:px-8 lg:pb-28 lg:pt-32">
      <div className="absolute inset-0 dot-grid opacity-35" />
      <div className="absolute inset-0 noise opacity-60" />
      <div
        className="absolute -right-48 top-8 h-[700px] w-[700px] rounded-full blur-[145px]"
        style={{ background: colors.glow }}
      />
      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
        <ScrollReveal>
          <div className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm ${colors.border} ${colors.soft} ${colors.subtleText}`}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {config.eyebrow}
          </div>
          <h1 className="mt-7 text-[2.7rem] font-bold leading-[1.03] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.55rem]">
            Using {config.name}?
            <span className={`mt-1 block bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>Here’s the real tradeoff.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">{config.heroBody}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookACallButton
              url={bookUrl}
              className={`inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r ${colors.button} px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]`}
            >
              See It With Your Data
            </BookACallButton>
            <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-7 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.07]">
              Start Free
            </a>
          </div>
          <p className="mt-4 text-xs leading-5 text-white/40">Agent-led mapping · validation before import · your team approves</p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-[#090d15]/95 shadow-[0_38px_120px_rgba(0,0,0,0.5)]">
            <div className={`absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent ${colors.gradient} to-transparent`} />
            <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-5 py-4">
              <div>
                <p className="font-mono text-[9px] tracking-[0.18em] text-white/35">EVALUATION BRIEF / LIVE SOURCES</p>
                <p className="mt-1 text-sm font-semibold text-white">{config.fullName} → Spark Inventory</p>
              </div>
              <span className={`rounded-full border px-2.5 py-1 font-mono text-[9px] ${colors.border} ${colors.soft} ${colors.subtleText}`}>FACT-CHECKED</span>
            </div>

            {config.packagingComparison ? (
              <PackagingComparison competitorKey={competitorKey} />
            ) : (
              <div className="grid gap-3 p-5 sm:p-6">
                {config.snapshot.map((item, index) => (
                  <div key={item.label} className={`relative overflow-hidden rounded-2xl border p-4 ${index === 2 ? `${colors.border} ${colors.soft}` : 'border-white/[0.07] bg-white/[0.025]'}`}>
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-xs font-medium text-white/45">{item.label}</p>
                        <p className={`mt-1 text-xl font-semibold tracking-tight ${index === 2 ? colors.subtleText : 'text-white'}`}>{item.value}</p>
                      </div>
                      <span className="mt-1 font-mono text-[9px] text-white/25">0{index + 1}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#8b95a8]">{item.note}</p>
                  </div>
                ))}
              </div>
            )}

            <a href={config.sourceUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-t border-white/[0.07] px-5 py-4 text-xs text-[#8b95a8] transition hover:bg-white/[0.025] hover:text-white sm:px-6">
              <span>{config.sourceLabel}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-3 text-center text-[10px] leading-5 text-white/30">Prices and packaging can change. Vendor source checked August 24, 2026.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MigrationSection({ competitorKey }: { competitorKey: CompetitorKey }) {
  const config = competitorConfigs[competitorKey];
  const colors = accentStyles[config.accent];

  return (
    <section id="migration" className="scroll-mt-16 relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_18%_50%,rgba(139,92,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <ScrollReveal>
          <p className={`font-mono text-xs uppercase tracking-[0.18em] ${colors.text}`}>Agent-led migration</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Move the operation.
            <span className={`block bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>Not the spreadsheet cleanup.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#b8bfcc]">Sparki in app, or your compatible AI assistant through Spark MCP, can inspect the exports, build the mapping, validate the proposal, and stop for approval before import.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {config.migrationSignals.map((signal) => (
              <span key={signal} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs text-white/55">{signal}</span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#090d15] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${colors.border} ${colors.soft}`}>
                  <Bot className={`h-4 w-4 ${colors.text}`} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-white/30">{config.name.toUpperCase()} / MIGRATION RUN</p>
                  <p className="mt-1 text-xs text-white/60">Proposal mode · governed</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />APPROVAL ON</span>
            </div>
            <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
              {migrationSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="bg-[#090d15] p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${colors.border} ${colors.soft}`}><Icon className={`h-4 w-4 ${colors.text}`} aria-hidden="true" /></span>
                      <span className="font-mono text-[10px] text-white/25">{step.number}</span>
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#8b95a8]">{step.body}</p>
                  </article>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-emerald-400/[0.045] px-5 py-4">
              <div className="flex items-center gap-2 text-xs text-emerald-200"><CircleCheck className="h-4 w-4" aria-hidden="true" />Ready for operator review</div>
              <span className="font-mono text-[9px] text-white/30">NOTHING IMPORTED YET</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function DecisionThemes({ competitorKey }: { competitorKey: CompetitorKey }) {
  const config = competitorConfigs[competitorKey];
  const colors = accentStyles[config.accent];

  return (
    <section id="differences" className="scroll-mt-16 relative bg-[#06080d] px-6 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className={`font-mono text-xs uppercase tracking-[0.18em] ${colors.text}`}>Where the decision gets hard</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Five tradeoffs worth deciding explicitly</h2>
          <p className="mt-5 text-base leading-8 text-[#b8bfcc]">These are evaluation themes, not anonymous customer quotations. The factual details are checked against the vendor’s published pricing and product material.</p>
        </ScrollReveal>

        <ScrollReveal staggerChildren={90} className="mt-12 flex flex-wrap justify-center gap-5">
          {config.themes.map((theme, index) => (
            <RevealItem key={theme.number} index={index} className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0e16] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.15]">
                <div className={`absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent ${colors.gradient} to-transparent opacity-50`} />
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${colors.border} ${colors.soft} ${colors.subtleText}`}>{theme.label}</span>
                  <span className="font-mono text-lg font-semibold text-white/15">{theme.number}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-white">{theme.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#8b95a8]">{theme.body}</p>
                <div className="mt-6 space-y-3 border-t border-white/[0.07] pt-5">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">{config.name}</p>
                    <p className="mt-1.5 text-xs leading-5 text-white/55">{theme.incumbent}</p>
                  </div>
                  <div>
                    <p className={`font-mono text-[9px] uppercase tracking-[0.14em] ${colors.text}`}>Spark</p>
                    <p className="mt-1.5 text-xs leading-5 text-[#c7cdd7]">{theme.spark}</p>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

function ComparisonSection({ competitorKey }: { competitorKey: CompetitorKey }) {
  const config = competitorConfigs[competitorKey];
  const colors = accentStyles[config.accent];

  return (
    <section id="compare" className="scroll-mt-16 relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-28">
      <div className="relative mx-auto max-w-[1240px]">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className={`font-mono text-xs uppercase tracking-[0.18em] ${colors.text}`}>Honest side by side</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Choose the workflow, not the longest feature list</h2>
          <p className="mt-5 text-base leading-8 text-[#b8bfcc]">Spark does not win every row. That is the point of making the tradeoffs visible before your team starts a migration.</p>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="hidden overflow-hidden rounded-3xl border border-white/[0.09] bg-[#090d15] md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">{config.fullName} and Spark Inventory comparison</caption>
              <colgroup>
                <col className="w-[16%]" />
                <col className="w-[35%]" />
                <col className="w-[37%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead className="border-b border-white/[0.08] bg-white/[0.025] text-xs font-semibold text-white/50">
                <tr>
                  <th scope="col" className="px-5 py-4">Decision</th>
                  <th scope="col" className="border-l border-white/[0.06] px-5 py-4">{config.fullName}</th>
                  <th scope="col" className="border-l border-white/[0.06] px-5 py-4">Spark Inventory</th>
                  <th scope="col" className="border-l border-white/[0.06] px-4 py-4">Read</th>
                </tr>
              </thead>
              <tbody>
                {config.comparison.map((row, index) => (
                  <tr key={row.category} className={`border-b border-white/[0.05] last:border-0 ${index % 2 ? 'bg-white/[0.012]' : ''}`}>
                    <th scope="row" className={`px-5 py-5 align-top text-sm font-semibold ${colors.text}`}>{row.category}</th>
                    <td className="border-l border-white/[0.05] px-5 py-5 align-top text-sm leading-6 text-[#8b95a8]">{row.competitor}</td>
                    <td className="border-l border-white/[0.05] px-5 py-5 align-top text-sm leading-6 text-[#c1c7d0]">{row.spark}</td>
                    <td className="border-l border-white/[0.05] px-4 py-5 align-top"><span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold leading-4 ${leanClasses[row.lean]}`}>{leanLabels[row.lean]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {config.comparison.map((row) => (
              <article key={row.category} className="rounded-2xl border border-white/[0.08] bg-[#090d15] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className={`text-sm font-semibold ${colors.text}`}>{row.category}</h3>
                  <span className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-semibold ${leanClasses[row.lean]}`}>{leanLabels[row.lean]}</span>
                </div>
                <div className="mt-4 space-y-4">
                  <div><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">{config.name}</p><p className="mt-1.5 text-sm leading-6 text-[#8b95a8]">{row.competitor}</p></div>
                  <div className="border-t border-white/[0.06] pt-4"><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-300">Spark</p><p className="mt-1.5 text-sm leading-6 text-[#c1c7d0]">{row.spark}</p></div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FitSection({ competitorKey }: { competitorKey: CompetitorKey }) {
  const config = competitorConfigs[competitorKey];
  const colors = accentStyles[config.accent];

  return (
    <section id="fit" className="scroll-mt-16 bg-[#06080d] px-6 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-[1120px]">
        <ScrollReveal className="text-center">
          <p className={`font-mono text-xs uppercase tracking-[0.18em] ${colors.text}`}>The fit check</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">When to stay. When to look at Spark.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#b8bfcc]">{config.staySummary}</p>
        </ScrollReveal>
        <ScrollReveal staggerChildren={100} className="mt-12 grid gap-5 md:grid-cols-2">
          <RevealItem index={0}>
            <article className="h-full rounded-3xl border border-amber-300/15 bg-amber-300/[0.035] p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-200">Stay on {config.name} when</p>
              <ul className="mt-6 space-y-4">
                {config.stayReasons.map((reason) => <li key={reason} className="flex gap-3 text-sm leading-6 text-[#c7cdd7]"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />{reason}</li>)}
              </ul>
            </article>
          </RevealItem>
          <RevealItem index={1}>
            <article className={`h-full rounded-3xl border p-6 sm:p-8 ${colors.border} ${colors.soft}`}>
              <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${colors.subtleText}`}>Look at Spark when</p>
              <ul className="mt-6 space-y-4">
                {config.switchReasons.map((reason) => <li key={reason} className="flex gap-3 text-sm leading-6 text-[#e0e4ea]"><CircleCheck className={`mt-1 h-4 w-4 shrink-0 ${colors.text}`} aria-hidden="true" />{reason}</li>)}
              </ul>
            </article>
          </RevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FaqAndSources({ competitorKey }: { competitorKey: CompetitorKey }) {
  const config = competitorConfigs[competitorKey];
  const colors = accentStyles[config.accent];

  return (
    <section id="faq" className="scroll-mt-16 border-y border-white/[0.06] bg-white/[0.015] px-6 py-20 md:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1fr_0.55fr] lg:gap-16">
        <div>
          <ScrollReveal>
            <p className={`font-mono text-xs uppercase tracking-[0.18em] ${colors.text}`}>{config.name} migration FAQ</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">Questions buyers ask before switching</h2>
          </ScrollReveal>
          <ScrollReveal staggerChildren={70} className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {config.faqs.map((faq, index) => (
              <RevealItem key={faq.question} index={index}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-semibold text-white marker:content-none">
                    {faq.question}
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform group-open:rotate-45 ${colors.border} ${colors.soft} ${colors.text}`}>+</span>
                  </summary>
                  <p className="max-w-3xl pb-1 pr-10 pt-3 text-sm leading-7 text-[#8b95a8]">{faq.answer}</p>
                </details>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.12}>
          <aside className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 sm:p-7 lg:sticky lg:top-24">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${colors.border} ${colors.soft}`}><ShieldCheck className={`h-5 w-5 ${colors.text}`} aria-hidden="true" /></div>
            <h2 className="mt-5 text-lg font-semibold text-white">Evidence and disclosure</h2>
            <p className="mt-3 text-xs leading-6 text-[#8b95a8]">{config.sourceNote}</p>
            <a href={config.sourceUrl} target="_blank" rel="noreferrer" className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${colors.text}`}>{config.sourceLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <div className="mt-6 border-t border-white/[0.07] pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">Related Spark pages</p>
              <div className="mt-3 space-y-2">
                {config.relatedLinks.map((link) => <Link key={link.href} to={link.href} className="group flex items-center justify-between rounded-xl px-3 py-2 text-xs text-white/55 transition hover:bg-white/[0.04] hover:text-white"><span>{link.label}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></Link>)}
              </div>
            </div>
            <p className="mt-6 border-t border-white/[0.07] pt-5 text-[10px] leading-5 text-white/30">{config.trademark}</p>
          </aside>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ClosingCta({ competitorKey }: { competitorKey: CompetitorKey }) {
  const config = competitorConfigs[competitorKey];
  const colors = accentStyles[config.accent];
  const { bookUrl, signupUrl } = useCtaLinks(config.ctaOptions);

  return (
    <section id="start" className="scroll-mt-16 relative overflow-hidden bg-[#06080d] px-6 py-24 text-center md:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_100%,rgba(139,92,246,0.15),transparent_68%)]" />
      <ScrollReveal className="relative z-10 mx-auto max-w-4xl">
        <p className={`font-mono text-xs uppercase tracking-[0.18em] ${colors.text}`}>Decide with your own operation</p>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Bring the {config.name} data.<span className={`block bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>Let Sparki build the migration plan.</span></h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b8bfcc]">See the mapping, validation, approval, and readiness workflow using the records your team actually depends on, then decide whether Spark is the better operating fit.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <BookACallButton url={bookUrl} className={`inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r ${colors.button} px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]`}>See It With Your Data</BookACallButton>
          <a href={signupUrl} className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-7 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.07]">Start Free</a>
        </div>
      </ScrollReveal>
    </section>
  );
}

export default function CompetitorAlternativePage({ competitorKey }: { competitorKey: CompetitorKey }) {
  useScrollToHashOnMount();

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <EvidenceHero competitorKey={competitorKey} />
        <MigrationSection competitorKey={competitorKey} />
        <DecisionThemes competitorKey={competitorKey} />
        <ComparisonSection competitorKey={competitorKey} />
        <FitSection competitorKey={competitorKey} />
        <FaqAndSources competitorKey={competitorKey} />
        <ClosingCta competitorKey={competitorKey} />
      </main>
      <AgencyFooter />
    </div>
  );
}
