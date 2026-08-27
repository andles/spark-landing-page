import { useState, useEffect } from "react";
import { useCtaLinks } from "./ctaLinks";

const productLinks = [
  { href: "/features", label: "All product features", description: "See the complete Spark platform" },
  { href: "/what-is-inventory-management", label: "Inventory guide", description: "Learn the operating model and metrics" },
  { href: "/features/inventory", label: "Inventory", description: "SKUs, stock, locations, and control" },
  { href: "/features/purchasing", label: "Purchasing", description: "Planning, POs, suppliers, and receiving" },
  { href: "/features/sales", label: "Sales", description: "Orders, invoices, customers, and returns" },
  { href: "/features/manufacturing", label: "Manufacturing", description: "BOMs, materials, and production" },
  { href: "/features/warehousing", label: "Warehousing", description: "Bins, transfers, picking, and counts" },
  { href: "/features/accounting", label: "Accounting", description: "QuickBooks, invoices, and payments" },
  { href: "/features/tools-services", label: "Sparki & MCP", description: "Agentic onboarding and automation" },
];

const solutionLinks = [
  { href: "/shopify-inventory-management", label: "Shopify inventory", description: "Plan the next buy from Shopify demand" },
  { href: "/3pl", label: "Inventory for 3PLs", description: "Client workspaces, price books, and runs" },
  { href: "/reduce-stockouts-overstock", label: "Reduce stockouts", description: "Explainable risk and replenishment" },
  { href: "/in-store-pickup", label: "In-store pickup", description: "Location-aware promise and handoff" },
  { href: "/fishbowl-alternative", label: "Fishbowl alternative", description: "A guided path out of Fishbowl" },
  { href: "/cin7-alternative", label: "Cin7 alternative", description: "Compare planning, packaging, and fit" },
  { href: "/zoho-inventory-alternative", label: "Zoho Inventory alternative", description: "Move beyond caps and suite gravity" },
  { href: "/inflow-alternative", label: "inFlow alternative", description: "Planning depth beyond the reorder point" },
];

function DesktopMenu({ label, links }: { label: string; links: typeof productLinks }) {
  return (
    <div className="group relative">
      <button type="button" className="inline-flex cursor-pointer items-center gap-1.5 py-5 text-sm text-[#b8bfcc] transition-colors group-hover:text-white group-focus-within:text-white" aria-haspopup="true">
        {label}
        <svg className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
      </button>
      <div className="invisible absolute left-1/2 top-[56px] w-[560px] -translate-x-1/2 translate-y-2 rounded-2xl border border-white/[0.1] bg-[#0a0d14]/[0.98] p-3 opacity-0 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="grid grid-cols-2 gap-1">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} className={`rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none ${index === 0 && label === "Product" ? "border border-cyan-300/10 bg-cyan-300/[0.04]" : ""}`}>
              <span className="block text-sm font-semibold text-white">{link.label}</span>
              <span className="mt-1 block text-xs leading-5 text-white/40">{link.description}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AgencyHeader() {
  const { signupUrl } = useCtaLinks();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <img src="/spark_icon.png" alt="Spark Inventory" className="w-8 h-8" />
          <span className="font-bold text-white text-base tracking-tight">Spark Inventory</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <DesktopMenu label="Product" links={productLinks} />
          <DesktopMenu label="Solutions" links={solutionLinks} />
          <a href="/#integrations" className="text-sm text-[#b8bfcc] hover:text-white transition-colors duration-200">Integrations</a>
          <a href="/pricing" className="text-sm text-[#b8bfcc] hover:text-white transition-colors duration-200">Pricing</a>
          <a href="/blog" className="text-sm text-[#b8bfcc] hover:text-white transition-colors duration-200">Blog</a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://app.sparkinventory.com" className="text-sm text-[#b8bfcc] hover:text-white transition-colors duration-200">
            Sign In
          </a>
          <a
            href={signupUrl}
            className="h-9 px-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300 inline-flex items-center"
          >
            Start Free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-[#080b12]/[0.98] px-6 py-5 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-x-5 gap-y-2">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-300">Product</p>
              {productLinks.map((link) => (
                <a key={link.href} href={link.href} className="block py-1.5 text-sm text-[#b8bfcc] hover:text-white" onClick={() => setMenuOpen(false)}>{link.label}</a>
              ))}
            </div>
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-violet-300">Solutions</p>
              {solutionLinks.map((link) => (
                <a key={link.href} href={link.href} className="block py-1.5 text-sm text-[#b8bfcc] hover:text-white" onClick={() => setMenuOpen(false)}>{link.label}</a>
              ))}
              <a href="/#integrations" className="mt-2 block py-1.5 text-sm text-[#b8bfcc] hover:text-white" onClick={() => setMenuOpen(false)}>Integrations</a>
              <a href="/pricing" className="block py-1.5 text-sm text-[#b8bfcc] hover:text-white" onClick={() => setMenuOpen(false)}>Pricing</a>
              <a href="/blog" className="block py-1.5 text-sm text-[#b8bfcc] hover:text-white" onClick={() => setMenuOpen(false)}>Blog</a>
            </div>
          </div>
          <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-2">
            <a href="https://app.sparkinventory.com" className="text-sm text-[#b8bfcc] hover:text-white py-1 transition-colors">Sign In</a>
            <a href={signupUrl} className="h-9 px-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold text-center inline-flex items-center justify-center">Start Free</a>
          </div>
        </div>
      )}
    </header>
  );
}
