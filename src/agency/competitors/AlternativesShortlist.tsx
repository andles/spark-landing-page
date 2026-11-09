import { ArrowRight, ArrowUpRight, CircleCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookACallButton from '../BookACallButton';
import ScrollReveal, { RevealItem } from '../ScrollReveal';
import { useCtaLinks } from '../ctaLinks';
import {
  ALTERNATIVES_CHECKED,
  alternativeOptions,
  alternativesShortlists,
  type AlternativeOption,
  type ShortlistKey,
} from './alternativesData';
import { competitorConfigs } from './competitorData';

const factRows = [
  { label: 'Best for', field: 'bestFor' },
  { label: 'Pricing', field: 'pricing' },
  { label: 'Users', field: 'users' },
  { label: 'Buying plan', field: 'planning' },
] as const satisfies ReadonlyArray<{ label: string; field: keyof AlternativeOption }>;

function SparkPick({ option, shortlistKey }: { option: AlternativeOption; shortlistKey: ShortlistKey }) {
  const { signupUrl, bookUrl } = useCtaLinks(competitorConfigs[shortlistKey].ctaOptions);

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-cyan-300/25 bg-[linear-gradient(145deg,rgba(34,211,238,0.10),rgba(139,92,246,0.07))] p-6 shadow-[0_24px_70px_rgba(6,182,212,0.10)] sm:p-8">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm font-semibold text-cyan-200">01</span>
        <h3 className="text-2xl font-bold tracking-tight text-white">{option.name}</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-300/[0.1] px-3 py-1 text-[11px] font-semibold text-cyan-100">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Our pick
        </span>
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {factRows.map((row) => (
          <div key={row.label}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-300">{row.label}</dt>
            <dd className="mt-1.5 text-sm leading-6 text-[#e0e4ea]">{option[row.field]}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 flex gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] p-4 text-sm leading-6 text-[#d7f5e8]">
        <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
        <span><strong className="font-semibold text-white">Why teams pick it:</strong> {option.note}</span>
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={signupUrl} className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
          Start Free
        </a>
        <BookACallButton url={bookUrl} className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-6 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.07]">
          Book a demo
        </BookACallButton>
      </div>
    </article>
  );
}

function AlternativeCard({ option, position, currentHref }: { option: AlternativeOption; position: number; currentHref: string }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/[0.08] bg-[#0a0e16] p-6">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-white/30">{String(position).padStart(2, '0')}</span>
        <h3 className="text-lg font-semibold tracking-tight text-white">{option.name}</h3>
      </div>
      <dl className="mt-5 space-y-4">
        {factRows.map((row) => (
          <div key={row.label}>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">{row.label}</dt>
            <dd className="mt-1 text-sm leading-6 text-[#aeb6c3]">{option[row.field]}</dd>
          </div>
        ))}
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-amber-200/70">Watch for</dt>
          <dd className="mt-1 text-sm leading-6 text-[#aeb6c3]">{option.note}</dd>
        </div>
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-4 text-xs">
        {option.comparisonHref && option.comparisonHref !== currentHref && (
          <Link to={option.comparisonHref} className="group inline-flex items-center gap-1.5 font-semibold text-cyan-300 hover:text-white">
            Spark vs {option.name.replace(' Core', '').replace(' Inventory', '')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
        <a href={option.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#8b95a8] hover:text-white">
          {option.name} pricing
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function AlternativesShortlist({ shortlistKey }: { shortlistKey: ShortlistKey }) {
  const list = alternativesShortlists[shortlistKey];
  const currentHref = competitorConfigs[shortlistKey].slug;
  const [first, ...rest] = list.options.map((key) => alternativeOptions[key]);

  return (
    <section id="alternatives" className="scroll-mt-16 relative bg-[#06080d] px-6 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">{list.eyebrow}</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {list.title.charAt(0).toUpperCase() + list.title.slice(1)}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#b8bfcc]">{list.summary}</p>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <SparkPick option={first} shortlistKey={shortlistKey} />
        </ScrollReveal>

        <ScrollReveal staggerChildren={90} className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((option, index) => (
            <RevealItem key={option.key} index={index}>
              <AlternativeCard option={option} position={index + 2} currentHref={currentHref} />
            </RevealItem>
          ))}
        </ScrollReveal>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-[#7f8999]">
          Spark Inventory publishes this comparison. Details for the other tools come from each vendor’s public pricing page, checked {ALTERNATIVES_CHECKED}. Prices and plans can change, so confirm with the vendor before you buy.
        </p>
      </div>
    </section>
  );
}
