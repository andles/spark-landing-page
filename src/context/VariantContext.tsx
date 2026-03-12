import { createContext, useContext, type ReactNode } from 'react';

/**
 * URL-based landing page variants.
 *
 * Add new variant slugs here as you create ad campaigns.
 * The slug corresponds to `?variant=<slug>` in the URL.
 *
 * 'default' is the baseline experience for organic / direct traffic.
 */
export type LandingVariant =
  | 'default'
  | 'forecasting'
  | 'demo-hero'
  | 'forecasting-14d-cta'
  | 'forecasting-14d-form'
  | 'margin-14d-cta'
  | 'margin-14d-form';
// Future: | 'fba' | 'shopify' | 'wholesale' | 'manufacturing'

function getVariantFromURL(): LandingVariant {
  if (typeof window === 'undefined') return 'default';
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('variant');
  const valid: LandingVariant[] = [
    'forecasting',
    'demo-hero',
    'forecasting-14d-cta',
    'forecasting-14d-form',
    'margin-14d-cta',
    'margin-14d-form',
  ];
  if (valid.includes(raw as LandingVariant)) return raw as LandingVariant;
  // Future variants: add slug to the array above
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
