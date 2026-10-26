import { ArrowUpRight, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Quoted verbatim from Lee N.'s 5.0 review on Spark's Capterra listing (posted October 23, 2026).
export const CAPTERRA_REVIEWS_URL = 'https://www.capterra.com/p/10055062/Spark/reviews/';

export default function CapterraReview({ className = '' }: { className?: string }) {
  return (
    <section aria-label="Customer review on Capterra" className={`px-6 py-14 md:px-8 lg:py-16 ${className}`}>
      <ScrollReveal className="mx-auto max-w-[880px]">
        <figure className="rounded-3xl border border-white/[0.08] bg-[#090d15] p-6 text-center sm:p-10">
          <div className="flex items-center justify-center gap-1 text-amber-300" role="img" aria-label="Rated 5.0 out of 5">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
            <span className="ml-2 text-xs font-semibold text-white/60" aria-hidden="true">5.0</span>
          </div>
          <blockquote cite={CAPTERRA_REVIEWS_URL} className="mx-auto mt-6 max-w-3xl text-xl font-semibold leading-relaxed tracking-tight text-white sm:text-2xl">
            <p>“I have tried Zoey, Cin7, and others and this is hands down the best system for my company thus far.”</p>
          </blockquote>
          <figcaption className="mt-6 text-sm text-[#8b95a8]">
            <span className="font-semibold text-white/80">Lee N.</span>, Owner, Consumer Goods, on{' '}
            <a
              href={CAPTERRA_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-cyan-200 underline-offset-4 hover:underline"
            >
              Capterra
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </ScrollReveal>
    </section>
  );
}
