const logos = [
  { src: "/logos/shopify-2 1.svg", alt: "Shopify", width: 100, height: 29 },
  { src: "/logos/amazon.svg", alt: "Amazon", width: 70, height: 21 },
  { src: "/logos/quickbooks.svg", alt: "QuickBooks", width: 114, height: 30 },
  { src: "/logos/stripe.svg", alt: "Stripe", width: 2498, height: 1037 },
  { src: "/logos/woocommerce (2).svg", alt: "WooCommerce", width: 751, height: 152 },
  { src: "/logos/Square_Logo_2025_White.svg", alt: "Square", width: 2000, height: 501 },
  { src: "/logos/Zoho-Books-logo 2.svg", alt: "Zoho", width: 1334, height: 400 },
];

export default function AgencyTrustBar() {
  return (
    <section className="py-10 lg:py-14 relative">
      <p className="text-center text-white/80 text-sm font-medium tracking-wide mb-8">
        Connect the commerce and accounting tools you already use
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
                width={logo.width}
                height={logo.height}
                loading="lazy"
                decoding="async"
                className="h-6 lg:h-8 w-auto object-contain opacity-60 shrink-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-14 lg:gap-20 pr-14 lg:pr-20 animate-marquee">
            {logos.map((logo, i) => (
              <img
                key={`b-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                decoding="async"
                className="h-6 lg:h-8 w-auto object-contain opacity-60 shrink-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
