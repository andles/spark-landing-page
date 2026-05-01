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
                Smarter inventory management for brands<br />selling on FBA, Shopify, and wholesale channels.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-white/50 hover:text-white transition-colors duration-200" aria-label="Twitter">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors duration-200" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

            {/* Right: nav columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
                <ul className="space-y-2.5">
                  {["Features", "Integrations", "Pricing"].map((item) => (
                    <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/60 text-sm hover:text-white transition-colors duration-200">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
                <ul className="space-y-2.5">
                  <li><a href="/partners" className="text-white/60 text-sm hover:text-white transition-colors duration-200">Partners</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
                <ul className="space-y-2.5">
                  {["Privacy Policy", "Terms of Service"].map((item) => (
                    <li key={item}><a href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-white/60 text-sm hover:text-white transition-colors duration-200">{item}</a></li>
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
