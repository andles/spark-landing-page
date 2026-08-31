import { useState, type ReactNode } from 'react';
import { getInitialTheme, ThemeContext, type ThemeVariant } from './theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeVariant>(getInitialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
