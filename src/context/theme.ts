import { createContext, useContext } from 'react';

export type ThemeVariant = 'classic' | 'nextgen';

export interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function getInitialTheme(): ThemeVariant {
  const envTheme = import.meta.env.VITE_THEME as ThemeVariant | undefined;
  if (envTheme === 'classic' || envTheme === 'nextgen') {
    return envTheme;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('sparkinventory.ai') || hostname.includes('nextgen') || hostname.includes('new.sparkinventory')) {
      return 'nextgen';
    }
  }

  return 'nextgen';
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
