// Screenshots of the Spark mobile app, captured from the app's own code
// running with sample records (public/screens/mobile-*.webp).
import ScrollReveal, { RevealItem } from '../../agency/ScrollReveal';

/** A phone bezel around one app screenshot (390 x 844 points). */
function PhoneShot({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="rounded-[2.4rem] border border-white/[0.14] bg-[#0b0e15] p-2 shadow-2xl shadow-black/50">
      <img
        src={src}
        alt={alt}
        width={390}
        height={844}
        loading={eager ? 'eager' : 'lazy'}
        className="block h-auto w-full rounded-[1.9rem]"
      />
    </div>
  );
}

/** Hero image for the mobile page: the receiving workspace. */
export function MobileHeroScreen() {
  return (
    <figure className="mx-auto w-full max-w-[300px]">
      <PhoneShot src="/screens/mobile-receiving.webp" alt="Receiving a purchase order in the Spark mobile app, with short, over-received, and unlisted lines flagged" eager />
      <figcaption className="mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
        Receiving in the Spark mobile app
      </figcaption>
    </figure>
  );
}

const screens = [
  { src: '/screens/mobile-home.webp', title: 'Home and Signals', body: 'Quick actions for the floor, and the proposed actions that need you.', alt: 'The Spark mobile home screen with Receive, Pick, Count, and Move shortcuts and the Signals feed' },
  { src: '/screens/mobile-receiving.webp', title: 'Receive', body: 'Scan against the PO. Shorts, overs, and unlisted items are flagged on the line.', alt: 'The Spark mobile receiving screen' },
  { src: '/screens/mobile-pick.webp', title: 'Pick', body: 'Work the list by scan, or let Auto Pick fill the open lines.', alt: 'A pick list in the Spark mobile app with Auto Pick and Partial Complete' },
];

/** Three real app screens side by side. */
export function MobileScreensGallery() {
  return (
    <section aria-labelledby="mobile-screens-heading" className="px-6 pb-16 md:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1120px]">
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">In the app</p>
            <h2 id="mobile-screens-heading" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">The screens your team works in</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal staggerChildren={80} className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {screens.map((screen, index) => (
            <RevealItem key={screen.src} index={index}>
              <figure className="mx-auto w-full max-w-[280px]">
                <PhoneShot src={screen.src} alt={screen.alt} />
                <figcaption className="mt-4 text-center">
                  <span className="block text-sm font-semibold text-white">{screen.title}</span>
                  <span className="mt-1 block text-xs leading-6 text-[#8b95a8]">{screen.body}</span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
