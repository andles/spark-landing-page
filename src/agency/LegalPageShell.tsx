import { Link } from "react-router-dom";
import AgencyHeader from "./AgencyHeader";
import AgencyFooter from "./AgencyFooter";

// ── Shared wrapper ──────────────────────────────────────────────────────────
export default function LegalPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06080d]">
      <AgencyHeader />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12 py-14 lg:py-20">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#b8bfcc]/60 hover:text-[#b8bfcc] mb-10 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>

          {/* Title + subtitle */}
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#f0f2f5] mb-3"
            style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#b8bfcc]/50 pb-10 mb-10 border-b border-white/[0.06]">
              {subtitle}
            </p>
          )}

          {/* Page body */}
          <div className="space-y-10">{children}</div>
        </div>
      </main>
      <AgencyFooter />
    </div>
  );
}

// ── Reusable content primitives ─────────────────────────────────────────────

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="text-xl font-semibold text-[#f0f2f5] mb-4"
        style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function LegalSubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-[#f0f2f5]/80 mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return <p className="text-[#b8bfcc] leading-relaxed">{children}</p>;
}

export function LegalUl({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc list-inside space-y-2 text-[#b8bfcc]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalEmail({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors">
      {email}
    </a>
  );
}

export function LegalDl({
  items,
}: {
  items: { term: string; definition: React.ReactNode }[];
}) {
  return (
    <dl className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          <dt className="font-medium text-[#f0f2f5]/80">{item.term}</dt>
          <dd className="text-[#b8bfcc] ml-4">{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08] mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.08] bg-white/[0.03]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-[#f0f2f5]/70 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05]">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-[#b8bfcc] align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
      {children}
    </span>
  );
}

export function LegalAddress() {
  return (
    <address className="not-italic text-[#b8bfcc] leading-relaxed">
      Spark Inventory, INC<br />
      30 Rockefeller Plaza, Suite 2060<br />
      New York, NY 10112<br />
      Email: <LegalEmail email="support@sparkinventory.com" />
    </address>
  );
}
