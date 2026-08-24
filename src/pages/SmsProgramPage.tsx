import { MessageSquareText, ShieldCheck } from 'lucide-react';
import AgencyFooter from '../agency/AgencyFooter';
import AgencyHeader from '../agency/AgencyHeader';
import ScrollReveal from '../agency/ScrollReveal';

const details = [
  ['Program name', 'Spark Inventory operational notifications'],
  ['Message type', 'Transactional inventory alerts, order updates, and other operational events enabled in your account'],
  ['Message frequency', 'Varies based on account activity and the notification types you enable; typically no more than a few messages per day'],
  ['Cost', 'Spark does not charge for SMS. Message and data rates may apply from your carrier'],
] as const;

export function SmsProgramPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white">
      <AgencyHeader />
      <main>
        <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-8 lg:pb-20 lg:pt-40">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_70%_5%,rgba(6,182,212,0.12),transparent_65%)]" />
          <ScrollReveal className="relative z-10 mx-auto max-w-[980px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-sm text-cyan-200">
              <MessageSquareText className="h-4 w-4" aria-hidden="true" /> SMS program details
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Operational alerts you control</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#b8bfcc] sm:text-lg">
              Spark Inventory offers optional transactional text messages to authenticated US account holders. SMS is not required to use Spark, and we do not send promotional marketing messages through this program.
            </p>
          </ScrollReveal>
        </section>

        <section className="border-t border-white/[0.06] px-6 py-16 md:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[980px] gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <ScrollReveal className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Program information</h2>
              <dl className="mt-6 divide-y divide-white/[0.07]">
                {details.map(([term, description]) => (
                  <div key={term} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr]">
                    <dt className="text-sm font-semibold text-white">{term}</dt>
                    <dd className="text-sm leading-6 text-[#b8bfcc]">{description}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="rounded-3xl border border-emerald-300/15 bg-emerald-300/[0.035] p-6 sm:p-8">
              <ShieldCheck className="h-7 w-7 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Consent and control</h2>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-[#b8bfcc]">
                <li><strong className="text-white">Opt in:</strong> Enable the notification types you want from Profile → SMS notifications inside your Spark account.</li>
                <li><strong className="text-white">Stop:</strong> Reply <strong className="text-white">STOP</strong> at any time or turn SMS off in your account settings.</li>
                <li><strong className="text-white">Help:</strong> Reply <strong className="text-white">HELP</strong> or email <a href="mailto:support@sparkinventory.com" className="text-cyan-300 hover:text-cyan-200">support@sparkinventory.com</a>.</li>
              </ul>
            </ScrollReveal>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-8 lg:pb-28">
          <ScrollReveal className="mx-auto max-w-[980px] rounded-3xl border border-white/[0.08] bg-[#0a0d14] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Sample message</p>
            <blockquote className="mt-5 border-l-2 border-cyan-300/40 pl-5 text-lg leading-8 text-white/85">
              “Spark Inventory: SKU ML-184 is projected to reach its reorder point in 8 days. Review the recommendation in Spark. Reply STOP to opt out, HELP for help.”
            </blockquote>
            <h2 className="mt-10 text-xl font-semibold">Privacy</h2>
            <p className="mt-3 text-sm leading-7 text-[#b8bfcc]">
              Mobile information is not sold or shared with third parties for promotional or marketing purposes. Phone numbers are shared only with the service provider used to deliver messages and receive delivery status. Read the complete <a href="/privacy-policy" className="text-cyan-300 hover:text-cyan-200">Privacy Policy</a> and <a href="/terms-of-service" className="text-cyan-300 hover:text-cyan-200">Terms of Service</a>.
            </p>
          </ScrollReveal>
        </section>
      </main>
      <AgencyFooter />
    </div>
  );
}
