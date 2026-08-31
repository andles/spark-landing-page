import type { ReactNode } from 'react';
import { getVariantFromURL, VariantContext } from './variant';

export function VariantProvider({ children }: { children: ReactNode }) {
  const variant = getVariantFromURL();
  return (
    <VariantContext.Provider value={{ variant }}>
      {children}
    </VariantContext.Provider>
  );
}
