import { ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main className="relative flex min-h-[76vh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-8">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_20%,rgba(6,182,212,0.13),transparent_65%)]" />
        <section className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-200">
            <Compass className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">404 · Page not found</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">This page is off the inventory map.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
            The address may have changed, or the page may no longer exist. Head home or use the sitemap to find the Spark Inventory answer you need.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
              Return home <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/sitemap" className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]">
              Browse the sitemap
            </Link>
          </div>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
