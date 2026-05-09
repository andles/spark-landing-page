const logos = [
  { src: "/logos/shopify-2 1.svg", alt: "Shopify" },
  { src: "/logos/amazon.svg", alt: "Amazon" },
  { src: "/logos/quickbooks.svg", alt: "QuickBooks" },
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/woocommerce (2).svg", alt: "WooCommerce" },
  { src: "/logos/Square_Logo_2025_White.svg", alt: "Square" },
  { src: "/logos/Zoho-Books-logo 2.svg", alt: "Zoho" },
];

export default function AgencyTrustBar() {
  return (
    <section className="py-10 lg:py-14 relative">
      <p className="text-center text-white/80 text-sm font-medium tracking-wide mb-8">
        Trusted by Industry Experts
      </p>
      <div
        className="relative max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-14 lg:gap-20 pr-14 lg:pr-20 animate-marquee">
            {logos.map((logo, i) => (
              <img
                key={`a-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-6 lg:h-8 w-auto object-contain opacity-60 shrink-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-14 lg:gap-20 pr-14 lg:pr-20 animate-marquee">
            {logos.map((logo, i) => (
              <img
                key={`b-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-6 lg:h-8 w-auto object-contain opacity-60 shrink-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
