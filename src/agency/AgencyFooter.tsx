import ScrollReveal from "./ScrollReveal";

export default function AgencyFooter() {
  return (
    <footer className="py-16 bg-[#06080d] border-t border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 lg:gap-20">
            {/* Left: brand block */}
            <div>
              <a href="/" className="flex items-center gap-2.5 mb-4">
                <img src="/spark_icon.png" alt="Spark Inventory" className="w-8 h-8" />
                <span className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>Spark Inventory</span>
              </a>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                AI inventory management for teams selling<br />on Shopify, Amazon, and wholesale channels.
              </p>
              <a href="/contact" className="inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors">Talk to the Spark team →</a>
            </div>

            {/* Right: nav columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Pricing", href: "/pricing" },
                    { label: "All Features", href: "/features" },
                    { label: "Inventory Management", href: "/features/inventory" },
                    { label: "Purchasing & POs", href: "/features/purchasing" },
                    { label: "Sales & Invoicing", href: "/features/sales" },
                    { label: "Warehouse Management", href: "/features/warehousing" },
                    { label: "Manufacturing & BOM", href: "/features/manufacturing" },
                    { label: "QuickBooks & Accounting", href: "/features/accounting" },
                    { label: "AI Tools & Automation", href: "/features/tools-services" },
                  ].map((item) => (
                    <li key={item.href}><a href={item.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">{item.label}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">Solutions</h4>
                <ul className="space-y-2.5">
                  <li><a href="/shopify-inventory-management" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Shopify Inventory</a></li>
                  <li><a href="/reduce-stockouts-overstock" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Reduce Stockouts</a></li>
                  <li><a href="/fishbowl-alternative" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Fishbowl Alternative</a></li>
                  <li><a href="/cin7-alternative" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Cin7 Alternative</a></li>
                  <li><a href="/zoho-inventory-alternative" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Zoho Inventory Alternative</a></li>
                  <li><a href="/inflow-alternative" className="text-white/60 text-sm hover:text-white transition-colors duration-200">inFlow Alternative</a></li>
                  <li><a href="/3pl" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Inventory for 3PLs</a></li>
                  <li><a href="/in-store-pickup" className="text-white/60 text-sm hover:text-white transition-colors duration-200">In-Store Pickup</a></li>
                  <li><a href="/charity-retail" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Charity Retail</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
                <ul className="space-y-2.5">
                  <li><a href="/contact" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Contact</a></li>
                  <li><a href="/about" className="text-white/60 text-sm hover:text-white transition-colors duration-200">About Spark</a></li>
                  <li><a href="/what-is-inventory-management" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Inventory Guide</a></li>
                  <li><a href="/partners" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Partners</a></li>
                  <li><a href="/#faq" className="text-white/60 text-sm hover:text-white transition-colors duration-200">FAQ</a></li>
                  <li><a href="/support" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Support</a></li>
                  <li><a href="/sitemap" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Sitemap</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Privacy Policy", href: "/privacy-policy" },
                    { label: "Terms of Service", href: "/terms-of-service" },
                    { label: "App Privacy Details", href: "/app-privacy" },
                    { label: "Google Play - Data Safety", href: "/data-safety" },
                    { label: "EULA", href: "/eula" },
                    { label: "SMS Program", href: "/sms-program" },
                    { label: "Support", href: "/support" },
                    { label: "Delete Account", href: "/delete-account" },
                  ].map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="border-t border-white/[0.06] mt-12 pt-8">
            <p className="text-white text-sm text-center">&copy; 2026 Spark Inventory. All rights reserved.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
