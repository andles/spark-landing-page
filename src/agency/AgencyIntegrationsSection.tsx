import ScrollReveal, { RevealItem } from "./ScrollReveal";
import { useCtaLinks } from "./ctaLinks";

const integrations = [
  { src: "/logos/shopify-2 1.svg", alt: "Shopify", width: 100, height: 29 },
  { src: "/logos/amazon.svg", alt: "Amazon", width: 70, height: 21 },
  { src: "/logos/quickbooks.svg", alt: "QuickBooks", width: 114, height: 30 },
  { src: "/logos/stripe.svg", alt: "Stripe", width: 2498, height: 1037 },
  { src: "/logos/woocommerce (2).svg", alt: "WooCommerce", width: 751, height: 152 },
  { src: "/logos/Square_Logo_2025_White.svg", alt: "Square", width: 2000, height: 501 },
  { src: "/logos/Zoho-Books-logo 2.svg", alt: "Zoho Books", width: 1334, height: 400 },
  { src: "/logos/tiktok.svg", alt: "TikTok Shop", width: 913, height: 208 },
  { src: "/logos/meta 1.svg", alt: "Meta", width: 961, height: 194 },
  { src: "/logos/edi 1.svg", alt: "EDI", width: 251, height: 94 },
  { src: "/logos/logo-ss-primary-rgb-1-1 1.svg", alt: "ShipStation", width: 466, height: 72 },
  { src: "/logos/RXO 1.svg", alt: "RXO", width: 426, height: 150 },
];

export default function AgencyIntegrationsSection() {
  const { signupUrl } = useCtaLinks();
  return (
    <section id="integrations" className="scroll-mt-16 py-14 lg:py-20 bg-[#06080d] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(6,182,212,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-sm text-[#b8bfcc] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              Integrations
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "var(--font-display, 'Inter', sans-serif)" }}>
              Connects to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">everything</span>{" "}
              you already use
            </h2>
            <p className="text-lg text-[#b8bfcc] leading-relaxed mb-8">
              Shopify, Amazon, QuickBooks, Stripe, and dozens more. One-click setup, real-time sync, and a single source of truth across your entire stack.
            </p>
            <a
              href={signupUrl}
              className="inline-flex items-center h-[46px] px-7 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-semibold hover:scale-[1.02] transition-all duration-300"
            >
              See All Integrations
            </a>
          </ScrollReveal>

          {/* Right: logo grid */}
          <ScrollReveal staggerChildren={80} className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {integrations.map((logo, i) => (
              <RevealItem key={logo.alt} index={i}>
                <div className="group flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 h-16 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-5 w-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
