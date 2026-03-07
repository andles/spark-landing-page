import { useState } from 'react';
import { Shield, AlertTriangle, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

interface Competitor {
  name: string;
  concerns: string[];
  sparkAdvantages: string[];
}

const competitors: Competitor[] = [
  {
    name: 'Cin7',
    concerns: [
      'Frequent support complaints and slow resolution',
      'Steep, unpredictable price increases over time',
      'Opaque cancellation and contract experience',
    ],
    sparkAdvantages: [
      'Transparent, predictable pricing from day one',
      'Responsive support with real SLAs',
      'AI-native platform with simpler onboarding',
    ],
  },
  {
    name: 'Katana',
    concerns: [
      'Usage-based pricing that scales unpredictably',
      'No B2B portal for wholesale or vendor workflows',
      'Gaps in the broader e-commerce stack',
    ],
    sparkAdvantages: [
      'Stable flat-rate pricing across every plan',
      'B2B customer and vendor portals included',
      'Full e-commerce and fulfillment stack built in',
    ],
  },
  {
    name: 'Fishbowl',
    concerns: [
      'Legacy desktop architecture showing its age',
      'Expensive support tiers and add-on costs',
      'Limited cloud and mobile capabilities',
    ],
    sparkAdvantages: [
      'Cloud-native architecture, accessible anywhere',
      'AI-first design with intelligent automation',
      'No hidden fees for support or onboarding',
    ],
  },
  {
    name: 'inFlow',
    concerns: [
      'Limited third-party integrations out of the box',
      'No built-in AI or forecasting capabilities',
      'API access sold separately as a paid add-on',
    ],
    sparkAdvantages: [
      'AI-powered forecasting included in every plan',
      'MCP protocol for advanced extensibility',
      'Broad native integrations with REST API included',
    ],
  },
  {
    name: 'Zoho Inventory',
    concerns: [
      'Strict per-user limits on most plans',
      'No dedicated manufacturing workflows',
      'Lacks AI-driven insights and automation',
    ],
    sparkAdvantages: [
      'Generous user limits with room to scale',
      'Full manufacturing support with BOMs and work orders',
      'AI capabilities and proactive alerts built in',
    ],
  },
];

/* ───────────────────────────────
   Classic (light) theme
   ─────────────────────────────── */

function CompetitorComparisonClassic() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <Container>
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Why Teams Switch to Spark
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            See How Spark Compares
          </h2>
          <p className="text-lg text-gray-600">
            Buyers switching from legacy inventory tools consistently cite the same frustrations. Here's how Spark addresses each one.
          </p>
        </div>

        {/* Accordion comparison */}
        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-3">
          {competitors.map((competitor, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={competitor.name}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-primary/30 shadow-lg shadow-primary/5 bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Accordion trigger */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">
                      Spark vs {competitor.name}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Accordion content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="grid lg:grid-cols-2 gap-4">
                        {/* Buyer concerns */}
                        <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                              <AlertTriangle className="w-4 h-4 text-amber-600" />
                            </div>
                            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                              Common Concerns
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {competitor.concerns.map((concern) => (
                              <li key={concern} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                                <span className="text-sm text-gray-600 leading-relaxed">
                                  {concern}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Spark advantage */}
                        <div className="rounded-xl bg-gradient-to-br from-primary/5 to-emerald-50 border border-primary/15 p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-primary" />
                            </div>
                            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                              The Spark Advantage
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {competitor.sparkAdvantages.map((advantage) => (
                              <li key={advantage} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                                <span className="text-sm text-gray-700 leading-relaxed font-medium">
                                  {advantage}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-500 text-sm mb-5">
            Ready to leave the limitations behind?
          </p>
          <button
            onClick={() =>
              document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────
   NextGen (dark) theme
   ─────────────────────────────── */

function CompetitorComparisonNextGen() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-16 lg:py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-600/8 rounded-full blur-[200px]" />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/80 font-medium">Why Teams Switch to Spark</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">See How Spark </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Compares
            </span>
          </h2>
          <p className="text-lg text-white/50">
            Buyers switching from legacy inventory tools consistently cite the same frustrations. Here's how Spark addresses each one.
          </p>
        </div>

        {/* Accordion comparison */}
        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-3">
          {competitors.map((competitor, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={competitor.name}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? 'border-cyan-500/30 bg-white/[0.04] shadow-[0_0_40px_rgba(6,182,212,0.08)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                {/* Accordion trigger */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white">
                      Spark vs {competitor.name}
                    </span>
                    {isOpen && (
                      <span className="text-xs font-medium text-cyan-400/80 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                        Comparing
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {/* Accordion content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="grid lg:grid-cols-2 gap-4">
                        {/* Buyer concerns */}
                        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                              <AlertTriangle className="w-4 h-4 text-amber-400" />
                            </div>
                            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wide">
                              Common Concerns
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {competitor.concerns.map((concern) => (
                              <li key={concern} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70 flex-shrink-0 mt-2" />
                                <span className="text-sm text-white/40 leading-relaxed">
                                  {concern}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Spark advantage */}
                        <div className="rounded-xl bg-gradient-to-br from-cyan-500/[0.06] to-violet-500/[0.04] border border-cyan-500/20 p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-cyan-400" />
                            </div>
                            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wide">
                              The Spark Advantage
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {competitor.sparkAdvantages.map((advantage) => (
                              <li key={advantage} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-2" />
                                <span className="text-sm text-white/70 leading-relaxed font-medium">
                                  {advantage}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-white/40 text-sm mb-5">
            Ready to leave the limitations behind?
          </p>
          <a
            href="https://app.sparkinventory.com/sign-up"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
          >
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────
   Theme switcher export
   ─────────────────────────────── */

export function CompetitorComparison() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? (
    <CompetitorComparisonNextGen />
  ) : (
    <CompetitorComparisonClassic />
  );
}
