import { createContext, useContext, type ReactNode } from 'react';

/**
 * URL-based landing page variants.
 *
 * Add new variant slugs here as you create ad campaigns.
 * The slug corresponds to `?variant=<slug>` in the URL.
 *
 * 'default' is the baseline experience for organic / direct traffic.
 */
export type LandingVariant = 'default' | 'forecasting';
// Future: | 'fba' | 'shopify' | 'wholesale' | 'manufacturing'

function getVariantFromURL(): LandingVariant {
  if (typeof window === 'undefined') return 'default';
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('variant');
  if (raw === 'forecasting') return 'forecasting';
  // Future variants: add cases here
  return 'default';
}

interface VariantContextType {
  variant: LandingVariant;
}

const VariantContext = createContext<VariantContextType>({ variant: 'default' });

export function VariantProvider({ children }: { children: ReactNode }) {
  const variant = getVariantFromURL();
  return (
    <VariantContext.Provider value={{ variant }}>
      {children}
    </VariantContext.Provider>
  );
}

export function useVariant() {
  return useContext(VariantContext);
}
