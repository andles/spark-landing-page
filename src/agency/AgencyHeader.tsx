import { useState, useEffect } from "react";

const navLinks = [
  { href: "#core-capabilities", label: "Features" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
];

export default function AgencyHeader() {
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
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[#b8bfcc] hover:text-white transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://app.sparkinventory.com" className="text-sm text-[#b8bfcc] hover:text-white transition-colors duration-200">
            Sign In
          </a>
          <a
            href="https://app.sparkinventory.com/sign-up"
            className="h-9 px-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300 inline-flex items-center"
          >
            Start Free Trial
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
        <div className="md:hidden glass border-t border-white/[0.06] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block text-sm text-[#b8bfcc] hover:text-white transition-colors py-1" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-2">
            <a href="https://app.sparkinventory.com" className="text-sm text-[#b8bfcc] hover:text-white py-1 transition-colors">Sign In</a>
            <a href="https://app.sparkinventory.com/sign-up" className="h-9 px-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold text-center inline-flex items-center justify-center">Start Free Trial</a>
          </div>
        </div>
      )}
    </header>
  );
}
