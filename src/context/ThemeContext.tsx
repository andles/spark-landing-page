import { createContext, useContext, useState, type ReactNode } from 'react';

export type ThemeVariant = 'classic' | 'nextgen';

// Determine theme from build-time env var, runtime hostname, or default to 'classic'
function getInitialTheme(): ThemeVariant {
  // Build-time environment variable (set via VITE_THEME)
  const envTheme = import.meta.env.VITE_THEME as ThemeVariant | undefined;
  if (envTheme === 'classic' || envTheme === 'nextgen') {
    return envTheme;
  }
  
  // Runtime hostname detection (fallback for dev or single-build deploys)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Configure your domains here
    if (hostname.includes('nextgen') || hostname.includes('new.sparkinventory')) {
      return 'nextgen';
    }
  }
  
  return 'classic';
}

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeVariant>(getInitialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
