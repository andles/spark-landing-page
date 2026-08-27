import { useEffect, useRef, useState } from 'react';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';

const SORO_EMBED_URL =
  'https://app.trysoro.com/api/embed/8a7f0d25-8c1f-451d-81aa-277ecf3a5ae9?theme=dark';

export default function BlogPage() {
  const embedHostRef = useRef<HTMLDivElement>(null);
  const [embedFailed, setEmbedFailed] = useState(false);

  useEffect(() => {
    const embedHost = embedHostRef.current;
    if (!embedHost) return;

    const script = document.createElement('script');
    script.src = SORO_EMBED_URL;
    script.defer = true;
    script.dataset.soroEmbed = 'spark-blog';
    script.onerror = () => setEmbedFailed(true);
    embedHost.appendChild(script);

    return () => {
      script.remove();
      document.getElementById('soro-blog')?.replaceChildren();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-12 pt-28 md:px-8 lg:pb-16 lg:pt-32">
          <div className="absolute inset-0 dot-grid opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(6,182,212,0.13),transparent_68%)]" />
          <div className="relative z-10 mx-auto max-w-[1180px] text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Ideas for inventory operators</p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Spark Inventory Blog</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
              Practical guidance on demand planning, purchasing, multichannel operations, and building a healthier inventory business.
            </p>
          </div>
        </section>

        <section className="border-t border-white/[0.06] px-6 py-12 md:px-8 lg:py-16">
          <div ref={embedHostRef} className="mx-auto min-h-[640px] max-w-[1180px]">
            <div id="soro-blog" />
            {embedFailed && (
              <div role="status" className="rounded-3xl border border-white/[0.08] bg-white/[0.025] px-6 py-16 text-center">
                <p className="text-lg font-semibold text-white">The Spark blog is being prepared.</p>
                <p className="mt-3 text-sm text-[#8b95a8]">Please check back shortly for the first articles.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
