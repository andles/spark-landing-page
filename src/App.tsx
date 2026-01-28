import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Header,
  Hero,
  TrustedBy,
  ValueJourney,
  Features,
  FeatureShowcase,
  CoreCapabilities,
  Integrations,
  FAQ,
  Pricing,
  BookDemo,
  Footer,
} from './sections';
import {
  InventoryPage,
  PurchasingPage,
  SalesPage,
  ManufacturingPage,
  WarehousingPage,
  ToolsServicesPage,
  AccountingPage,
} from './pages/features';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components';
import { useTheme } from './context/ThemeContext';

function HomePage() {
  const { theme } = useTheme();
  const isNextGen = theme === 'nextgen';
  
  return (
    <div className={`min-h-screen ${isNextGen ? 'bg-black' : 'bg-white'}`}>
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <CoreCapabilities />
        <ValueJourney />
        <FeatureShowcase />
        {/* <Features /> */}
        <Integrations />
        <Pricing />
        {/* <FAQ /> */}
        <BookDemo />
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features/inventory" element={<InventoryPage />} />
          <Route path="/features/purchasing" element={<PurchasingPage />} />
          <Route path="/features/sales" element={<SalesPage />} />
          <Route path="/features/manufacturing" element={<ManufacturingPage />} />
          <Route path="/features/warehousing" element={<WarehousingPage />} />
          <Route path="/features/tools-services" element={<ToolsServicesPage />} />
          <Route path="/features/accounting" element={<AccountingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
