import { ArrowUpRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import ScrollReveal, { RevealItem } from '../agency/ScrollReveal';
import { findRouteMeta } from '../seo/routeMeta';

const groups = [
  {
    title: 'Solutions',
    description: 'Inventory workflows built around a specific business problem or operating model.',
    links: [
      ['/shopify-inventory-management', 'Shopify Inventory Management'],
      ['/3pl', 'Inventory Intelligence for 3PLs'],
      ['/reduce-stockouts-overstock', 'Reduce Stockouts & Overstock'],
      ['/in-store-pickup', 'In-Store Pickup'],
      ['/fishbowl-alternative', 'Fishbowl Alternative'],
      ['/cin7-alternative', 'Cin7 Alternative'],
      ['/zoho-inventory-alternative', 'Zoho Inventory Alternative'],
      ['/inflow-alternative', 'inFlow Alternative'],
    ],
  },
  {
    title: 'Product',
    description: 'Explore the core capabilities inside Spark Inventory.',
    links: [
      ['/pricing', 'Pricing & Plans'],
      ['/features', 'All Product Features'],
      ['/features/inventory', 'Inventory Management'],
      ['/features/purchasing', 'Purchasing & Purchase Orders'],
      ['/features/sales', 'Sales Orders & Invoicing'],
      ['/features/manufacturing', 'Manufacturing & BOMs'],
      ['/features/warehousing', 'Warehouse Management'],
      ['/features/accounting', 'Accounting & QuickBooks'],
      ['/features/tools-services', 'AI Tools, Sparki & MCP'],
    ],
  },
  {
    title: 'Company & help',
    description: 'Learn about Spark, contact the team, or find support.',
    links: [
      ['/', 'Spark Inventory Home'],
      ['/about', 'About Spark Inventory'],
      ['/blog', 'Spark Inventory Blog'],
      ['/what-is-inventory-management', 'What Is Inventory Management?'],
      ['/partners', 'Partners'],
      ['/contact', 'Contact'],
      ['/support', 'Support'],
    ],
  },
  {
    title: 'Legal & privacy',
    description: 'Policies, data practices, licensing, and account controls.',
    links: [
      ['/privacy-policy', 'Privacy Policy'],
      ['/terms-of-service', 'Terms of Service'],
      ['/app-privacy', 'App Privacy'],
      ['/data-safety', 'Data Safety'],
      ['/eula', 'End User License Agreement'],
      ['/sms-program', 'SMS Program Details'],
      ['/delete-account', 'Delete Your Account'],
    ],
  },
] as const;

export function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-8 lg:pb-20 lg:pt-40">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_70%_5%,rgba(6,182,212,0.12),transparent_65%)]" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <ScrollReveal>
              <Link to="/" className="text-sm text-[#8b95a8] transition-colors hover:text-white">Spark Inventory /</Link>
              <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-sm text-cyan-200">
                <Compass className="h-4 w-4" aria-hidden="true" /> Complete site directory
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Spark Inventory sitemap</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
                Every public product, solution, company, support, and legal page—organized so people and search engines can find the right answer quickly.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-white/[0.06] px-6 py-16 md:px-8 lg:py-20">
          <ScrollReveal staggerChildren={80} className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-2">
            {groups.map((group, groupIndex) => (
              <RevealItem key={group.title} index={groupIndex}>
                <section className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-white">{group.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#8b95a8]">{group.description}</p>
                  <ul className="mt-6 divide-y divide-white/[0.06]">
                    {group.links.map(([path, label]) => {
                      const meta = findRouteMeta(path);
                      return (
                        <li key={path}>
                          <Link to={path} className="group flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                            <span>
                              <span className="block text-sm font-semibold text-[#e8ebf0] transition-colors group-hover:text-cyan-200">{label}</span>
                              {meta?.description && <span className="mt-1 block text-xs leading-5 text-white/35">{meta.description}</span>}
                            </span>
                            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" aria-hidden="true" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              </RevealItem>
            ))}
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
