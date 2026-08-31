import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { VariantProvider } from './context/VariantContext';
import { useVariant } from './context/variant';
import { routeImports } from './routePreload';

// Every page, including the default homepage, is lazy-loaded so an inner-page
// visit does not download the much larger homepage experience.
const R = routeImports;
const AgencyPage = lazy(R.AgencyPage);
const LegacyHome = lazy(R.LegacyHome);
const ThreePLPage = lazy(R.ThreePLPage);
const PickupPage = lazy(R.PickupPage);
const CharityRetailPage = lazy(R.CharityRetailPage);
const BookRedirect = lazy(R.BookRedirect);
const StockoutsPage = lazy(R.StockoutsPage);
const FishbowlPage = lazy(R.FishbowlPage);
const Cin7AlternativePage = lazy(() => R.CompetitorAlternativePages().then((m) => ({ default: m.Cin7AlternativePage })));
const ZohoInventoryAlternativePage = lazy(() => R.CompetitorAlternativePages().then((m) => ({ default: m.ZohoInventoryAlternativePage })));
const InflowAlternativePage = lazy(() => R.CompetitorAlternativePages().then((m) => ({ default: m.InflowAlternativePage })));
const MeetingConfirmedPage = lazy(R.MeetingConfirmedPage);
const ProspectReportRoute = lazy(R.ProspectReportRoute);
const FeaturesOverviewPage = lazy(() => R.FeaturesOverviewPage().then((m) => ({ default: m.FeaturesOverviewPage })));
const InventoryPage = lazy(() => R.InventoryPage().then((m) => ({ default: m.InventoryPage })));
const PurchasingPage = lazy(() => R.PurchasingPage().then((m) => ({ default: m.PurchasingPage })));
const SalesPage = lazy(() => R.SalesPage().then((m) => ({ default: m.SalesPage })));
const ManufacturingPage = lazy(() => R.ManufacturingPage().then((m) => ({ default: m.ManufacturingPage })));
const WarehousingPage = lazy(() => R.WarehousingPage().then((m) => ({ default: m.WarehousingPage })));
const ToolsServicesPage = lazy(() => R.ToolsServicesPage().then((m) => ({ default: m.ToolsServicesPage })));
const AccountingPage = lazy(() => R.AccountingPage().then((m) => ({ default: m.AccountingPage })));
const ShopifyInventoryPage = lazy(() => R.ShopifyInventoryPage().then((m) => ({ default: m.ShopifyInventoryPage })));
const PricingPage = lazy(() => R.PricingPage().then((m) => ({ default: m.PricingPage })));
const AboutPage = lazy(() => R.AboutPage().then((m) => ({ default: m.AboutPage })));
const BlogPage = lazy(R.BlogPage);
const InventoryManagementGuidePage = lazy(() => R.InventoryManagementGuidePage().then((m) => ({ default: m.InventoryManagementGuidePage })));
const PartnersPage = lazy(() => R.PartnersPage().then((m) => ({ default: m.PartnersPage })));
const PrivacyPolicyPage = lazy(() => R.PrivacyPolicyPage().then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => R.TermsOfServicePage().then((m) => ({ default: m.TermsOfServicePage })));
const AppPrivacyPage = lazy(() => R.AppPrivacyPage().then((m) => ({ default: m.AppPrivacyPage })));
const DataSafetyPage = lazy(() => R.DataSafetyPage().then((m) => ({ default: m.DataSafetyPage })));
const EulaPage = lazy(() => R.EulaPage().then((m) => ({ default: m.EulaPage })));
const SupportPage = lazy(() => R.SupportPage().then((m) => ({ default: m.SupportPage })));
const DeleteAccountPage = lazy(() => R.DeleteAccountPage().then((m) => ({ default: m.DeleteAccountPage })));
const ContactPage = lazy(() => R.ContactPage().then((m) => ({ default: m.ContactPage })));
const SitemapPage = lazy(() => R.SitemapPage().then((m) => ({ default: m.SitemapPage })));
const SmsProgramPage = lazy(() => R.SmsProgramPage().then((m) => ({ default: m.SmsProgramPage })));
const NotFoundPage = lazy(() => R.NotFoundPage().then((m) => ({ default: m.NotFoundPage })));

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
            <Route path="/charity-retail" element={<CharityRetailPage />} />
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
            {/* Fishbowl Inventory alternative campaign page (Google Ads). */}
            <Route path="/fishbowl-alternative" element={<FishbowlPage />} />
            <Route path="/cin7-alternative" element={<Cin7AlternativePage />} />
            <Route path="/zoho-inventory-alternative" element={<ZohoInventoryAlternativePage />} />
            <Route path="/inflow-alternative" element={<InflowAlternativePage />} />
            <Route path="/features" element={<FeaturesOverviewPage />} />
            <Route path="/features/inventory" element={<InventoryPage />} />
            <Route path="/features/purchasing" element={<PurchasingPage />} />
            <Route path="/features/sales" element={<SalesPage />} />
            <Route path="/features/manufacturing" element={<ManufacturingPage />} />
            <Route path="/features/warehousing" element={<WarehousingPage />} />
            <Route path="/features/tools-services" element={<ToolsServicesPage />} />
            <Route path="/features/accounting" element={<AccountingPage />} />
            <Route path="/shopify-inventory-management" element={<ShopifyInventoryPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/what-is-inventory-management" element={<InventoryManagementGuidePage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/app-privacy" element={<AppPrivacyPage />} />
            <Route path="/data-safety" element={<DataSafetyPage />} />
            <Route path="/eula" element={<EulaPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/delete-account" element={<DeleteAccountPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/sms-program" element={<SmsProgramPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </VariantProvider>
    </ThemeProvider>
  );
}

export default App;
