import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { AppPrivacyPage } from './pages/AppPrivacyPage';
import { DataSafetyPage } from './pages/DataSafetyPage';
import { EulaPage } from './pages/EulaPage';
import { SupportPage } from './pages/SupportPage';
import { DeleteAccountPage } from './pages/DeleteAccountPage';
import { ContactPage } from './pages/ContactPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { VariantProvider, useVariant } from './context/VariantContext';
import AgencyPage from './agency/AgencyPage';
import ThreePLPage from './agency/ThreePLPage';
import PickupPage from './agency/PickupPage';
import BookRedirect from './agency/BookRedirect';
import StockoutsPage from './agency/StockoutsPage';
import MeetingConfirmedPage from './agency/MeetingConfirmedPage';

function HomePage() {
  const { theme } = useTheme();
  const { variant } = useVariant();
  const isNextGen = theme === 'nextgen';

  // Agency page is the default experience; old page still accessible via other variants
  if (variant === 'default' || variant === 'agency') {
    return <AgencyPage />;
  }
  
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

function App() {
  return (
    <ThemeProvider>
      <VariantProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/3pl" element={<ThreePLPage />} />
            <Route path="/in-store-pickup" element={<PickupPage />} />
            <Route path="/book-a-call" element={<BookRedirect />} />
            <Route path="/meeting-confirmed" element={<MeetingConfirmedPage />} />
            {/* Reduce Stockouts & Overstock campaign variant. The requested
                "&" slug is registered as-is, plus a clean ampersand-free alias
                (recommended for ad links, since "&" gets percent-encoded). */}
            <Route path="/reduce-stockouts-&-overstock" element={<StockoutsPage />} />
            <Route path="/reduce-stockouts-overstock" element={<StockoutsPage />} />
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
            <Route path="/app-privacy" element={<AppPrivacyPage />} />
            <Route path="/data-safety" element={<DataSafetyPage />} />
            <Route path="/eula" element={<EulaPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/delete-account" element={<DeleteAccountPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </BrowserRouter>
      </VariantProvider>
    </ThemeProvider>
  );
}

export default App;
