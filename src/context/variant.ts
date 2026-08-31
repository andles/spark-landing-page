import { createContext, useContext } from 'react';

export type LandingVariant =
  | 'default'
  | 'forecasting'
  | 'demo-hero'
  | 'forecasting-14d-cta'
  | 'forecasting-14d-form'
  | 'margin-14d-cta'
  | 'margin-14d-form'
  | 'video'
  | 'agency';

export function getVariantFromURL(): LandingVariant {
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
    'video',
    'agency',
  ];
  return valid.includes(raw as LandingVariant) ? (raw as LandingVariant) : 'default';
}

interface VariantContextType {
  variant: LandingVariant;
}

export const VariantContext = createContext<VariantContextType>({ variant: 'default' });

export function useVariant() {
  return useContext(VariantContext);
}
