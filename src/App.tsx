import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Header,
  Hero,
  TrustedBy,
  ValueJourney,
  FeatureShowcase,
  CoreCapabilities,
  Integrations,
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
import { PartnersPage } from './pages/PartnersPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { ContactPage } from './pages/ContactPage';
import { ThemeProvider } from './context/ThemeContext';
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
        <Integrations />
        <Pricing />
        <BookDemo />
      </main>
      <Footer />
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
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
