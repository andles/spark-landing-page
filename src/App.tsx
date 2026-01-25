import {
  Header,
  Hero,
  TrustedBy,
  ValueJourney,
  Features,
  FeatureShowcase,
  Integrations,
  BookDemo,
  Footer,
} from './sections';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <ValueJourney />
        <FeatureShowcase />
        <Features />
        <Integrations />
        {/* <MobileDesktop /> */}
        {/* <PerfectFor /> */}
        {/* <FAQ /> */}
        {/* <Pricing /> */}
        <BookDemo />
      </main>
      <Footer />
    </div>
  );
}

export default App;
