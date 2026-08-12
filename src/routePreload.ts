// Central registry of the lazy route chunks. App.tsx builds its React.lazy
// components from these, and main.tsx prefetches them all during idle time
// after the initial page is interactive — so the first load stays small but
// in-app navigation never waits on a network fetch.

export const routeImports = {
  LegacyHome: () => import('./LegacyHome'),
  ThreePLPage: () => import('./agency/ThreePLPage'),
  PickupPage: () => import('./agency/PickupPage'),
  BookRedirect: () => import('./agency/BookRedirect'),
  StockoutsPage: () => import('./agency/StockoutsPage'),
  MeetingConfirmedPage: () => import('./agency/MeetingConfirmedPage'),
  ProspectReportRoute: () => import('./reports/StockSignalsReport'),
  InventoryPage: () => import('./pages/features/InventoryPage'),
  PurchasingPage: () => import('./pages/features/PurchasingPage'),
  SalesPage: () => import('./pages/features/SalesPage'),
  ManufacturingPage: () => import('./pages/features/ManufacturingPage'),
  WarehousingPage: () => import('./pages/features/WarehousingPage'),
  ToolsServicesPage: () => import('./pages/features/ToolsServicesPage'),
  AccountingPage: () => import('./pages/features/AccountingPage'),
  PartnersPage: () => import('./pages/PartnersPage'),
  PrivacyPolicyPage: () => import('./pages/PrivacyPolicyPage'),
  TermsOfServicePage: () => import('./pages/TermsOfServicePage'),
  AppPrivacyPage: () => import('./pages/AppPrivacyPage'),
  DataSafetyPage: () => import('./pages/DataSafetyPage'),
  EulaPage: () => import('./pages/EulaPage'),
  SupportPage: () => import('./pages/SupportPage'),
  DeleteAccountPage: () => import('./pages/DeleteAccountPage'),
  ContactPage: () => import('./pages/ContactPage'),
};

/** Fetch every route chunk in the background. Safe to call repeatedly —
 *  the browser and Vite's module cache dedupe the requests. */
export function prefetchAllRoutes() {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return; // respect data-saver mode
  }
  for (const load of Object.values(routeImports)) {
    load().catch(() => {}); // prefetch failures are harmless; route load retries on demand
  }
}
