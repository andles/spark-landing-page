import ScrollReveal from '../agency/ScrollReveal';
import { articlePath, type ArticleGuide } from '../blog/soro';

interface BlogGuidesSectionProps {
  guides: readonly ArticleGuide[];
  title?: string;
}

/**
 * Links to blog guides (ARTICLE_GUIDES in blog/soro.ts) from product pages, so
 * the guides closest to page one in search are not reachable only from /blog/.
 * Guide pages are rendered by the Soro edge function, so these are plain links.
 */
export function BlogGuidesSection({ guides, title = 'Read more on the Spark Inventory blog' }: BlogGuidesSectionProps) {
  if (!guides.length) return null;
  return (
    <section className="px-6 py-16 md:px-8 lg:py-20" aria-labelledby="blog-guides-heading">
      <div className="mx-auto max-w-[1080px]">
        <ScrollReveal className="max-w-3xl">
          <p className="text-sm font-semibold text-cyan-300">Guides</p>
          <h2 id="blog-guides-heading" className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
        </ScrollReveal>
        <ul className="mt-8 grid gap-x-12 divide-y divide-white/[0.08] border-y border-white/[0.08] md:grid-cols-2 md:divide-y-0 md:border-0">
          {guides.map((guide) => (
            <li key={guide.slug} className="py-5 md:border-t md:border-white/[0.08]">
              <a href={articlePath(guide.slug)} className="text-base font-semibold text-cyan-300 underline-offset-4 hover:text-white hover:underline">
                {guide.anchor}
              </a>
              <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{guide.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
