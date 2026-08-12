import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { VariantProvider, useVariant } from './context/VariantContext';
import AgencyPage from './agency/AgencyPage';

// Everything except the default homepage is lazy-loaded so first-visit
// traffic only downloads the code it renders.
const LegacyHome = lazy(() => import('./LegacyHome'));
const ThreePLPage = lazy(() => import('./agency/ThreePLPage'));
const PickupPage = lazy(() => import('./agency/PickupPage'));
const BookRedirect = lazy(() => import('./agency/BookRedirect'));
const StockoutsPage = lazy(() => import('./agency/StockoutsPage'));
const MeetingConfirmedPage = lazy(() => import('./agency/MeetingConfirmedPage'));
const ProspectReportRoute = lazy(() => import('./reports/StockSignalsReport'));
const InventoryPage = lazy(() => import('./pages/features/InventoryPage').then((m) => ({ default: m.InventoryPage })));
const PurchasingPage = lazy(() => import('./pages/features/PurchasingPage').then((m) => ({ default: m.PurchasingPage })));
const SalesPage = lazy(() => import('./pages/features/SalesPage').then((m) => ({ default: m.SalesPage })));
const ManufacturingPage = lazy(() => import('./pages/features/ManufacturingPage').then((m) => ({ default: m.ManufacturingPage })));
const WarehousingPage = lazy(() => import('./pages/features/WarehousingPage').then((m) => ({ default: m.WarehousingPage })));
const ToolsServicesPage = lazy(() => import('./pages/features/ToolsServicesPage').then((m) => ({ default: m.ToolsServicesPage })));
const AccountingPage = lazy(() => import('./pages/features/AccountingPage').then((m) => ({ default: m.AccountingPage })));
const PartnersPage = lazy(() => import('./pages/PartnersPage').then((m) => ({ default: m.PartnersPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage })));
const AppPrivacyPage = lazy(() => import('./pages/AppPrivacyPage').then((m) => ({ default: m.AppPrivacyPage })));
const DataSafetyPage = lazy(() => import('./pages/DataSafetyPage').then((m) => ({ default: m.DataSafetyPage })));
const EulaPage = lazy(() => import('./pages/EulaPage').then((m) => ({ default: m.EulaPage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then((m) => ({ default: m.SupportPage })));
const DeleteAccountPage = lazy(() => import('./pages/DeleteAccountPage').then((m) => ({ default: m.DeleteAccountPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

function HomePage() {
  const { variant } = useVariant();

  // Agency page is the default experience; old page still accessible via other variants
  if (variant === 'default' || variant === 'agency') {
    return <AgencyPage />;
  }

  return <LegacyHome />;
}

function App() {
  return (
    <ThemeProvider>
      <VariantProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/3pl" element={<ThreePLPage />} />
            <Route path="/in-store-pickup" element={<PickupPage />} />
            <Route path="/book-a-call" element={<BookRedirect />} />
            <Route path="/meeting-confirmed" element={<MeetingConfirmedPage />} />
            {/* Unlisted prospect reports. Reached by direct URL only: no nav
                links anywhere, noindex meta on the route, slugs unguessable.
                New prospects are added in src/reports/prospects.ts, no new
                routes or components needed. */}
            <Route path="/r/:slug" element={<ProspectReportRoute />} />
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
        </Suspense>
      </VariantProvider>
    </ThemeProvider>
  );
}

export default App;
