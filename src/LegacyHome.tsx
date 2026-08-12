import {
  Header,
  Hero,
  TrustedBy,
  ValueJourney,
  FeatureShowcase,
  CoreCapabilities,
  Integrations,
  OutcomeClaims,
  DemoVideo,
  CompetitorComparison,
  Pricing,
  BookDemo,
  Footer,
} from './sections';
import { useTheme } from './context/ThemeContext';
import { useVariant } from './context/VariantContext';

// The pre-agency landing page, still reachable via ?variant=<slug>. Kept in
// its own lazy chunk so default/agency traffic doesn't download the old
// sections bundle.
export default function LegacyHome() {
  const { theme } = useTheme();
  const { variant } = useVariant();
  const isNextGen = theme === 'nextgen';

  return (
    <div className={`min-h-screen ${isNextGen ? 'bg-black' : 'bg-white'}`}>
      <Header />
      <main>
        <Hero />
        <OutcomeClaims />
        {variant === 'video' && <DemoVideo />}
        <TrustedBy />
        <CoreCapabilities />
        <ValueJourney />
        <FeatureShowcase />
        <Integrations />
        <CompetitorComparison />
        <Pricing />
        <BookDemo />
      </main>
      <Footer />
    </div>
  );
}
